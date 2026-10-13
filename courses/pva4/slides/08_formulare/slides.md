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
  persist: true

#== Export Configuration
# use export CLI options in camelCase format https://sli.dev/guide/exporting.html
export:
  format: pdf
  timeout: 30000
  dark: false
  withClicks: false

#== Slide Info
src: '../../pages/index.md'
title: "Formuláře"
exportFilename: "08_formulare"
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

# HTML formulář

- Formulář je základní způsob, jak uživatel předá data serveru.
- Tvoří ho element `<form>` a ovládací prvky uvnitř něj: `<input>`, `<textarea>`, `<select>`, `<button>`.
- Pomocné prvky: `<label>`, `<fieldset>`, `<legend>`, `<optgroup>`, `<option>`, `<datalist>`, `<output>`.

Atributy elementu `<form>`:

- `action` - cílová URL, kam se data odešlou. V příkladech ho vždy vyplňujeme.
- `method` - metoda odeslání, `get` (výchozí) nebo `post`.

```php
echo '
    <form action="destUrl.php" method="post">
        <label for="name">Jméno:</label>
        <input type="text" id="name" name="name"><br>

        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email"><br>

        <input type="submit" value="Odeslat">
    </form>
';
```

---

# Prvky formuláře

- Atribut `name` je **klíč**, pod kterým PHP hodnotu najde. Prvek bez `name` se neodešle.
- Atribut `value` je odesílaná hodnota, u textových polí to, co uživatel napsal.
- `<label for="id">` propojí popisek s polem (klik na popisek aktivuje pole, čtečky obrazovky).

| Prvek | Použití |
|---|---|
| `<input type="text">` | jednořádkový text |
| `<input type="email">`, `number`, `date` | text s kontrolou formátu v prohlížeči |
| `<input type="password">` | skryje zadávané znaky |
| `<input type="checkbox">` | zaškrtávací pole (ano/ne) |
| `<input type="radio">` | výběr jedné možnosti ze skupiny (stejné `name`) |
| `<select>` + `<option>` | rozbalovací seznam |
| `<textarea>` | víceřádkový text |
| `<input type="hidden">` | skrytá hodnota |
| `<input type="submit">` | tlačítko, které formulář odešle (text určuje `value`) |
| `<button type="submit">` | totéž, ale uvnitř může být HTML (ikona, formátovaný text) |

---

# Prvky formuláře - příklad

```php
echo '
    <form action="destUrl.php" method="post">
        <input type="text" name="name" required>

        <select name="country">
            <option value="cz">Česko</option>
            <option value="sk">Slovensko</option>
        </select>

        <input type="radio" name="size" value="m" checked> M
        <input type="radio" name="size" value="l"> L

        <input type="checkbox" name="newsletter" value="1"> Newsletter

        <textarea name="message"></textarea>
        <button type="submit">Odeslat</button>
    </form>
';
```

- Atribut `required` a typy jako `email` kontroluje prohlížeč. Je to jen pohodlí pro uživatele, bezpečnost nezajistí.

---
layout: cover
background: https://cover.sli.dev
---

# Metoda GET

---

# Metoda `GET`

- Data se připojí k URL jako query string: `destUrl.php?name=Jan&email=jan@example.com`.
- PHP je zpřístupní v superglobálním poli `$_GET`.
- Superglobální proměnné jsou dostupné z libovolného místa skriptu (včetně funkcí).
- Hodnoty jsou viditelné v adrese, v historii prohlížeče i v logu serveru.
- GET je určen pro **čtení** dat bez vedlejšího efektu: vyhledávání, filtrování, řazení, stránkování.

---

# Výhody a omezení GET

- Výsledek lze uložit do záložky nebo sdílet odkazem.
- Odpověď je snadno cachovatelná.
- Opakované načtení stránky je bezpečné, nic se nezmění.
- Délka URL je omezená (v praxi zhruba 2000 znaků), jde posílat jen text.
- Citlivé údaje se do URL nikdy nedávají.

```php
echo '
    <form action="destUrl.php" method="get">
        Name: 	<input type="text" name="name"><br>
        E-mail:	 <input type="text" name="email"><br>
        <input type="submit">
    </form>
';
```

---

# Přístup na hodnoty - GET

<img src="/get.jpg"/>

---

# Přístup na hodnoty - GET

```php
echo '
    <form action="destUrl.php" method="get">
        Name: 	<input type="text" name="name"><br>
        E-mail:	 <input type="text" name="email"><br>
        <input type="submit" value="odeslat">
    </form>
';
```

Hodnoty jsou předávány přes URL
> url: `https://localhost/PVA4/destUrl.php?name=value&email=value`


Přístup na hodnoty formuláře:
```php
<?php

$_GET['name'];
$_GET['email'];

?>
```

---
layout: cover
background: https://cover.sli.dev
---

# Metoda POST

---

# Metoda `POST`

- Data se odešlou v těle HTTP požadavku, v URL nejsou vidět.
- PHP je zpřístupní v superglobálním poli `$_POST`.
- POST je určen pro **změnu stavu**: přihlášení, registrace, uložení do databáze, odeslání zprávy.
- Hodnoty v těle požadavku nejsou nijak šifrované. Ochranu při přenosu zajišťuje až HTTPS.

---

# Výhody a omezení POST

- Data nejsou v URL, nezůstávají v záložkách ani v historii prohlížeče.
- Velikost dat omezuje spíš konfigurace serveru (`post_max_size`) než protokol.
- Umožňuje posílat i binární data (soubory, `enctype="multipart/form-data"`).
- Odpověď se běžně necachuje a prohlížeč při obnovení stránky varuje před opětovným odesláním.
- POST sám o sobě **není bezpečný**: data lze snadno podvrhnout (např. nástrojem curl). Ošetření vstupu je vždy nutné.

---

# Přístup na hodnoty - POST

<img src="/post.jpg"/>

---

# Přístup na hodnoty - POST

```php
echo '
    <form action="destUrl.php" method="post">
        Name: 	<input type="text" name="name"><br>
        E-mail:	 <input type="text" name="email"><br>
        <input type="submit" value="odeslat">
    </form>
';
```

Přístup na hodnoty formuláře:
```php
<?php

$_POST['name'];
$_POST['email'];

?>
```

---

# Srovnání GET a POST

| | GET | POST |
|---|---|---|
| Určení | čtení dat (bez vedlejšího efektu) | změna stavu na serveru |
| Umístění dat | v URL (query string) | v těle HTTP požadavku |
| Viditelnost | v URL, historii i záložce | není v URL ani v historii |
| Délka dat | omezená délkou URL (cca 2000 znaků) | omezená jen nastavením serveru |
| Datové typy | text | text i binární data (soubory) |
| Záložka, sdílení odkazem | ano | ne |
| Cachování | běžné | téměř vůbec |
| Opakované odeslání | bezpečné | prohlížeč se ptá, hrozí duplicitní akce |

---

# Zpracování dat formuláře

- Data jsou v superglobálních polích `$_GET` a `$_POST`.
- Jde o asociativní pole: klíč = `name` prvku, hodnota = vložený údaj.
- Hodnota může **chybět** (uživatel pole nevyplnil, prvek se neodeslal, požadavek je podvržený). Přístup na neexistující klíč vyvolá varování `Undefined array key`.
- Bezpečný přístup s výchozí hodnotou: operátor `??`.
- Ošetření výstupu: `htmlspecialchars()` převede speciální znaky na HTML entity a brání XSS.

```php
$name = trim($_POST['name'] ?? '');                 // chybí-li, použije se ''
echo '<h2>Ahoj ' . htmlspecialchars($name, ENT_QUOTES) . '</h2>';
```

---

# Po odeslání formuláře

Stejná stránka zobrazuje formulář i zpracovává data. Kód se musí spustit jen po odeslání.

```php
// REQUEST_METHOD je POST jen při odeslání formuláře, při prvním načtení je GET
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Tento kód se provede až po odeslání formuláře
    $name = trim($_POST['name'] ?? '');
    echo '<h2>Děkujeme ' . htmlspecialchars($name, ENT_QUOTES) . '</h2>';
}
```

U formuláře s metodou GET nelze podle `REQUEST_METHOD` odeslání poznat, protože i první načtení stránky je GET. Použije se kontrola, zda parametr existuje:

```php
if (isset($_GET['name'])) {
    echo '<h2>Děkujeme ' . htmlspecialchars($_GET['name'], ENT_QUOTES) . '</h2>';
}
```

---

# Checkbox, radio a select

- Nezaškrtnutý `checkbox` se **neodešle vůbec**, v poli proto klíč chybí. Zjistí se přes `isset()`.
- `radio` a `select` odešlou `value` vybrané možnosti.
- Více hodnot pod jedním jménem: `name="hobby[]"`, v PHP pak vznikne pole.

```php
echo '
    <input type="checkbox" name="newsletter" value="1"> Newsletter
    <input type="checkbox" name="hobby[]" value="sport"> Sport
    <input type="checkbox" name="hobby[]" value="hudba"> Hudba
';
```

```php
$newsletter = isset($_POST['newsletter']);          // true / false
$hobby = $_POST['hobby'] ?? [];                     // pole, nebo prázdné pole
```

---

# Validace na serveru

- Ověřit, že povinné pole není prázdné a že hodnota má očekávaný formát a rozsah.
- K ověření formátu slouží `filter_var()`.
- Chyby se sbírají do pole a zobrazí u formuláře. Zadané hodnoty se do polí vrací, uživatel je nemusí psát znovu.

```php
$errors = [];
$email = trim($_POST['email'] ?? '');

if ($email === '') {
    $errors[] = 'Vyplňte e-mail.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'E-mail nemá správný formát.';
}

if ($errors === []) {
    // data jsou v pořádku, lze zpracovat
}
```

```php
echo '<input type="email" name="email" value="' . htmlspecialchars($email, ENT_QUOTES) . '">';
```

---

# Načtení vstupu přes `filter_input()`

- Čte přímo z `INPUT_GET` / `INPUT_POST` a rovnou hodnotu validuje nebo čistí.
- Chybějící klíč nevyvolá varování, vrátí `null`. Neprojde-li filtr, vrátí `false`.

```php
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$age   = filter_input(INPUT_POST, 'age', FILTER_VALIDATE_INT,
    ['options' => ['min_range' => 1, 'max_range' => 120]]);

if ($email === null || $email === false) {
    $errors[] = 'E-mail chybí nebo nemá správný formát.';
}
```

- `filter_input()` kontroluje typ a formát, ale **neošetřuje výstup**. Do HTML se hodnota dál vypisuje přes `htmlspecialchars()`.

---

# Po úspěšném odeslání: přesměrování

- Po zpracování POST se nezobrazuje výsledek rovnou. Server odpoví **přesměrováním** (vzor Post/Redirect/Get).
- Obnovení stránky (F5) pak neodešle formulář znovu, takže nevznikne duplicitní objednávka ani záznam.
- Přesměrování se provádí funkcí `header()`, probereme později.

```php
if ($errors === []) {
    // ... uložení dat ...
    header('Location: dekujeme.php');
    exit;
}
```

---

# Nahrání souboru

- Formulář musí mít `method="post"` a `enctype="multipart/form-data"`.
- Soubor není v `$_POST`, ale v poli `$_FILES`.

```php
echo '
    <form action="upload.php" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" accept="image/*">
        <button type="submit">Nahrát</button>
    </form>
';
```

```php
$file = $_FILES['avatar'] ?? null;

if ($file && $file['error'] === UPLOAD_ERR_OK) {
    // $file['name'] pochází od uživatele, nedůvěřovat mu, název vygenerovat
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    move_uploaded_file($file['tmp_name'], __DIR__ . '/uploads/' . uniqid() . '.' . $ext);
}
```

- Vždy kontrolovat `error`, velikost a skutečný typ souboru, ne jen příponu (omezení: `upload_max_filesize`).

---

# Ochrana proti CSRF

- CSRF: cizí stránka přiměje prohlížeč přihlášeného uživatele odeslat POST na naši aplikaci.
- Obrana: formulář obsahuje náhodný **token** uložený i v session. Server ověří, že se shodují.
- Session se probírá později, zde jde o princip.

```php
session_start();
$_SESSION['token'] ??= bin2hex(random_bytes(32));   // vygenerování tokenu
```

```php
echo '<input type="hidden" name="token" value="' . $_SESSION['token'] . '">';
```

```php
$sent = $_POST['token'] ?? '';
if (!hash_equals($_SESSION['token'], $sent)) {
    http_response_code(403);
    exit('Neplatný token.');
}
```

---

# Bezpečnostní riziko

<div class="absolute right-40px top-40px max-w-120px">
  <img src="/vykricnik.png"/>
</div>

- Každý vstup od uživatele je nedůvěryhodný, GET i POST.
- Kontrola v prohlížeči (`required`, JavaScript) je vhodná, ale nedostatečná. Dá se obejít.
- Vždy se musí ověřit na straně serveru.
- Hesla se nikdy neposílají přes GET (jsou v URL, historii a logu).
- Hesla se posílají přes POST a **vždy přes HTTPS**. Na serveru se neukládají v čitelné podobě, ale jako hash (`password_hash()`).
- Výstup do HTML se ošetřuje `htmlspecialchars()` (XSS).
- Do SQL se hodnoty nevkládají přímo, používají se připravené dotazy (SQL Injection).
- Formuláře měnící data chrání token proti CSRF.

---
src: '../../pages/thanku.md'
---
