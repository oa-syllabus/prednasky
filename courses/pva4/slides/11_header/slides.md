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
title: "11 header"
exportFilename: "11_header"
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

# Úvod

- Pochopit, k čemu slouží funkce `header()` v PHP
- Naučit se přesměrování pomocí `header("Location: ...")`
- Umět nastavit HTTP hlavičky (např. `Content-Type`)
- Uvědomit si, kdy se funkce může chovat neočekávaně



---

# Funkce `header()`

- Funkce `header()` slouží k odesílání HTTP hlaviček klientovi (prohlížeči).
- Používá se například pro:
    - Přesměrování stránky
    - Nastavení typu obsahu
    - Odeslání status kódu

```php
header(string $header, bool $replace = true, int $http_response_code = 0);
```

---

# Důležité upozornění

- Funkce `header()` **musí být volána před jakýmkoliv výstupem do prohlížeče**
    - Žádné `echo`, HTML nebo prázdný řádek předtím!

```php
<?php
header("Location: https://example.com");
exit;
?>
```

---

# Přesměrování

- Nejčastější použití `header()` je pro přesměrování na jinou URL. Například při přihlášení uživatele.

```php
<?php
// Po zpracování formuláře přesměrování na jinou stránku
header("Location: success.php");
exit;
?>
```

> `exit;` je důležitý – skript by neměl pokračovat po přesměrování.

---

# Nastavení typu obsahu

- Pomocí `header()` můžeme nastavit typ obsahu, který server odesílá klientovi.
- To je užitečné například při odesílání JSON dat nebo obrázků.

```php
<?php
// Posíláme JSON
header("Content-Type: application/json");
echo json_encode(["ok" => true]);
?>
```

## Odeslání HTTP status kódu

```php
<?php
// Vrácení chyby 404
header("HTTP/1.1 404 Not Found");
?>
<h1>Stránka nenalezena</h1>
```

---

# Časté chyby

- Výstup před `header()` způsobí **chybu: "headers already sent"**
- Řešení:
    - Používat `ob_start()` na začátku skriptu (výstupní buffer)
    - Ujistit se, že žádný HTML ani prázdný řádek není před `<?php`

---

# Příklad použití

```php
<?php
declare(strict_types=1);
session_start();

// Fiktivní kontrola přihlašovacích údajů
$username = htmlspecialchars($_POST['username']) ?? '';
$password = htmlspecialchars($_POST['password']) ?? '';

// Např. ověření "napevno"
if ($username === 'admin' && $password === 'heslo123') {
    $_SESSION['user'] = $username;

    // Přesměrování na chráněnou stránku
    header("Location: dashboard.php");
    exit;
} else {
    // Přesměrování zpět s chybovou hláškou
    header("Location: login.php?error=1");
    exit;
}
?>
```

- ✅ Úspěšné přihlášení → přesměrování na `dashboard.php`
- ❌ Neúspěšné přihlášení → zpět na login s parametrem `?error=1`

---

# Shrnutí

- `header()` slouží k posílání HTTP hlaviček
- Použití:
    - `Location` – přesměrování
    - `Content-Type` – nastavení typu dat
    - `HTTP status code` – změna návratového kódu
- Musí být volána **před výstupem**

---
src: '../../pages/thanku.md'
---