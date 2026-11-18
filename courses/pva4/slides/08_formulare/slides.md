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
- Pomocné prvky: `<label>`, `<option>`, `<fieldset>`, `<legend>`.

Atributy elementu `<form>`:

- `action` - cílová URL, kam se data odešlou. Chybí-li, odešlou se na adresu aktuální stránky.
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

---

# Další prvky formuláře

| Prvek | Použití |
|---|---|
| `<select>` + `<option>` | rozbalovací seznam |
| `<textarea>` | víceřádkový text |
| `<input type="hidden">` | hodnota, kterou uživatel na stránce nevidí |
| `<input type="submit">` | tlačítko, které formulář odešle (text určuje `value`) |
| `<button type="submit">` | totéž, ale uvnitř může být HTML (ikona, formátovaný text) |

- `hidden` je skrytý jen na stránce. Uživatel ho najde ve zdrojovém kódu a může ho změnit.
- Do skrytého pole proto nepatří nic, čemu server slepě věří (cena, role, ID cizího záznamu).

---

# Prvky formuláře - příklad

```php
echo '
    <form action="destUrl.php" method="post">
        <label>Jméno: <input type="text" name="name" required></label>

        <select name="country">
            <option value="cz">Česko</option>
            <option value="sk">Slovensko</option>
        </select>

        <label><input type="radio" name="size" value="m" checked> M</label>
        <label><input type="radio" name="size" value="l"> L</label>

        <label><input type="checkbox" name="newsletter" value="1"> Newsletter</label>

        <textarea name="message"></textarea>
        <button type="submit">Odeslat</button>
    </form>
';
```

- Atribut `required` a typy jako `email` kontroluje prohlížeč. Je to jen pohodlí pro uživatele, bezpečnost nezajistí.

---
layout: cover
background: https://cover.sli.dev
hideInToc: true
---

# Metoda GET

---

# Metoda `GET`

- Data se připojí k URL jako query string: `destUrl.php?name=Jan&email=jan%40example.com`.
- Speciální znaky prohlížeč zakóduje (`@` → `%40`, mezera → `+`), PHP je dekóduje samo.
- PHP data zpřístupní v superglobálním poli `$_GET`, dostupném odkudkoli (i ve funkci).
- GET je určen pro **čtení** dat bez vedlejšího efektu: vyhledávání, filtrování, řazení, stránkování.

```php
echo '
    <form action="destUrl.php" method="get">
        <label>Jméno: <input type="text" name="name"></label><br>
        <label>E-mail: <input type="email" name="email"></label><br>
        <button type="submit">Odeslat</button>
    </form>
';
```

---

# Výhody a omezení GET

- Výsledek lze uložit do záložky nebo sdílet odkazem.
- Odpověď je snadno cachovatelná.
- Opakované načtení stránky je bezpečné, nic se nezmění.
- Délka URL je omezená (v praxi zhruba 2000 znaků), jde posílat jen text.
- Hodnoty jsou vidět v adrese, v historii prohlížeče i v logu serveru. Citlivé údaje se do URL nikdy nedávají.

---

# Přístup na hodnoty - GET

Požadavek, který prohlížeč odešle (F12 → Network → kliknout na požadavek):

```http
GET /destUrl.php?name=Jan&email=jan%40example.com HTTP/1.1
Host: localhost
```

- Data jsou v první řádce požadavku, za otazníkem. Tělo požadavku je prázdné.

Soubor `destUrl.php`:

```php
<?php
declare(strict_types=1);

$name = $_GET['name'] ?? '';      // 'Jan'
$email = $_GET['email'] ?? '';    // 'jan@example.com'
```

---
layout: cover
background: https://cover.sli.dev
hideInToc: true
---

# Metoda POST

---

# Metoda `POST`

- Data se odešlou v těle HTTP požadavku, v URL nejsou vidět.
- PHP je zpřístupní v superglobálním poli `$_POST`.
- POST je určen pro **změnu stavu**: přihlášení, registrace, uložení do databáze, odeslání zprávy.
- Hodnoty v těle požadavku nejsou nijak šifrované. Ochranu při přenosu zajišťuje až HTTPS.

```php
echo '
    <form action="destUrl.php" method="post">
        <label>Jméno: <input type="text" name="name"></label><br>
        <label>E-mail: <input type="email" name="email"></label><br>
        <button type="submit">Odeslat</button>
    </form>
';
```

---

# Výhody a omezení POST

- Data nejsou v URL, nezůstávají v záložkách ani v historii prohlížeče.
- Velikost dat omezuje spíš konfigurace serveru (`post_max_size`) než protokol.
- Umožňuje posílat i binární data (soubory, `enctype="multipart/form-data"`).
- Odpověď se běžně necachuje a prohlížeč při obnovení stránky varuje před opětovným odesláním.
- POST sám o sobě **není bezpečný**: data lze snadno podvrhnout (např. nástrojem curl). Ošetření vstupu je vždy nutné.

---

# Přístup na hodnoty - POST

Požadavek, který prohlížeč odešle (F12 → Network → kliknout na požadavek):

```http
POST /destUrl.php HTTP/1.1
Host: localhost
Content-Type: application/x-www-form-urlencoded

name=Jan&email=jan%40example.com
```

- URL je bez dat. Data mají stejný zápis jako u GET, jen jsou v těle požadavku.

Soubor `destUrl.php`:

```php
<?php
declare(strict_types=1);

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
```

---

# Srovnání GET a POST

| | GET | POST |
|---|---|---|
| Určení | čtení dat (bez vedlejšího efektu) | změna stavu na serveru |
| Umístění dat | v URL, zůstanou i v historii | v těle HTTP požadavku |
| Délka dat | omezená délkou URL (cca 2000 znaků) | omezená jen nastavením serveru |
| Datové typy | text | text i binární data (soubory) |
| Záložka, sdílení odkazem | ano | ne |
| Cachování | běžné | téměř vůbec |
| Opakované odeslání | bezpečné | prohlížeč se ptá, hrozí duplicitní akce |

---

# Zpracování dat formuláře

- Data jsou v superglobálních polích `$_GET` a `$_POST`.
- Jde o asociativní pole: klíč = `name` prvku, hodnota = vložený údaj.
- Hodnoty jsou **vždy řetězce** (věk `'17'`, ne `17`). Před výpočtem nebo předáním funkci je převedeme, např. `(int)`.
- Hodnota může **chybět** (prvek se neodeslal, požadavek je podvržený). Přístup na neexistující klíč vyvolá varování `Undefined array key`.
- Bezpečný přístup s výchozí hodnotou: operátor `??`.
- Ošetření výstupu: `htmlspecialchars()` převede speciální znaky na HTML entity a brání XSS. Od PHP 8.1 převádí i uvozovky, další parametry nejsou potřeba.

```php
$name = trim($_POST['name'] ?? '');                 // chybí-li, použije se ''
echo '<h2>Ahoj ' . htmlspecialchars($name) . '</h2>';
```

---

# Po odeslání formuláře

Stejná stránka zobrazuje formulář i zpracovává data. Kód se musí spustit jen po odeslání.

```php
// REQUEST_METHOD je POST jen při odeslání formuláře, při prvním načtení je GET
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Tento kód se provede až po odeslání formuláře
    $name = trim($_POST['name'] ?? '');
    echo '<h2>Děkujeme ' . htmlspecialchars($name) . '</h2>';
}
```

U formuláře s metodou GET nelze podle `REQUEST_METHOD` odeslání poznat, protože i první načtení stránky je GET. Použije se kontrola, zda parametr existuje:

```php
if (isset($_GET['name'])) {
    echo '<h2>Děkujeme ' . htmlspecialchars($_GET['name']) . '</h2>';
}
```

---

# Checkbox, radio a select

- Nezaškrtnutý `checkbox` se **neodešle vůbec**, v poli proto klíč chybí. Zjistí se přes `isset()`.
- `radio` a `select` odešlou `value` vybrané možnosti. Není-li vybrán žádný `radio`, klíč také chybí.
- Více hodnot pod jedním jménem: `name="hobby[]"`, v PHP pak vznikne pole.
- Uživatel může poslat i hodnotu, která ve formuláři není. Ověříme ji proti seznamu povolených.

```php
echo '
    <label><input type="checkbox" name="newsletter" value="1"> Newsletter</label>
    <label><input type="checkbox" name="hobby[]" value="sport"> Sport</label>
    <label><input type="checkbox" name="hobby[]" value="hudba"> Hudba</label>
';
```

```php
$newsletter = isset($_POST['newsletter']);          // true / false
$hobby = $_POST['hobby'] ?? [];                     // pole, nebo prázdné pole
$size = $_POST['size'] ?? '';

if (!in_array($size, ['m', 'l'], true)) {
    $errors[] = 'Vyberte velikost.';
}
```

---
layout: two-cols-header
---

# Co vypíše? - odeslaný formulář

Uživatel vyplní jméno `Jan`, věk `17`, zaškrtne Sport a Hudbu, Newsletter nechá prázdný.

::left::

```php
echo '
    <input type="text" name="name">
    <input type="text" name="age">
    <input type="checkbox" name="newsletter" value="1">
    <input type="checkbox" name="hobby[]" value="sport">
    <input type="checkbox" name="hobby[]" value="hudba">
';
```

```php
var_dump($_POST);
```

::right::

<v-click>

```
array(3) {
  ["name"]=>
  string(3) "Jan"
  ["age"]=>
  string(2) "17"
  ["hobby"]=>
  array(2) {
    [0]=>
    string(5) "sport"
    [1]=>
    string(5) "hudba"
  }
}
```

- `newsletter` chybí, nezaškrtnutý checkbox se neposílá.
- `age` je řetězec `"17"`, ne číslo.
- `hobby` je pole.

</v-click>

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
echo '<input type="email" name="email" value="' . htmlspecialchars($email) . '">';
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
- `header()` musí zaznít dřív, než skript cokoli vypíše. Zpracování formuláře proto patří na začátek souboru, před HTML.

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
$allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png'];   // typ podle obsahu => přípona
if ($file && $file['error'] === UPLOAD_ERR_OK) {
    $type = mime_content_type($file['tmp_name']);           // skutečný typ, ne přípona
    if (isset($allowed[$type])) {
        move_uploaded_file($file['tmp_name'], __DIR__ . '/uploads/' . uniqid() . '.' . $allowed[$type]);
    }
}
```

- Název ani příponu od uživatele nepoužíváme, `foto.php` by se uložil jako spustitelný skript.
- Hlídat i velikost souboru (limit serveru: `upload_max_filesize`).

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
