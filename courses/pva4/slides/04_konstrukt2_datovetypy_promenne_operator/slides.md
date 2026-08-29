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
title: "Konstrukt 2: Datové typy, proměnné, operátory"
exportFilename: "04_konstrukt2_datovetypy_promenne_operator"
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

# Datové typy

- PHP je dynamicky typovaný jazyk
- Datové typy se určují automaticky podle obsahu proměnné
- PHP podporuje několik základních datových typů:
  - Integer
  - Float
  - String
  - Boolean
  - Array
  - Object
  - NULL

<!--
Z kontextu se datový typ rozpozná také při operacích, příkladem může být násobení. Pokud násobíme dvě čísla, kdy jedno z nich je definované jako datový typ float, poté oba operandy jsou brané jako float a výsledek bude v typu float.
-->


---

# `String`

- Řetězec znaků
- Deklarace pomocí apostrofu (jednoduchých) nebo dvojitých uvozovek
- Apostrof - `'`
- Dvojité uvozovky - `"`
- Výhoda dvojitých uvozovek je možnost vkládat proměnné do řetězce
- Nevýhoda dvojitých uvozovek je, že PHP musí prohledat řetězec a nahradit proměnné za jejich hodnoty + zpracovat escape sekvence
- V případě potřeby můžeme text rozdělit do více řádků
- Skládání řetězců pomocí tečky `.`


<v-click>

> Na české klávesnici můžete napsat znak apostrofu `'` stisknutím klávesy <kbd>Shift</kbd> a <kbd>'</kbd> klávesy s apostrofem, která se nachází vedle klávesy Backspace.

</v-click>

---
hideInToc: true
---

# `String`

```php
$jmeno = 'PVA';
echo $jmeno; // PVA
```

<v-click>

### Spojování řetězců

- Spojení řetězců pomocí tečky `.`
- Tečka slouží k spojení dvou nebo více řetězců

```php {all|1-4|6|7|8|all}
$jmeno = 'PVA';
$promenna = 'Hello, world!';
echo $jmeno;    // PVA
echo $promenna; // Hello, world!

echo 'Hello, world ' . 'PVA';          // Hello, world PVA
echo 'Hello, world ' . $jmeno;          // Hello, world PVA
echo 'Hello, world ' . $jmeno . '!';    // Hello, world PVA!
echo 'Hello, world <strong>' . $jmeno . '</strong>!';    // Hello, world PVA!
```

</v-click>

<v-click>

### Spojování řetězců s uvozovkou

```php
$jmeno = "PVA";
$promenna = "Hello, world $jmeno!";
echo $promenna; // Hello, world PVA!
```

</v-click>

---

# `Integer`

- Celé číslo
- Může být záporné nebo kladné
- Bez desetinné čárky
- Bez uvozovek
- Bez mezer
- Bez závorek

<v-click>

- 32bit: -2,147,483,648 až 2,147,483,647
- 64bit: -9,223,372,036,854,775,808 až 9,223,372,036,854,775,807

</v-click>

<v-click>

```php
$cislo = 42;
echo $cislo; // 42
var_dump($cislo); // int(42)
```

</v-click>

---

# `Float`

- Datový typ pro reálná čísla s plovoucí desetinnou čárkou
- Desetinné číslo
- Může být záporné nebo kladné
- S desetinnou čárkou, ale pozor, **píšeme s tečkou**
- Bez uvozovek
- Bez mezer
- Bez závorek

<v-click>

```php
$desetinne = 3.14;
echo $desetinne; // 3.14
var_dump($desetinne); // float(3.14)
```

</v-click>

<!--
Jde o variantu čísla s plovoucí řádovou čárkou, pro které platí pravidlo "čím menší, tím přesnější". Číslo se interně uloží jako tzv. mantisa a exponent, takže se vlastně ukládají 2 čísla, mezi kterými se provádí operace: mantisa * (2 ^ exponent), čímž je možné uložit opravdu obří rozsah čísel. Využívá se principu, že u velkých čísel nepotřebujeme vždy znát přesně jejich hodnotu, zato chceme ušetřit co nejvíce paměti. Čísla typu float nemusí být uloženy přesně a neměly by se používat pro výpočet peněz.
-->

---

# Integer vs Float

```php {all|1-3|5-7|8-9|11-13}
// proměnná je int
$var1 = 5;
$var2 = 1;

// proměnná je typu float
$var3 = 5.0; 

// int/int - výsledek se nám vrátí jako datový typ float
$var1 / $var2; 

// int/float - výsledek se nám také vrátí jako float,
// i když je výsledek celočíselná hodnota
$var1 / $var3; 
```

---

# `Boolean`

- Logický datový typ
- Může nabývat hodnot `true` nebo `false`
- V PHP je možné použít i hodnoty `1` a `0`
- Hodnoty `true` a `false` jsou case-insensitive

<v-click>

```php
$pravda = true;
$nepravda = false;

echo $pravda; // 1
echo $nepravda; // (nic nevrací)

var_dump($pravda); // bool(true)
var_dump($nepravda); // bool(false)
``` 

</v-click>

---

# Operátor

- Symbol, který provádí operaci mezi dvěma hodnotami
- Operátor `==` porovnává hodnoty proměnných
- Operátor `===` porovnává hodnoty a datové typy proměnných
- Operátor `!=` porovnává, zda se hodnoty nerovnají
- Operátor `!==` porovnává, zda se hodnoty a datové typy nerovnají
- Operátor `<>` porovnává, zda se hodnoty nerovnají
- Operátor `>` vrací `true`, pokud je první hodnota větší než druhá
- Operátor `<` vrací `true`, pokud je první hodnota menší než druhá
- Operátor `>=` vrací `true`, pokud je první hodnota větší nebo rovna druhé
- Operátor `<=` vrací `true`, pokud je první hodnota menší nebo rovna druhé

---
hideInToc: true
---

# Operátor

- Operátor `&&` vrací `true`, pokud jsou oba výrazy pravdivé
- Operátor `||` vrací `true`, pokud je alespoň jeden výraz pravdivý
- Operátor `!` vrací `true`, pokud je výraz nepravdivý
- Operátor `xor` vrací `true`, pokud je jeden z výrazů pravdivý a druhý nepravdivý
- Operátor `??` vrací první hodnotu, pokud je definovaná, jinak druhou hodnotu

---

# `NULL`

- Speciální hodnota, která znamená, že proměnná nemá žádnou hodnotu
- V PHP je možné použít i hodnotu `null`
- Hodnota `null` je case-insensitive
- Proměnná, která nebyla inicializována, má hodnotu `null`
- Proměnnou můžeme nastavit na hodnotu `null` kdykoliv

<v-click>

```php
$promenna = null;
echo $promenna; // (nic nevrací)
var_dump($promenna); // NULL
```

</v-click>

---
layout: image-right
image: https://cover.sli.dev
---

# Pole `Array`

---

# Array

- Datový typ pro ukládání více hodnot do uspořádané kolekce
- Inicializujeme pomocí `array()` nebo `[]`
- Každá hodnota má svůj klíč
  - klíčem může být číslo nebo řetězec znaků
  - indexovány (číslovány) od 0
- Hodnota pole může obsahovat různé datové pole vč. jiného pole (multidimenzionální pole)
- Na prvek pole lze přistupovat přes index, nebo u asociativních polí i přes klíč

<v-click>

```php
$poleBarvy = array("red", "green", "blue");
$poleCisla = [1, 2, 3, 4, 5];
$poleKlic = ["jmeno" => "Adam", "prijmeni" => "Fišer"]; // Asociativní pole

echo $poleBarvy[0]; // red
echo $poleCisla[2]; // 3
echo $poleKlic["jmeno"]; // Adam


```

</v-click>

---

# Asociativní pole

- Asociativní pole je pole, kde klíčem jsou uživatelem definované řetězce
- Klíče jsou
  - unikátní
  - jsou case-sensitive
  - mohou být libovolného datového typu, typicky string nebo integer
 
<v-click>

```php
$pole = array(klic => hodnota);

$vek = ["Peter" => 35, "Ben" => 37, "Joe" => 43];
echo 'Peter is ' . $vek["Peter"] . ' years old.'; // Peter is 35 years old.
```

</v-click>

<v-click>

```php
$osoba = array(
  "jmeno" => "Jarmilka",
  "prijmeni" => "Testovací",
  "vek" => 30
);
echo $osoba["jmeno"]; // Jarmilka
echo $osoba["prijmeni"]; // Testovací
echo $osoba["vek"]; // 30
```

</v-click>


---

# Vícerozměrné pole

- Pole může obsahovat jiné pole
- Vnořené pole se nazývá multidimenzionální pole
- Každé vnořené pole může mít jiný počet prvků
- Vnořené pole může být asociativní nebo indexované
- Vnořené pole může obsahovat další vnořené pole

<v-click>

```php
$zamestnanci = array(
  array("Adam", "Wanex", "PVA"),
  array("Petr", "Novák", "OA"),
  array("Jan", "Dvořák", "PVA")
);

echo $zamestnanci[0][0] . " pracuje na " . $zamestnanci[0][2]; // Adam pracuje na PVA
```

</v-click>

---
hideInToc: true
---

# Vícerozměrné pole
    
```php
$cars = array (
  //Brand, Stock, Sold
  array("Volvo",22,18),
  array("BMW",15,13),
  array("Saab",5,2),
  array("Land Rover",17,15)
);

echo $cars[0][0].': In stock: '.$cars[0][1].', sold: '.$cars[0][2].'.<br>'; // Volvo: In stock: 22, sold: 18.
echo $cars[1][0].': In stock: '.$cars[1][1].', sold: '.$cars[1][2].'.<br>'; // BMW: In stock: 15, sold: 13.
echo $cars[2][0].': In stock: '.$cars[2][1].', sold: '.$cars[2][2].'.<br>'; // Saab: In stock: 5, sold: 2.
echo $cars[3][0].': In stock: '.$cars[3][1].', sold: '.$cars[3][2].'.<br>'; // Land Rover: In stock: 17, sold: 15.
```

---

# Vícerozměrné pole - asociativní

```php
$zakaznik = array(
    array("firma" => "Nezávislí Dev, v.o.s.", "obrat" => 150450, "aktivni" => true),
    array("firma" => "Nová vývojová, a.s.", "obrat" => 5978949), "aktivni" => true,
    array("firma" => "Dvořákova aplikační, s.r.o.", "obrat" => 123456, "aktivni" => false) // bez čárky na konci posledního prvku
);
echo $zakaznik[0]["firma"] . " má obrat " . $zakaznik[0]["obrat"]; // Nezávislí Dev, v.o.s. má obrat 150450
```

---

# Přetypování

- Přetypování je změna datového typu proměnné
- Přetypování může být
  - implicitní - automatické, např. při operacích s různými datovými typy
  - explicitní - manuální, pomocí předpony s názvem datového typu v závorkách


<v-click>

```php {all|1-3|5-7|9-11}
$promenna = 42;
$promenna = (string) $promenna; // Přetypování na string
var_dump($promenna); // string(2) "42"

$promenna = "42";
$promenna = (int) $promenna; // Přetypování na integer
var_dump($promenna); // int(42)

$promenna = 3.14;
$promenna = (int) $promenna; // Přetypování na integer
var_dump($promenna); // int(3)
```

</v-click>

<!--
Pozor, přetypování může způsobit ztrátu dat, například při přetypování float na integer se ztratí desetinná část.
-->

---

# Shrnutí

- PHP je dynamicky typovaný jazyk
- Datové typy se určují automaticky podle obsahu proměnné
- PHP podporuje několik základních datových typů: Integer, Float, String, Boolean, Array, Object, NULL
- Spojujeme řetězce pomocí tečky `.`
- Operátory slouží k provádění operací mezi hodnotami
- Pole je uspořádaná kolekce hodnot
- K hodnotě pole přistupujeme přes číselný index nebo klíč
- Pole může být asociativní nebo indexované
- Pole může být multidimenzionální
- Přetypování je změna datového typu proměnné

---
src: '../../pages/thanku.md'
---