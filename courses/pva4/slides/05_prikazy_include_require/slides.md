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
title: "Příkazy include a require"
exportFilename: "05_prikazy_include_require"
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

# Příkazy `include` a `require`

## Cíle hodiny
- Rozdělit stránku do více souborů a skládat ji pomocí `include` a `require`.
- Pochopit rozdíl mezi `include` a `require` a kdy použít `include_once` a `require_once`.
- Vědět, jaké proměnné vložený soubor „vidí“ a jak zapisovat cesty k souborům.
- Osvojit si princip modularity a opakovaného využití kódu.

---

# Proč rozdělovat kód do souborů?

- Web má tři stránky: `index.php`, `o-nas.php` a `kontakt.php`.
- Každá stránka obsahuje stejnou hlavičku, menu a patičku.

```php
<!-- index.php, o-nas.php i kontakt.php začínají stejně -->
<header><h1>OA Opava</h1></header>
<nav>
  <a href="index.php">Úvod</a> | <a href="o-nas.php">O nás</a> | <a href="kontakt.php">Kontakt</a>
</nav>
```

<v-click>

- Přidáte do menu odkaz? Musíte upravit **všechny** stránky – a na jednu určitě zapomenete.
- Řešení: menu je v **jednom** souboru a každá stránka si ho vloží.

```php
<?php include 'menu.php'; ?>
```

</v-click>

---

# Include a Require

- Příkazy `include` a `require` vloží obsah jiného souboru do aktuálního skriptu a vykonají ho.
- Výsledek je stejný, jako kdybyste obsah souboru zkopírovali na místo, kde je příkaz uveden.
- Typické použití:
  - HTML hlavička, menu, patička
  - konfigurace (název webu, nastavení)
  - vlastní funkce <span class="opacity-60">(probereme v hodině o funkcích)</span>
  - připojení k databázi <span class="opacity-60">(probereme v části Databáze)</span>

---

# Syntaxe

```php
<?php
include 'cesta/k/souboru.php';
include_once 'cesta/k/souboru.php';

require 'cesta/k/souboru.php';
require_once 'cesta/k/souboru.php';
```

- `include` a `require` nejsou funkce, ale **jazykové konstrukce** – závorky nejsou potřeba.
- Zápis `include('soubor.php');` funguje také, ale běžně se píše bez závorek.
- Vkládaný soubor je obyčejný PHP soubor – může obsahovat HTML i PHP kód.

---

# `include`

- `include` vloží a vykoná kód z uvedeného souboru.
- Pokud soubor neexistuje, PHP vypíše **varování** (Warning) a skript **pokračuje**.
- Používá se pro části, bez kterých stránka může fungovat – šablony (hlavička, menu, patička).

```php
<?php include 'templates/header.php'; ?>

<h2>Vítejte na našem webu</h2>
<p>Obsah úvodní stránky.</p>

<?php include 'templates/footer.php'; ?>
```

## `include_once`
- Stejné jako `include`, ale soubor vloží **jen jednou** – pokud už byl vložen dříve, další pokus se přeskočí.

---

# `require`

- `require` vloží a vykoná kód z uvedeného souboru.
- Pokud soubor neexistuje, PHP vypíše **fatální chybu** (Fatal error) a skript se **zastaví**.
- Používá se pro soubory, bez kterých skript nedává smysl – konfigurace, funkce, připojení k databázi.

```php
<?php
require 'config.php';

echo 'Vítejte na webu ' . $nazevWebu;
```

## `require_once`
- Stejné jako `require`, ale soubor vloží **jen jednou**.
- Hodí se pro soubory, které se nesmí načíst dvakrát (např. soubor s funkcemi – dvojí definice funkce je chyba).

---
layout: two-cols-header
---

# Vložený soubor vidí proměnné

::left::

- Vložený kód sdílí proměnné se skriptem, do kterého je vložen.
- Proměnnou nastavíte **před** `include` a vložený soubor ji použije.
- Funguje to i opačně – proměnná vytvořená ve vloženém souboru je dostupná po `include`.

`templates/header.php`

```php
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title><?php echo $titulek; ?></title>
</head>
<body>
  <h1><?php echo $titulek; ?></h1>
```

::right::

`kontakt.php`

```php
<?php
$titulek = 'Kontakt';
include 'templates/header.php';
?>

<p>Napište nám na info@oa-opava.cz</p>

<?php include 'templates/footer.php'; ?>
```

<v-click>

- Každá stránka si nastaví vlastní `$titulek`, hlavička je ale jen v **jednom** souboru.

</v-click>

---
layout: two-cols-header
---

# Vložený soubor může vrátit hodnotu

- Vložený soubor může příkazem `return` vrátit hodnotu – typicky pole s konfigurací.
- Hodnotu uložíte do proměnné: `$promenna = require 'soubor.php';`

::left::

`config.php`

```php
<?php
return [
    'nazev' => 'OA Opava',
    'email' => 'info@oa-opava.cz',
    'rok'   => 2026,
];
```

::right::

`index.php`

```php
<?php
$config = require 'config.php';

echo $config['nazev'];  // OA Opava
echo $config['email'];  // info@oa-opava.cz
```

<v-click>

- Je vidět, odkud proměnná `$config` pochází, a nepřepíše omylem jinou proměnnou.

</v-click>

---

# Cesty k souborům

- Relativní cesta se počítá od složky **spuštěného** skriptu (např. `index.php`), ne od souboru, ve kterém je `include` napsán.
- Při vkládání ze složek do složek se proto cesty snadno rozbijí.

<v-click>

- Spolehlivé řešení: konstanta `__DIR__` obsahuje složku **aktuálního souboru**.

```php
<?php
// templates/header.php – vloží menu.php ze stejné složky
include __DIR__ . '/menu.php';

// index.php – vloží config.php ze složky includes
$config = require __DIR__ . '/includes/config.php';
```

- Cesty pište s lomítkem `/` – funguje na Windows i Linuxu.

</v-click>

---
layout: two-cols-header
---

# Modulární struktura projektu

::left::

## Základní struktura
```
/projekt
  /includes
    config.php
    functions.php
  /templates
    header.php
    menu.php
    footer.php
  index.php
  o-nas.php
  kontakt.php
```

::right::

## Každá stránka

```php
<?php
$config = require __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

$titulek = 'O nás';
include __DIR__ . '/templates/header.php';
include __DIR__ . '/templates/menu.php';
?>

<p>Obsah stránky O nás.</p>

<?php include __DIR__ . '/templates/footer.php'; ?>
```

<v-click>

- Opakující se začátek lze přesunout do jednoho souboru (např. `common.php`) a vkládat jen ten.

</v-click>

---

# Uzavírací značka `?>`

- Soubor, který obsahuje **jen PHP kód** (konfigurace, funkce), se **neukončuje** značkou `?>`.
- Mezera nebo prázdný řádek za `?>` by se odeslal do prohlížeče jako výstup.
- To později způsobí chybu při práci s hlavičkami a sessions (`headers already sent`).

```php
<?php
// includes/config.php – bez ?> na konci
return [
    'nazev' => 'OA Opava',
];
```

- Šablony (`header.php`, `footer.php`) obsahují HTML, tam se `?>` používá normálně.

---

# Porovnání chybového chování

| Příkaz          | Pokud soubor neexistuje                | Opakované vložení |
|-----------------|----------------------------------------|-------------------|
| `include`       | Warning – skript pokračuje             | Ano               |
| `require`       | Fatal error – skript se zastaví        | Ano               |
| `include_once`  | Warning – skript pokračuje             | Ne                |
| `require_once`  | Fatal error – skript se zastaví        | Ne                |

<v-click>

```
Warning: include(menu.php): Failed to open stream: No such file or directory in /var/www/index.php on line 3

Fatal error: Uncaught Error: Failed opening required 'config.php' in /var/www/index.php on line 2
```

</v-click>

---
hideInToc: true
---

# Co vypíše? – proměnné a `_once`

`pozdrav.php`

```php
<?php
echo 'Ahoj, ' . $jmeno . '!<br>';
```

`index.php`

```php
<?php
$jmeno = 'Eva';
include 'pozdrav.php';
$jmeno = 'Petr';
include 'pozdrav.php';
include_once 'pozdrav.php';
```

<v-click>

```
Ahoj, Eva!
Ahoj, Petr!
```

- `include_once` soubor nevloží – už byl jednou vložen (nezáleží na tom, zda přes `include` nebo `include_once`).

</v-click>

---
hideInToc: true
---

# Co vypíše? – chybějící soubor

```php
<?php
echo 'Začátek<br>';
include 'neexistuje.php';
echo 'Prostředek<br>';
require 'neexistuje.php';
echo 'Konec<br>';
```

<v-click>

```
Začátek
Warning: include(neexistuje.php): Failed to open stream ...
Prostředek
Warning: require(neexistuje.php): Failed to open stream ...
Fatal error: Uncaught Error: Failed opening required 'neexistuje.php' ...
```

- `Konec` se nevypíše – `require` skript zastavil.

</v-click>

---

# Časté chyby

| Chyba | Co se stane | Správně |
|-------|-------------|---------|
| Proměnná nastavená až **po** `include` | Warning: Undefined variable | Nastavit `$titulek` před `include` |
| Relativní cesta ve vnořené složce | Failed to open stream | `__DIR__ . '/soubor.php'` |
| `require` místo `require_once` u souboru s funkcemi | Fatal error: Cannot redeclare | `require_once` |
| `?>` a prázdný řádek na konci `config.php` | Nechtěný výstup, později `headers already sent` | Vynechat `?>` |
| `include` u nezbytné konfigurace | Skript běží dál s chybějícími daty | `require` |

---

# Cvičení – web se společnou šablonou

Vytvořte web o třech stránkách `index.php`, `o-nas.php`, `kontakt.php`.

1. Vytvořte `includes/config.php`, který vrátí pole s klíči `nazev`, `email` a `rok`.
2. Vytvořte `templates/header.php` – HTML hlavička, v `<title>` a `<h1>` vypíše proměnnou `$titulek`.
3. Vytvořte `templates/menu.php` s odkazy na všechny tři stránky.
4. Vytvořte `templates/footer.php` – vypíše `© rok název` a e-mail z konfigurace.
5. Každá stránka načte konfiguraci přes `require`, nastaví `$titulek` a vloží šablony přes `include`.
6. Přidejte do menu čtvrtý odkaz – stačí upravit **jeden** soubor.

<v-click>

**Bonus:** Přejmenujte `menu.php` a pak `config.php` a porovnejte, co se stane. Vysvětlete rozdíl.

</v-click>

---

# Shrnutí

- `include` a `require` vloží obsah jiného souboru – kód se píše jen jednou a používá se opakovaně.
- Chybějící soubor: `include` → Warning, skript pokračuje; `require` → Fatal error, skript se zastaví.
- `include_once` a `require_once` vloží soubor jen jednou.
- Vložený soubor sdílí proměnné se skriptem a může vrátit hodnotu pomocí `return`.
- Pro spolehlivé cesty používejte `__DIR__`.

## Používejte

- `require` / `require_once` pro nezbytné soubory – konfigurace, funkce, připojení k databázi.
- `include` pro šablony – hlavička, menu, patička.
- Soubory obsahující jen PHP kód neukončujte značkou `?>`.

---
src: '../../pages/thanku.md'
---
