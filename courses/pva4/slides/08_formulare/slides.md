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
    <form action="zpracuj.php" method="post">
        <label for="jmeno">Jméno:</label>
        <input type="text" id="jmeno" name="jmeno"><br>
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
hideInToc: true
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
hideInToc: true
---

# Prvky formuláře - příklad

```php
echo '
    <form action="zpracuj.php" method="post">
        <label>Jméno: <input type="text" name="jmeno" maxlength="50" required></label>

        <select name="zeme">
            <option value="cz">Česko</option>
            <option value="sk">Slovensko</option>
        </select>

        <label><input type="radio" name="velikost" value="m" checked> M</label>
        <label><input type="radio" name="velikost" value="l"> L</label>

        <label><input type="checkbox" name="novinky" value="1"> Novinky e-mailem</label>

        <textarea name="zprava" maxlength="1000"></textarea>
        <button type="submit">Odeslat</button>
    </form>
';
```

- `required`, `maxlength` a typy jako `email` kontroluje prohlížeč. Je to jen pohodlí pro uživatele, bezpečnost nezajistí.

---
layout: cover
background: https://cover.sli.dev
hideInToc: true
---

# Metoda GET

---

# Metoda `GET`

- Data se připojí k URL jako query string: `zpracuj.php?jmeno=Jan&email=jan%40example.com`.
- Speciální znaky prohlížeč zakóduje (`@` → `%40`, mezera → `+`), PHP je dekóduje samo.
- PHP data zpřístupní v superglobálním poli `$_GET`, dostupném odkudkoli (i ve funkci).
- GET je určen pro **čtení** dat bez vedlejšího efektu: vyhledávání, filtrování, řazení, stránkování.

```php
echo '
    <form action="zpracuj.php" method="get">
        <label>Jméno: <input type="text" name="jmeno"></label><br>
        <label>E-mail: <input type="email" name="email"></label><br>
        <button type="submit">Odeslat</button>
    </form>
';
```

---
hideInToc: true
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
GET /zpracuj.php?jmeno=Jan&email=jan%40example.com HTTP/1.1
Host: localhost
```

- Data jsou v první řádce požadavku, za otazníkem. Tělo požadavku je prázdné.

Soubor `zpracuj.php`:

```php
<?php
declare(strict_types=1);

$jmeno = $_GET['jmeno'] ?? '';    // 'Jan'
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
    <form action="zpracuj.php" method="post">
        <label>Jméno: <input type="text" name="jmeno"></label><br>
        <label>E-mail: <input type="email" name="email"></label><br>
        <button type="submit">Odeslat</button>
    </form>
';
```

---
hideInToc: true
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
POST /zpracuj.php HTTP/1.1
Host: localhost
Content-Type: application/x-www-form-urlencoded

jmeno=Jan&email=jan%40example.com
```

- URL je bez dat. Data mají stejný zápis jako u GET, jen jsou v těle požadavku.

Soubor `zpracuj.php`:

```php
<?php
declare(strict_types=1);

$jmeno = $_POST['jmeno'] ?? '';
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
layout: cover
background: https://cover.sli.dev
hideInToc: true
---

# Zpracování a bezpečnost

---

# Zpracování dat formuláře

- Data jsou v asociativních polích `$_GET` a `$_POST`: klíč = `name` prvku, hodnota = vložený údaj.
- Hodnoty jsou **vždy řetězce** (věk `'17'`, ne `17`), u `name="zajmy[]"` pole řetězců.
- Hodnota může **chybět** (prvek se neodeslal, požadavek je podvržený). Přístup na neexistující klíč vyvolá varování `Undefined array key`, pomůže operátor `??`.
- Nepoužívat `$_REQUEST`. Míchá GET, POST i cookies, takže není jasné, odkud hodnota přišla.

```php
$jmeno = trim($_POST['jmeno'] ?? '');          // chybí-li, použije se ''
```

---

# Útočník neposílá to, co je ve formuláři

- Požadavek lze sestavit ručně (curl, DevTools, skript). HTML formulář nic nezaručuje.
- Libovolné pole může chybět, `select` může mít hodnotu mimo nabídku a místo textu může přijít pole.

```bash
curl -d "jmeno[]=x&velikost=xxl&cena=1" http://localhost/zpracuj.php
```

```php
$jmeno = trim($_POST['jmeno'] ?? '');
// Fatal error: Uncaught TypeError: trim(): Argument #1 ($string) must be of type string, array given
```

- Každý vstup se proto na serveru ověří: **typ**, **délka**, **formát** a **povolené hodnoty**.
- Opakující se kontroly dáme do funkcí, aby se na žádnou nezapomnělo.

---
layout: two-cols-header
---

# Knihovna `formular.php`

- Funkce pro formuláře jsou v jednom souboru, každý formulář ho načte přes `require`.
- Data dostanou jako parametr, takže fungují pro `$_GET` i `$_POST`. Nic nevypisují, jen vrací hodnotu.

::left::

```php
<?php
// formular.php
declare(strict_types=1);

function nactiText(array $data, string $klic): string {
    $hodnota = $data[$klic] ?? '';

    if (!is_string($hodnota)) {     // poslal pole: jmeno[]=x
        return '';
    }
    return trim($hodnota);
}
```

::right::

```php
<?php
// zpracuj.php
declare(strict_types=1);
require __DIR__ . '/formular.php';

$jmeno = nactiText($_POST, 'jmeno');
$hledat = nactiText($_GET, 'hledat');
```

- Výsledek je vždy `string`, nikdy `TypeError` ani varování.

---

# Ošetření výstupu: `escapuj()`

- Cokoli od uživatele se před výpisem do HTML převede na entity. Jinak hrozí **XSS**: útočník vloží na stránku vlastní JavaScript.
- `htmlspecialchars()` převede `< > & " '`. Od PHP 8.1 nepotřebuje další parametry.
- Hodnoty atributů píšeme vždy v uvozovkách.

```php
function escapuj(string $text): string {
    return htmlspecialchars($text);
}
```

```php
$jmeno = '"><script>alert(1)</script>';          // poslal útočník

echo '<input name="jmeno" value="' . $jmeno . '">';            // skript se spustí
echo '<input name="jmeno" value="' . escapuj($jmeno) . '">';   // vypíše se jako text
```

---

# Po odeslání formuláře

Stejná stránka zobrazuje formulář i zpracovává data. Kód se musí spustit jen po odeslání.

```php
// REQUEST_METHOD je POST jen při odeslání formuláře, při prvním načtení je GET
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jmeno = nactiText($_POST, 'jmeno');
    echo '<h2>Děkujeme ' . escapuj($jmeno) . '</h2>';
}
```

U formuláře s metodou GET nelze podle `REQUEST_METHOD` odeslání poznat, protože i první načtení stránky je GET. Použije se kontrola, zda parametr existuje:

```php
if (isset($_GET['hledat'])) {
    echo '<h2>Výsledky pro ' . escapuj(nactiText($_GET, 'hledat')) . '</h2>';
}
```

---

# Checkbox, radio a select

- Nezaškrtnutý `checkbox` se **neodešle vůbec**, v poli proto klíč chybí.
- `radio` a `select` odešlou `value` vybrané možnosti. Není-li vybrán žádný `radio`, klíč také chybí.
- Více hodnot pod jedním jménem: `name="zajmy[]"`, v PHP pak vznikne pole.
- Uživatel může poslat i hodnotu, která ve formuláři není. Ověříme ji proti seznamu povolených.

```php
echo '
    <label><input type="checkbox" name="novinky" value="1"> Novinky e-mailem</label>

    <label><input type="radio" name="velikost" value="m"> M</label>
    <label><input type="radio" name="velikost" value="l"> L</label>

    <label><input type="checkbox" name="zajmy[]" value="sport"> Sport</label>
    <label><input type="checkbox" name="zajmy[]" value="hudba"> Hudba</label>
';
```

---
hideInToc: true
---

# Funkce pro checkbox a výběr

```php
function nactiCheckbox(array $data, string $klic): bool {
    return isset($data[$klic]);
}

// vrátí hodnotu ze seznamu povolených, jinak null
function nactiVolbu(array $data, string $klic, array $povolene): ?string {
    $hodnota = $data[$klic] ?? null;
    return in_array($hodnota, $povolene, true) ? $hodnota : null;
}
```

```php
$novinky = nactiCheckbox($_POST, 'novinky');                 // true / false
$velikost = nactiVolbu($_POST, 'velikost', ['m', 'l']);      // 'm', 'l', nebo null
$zeme = nactiVolbu($_POST, 'zeme', ['cz', 'sk']);
```

- `in_array(..., true)` porovnává přes `===`, takže projde jen přesně povolená hodnota.

---
hideInToc: true
---

# Více hodnot: `zajmy[]`

```php
// vrátí jen povolené hodnoty z pole, cokoli jiného zahodí
function nactiVolby(array $data, string $klic, array $povolene): array {
    $hodnoty = $data[$klic] ?? [];
    $vybrane = [];

    if (!is_array($hodnoty)) {          // poslal text místo pole
        return [];
    }
    foreach ($hodnoty as $hodnota) {
        if (in_array($hodnota, $povolene, true)) {
            $vybrane[] = $hodnota;
        }
    }
    return $vybrane;
}
```

```php
$zajmy = nactiVolby($_POST, 'zajmy', ['sport', 'hudba']);   // např. ['sport'], nebo []
```

---
layout: two-cols-header
hideInToc: true
---

# Co vypíše? - odeslaný formulář

Uživatel vyplní jméno `Jan`, věk `17`, zaškrtne Sport a Hudbu, Novinky nechá prázdné.

::left::

```php
echo '
    <input type="text" name="jmeno">
    <input type="text" name="vek">
    <input type="checkbox" name="novinky" value="1">
    <input type="checkbox" name="zajmy[]" value="sport">
    <input type="checkbox" name="zajmy[]" value="hudba">
';
```

```php
var_dump($_POST);
```

::right::

<v-click>

```
array(3) {
  ["jmeno"]=>
  string(3) "Jan"
  ["vek"]=>
  string(2) "17"
  ["zajmy"]=>
  array(2) {
    [0]=>
    string(5) "sport"
    [1]=>
    string(5) "hudba"
  }
}
```

- `novinky` chybí, nezaškrtnutý checkbox se neposílá.
- `vek` je řetězec `"17"`, ne číslo.
- `zajmy` je pole.

</v-click>

---

# Validace na serveru

- Povinné pole nesmí být prázdné a délka musí mít strop. `maxlength` v HTML jen pomůže, ověřit se musí na serveru.
- Funkce vrací **text chyby**, nebo `null`, když je hodnota v pořádku.
- `mb_strlen()` počítá znaky, `strlen()` bajty: `'Šťěpán'` má 6 znaků, ale 10 bajtů.

```php
function overText(string $text, string $nazev, int $maxDelka): ?string {
    if ($text === '') {
        return "Vyplňte pole $nazev.";
    }
    if (mb_strlen($text) > $maxDelka) {
        return "Pole $nazev může mít nejvýš $maxDelka znaků.";
    }
    return null;
}
```

```php
$chyba = overText(nactiText($_POST, 'jmeno'), 'jméno', 50);    // null = v pořádku
```

---

# E-mail a čísla: `filter_var()`

- `filter_var()` ověří formát i rozsah. Neprojde-li hodnota, vrátí `false`.
- Totéž umí `filter_input()` přímo z požadavku, ale nejde mu předat vlastní pole.

```php
function overEmail(string $email): ?string {
    if ($email === '') {
        return 'Vyplňte e-mail.';
    }
    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        return 'E-mail nemá správný formát.';
    }
    return null;
}

// celé číslo v rozsahu, jinak null ('abc', '', '17.5', pole...)
function nactiCislo(array $data, string $klic, int $min, int $max): ?int {
    $cislo = filter_var($data[$klic] ?? null, FILTER_VALIDATE_INT, [
        'options' => ['min_range' => $min, 'max_range' => $max],
    ]);
    return $cislo === false ? null : $cislo;
}
```

---

# Sběr a zobrazení chyb

- Chyby se ukládají pod klíčem pole, aby šly vypsat přímo u něj.
- Zadané hodnoty se vrací do formuláře (přes `escapuj()`), uživatel je nemusí psát znovu.

```php
$jmeno = nactiText($_POST, 'jmeno');
$email = nactiText($_POST, 'email');
$vek = nactiCislo($_POST, 'vek', 15, 120);

$chyby = array_filter([                     // array_filter vyhodí null = pole bez chyby
    'jmeno' => overText($jmeno, 'jméno', 50),
    'email' => overEmail($email),
    'vek' => $vek === null ? 'Zadejte věk od 15 do 120.' : null,
]);
```

```php
echo '
    <input type="text" name="jmeno" maxlength="50" value="' . escapuj($jmeno) . '">
    ' . escapuj($chyby['jmeno'] ?? '') . '
';
```

---

# Po úspěšném odeslání: přesměrování

- Po zpracování POST server odpoví **přesměrováním** (vzor Post/Redirect/Get). F5 pak formulář neodešle znovu.
- Kód `303 See Other` říká prohlížeči, ať výsledek načte metodou GET. Funkci `header()` probereme později.
- `header()` musí zaznít dřív, než skript cokoli vypíše. Zpracování formuláře proto patří na začátek souboru.
- Přesměrovat jen na vlastní pevnou adresu. `presmeruj($_GET['zpet'])` by uživatele poslalo na cizí web.

```php
function presmeruj(string $adresa): never {      // never: funkce se nevrátí, skončí exit
    header('Location: ' . $adresa, true, 303);
    exit;
}
```

```php
if ($chyby === []) {
    // ... uložení dat ...
    presmeruj('dekujeme.php');
}
```

---

# Ochrana proti CSRF

- CSRF: cizí stránka přiměje prohlížeč přihlášeného uživatele odeslat formulář na naši aplikaci.
- Obrana: formulář nese náhodný **token** uložený i v session. Server ověří, že se shodují. Session probereme později.
- `hash_equals()` porovná řetězce vždy stejně rychle, útočník z času odpovědi nepozná, kolik znaků uhodl.

```php
function csrfToken(): string {
    $_SESSION['csrfToken'] ??= bin2hex(random_bytes(32));   // vytvoří jen jednou
    return $_SESSION['csrfToken'];
}

function overCsrfToken(array $data): bool {
    $token = $data['csrfToken'] ?? '';
    return is_string($token) && hash_equals(csrfToken(), $token);
}
```

---
hideInToc: true
---

# CSRF token v praxi

```php
session_start();                           // na začátku souboru, před výstupem

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !overCsrfToken($_POST)) {
    http_response_code(403);
    exit('Neplatný token. Načtěte stránku a odešlete formulář znovu.');
}
```

```php
echo '<input type="hidden" name="csrfToken" value="' . csrfToken() . '">';
```

- Token patří do každého formuláře, který mění data.
- Atribut cookie `SameSite` v moderních prohlížečích CSRF ztěžuje. Je to doplněk, token nenahrazuje.

---
layout: cover
background: https://cover.sli.dev
hideInToc: true
---

# Nahrání souboru

---

# Nahrání souboru: formulář

- Formulář musí mít `method="post"` a `enctype="multipart/form-data"`, jinak se soubor neodešle.
- Soubor není v `$_POST`, ale v poli `$_FILES`. PHP ho uloží do dočasné složky a po skončení skriptu smaže.
- Soubor je potřeba zkontrolovat a přesunout na trvalé místo.

```php
echo '
    <form action="upload.php" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" accept="image/jpeg,image/png,image/webp">
        <button type="submit">Nahrát</button>
    </form>
';
```

- `accept` jen omezí nabídku v dialogu prohlížeče. Poslat jde cokoli.

---
hideInToc: true
---

# Pole `$_FILES`

| `$_FILES['avatar'][...]` | Obsah | Lze věřit? |
|---|---|---|
| `name` | původní název souboru (`foto.jpg`) | ne, posílá uživatel |
| `type` | MIME typ (`image/jpeg`) | ne, posílá uživatel |
| `tmp_name` | cesta k dočasné kopii na serveru | ano |
| `error` | kód chyby, `UPLOAD_ERR_OK` = v pořádku | ano |
| `size` | velikost v bajtech | ano |

- Soubor `virus.php` lze poslat s názvem `foto.jpg` i s typem `image/jpeg`.
- Skutečný typ se proto zjišťuje z **obsahu** souboru.

---
hideInToc: true
---

# Chyby a limity uploadu

| Konstanta `error` | Význam |
|---|---|
| `UPLOAD_ERR_OK` | soubor nahrán v pořádku |
| `UPLOAD_ERR_INI_SIZE` | soubor je větší než `upload_max_filesize` v `php.ini` |
| `UPLOAD_ERR_PARTIAL` | soubor nedorazil celý |
| `UPLOAD_ERR_NO_FILE` | uživatel žádný soubor nevybral |

- Je-li celý požadavek větší než `post_max_size`, PHP zahodí všechno: `$_POST` i `$_FILES` jsou prázdné. Projeví se to jako neplatný CSRF token.
- Limity serveru nastavuje `php.ini`. Vlastní menší limit hlídáme v kódu přes `size`.

---

# Kontrola obrázku: `overObrazek()`

```php
function overObrazek(?array $soubor, int $maxVelikost): ?string {
    if ($soubor === null || !is_int($soubor['error'] ?? null)) {
        return 'Vyberte jeden soubor.';              // chybí, nebo přišlo pole souborů
    }
    if ($soubor['error'] === UPLOAD_ERR_NO_FILE) {
        return 'Vyberte soubor.';
    }
    if ($soubor['error'] !== UPLOAD_ERR_OK) {
        return 'Soubor se nepodařilo nahrát.';
    }
    if ($soubor['size'] > $maxVelikost) {
        return 'Soubor je příliš velký.';
    }
    if (priponaObrazku($soubor['tmp_name']) === null) {
        return 'Povolené jsou jen obrázky JPG, PNG a WebP.';
    }
    return null;
}
```

- Stejný princip jako `overText()`: text chyby, nebo `null`.

---
hideInToc: true
---

# Uložení obrázku: `ulozObrazek()`

```php
// přípona podle skutečného obsahu, null = nepovolený typ
function priponaObrazku(string $cesta): ?string {
    $povolene = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
    $typ = mime_content_type($cesta);
    return $povolene[$typ] ?? null;
}

// uloží pod náhodným názvem, vrátí nový název (null = chyba)
function ulozObrazek(array $soubor, string $slozka): ?string {
    $nazev = bin2hex(random_bytes(16)) . '.' . priponaObrazku($soubor['tmp_name']);

    if (!move_uploaded_file($soubor['tmp_name'], $slozka . '/' . $nazev)) {
        return null;
    }
    return $nazev;
}
```

- Název i příponu určuje server. Z `foto.php` se nikdy nestane spustitelný skript a cizí soubor se nepřepíše.
- `move_uploaded_file()` přesune jen soubor, který opravdu přišel uploadem.

---

# Kam nahrané soubory ukládat

- Nejbezpečnější je složka **mimo** veřejnou část webu (mimo `htdocs`). Soubory pak vydává PHP skript.
- Ve veřejné složce `uploads/` aspoň zakážeme spouštění skriptů. Je to druhá pojistka, kdyby kontrola selhala:

```apache
# uploads/.htaccess
<FilesMatch "\.(php|phtml|phar)$">
    Require all denied
</FilesMatch>
```

- Původní název (`name`) lze uložit do databáze jako popisek, nikdy jako název souboru na disku.
- I vlastní název souboru se při výpisu ošetří:

```php
echo '<img src="uploads/' . escapuj($nazevAvataru) . '" alt="Avatar">';
```

---

# Celý příklad: registrace (1/3)

```php
<?php
// registrace.php
declare(strict_types=1);
require __DIR__ . '/formular.php';
session_start();

$chyby = [];
$jmeno = nactiText($_POST, 'jmeno');      // při prvním načtení (GET) je $_POST prázdné
$email = nactiText($_POST, 'email');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!overCsrfToken($_POST)) {
        http_response_code(403);
        exit('Neplatný token. Načtěte stránku a odešlete formulář znovu.');
    }
```

- Celé zpracování je nahoře, před výstupem. Jinak by `session_start()` a `presmeruj()` nefungovaly.
- Hodnoty se načtou vždy, aby šly vrátit do formuláře.

---
hideInToc: true
---

# Celý příklad: registrace (2/3)

```php {*}{startLine:16}
    $avatar = $_FILES['avatar'] ?? null;

    $chyby = array_filter([
        'jmeno' => overText($jmeno, 'jméno', 50),
        'email' => overEmail($email),
        'avatar' => overObrazek($avatar, 2 * 1024 * 1024),     // 2 MB
    ]);

    if ($chyby === []) {
        $nazevAvataru = ulozObrazek($avatar, __DIR__ . '/uploads');

        if ($nazevAvataru !== null) {
            // ... uložení jména, e-mailu a $nazevAvataru do databáze ...
            presmeruj('dekujeme.php');
        }
        $chyby['avatar'] = 'Soubor se nepodařilo uložit.';
    }
}
```

---
hideInToc: true
---

# Celý příklad: registrace (3/3)

```php {*}{startLine:34}
echo '
    <form action="registrace.php" method="post" enctype="multipart/form-data">
        <input type="hidden" name="csrfToken" value="' . csrfToken() . '">

        <label>Jméno: <input type="text" name="jmeno" maxlength="50" required
            value="' . escapuj($jmeno) . '"></label> ' . escapuj($chyby['jmeno'] ?? '') . '

        <label>E-mail: <input type="email" name="email" required
            value="' . escapuj($email) . '"></label> ' . escapuj($chyby['email'] ?? '') . '

        <label>Avatar: <input type="file" name="avatar" accept="image/jpeg,image/png,image/webp"></label>
        ' . escapuj($chyby['avatar'] ?? '') . '

        <button type="submit">Registrovat</button>
    </form>
';
```

---

# Bezpečnost formulářů

<div class="absolute right-40px top-40px max-w-120px">
  <img src="/vykricnik.png"/>
</div>

- Každý vstup je nedůvěryhodný: GET, POST, `$_FILES` i cookies.
- Na serveru ověřit typ, délku, formát a povolené hodnoty.
- Kontrola v prohlížeči (`required`, JavaScript) je pohodlí, ne ochrana. Dá se obejít.
- Výstup do HTML vždy přes `escapuj()` (XSS), hodnoty atributů v uvozovkách.
- Data měnit jen přes POST s CSRF tokenem, po úspěchu přesměrovat (PRG) na vlastní adresu.
- Soubory: kontrola chyby, velikosti a typu podle obsahu, náhodný název, zákaz PHP v `uploads`.
- Hesla jen přes POST a HTTPS, ukládat jako hash (`password_hash()`), nevracet je do `value`.
- Do SQL hodnoty nevkládat přímo, používat připravené dotazy (SQL Injection).
- Na produkčním serveru vypnout `display_errors`. Chybová hláška prozradí cesty a dotazy.

---

# Shrnutí: knihovna `formular.php`

```php
// načtení vstupu: vždy očekávaný typ, nikdy TypeError
nactiText(array $data, string $klic): string
nactiCislo(array $data, string $klic, int $min, int $max): ?int
nactiCheckbox(array $data, string $klic): bool
nactiVolbu(array $data, string $klic, array $povolene): ?string
nactiVolby(array $data, string $klic, array $povolene): array

// kontrola: text chyby, nebo null
overText(string $text, string $nazev, int $maxDelka): ?string
overEmail(string $email): ?string
overObrazek(?array $soubor, int $maxVelikost): ?string

// výstup, přesměrování, CSRF a uložení souboru
escapuj(string $text): string
presmeruj(string $adresa): never
csrfToken(): string
overCsrfToken(array $data): bool
ulozObrazek(array $soubor, string $slozka): ?string
```

---
src: '../../pages/thanku.md'
---
