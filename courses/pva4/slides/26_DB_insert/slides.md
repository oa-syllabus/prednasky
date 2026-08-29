---
#== Layout
theme: default
background: https://cover.sli.dev # https://unsplash.com/collections/94734566/slidev
transition: slide-left #https://sli.dev/guide/animations#slide-transitions
mdc: true # https://sli.dev/guide/syntax#mdc-syntax
selectable: false
codeCopy: false
download: true
hideInToc: true

#== Code Highlighter
highlighter: shiki
lineNumbers: true

#== Dravings https://sli.dev/guide/drawing
drawings:
  persist: false

#== Export Configuration
# use export CLI options in camelCase format https://sli.dev/guide/exporting.html
export:
  format: pdf
  timeout: 30000
  dark: false
  withClicks: false

#== Slide Info
src: '../../pages/index.md'
title: "DB Insert"
exportFilename: "26_DB_insert"
titleTemplate: "PVA4 %s by Adam Fišer"
info: |
  ## PVA4 Programování a vývoj aplikací

  Určeno pouze pro výukové účely

  [Repository](https://github.com/OA-PVA4-Syllabus/pva4_prednasky) / [Prezentace](https://oa-pva4-syllabus.github.io/pva4_prednasky/)

  Created by [Adam Fišer](https://github.com/AdamFiser)
---
layout: default
---

#  Obsah

<Toc :columns="2" minDepth="1" maxDepth="1"></Toc>
---

# Vkládání dat do databáze

- Založení nového záznamu v databázi.
- Použití SQL příkazu `INSERT INTO`.
- Ošetření vstupů pomocí

---

# Struktura souborů

Projekt bude rozdělen do následujících souborů:

- `config.php` – Konfigurační soubor s přihlašovacími údaji.
- `common.php` – Soubor pro připojení k databázi.
- `functions.php` – Soubor pro pomocné funkce.
- `formular.php` – HTML formulář pro zadávání dat.
- `vloz.php` – Hlavní skript pro zpracování dat a vložení do databáze.

---

# Konfigurační soubor `config.php`

```php
<?php
$config = [
    'servername' => 'localhost',
    'username' => 'uzivatel',
    'password' => 'heslo',
    'dbname' => 'moje_databaze',
];
?>
```

---

# Společný `common.php`

```php
<?php
declare(strict_types=1);

require('config.php');
require('functions.php');

$conn = mysqli_connect($config['servername'], $config['username'], $config['password'], $config['dbname']);

if (!$conn) {
    die("Připojení selhalo: " . mysqli_connect_error());
}
?>
```

---

# Pomocné funkce `functions.php`

```php {*}{maxHeight:'450px'}
<?php
declare(strict_types=1);

function osetriVstup(string $data, int $maxDelka = 255): string {
    $data = trim($data); // Odstranění bílých znaků na začátku a konci
    $data = stripslashes($data); // Odstranění zpětných lomítek
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8'); // Ochrana proti XSS útokům
    $data = strip_tags($data); // Odstranění HTML tagů
    if (strlen($data) > $maxDelka) { // Ochrana proti dlouhým vstupům
        $data = substr($data, 0, $maxDelka);
    }
    return $data;
}

function jePlatnyEmail(string $email): bool {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
?>
```

---

# HTML formulář `formular.php`

```php
...
echo "<h2>Vložení nového uživatele</h2>";
echo $form = ' 
<form action="vloz.php" method="post">
    Jméno: <input type="text" name="jmeno" required><br>
    Email: <input type="email" name="email" required><br>
    <input type="submit" value="Odeslat">
</form>
';
...
```

---

# Vložení dat

```php {*|1-5|8,37|10-25|27-28|30-36|*}{maxHeight:'450px'}
<?php
declare(strict_types=1);

// Připojení běžných souborů
require('common.php');

// Zpracování formuláře
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Získání a ošetření vstupů
    $jmeno = isset($_POST['jmeno']) ? osetriVstup($_POST['jmeno'], 50) : '';
    $email = isset($_POST['email']) ? osetriVstup($_POST['email'], 100) : '';

    // Kontrola vyplnění polí
    if (empty($jmeno) || empty($email)) {
        die("Chyba: Všechna pole musí být vyplněna.");
    }

    // Kontrola formátu emailu
    if (!jePlatnyEmail($email)) {
        die("Chyba: Neplatný formát emailu.");
    }

    // Další úroveň ošetření vstupů pro SQL dotaz
    $jmeno = mysqli_real_escape_string($conn, $jmeno);
    $email = mysqli_real_escape_string($conn, $email);

    // Příprava SQL dotazu pro vložení nového uživatele
    $sql = "INSERT INTO uzivatele (jmeno, email) VALUES ('$jmeno', '$email')";
    
    // Poslání dotazu na server
    if (mysqli_query($conn, $sql)) {
        echo "Nový záznam byl úspěšně vložen";
    } else {
        // Vypsání chyby v případě neúspěchu (pozor, na produkci nikdy!)
        echo "Chyba: " . mysqli_error($conn);
    }
}

mysqli_close($conn);
?>
```

---

# Práce s vloženým záznamem

- Po úspěšném vložení záznamu získáme jeho id pomocí `mysqli_insert_id($conn)`.
- Použijeme toto id k vložení dalšího souvisejícího záznamu (například role uživatele, položky objednávky).
- Ověřujeme, zda operace proběhla úspěšně, a zobrazujeme odpovídající zprávy.
- Tato technika je nezbytná pro práci s relacemi v databázi.


```php
$sql = "INSERT INTO uzivatele (jmeno, email) VALUES ('$jmeno', '$email')";
if (mysqli_query($conn, $sql)) {
    $uzivatel_id = mysqli_insert_id($conn);
    echo "Nový uživatel byl vložen s ID: " . $uzivatel_id;
}
```


---

# Vložení souvisejících dat

```php {*|31-50|33-35|34,37-39|34,39,41|34,39,41-46|*}{maxHeight:'450px'}
<?php
declare(strict_types=1);

// Připojení běžných souborů
require_once('common.php');

// Zpracování formuláře
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Získání a ošetření vstupů
    $jmeno = isset($_POST['jmeno']) ? osetriVstup($_POST['jmeno'], 50) : '';
    $email = isset($_POST['email']) ? osetriVstup($_POST['email'], 100) : '';

    // Kontrola vyplnění polí
    if (empty($jmeno) || empty($email)) {
        die("Chyba: Všechna pole musí být vyplněna.");
    }

    // Kontrola formátu emailu
    if (!jePlatnyEmail($email)) {
        die("Chyba: Neplatný formát emailu.");
    }

    // Další úroveň ošetření vstupů pro SQL dotaz
    $jmeno = mysqli_real_escape_string($conn, $jmeno);
    $email = mysqli_real_escape_string($conn, $email);

    // Příprava SQL dotazu pro vložení nového uživatele
    $sql = "INSERT INTO uzivatele (jmeno, email) VALUES ('$jmeno', '$email')";
    
    // Poslání dotazu na server
    if (mysqli_query($conn, $sql)) {
    
        // Získání ID nového záznamu
        $uzivatel_id = mysqli_insert_id($conn);
        echo "Nový uživatel byl vložen s ID: " . $uzivatel_id;

        // Pokud potřebujeme s novým záznamem pracovat dále
        // Příklad vložení souvisejících dat (např. role uživatele)
        $sql_role = "INSERT INTO role_uzivatele (uzivatel_id, role) VALUES ('$uzivatel_id', 'student')";
        
        if (mysqli_query($conn, $sql_role)) {
            echo " Role uživatele byla úspěšně přiřazena.";
        } else {
            // Vypsání chyby (vložení role) v případě neúspěchu (pozor, na produkci nikdy!)
            echo " Chyba při vkládání role: " . mysqli_error($conn);
        }
    } else {
        // Vypsání chyby (vložení uživatele) v případě neúspěchu (pozor, na produkci nikdy!)
        echo "Chyba: " . mysqli_error($conn);
    }
}

mysqli_close($conn);
?>
```

---

# Shrnutí

- V tomto tutoriálu jsme se naučili vkládat data do databáze MySQL pomocí PHP.
- Rozdělili jsme projekt do několika souborů pro lepší organizaci.
- Nový záznam jsme vložili pomocí SQL dotazu `INSERT INTO`.
- Ošetřili jsme vstupy pomocí funkcí `osetriVstup` a `jePlatnyEmail`.
- Zpracovali jsme výsledek vložení a získali id nového záznamu pomocí `mysqli_insert_id`.


---
src: '../../pages/thanku.md'
---