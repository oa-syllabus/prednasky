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
title: "Funkce"
exportFilename: "07_funkce"
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
function celeJmeno(string $jmeno, string $prijmeni): string {
    return $jmeno . ' ' . $prijmeni;
}

echo celeJmeno('Jan', 'Novák');                 // výsledek vypíšeme
$autor = celeJmeno('Eva', 'Malá');              // nebo uložíme a použijeme dál
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
layout: two-cols-header
---

# Strict types

- Bez nastavení PHP hodnotu parametru **potichu převede** na typ z hlavičky funkce.
- `declare(strict_types=1);` převod zakáže, jiný typ skončí chybou `TypeError`.

::left::

```php
<?php
declare(strict_types=1);

function dvojnasobek(int $cislo): int {
    return $cislo * 2;
}
```

::right::

| Volání | Bez | Se strict |
|---|---|---|
| `dvojnasobek(5)` | `10` | `10` |
| `dvojnasobek('5')` | `10` | `TypeError` |
| `dvojnasobek(true)` | `2` | `TypeError` |
| `dvojnasobek(2.5)` | `4` + varování | `TypeError` |

---

# Strict types v praxi

- Uvádí se jako **první příkaz** souboru, hned za `<?php`.
- Platí jen pro soubor, ve kterém je uvedeno. Proto ho píšeme na začátek **každého** souboru, i do souborů vkládaných přes `require`.
- Jediný povolený převod: `int` lze předat do parametru typu `float` (`5` → `5.0`).
- Hodnoty z formuláře (`$_POST`, `$_GET`) jsou **vždy řetězce**. Před předáním funkci je převedeme na správný typ.

```php
<?php
declare(strict_types=1);

function jePlnolety(int $vek): bool {
    return $vek >= 18;
}

$vek = $_POST['vek'] ?? '0';       // např. '17', tedy string
jePlnolety($vek);                  // TypeError
jePlnolety((int) $vek);            // false
```

> **Od nynějška povinně používáme.**

---

# Rozsah platnosti proměnných

- Funkce **nevidí** proměnné definované mimo ni. Vše potřebné jí předáme parametrem.
- Proměnné vytvořené ve funkci po jejím skončení zaniknou.

```php
$sazbaDph = 21;

function cenaVcetneDph(float $cena): float {
    return $cena * (1 + $sazbaDph / 100);   // Warning: Undefined variable $sazbaDph
}
```

```php
function cenaVcetneDph(float $cena, int $sazbaDph): float {
    return $cena * (1 + $sazbaDph / 100);
}

echo cenaVcetneDph(100, 21);     // 121
```


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

# Antipattern: výpis místo `return`

- Funkce má hodnotu **vrátit**. O tom, co se s ní stane (vypsat, uložit, porovnat), rozhodne volající kód.
- Funkce s `echo` jde použít jen k jedné věci: k výpisu na místě, kde je zavolána.

::left::

**Špatně**

```php
function cenaVcetneDph(float $cena): void {
    echo $cena * 1.21;
}

cenaVcetneDph(100);      // 121

$celkem = cenaVcetneDph(100) + cenaVcetneDph(50);
// vypíše 12160.5 (121 a 60.5 za sebou)
// $celkem je 0, funkce nic nevrátila
```

::right::

**Správně**

```php
function cenaVcetneDph(float $cena): float {
    return $cena * 1.21;
}

echo cenaVcetneDph(100);                        // 121
$celkem = cenaVcetneDph(100) + cenaVcetneDph(50);    // 181.5
if (cenaVcetneDph(100) > 120) { /* ... */ }
```

---
layout: two-cols-header
---

# Antipattern: `global` místo parametru

- `global` zpřístupní funkci vnější proměnnou. Funkce pak závisí na tom, co je nastavené jinde v souboru.
- Kdo funkci volá, z hlavičky nepozná, co potřebuje. Změna vnější proměnné nečekaně změní výsledek.

::left::

**Špatně**

```php
$sazbaDph = 21;

function cenaVcetneDph(float $cena): float {
    global $sazbaDph;
    return $cena * (1 + $sazbaDph / 100);
}

echo cenaVcetneDph(100);
```

::right::

**Správně**

```php
$sazbaDph = 21;

function cenaVcetneDph(float $cena, int $sazbaDph): float {
    return $cena * (1 + $sazbaDph / 100);
}

echo cenaVcetneDph(100, $sazbaDph);
```

---

# Další antipatterny ve funkcích

| Antipattern | Proč vadí | Jak lépe |
|---|---|---|
| Funkce dělá víc věcí naráz (ověří, uloží, vypíše) | nejde použít jen část, těžko se hledá chyba | jedna funkce = jedna úloha |
| Chybí typy parametrů a návratové hodnoty | chybný vstup projde bez varování | typy všude + `strict_types` |
| Nevýstižný název (`f1`, `zpracuj`, `data`) | z volání nepoznáme, co funkce dělá | sloveso + předmět: `spocitejCenu`, `jeEmailPlatny` |
| Hodně parametrů (5 a víc) | snadno se zamění pořadí | předat asociativní pole nebo funkci rozdělit |
| Parametr `bool`, který mění chování (`vypis($data, true)`) | z volání nepoznáme, co `true` znamená | dvě funkce s výstižnými názvy |
| Kopírovaný kód místo funkce | oprava se musí dělat na více místech | opakovaný kód přesunout do funkce |

- Výjimka: funkce, jejímž úkolem je jen vykreslit kus HTML, s `echo` existovat může. Výpočet ale do ní nepatří.

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

- Funkce je pojmenovaný blok kódu s typovanými parametry a návratovou hodnotou.
- Výsledek vrací přes `return`, nevypisuje ho. Jedna funkce = jedna úloha.
- Vnější proměnné nevidí, data dostává parametrem. `global` nepoužíváme.
- `declare(strict_types=1);` na začátku každého souboru. Hodnoty z formuláře před předáním převedeme na správný typ.
- Rekurze potřebuje podmínku ukončení.

---
src: '../../pages/thanku.md'
---
