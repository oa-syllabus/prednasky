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
title: "Řídící struktury"
exportFilename: "07_ridici_struktury"
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

- Podmínky
  - if
  - switch
Cykly
  - for
  - foreach
  - while



---
layout: cover
background: https://cover.sli.dev
---

# Podmínky

---

# Podmínky

- podmínka je tvořena klíčovým slovem `if` a definicí podmínky
- složené závorky `{}` pravý <kbd>alt</kbd> + <kbd>B</kbd> nebo <kbd>N</kbd> obsahují příkazy, které se vykonají, pokud je podmínka splněna


```php
if ( podmínka) {
  // příkazy
}
``` 


- u jednořádkových příkazů můžeme složené závorky vynechat

```php
if ($a > $b) 
  echo "a je větší než b";
``` 



**Ternární operátor**
- zkrácený zápis podmínky
- `podmínka ? hodnotaTrue : hodnotaFalse`
```php
echo ($a > $b) ? "a je větší než b" : "a je menší než b";
```


---

# Operátory

- `$a == $b` - (<kbd>=</kbd><kbd>=</kbd>)	`$a` má stejnou hodnotu jako `$b`
- `$a != $b` - (<kbd>!</kbd><kbd>=</kbd>)	`$a` má jinou hodnotu než `$b`
- `$a > $b`	`$a` - je větší než `$b`
- `$a < $b`	`$a` - je menší `$b`
- `$a <= $b` - (<kbd><</kbd><kbd>=</kbd>) `$a` je menší nebo rovno `$b`


---

# Logické operátory

- `!` - negace,  `!$x` proměnná `$x` není `true`
- `$a === $b` - (<kbd>=</kbd><kbd>=</kbd><kbd>=</kbd>)	`$a` má stejnou hodnotu **A** typ jako `$b`
- `$a !== $b` - (<kbd>!</kbd><kbd>=</kbd><kbd>=</kbd>)	`$a` má jinou hodnotu **NEBO** typ než `$b`
- logický operátor AND - musí být oba pravdivé
  - `$a and $b`
  - `$a && $b` (<kbd>AltGr</kbd> + <kbd>C</kbd>)
- logický operátor OR - alespoň jeden musí být pravdivý
  - `$a or $b`
  - `$a || $b` (<kbd>AltGr</kbd> + <kbd>W</kbd>)
- `$a ?? $b` - null koalesční operátor - musí být stejný datový typ. Pokud je `$a` null, vrátí `$b`
- `$a ?: $b` - ternární operátor - pokud je `$a` pravda, vrátí `$a`, jinak `$b`
- `$a xor $b` - logický operátor XOR - jeden z nich musí být pravdivý, ale ne oba

---

## Operátory rovnosti

**Pozor na datové typy!**
- `0 === 0` je pravda
- `000 === 0` je nepravdivý
- `foo == 0` je pravda
- `000 == 0` je pravda
- `"0" == 0` je pravda

- Chcete-li zkontrolovat, zda jsou dva skaláry, které mají být číselné, stejné, použijte `==`, např. `5 == "5"` je pravda.
- Chcete-li zkontrolovat, zda jsou dvě proměnné typu „řetězec“ a jsou stejné posloupnosti znaků, použijte `===`, například `1.e6" === "1.0e6` je nepravda.

---

# Příklad

```php
if ($var == "abc" || $var == "def" || ...)
{
  	// Alespoň jedna podmínka musí být true 
    echo "true";
}
```

```php
if ($var1 == "abc" && $var2 == "def" && ...)
{
  	// Všechny podmínky musí být vyhodnoceny jako true 
    echo "true";
}
```

---

# Větvení podmínek `else`, `elseif`


```php
if (podmínka) {
  // příkazy
} elseif (podmínka) {
  // příkazy
} else {
  // příkazy
}
```

```php
if ($cislo > 0) {
  	echo $cislo . ' je kladné';
  
} elseif ($cislo < 0) {
  	// Vykoná se, pokud první podmínka je vyhodnocena jako false
    // a je splněna definovaná podmínka
	echo $cislo . 'je záporné';

} else {
	// Vykoná se, pokud není splněna žádná podmínka  
	echo $cislo .'je nula';

}
```

---

# `switch`

- `switch` je alternativou k `if` a `elseif`
- Používá se, pokud chceme porovnávat hodnoty, nikoliv podmínky
- `switch` porovnává hodnotu proměnné s hodnotami v `case`
- `break` ukončí `switch` blok
- `default` je volitelný blok, který se vykoná, pokud žádný `case` nebyl splněn

```php
switch ($vstupniHodnota) {
  case hodnota1:
    // příkazy, pokud je splněna hodnota1
    break;
  case hodnota2:
    // příkazy, pokud je splněna hodnota2
    break;
  default:
    // příkazy, pokud nebyla splněna žádná hodnota
}
```

---

# switch

```php
$den = "pondělí";

switch ($den) {
    case "pondělí":
        echo "Dnes je pondělí.";
        break;
    case "úterý":
        echo "Dnes je úterý.";
        break;
    case "středa":
        echo "Dnes je středa.";
        break;
    default:
        echo "Dnes nevím, který den je.";
}
```

---
layout: cover
background: https://cover.sli.dev
---

# Cykly

---

# Cyklus `for`

- `for` cyklus se skládá ze tří částí
  - inicializace proměnné
  - podmínka
  - iterace

```php
// for (inicializace čítače; testovací čítač; inkrement čítače)
for ($i = 0; $i < 10; $i++) {
  // příkazy
}
```

---

# Cyklus `foreach`

- Smyčka bloku kódu pro každý prvek pole
- Umožňuje iterovat přes pole a získávat pouze hodnoty prvků v poli.
- foreach postupně projde všechny prvky v poli `$colors` a při každé iteraci bude proměnná `$value` obsahovat hodnotu aktuálního prvku v poli.

```php
foreach ($pole as $hodnota) {
  // příkazy
}
```

```php
$colors = array("red", "green", "blue", "yellow");

foreach ($colors as $value) {
    echo $value .'<br />';
}
```

---

# Cyklus `foreach` s klíčem

- `as $key => $value` - pokud chceme získat klíč a hodnotu

```php
$colors = array("red", "green", "blue", "yellow");

foreach ($colors as $key => $value) {
  echo 'Klíč: ' . $key . ', Hodnota: ' . $value . '<br />';
}

```

---

# Cyklus `while`

- `while` cyklus se skládá z podmínky, která se vyhodnocuje před každou iterací
- Pokud je podmínka vyhodnocena jako `true`, cyklus se opakuje
- Pokud je podmínka vyhodnocena jako `false`, cyklus se ukončí
- Pozor na zacyklení!

```php
while (podmínka) {
  // příkazy
}
```

```php
$i = 1;

while ($i <= 10) {
	echo $i . '<br />';
  	$i++;
}

```

---

# Cyklus `do...while`

- `do...while` cyklus se skládá z podmínky, která se vyhodnocuje po každé iteraci
- Cyklus se vykoná alespoň jednou, i když je podmínka `false`

```php
do {
  // příkazy
} while (podmínka);
```

```php
$i = 20;
do {
    echo $i . '<br />';
  	$i++;
} while ($i <= 10);

// Výstup: 20, ikdyž podmínka je false

```

---
layout: cover
background: https://cover.sli.dev
hideInToc: true
---

# Strict types

---

# Strict Types

- PHP je volně typovaný jazyk
- Přiřazení hodnoty do proměnné nevyžaduje deklaraci datového typu
- Při volání funkcí se datové typy nepřísně kontrolují
- Může to vést k neočekávanému chování a chybám
- Pro eliminaci těchto problémů používáme přísné typování za využití `declare(strict_types=1);`

```php
// zapnutí vyžadování dodržování kontroly datových typů
// standardně se uvádí hned za <?php
// vždy na začátku každého souboru
declare(strict_types=1);
```

> **Od nynějška povinně používáme.**

---
layout: cover
background: https://cover.sli.dev
---

# Funkce

---

# Funkce vs Procedura

- Funkce je blok kódu, který můžeme znovu použít
- může přijímat parametry a vrací hodnotu
- Procedura je blok kódu, který může být znovu použit, ale nevrací hodnotu

## Interní funkce

- PHP má více než 1000 vestavěných funkcí a navíc si můžete vytvořit vlastní funkce.
- Kompletní přehled funkcí je uveden na php.net
- Každou funkci lze volat přímo ze skriptu a provést specifickou úlohu.
 
---

# Uživatelsky definované funkce

- Funkce můžete definovat pomocí klíčového slova `function`
- Nesputí se, dokud nejsou zavolány tzn. nejsou spouštěny automaticky ani při načtení stránky
- Název funkce musí začínat písmenem nebo podtržítkem, na velikosti písmen nezáleží
- Návratová hodnota přes `return`
- Datový typ návratové hodnoty je uveden za dvojtečkou
- Pokud očekáváme že fce může vracet i `null`, musíme to uvést pomocí `?datovyTyp` nebo `datovyTyp|null`

```php
function nazevFunkce(): datovyTypVystupu {
  // příkazy
  
  // návratová hodnota
  return $vysledek;
}
```

---

# Volání funkce

- Funkci zavoláme pomocí jejího názvu a závorek
- Pokud funkce přijímá parametry, musíme je uvést v závorkách

```php
nazevFunkce();
```

Ukázka
```php
function pozdrav(): string {
  return "Ahoj!";
}

echo pozdrav();
```

---

# Volání funkce s parametry

- Parametry jsou hodnoty, které funkce přijímá a jsou nutné pro vykonání funkce
- jsou uvedeny v závorkách a odděleny čárkou ve tvaru `datovyTyp parametr1, datovyTyp parametr2, ...`
- Mají pouze lokální platnost
- Můžeme nastavit výchozí hodnotu parametru přiřazení hodnoty za `=`

```php
function nazevFunkce(string $parametr1, int $parametr2 = null): string {
  // příkazy
}
```

---

# Příklad

```php
declare(strict_types=1);

function writeMessage(string $name, string $msg = "nic nenapsal"): string {
  $output = $name . ' napsal: ' . $msg;
  return $output;
}
```

```php
// volání funkce
echo writeMessage('Honza', 'První zpráva');             # Honza napsal: První zpráva
echo writeMessage('David', 'Druhá zpráva');             # David napsal: Druhá zpráva
echo writeMessage('Ilona', 'Jiná zpráva do výstupu');   # Ilona napsal: Jiná zpráva do výstupu
echo writeMessage('Petr');                              # Petr napsal: nic nenapsal
```

---
layout: two-cols-header
---

# Rekurze

- Rekurze je technika, kdy funkce volá sama sebe.
- Používá se pro řešení problémů, které lze rozdělit na menší podobné podproblémy.
- Každé volání funkce má svůj vlastní kontext a proměnné.
- Musí obsahovat podmínku pro ukončení rekurze, aby nedošlo k nekonečnému volání.

::left::
```php
function rekurzivniFunkce($parametr) {
    if (podmínkaProUkončení) {
        return;
    } else {
        // příkazy
        rekurzivniFunkce(novýParametr);
    }
}
```
::right::
```php
function factorial(int $n): int {
    if ($n <= 1) {
        return 1;
    } else {
        return $n * factorial($n - 1);
    }
}
echo factorial(5); // Výstup: 120
```

---

# Shrnutí

- Řídící struktury umožňují řídit tok programu na základě podmínek a opakování
- Podmínky (`if`, `elseif`, `else`, `switch`) umožňují vykonávat různé části kódu na základě splnění určitých podmínek
- Cykly (`for`, `foreach`, `while`, `do...while`) umožňují opakovaně vykonávat blok kódu, dokud je splněna určitá podmínka
- Funkce umožňují organizovat kód do samostatných bloků, které lze znovu použít a volat s různými parametry
- Přísné typování (`declare(strict_types=1);`) pomáhá předcházet chybám tím, že vyžaduje dodržování datových typů při volání funkcí
- Správné používání řídících struktur a funkcí vede k lepší čitelnosti, údržbě a efektivitě kódu.

---
src: '../../pages/thanku.md'
---