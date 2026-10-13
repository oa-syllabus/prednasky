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
title: "Řídicí struktury"
exportFilename: "06_ridici_struktury"
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

Řídicí struktury určují, **které** příkazy se provedou a **kolikrát**.

- Podmínky
  - `if`, `elseif`, `else`
  - `switch`, `match`
- Cykly
  - `for`, `foreach`, `while`, `do...while`
  - `break`, `continue`
- Funkce
  - definice, parametry, návratová hodnota
  - `declare(strict_types=1)`, rozsah platnosti proměnných, rekurze

---
layout: cover
background: https://cover.sli.dev
---

# Podmínky

---

# Podmínky

- Podmínku tvoří klíčové slovo `if` a výraz v kulatých závorkách.
- Složené závorky `{}` (<kbd>AltGr</kbd> + <kbd>B</kbd> / <kbd>N</kbd>) obsahují příkazy, které se provedou, je-li podmínka splněna.

```php
if (podmínka) {
    // příkazy
}
```

- Složené závorky jde u jednoho příkazu vynechat, ale **vždy je píšeme**. Druhý přidaný řádek by se jinak provedl vždy.

```php
if ($a > $b)
    echo 'a je větší než b';
    echo 'Tohle se vypíše vždy!';     // není součástí podmínky
```

**Ternární operátor** - zkrácený zápis `podmínka ? hodnotaTrue : hodnotaFalse`

```php
echo ($a > $b) ? 'a je větší než b' : 'a není větší než b';
```

---

# Porovnávací operátory

Opakování z přednášky o datových typech.

| Operátor | Význam |
|---|---|
| `$a == $b` | stejná hodnota (po případném převodu typu) |
| `$a === $b` | stejná hodnota **a** stejný datový typ |
| `$a != $b`, `$a <> $b` | různá hodnota |
| `$a !== $b` | různá hodnota **nebo** datový typ |
| `$a > $b`, `$a < $b` | větší, menší |
| `$a >= $b`, `$a <= $b` | větší nebo rovno, menší nebo rovno |

---

# Logické operátory

- `!$a` - negace, pravda, pokud `$a` není pravdivé
- `$a && $b` (<kbd>AltGr</kbd> + <kbd>C</kbd>) - AND, pravda, pokud jsou pravdivé oba
- `$a || $b` (<kbd>AltGr</kbd> + <kbd>W</kbd>) - OR, pravda, pokud je pravdivý aspoň jeden
- `$a xor $b` - pravda, pokud je pravdivý právě jeden
- `$a and $b`, `$a or $b` - slovní varianty `&&` a `||`. Nepoužíváme, proč ukazuje další slide.

Operátory pro výchozí hodnotu:

- `$a ?? $b` - vrátí `$a`, pokud existuje a není `null`, jinak `$b`. Chybějící klíč pole nevyvolá varování.
- `$a ?: $b` - zkrácený ternární operátor, vrátí `$a`, pokud je pravdivé, jinak `$b`.

```php
$jmeno = $_GET['jmeno'] ?? 'host';    // parametr chybí → 'host'
$popis = $text ?: 'bez popisu';       // '' nebo '0' → 'bez popisu'
```

---

# Proč ne `and` a `or`?

- PHP má pro AND a OR dva zápisy: `&&` / `and` a `||` / `or`. V podmínce `if` fungují stejně.
- Liší se tím, **co se provede dřív**. Jako v matematice: v `2 + 3 * 4` se nejdřív násobí.
- `&&` se provede **před** přiřazením `=`. `and` se provede až **po** něm.

```php
$maVstupenku = true;
$jePlnolety = false;

$muzeVstoupit = $maVstupenku && $jePlnolety;    // nejdřív &&, pak uložení
$muzeVstoupit2 = $maVstupenku and $jePlnolety;  // nejdřív uložení, pak and
```

Co obsahují proměnné?

<v-click>

```
$muzeVstoupit  = false    ✔ nezletilý neprojde
$muzeVstoupit2 = true     ✘ do proměnné se uložila jen $maVstupenku
```

**Pravidlo: vždy píšeme `&&` a `||`.**

</v-click>

---

# Pozor na `==`

`==` před porovnáním převádí typy. Výsledek není vždy intuitivní (platí pro PHP 8).

| Výraz | Výsledek |
|---|---|
| `5 == "5"` | `true` |
| `"1" == "01"` | `true` (oba řetězce jsou čísla) |
| `100 == "1e2"` | `true` |
| `"abc" == 0` | `false` (v PHP 7 bylo `true`) |
| `null == false` | `true` |
| `"0" == false` | `true` |
| `"" == null` | `true` |
| `5 === "5"` | `false` |

- Výchozí volba je `===`. `==` používáme vědomě, když chceme porovnat čísla bez ohledu na typ.

---

# Skládání podmínek

```php
$role = 'admin';

if ($role === 'admin' || $role === 'editor') {
    // stačí, aby platila alespoň jedna podmínka
    echo 'Může upravovat obsah.';
}
```

```php
$vek = 17;
$souhlasRodicu = true;

if ($vek >= 15 && $souhlasRodicu) {
    // musí platit všechny podmínky
    echo 'Může se registrovat.';
}
```

- Delší výčet hodnot jde zapsat přes `in_array()`:

```php
if (in_array($role, ['admin', 'editor'], true)) {     // true = porovnání přes ===
    echo 'Může upravovat obsah.';
}
```

---

# Dlouhé podmínky

- Delší podmínku rozdělíme na více řádků: **co podmínka, to řádek**.
- Logický operátor patří na začátek řádku. Je hned vidět, jak se podmínky spojují.
- Kombinaci `&&` a `||` vždy uzávorkujeme. `&&` má vyšší prioritu než `||`, závorky to dávají najevo.

```php
if (
    $vek >= 15
    && $souhlasRodicu
    && $email !== ''
    && !$jeZablokovany
) {
    echo 'Může se registrovat.';
}
```

```php
if (
    $role === 'admin'
    || ($role === 'editor' && $jeAutorem)
) {
    echo 'Může článek upravit.';
}
```

---

# Pojmenované podmínky

- Část podmínky lze uložit do proměnné s výstižným názvem.
- Podmínka se pak čte jako věta a jednotlivé části jde vypsat při ladění.

```php
$jePlnolety = $vek >= 18;
$maSouhlas = $jePlnolety || $souhlasRodicu;
$maVyplnenyEmail = $email !== '';

if ($maSouhlas && $maVyplnenyEmail && !$jeZablokovany) {
    echo 'Může se registrovat.';
}
```

---

# Větvení podmínek `else`, `elseif`

```php
if (podmínka) {
    // příkazy
} elseif (jinaPodmínka) {
    // příkazy
} else {
    // příkazy
}
```

```php
if ($cislo > 0) {
    echo $cislo . ' je kladné';
} elseif ($cislo < 0) {
    // provede se, pokud první podmínka neplatí a platí tato
    echo $cislo . ' je záporné';
} else {
    // provede se, pokud neplatí žádná z podmínek
    echo $cislo . ' je nula';
}
```

- Podmínky se vyhodnocují shora dolů a provede se **jen první** splněná větev.

---

# Co vypíše? - pořadí podmínek

```php
$body = 92;

if ($body >= 50) {
    echo 'Dostatečně';
} elseif ($body >= 70) {
    echo 'Dobře';
} elseif ($body >= 90) {
    echo 'Výborně';
}
```

<v-click>

```
Dostatečně
```

První splněná podmínka ukončí celé větvení. Podmínky musí jít od nejpřísnější: nejdřív `>= 90`, pak `>= 70`, nakonec `>= 50`.

</v-click>

---

# `switch`

- Porovná jednu hodnotu s výčtem možností v `case`.
- `break` ukončí `switch`. **Bez `break` pokračuje provádění do dalšího `case`.**
- `default` je volitelný blok, provede se, pokud nesedí žádný `case`.
- Porovnává přes `==`, tedy s převodem typů.

```php
$den = 'pondělí';

switch ($den) {
    case 'sobota':
    case 'neděle':
        echo 'Víkend.';         // společná větev pro dva případy
        break;
    case 'pondělí':
        echo 'Začíná týden.';
        break;
    default:
        echo 'Běžný pracovní den.';
}
```

---

# Co vypíše? - zapomenutý `break`

```php
$znamka = 2;

switch ($znamka) {
    case 1:
        echo 'Výborně ';
    case 2:
        echo 'Chvalitebně ';
    case 3:
        echo 'Dobře ';
        break;
    default:
        echo 'Jiná známka';
}
```

<v-click>

```
Chvalitebně Dobře
```

Bez `break` se po nalezeném `case` provádí i následující větve až do nejbližšího `break`.

</v-click>

---

# `match` <span class="text-sm opacity-60">PHP 8</span>

- Výraz, který **vrací hodnotu** podle porovnávané hodnoty.
- Porovnává přes `===`, nepotřebuje `break`, nepropadá do dalších větví.
- Pokud nesedí žádná větev a chybí `default`, vyhodí chybu `UnhandledMatchError`.

```php
$znamka = 2;

$slovne = match ($znamka) {
    1 => 'Výborně',
    2 => 'Chvalitebně',
    3 => 'Dobře',
    4, 5 => 'Slabý výsledek',       // více hodnot v jedné větvi
    default => 'Neplatná známka',
};

echo $slovne;       // Chvalitebně
```

- Pro přiřazení hodnoty podle výčtu je `match` přehlednější než `switch`.

---
layout: cover
background: https://cover.sli.dev
---

# Cykly

---

# Cyklus `for`

- Používá se, když předem známe počet opakování.
- Hlavička má tři části oddělené středníkem:
  - inicializace čítače (provede se jednou na začátku)
  - podmínka (testuje se před každým průchodem)
  - změna čítače (provede se po každém průchodu)

```php
// for (inicializace; podmínka; změna čítače)
for ($i = 1; $i <= 5; $i++) {
    echo $i . ' ';
}
// Výstup: 1 2 3 4 5
```

```php
$barvy = ['red', 'green', 'blue'];

for ($i = 0; $i < count($barvy); $i++) {     // indexy pole začínají od 0
    echo $barvy[$i] . '<br>';
}
```

---

# Cyklus `foreach`

- Projde postupně všechny prvky pole. Počet opakování určuje velikost pole.
- V každém průchodu obsahuje proměnná `$hodnota` aktuální prvek.

```php
foreach ($pole as $hodnota) {
    // příkazy
}
```

```php
$barvy = ['red', 'green', 'blue', 'yellow'];

foreach ($barvy as $barva) {
    echo $barva . '<br>';
}
```

- Pro procházení pole je `foreach` přehlednější než `for`, nepotřebuje čítač ani `count()`.

---

# Cyklus `foreach` s klíčem

- `as $klic => $hodnota` - získáme klíč i hodnotu.
- Hodí se hlavně pro asociativní pole.

```php
$osoba = [
    'jmeno' => 'Jan',
    'prijmeni' => 'Novák',
    'vek' => 17,
];

foreach ($osoba as $klic => $hodnota) {
    echo $klic . ': ' . $hodnota . '<br>';
}
```

```
jmeno: Jan
prijmeni: Novák
vek: 17
```

---

# Cyklus `while`

- Podmínka se vyhodnocuje **před** každým průchodem.
- Je-li `true`, cyklus se opakuje. Je-li `false`, cyklus skončí.
- Používá se, když předem neznáme počet opakování.
- Pozor na zacyklení: uvnitř se musí měnit něco, na čem podmínka závisí.

```php
while (podmínka) {
    // příkazy
}
```

```php
$i = 1;

while ($i <= 10) {
    echo $i . '<br>';
    $i++;           // bez této změny by cyklus nikdy neskončil
}
```

---

# Cyklus `do...while`

- Podmínka se vyhodnocuje **po** každém průchodu.
- Tělo cyklu se provede alespoň jednou, i když podmínka neplatí.

```php
do {
    // příkazy
} while (podmínka);
```

```php
$i = 20;

do {
    echo $i . '<br>';
    $i++;
} while ($i <= 10);

// Výstup: 20, i když podmínka neplatí už na začátku
```

---

# `break` a `continue`

- `break` - okamžitě ukončí celý cyklus.
- `continue` - přeskočí zbytek aktuálního průchodu a pokračuje dalším.

```php
$cisla = [4, 8, -1, 15, 16];

foreach ($cisla as $cislo) {
    if ($cislo < 0) {
        continue;       // záporná čísla přeskočíme
    }
    if ($cislo > 10) {
        break;          // první číslo větší než 10 ukončí cyklus
    }
    echo $cislo . ' ';
}
// Výstup: 4 8
```

---

# Co vypíše? - `break` a `continue`

```php
for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 === 0) {
        continue;
    }
    if ($i > 7) {
        break;
    }
    echo $i . ' ';
}
```

<v-click>

```
1 3 5 7
```

Sudá čísla přeskočí `continue`. Číslo 9 je první liché větší než 7, proto `break` cyklus ukončí.

</v-click>

---
layout: cover
background: https://cover.sli.dev
---

# Funkce

---

# Funkce

- Funkce je pojmenovaný blok kódu, který lze opakovaně volat.
- Může přijímat parametry a vracet hodnotu.
- Funkce, která nic nevrací, má návratový typ `void` (v jiných jazycích se jí říká procedura).

## Vestavěné funkce

- PHP obsahuje přes 1000 vestavěných funkcí, např. `strlen()`, `count()`, `in_array()`, `round()`.
- Přehled a dokumentace jsou na [php.net](https://www.php.net/manual/en/funcref.php).

---

# Uživatelsky definované funkce

- Definují se klíčovým slovem `function`.
- Nespustí se, dokud je nezavoláme.
- Název začíná písmenem nebo podtržítkem, píšeme ho v camelCase.
- Hodnotu vrací příkaz `return`, který zároveň funkci ukončí.
- Datový typ návratové hodnoty je za dvojtečkou.
- Může-li funkce vrátit i `null`, zapíše se typ jako `?string` nebo `string|null`.

```php
function nazevFunkce(): datovyTyp {
    // příkazy

    return $vysledek;
}
```

---

# Volání funkce

- Funkci zavoláme jejím názvem a kulatými závorkami.
- Parametry se uvádějí do závorek.

```php
nazevFunkce();
```

```php
function pozdrav(): string {
    return 'Ahoj!';
}

echo pozdrav();     // Ahoj!
```

```php
function vypisOddelovac(): void {
    echo '<hr>';    // nic nevrací, jen vypisuje
}

vypisOddelovac();
```

---

# Parametry funkce

- Parametry se uvádějí v závorkách, oddělené čárkou: `datovyTyp $nazev`.
- Uvnitř funkce se chovají jako lokální proměnné.
- Výchozí hodnota se zapíše za `=`. Parametr s výchozí hodnotou je nepovinný a patří na konec.
- Výchozí hodnota `null` vyžaduje typ, který `null` připouští (`?int`).

```php
function nazevFunkce(string $povinny, ?int $nepovinny = null): string {
    // příkazy
}
```

---

# Rozsah platnosti proměnných

- Funkce **nevidí** proměnné definované mimo ni. Vše potřebné jí předáme parametrem.
- Proměnné vytvořené ve funkci po jejím skončení zaniknou.

```php
$sazbaDph = 21;

function cenaSDph(float $cena): float {
    return $cena * (1 + $sazbaDph / 100);   // Warning: Undefined variable $sazbaDph
}
```

```php
function cenaSDph(float $cena, int $sazbaDph): float {
    return $cena * (1 + $sazbaDph / 100);
}

echo cenaSDph(100, 21);     // 121
```

---

# Strict types

- PHP je dynamicky typovaný jazyk. Bez nastavení převádí hodnoty parametrů na požadovaný typ: `"5"` předané do `int` se změní na `5`.
- Tichý převod může skrýt chybu.
- `declare(strict_types=1);` převod zakáže. Hodnota jiného typu vyvolá chybu `TypeError`.
- Musí být **prvním příkazem** souboru, hned za `<?php`, a platí jen pro daný soubor.

```php
<?php
declare(strict_types=1);

function dvojnasobek(int $cislo): int {
    return $cislo * 2;
}

echo dvojnasobek(5);       // 10
echo dvojnasobek('5');     // TypeError, bez strict_types by vrátilo 10
```

> **Od nynějška povinně používáme.**

---

# Příklad

```php
<?php
declare(strict_types=1);

function napisZpravu(string $jmeno, string $zprava = 'nic nenapsal'): string {
    return $jmeno . ' napsal: ' . $zprava;
}
```

```php
echo napisZpravu('Honza', 'První zpráva');      // Honza napsal: První zpráva
echo napisZpravu('Ilona', 'Jiná zpráva');       // Ilona napsal: Jiná zpráva
echo napisZpravu('Petr');                       // Petr napsal: nic nenapsal
```

---
layout: two-cols-header
---

# Rekurze

- Rekurze je technika, kdy funkce volá sama sebe.
- Hodí se pro problémy, které lze rozdělit na menší podobné podproblémy.
- Každé volání má vlastní parametry a proměnné.
- Musí obsahovat podmínku ukončení, jinak se volá donekonečna.

::left::
```php
function rekurzivniFunkce($parametr) {
    if (podmínkaUkončení) {
        return vysledek;
    }

    // příkazy
    return rekurzivniFunkce(novýParametr);
}
```
::right::
```php
function faktorial(int $n): int {
    if ($n <= 1) {
        return 1;
    }

    return $n * faktorial($n - 1);
}

echo faktorial(5);  // 120
```

---

# Shrnutí

- Řídicí struktury určují tok programu: co se provede a kolikrát.
- Podmínky: `if`, `elseif`, `else`. Provede se jen první splněná větev.
- `switch` porovnává přes `==` a potřebuje `break`. `match` porovnává přes `===` a vrací hodnotu.
- Pro porovnání volíme `===`, `==` jen vědomě.
- Cykly: `for` (známý počet), `foreach` (pole), `while` a `do...while` (neznámý počet). `break` cyklus ukončí, `continue` přeskočí průchod.
- Funkce: typované parametry a návratová hodnota. Vnější proměnné nevidí, data dostávají parametrem.
- `declare(strict_types=1);` na začátku každého souboru.

---
src: '../../pages/thanku.md'
---
