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
title: "Příkazy Inlcude a Require"
exportFilename: "06_prikazy_include_require"
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
- Pochopit rozdíl mezi `include` a `require`.
- Naučit se, kdy použít `include_once` a `require_once`.
- Osvojit si princip modularity a opakovaného využití kódu.

---

# Include a Require

- Příkazy include a require umožňují zahrnout kód obsažený v souboru do jiného souboru PHP.
- Začlenění má stejný výsledek jako zkopírování skriptu z uvedeného souboru a jeho vložení do místa, kde je vyvolán.
- Typické příklady v non OOP: 
  - Html header, footer, menu
  - Funkce aplikace
  - Konfigurace
  - Připojení k databázi

---

# Syntaxe

```php
<?php

  include("path/to/filename.php");
  include_once("path/to/filename.php");

  require("path/to/filename.php");
  require_once("path/to/filename.php");
  
?>
```

---

# `include`

- `include` zahrne a vykoná kód z uvedeného souboru.
- Pokud PHP nemůže najít soubor, skript pokračuje, tzn.
- `include` je užitečné, pokud chcete zahrnout kód, ale nevíte, zda bude soubor k dispozici.
- používá se pro šablony, referenční proměnné z aktuálního scope

## `include_once`
- stejný jak include, ale zahrne soubor jen jednou
- nepovinné závislosti, které by při následném načítání způsobily chyby, nebo třeba vzdálené začlenění souboru, které nechcete, aby se kvůli režii HTTP odehrálo dvakrát.

```php
include_once("htmlHead.php");
// ...  
include_once("menu.php");
// ...
include_once("footer.php");
```

---

# `require`

- `require` zahrne a vykoná kód z uvedeného souboru.
- Pokud PHP nemůže najít soubor, skript se zastaví a zobrazí se chyba.
- `require` je užitečné, pokud chcete zahrnout kód, který je nezbytný pro běh skriptu.
- používá se pro funkce, knihovny, třídy, konfigurace

## `require_once`
- stejný jak require, ale zahrne soubor jen jednou

```php
<?php
  require_once("config.php");
  require_once("mojeFunkce.php");
  require_once("classes/MyClass.php");
  require_once("common.php");
  
?>
```

---
layout: two-cols-header
---

# Modulární struktura projektu

::left::

## Základní struktura
```
/project
  /includes
    config.php
    db.php
    functions.php
  /templates
    header.php
    footer.php
    menu.php
  index.php
  about.php
```



```php
<?php
    require_once("includes/config.php");
    require_once("includes/db.php");
    require_once("includes/functions.php");
    include_once("templates/header.php");
    include_once("templates/menu.php");
    //...
?>
```

::right::

<v-click>

## Běžnější struktura

Nebo lépe, do každho scriptu přidáte volání `common.php`

```php
<?php
    require_once("common.php");
?>
```

Obsah `common.php`

```php
<?php
    require_once("includes/config.php");
    require_once("includes/db.php");
    require_once("includes/functions.php");
    include_once("templates/header.php");
    include_once("templates/menu.php");
?>
```

</v-click>


---

# Porovnání chybového chování

| Funkce          | Pokud soubor neexistuje             | Opakované načtení |
|-----------------|-------------------------------------|-------------------|
| `include`       | E_WARNING – skript pokračuje        | Ano               |
| `require`       | E_COMPILE_ERROR – skript se zastaví | Ano               |
| `include_once`  | E_WARNING – skript pokračuje        | Ne                |
| `require_once`  | E_COMPILE_ERROR – skript se zastaví | Ne                |


---

# Shrnutí

- `include` a `require` jsou téměř identické, s výjimkou toho, že `require` způsobí fatální chybu (E_COMPILE_ERROR) a skript se zastaví, pokud soubor není nalezen.
- `include` způsobí jen varování (E_WARNING) a skript pokračuje.
- `include_once` a `require_once` zamezí opakovanému zahrnutí souboru.
- `include_once` a `require_once` jsou užitečné, pokud máte skript, který může zahrnovat stejný soubor vícekrát.
- `include_once` a `require_once` zamezí opakovanému zahrnutí souboru.

## Používejte

- `require` pro závislosti, bez kterých skript nedává smysl (např. config, třídy).
- `include` pro volitelné části (např. šablony).
-  `*_once` varianty, pokud soubor může být zahrnut vícekrát.

---
src: '../../pages/thanku.md'
---