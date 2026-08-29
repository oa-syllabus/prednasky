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
title: "OOP Úvod Třída Objekt"
exportFilename: "40_OOP_Uvod_Trida_Objekt"
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

# Co je OOP

- Programovací paradigma založené na objektech
- Objekt = konkrétní instance třídy
- Třída = šablona, podle které se objekty vytvářejí
- Klíčové principy: zapouzdření, dědičnost, polymorfismus


---

# Konvence

- Názvy tříd píšeme ve formátu PascalCase: `MojeTrida`
- Názvy metod a proměnných ve formátu camelCase: `mojeMetoda`, `mojePromenna`
- Vlastnosti a metody obvykle označujeme jako `public`, `private` nebo `protected`
- Používáme anglické názvy pro třídy a metody, pokud není důvod jiný
- Dodržujeme doporučení [PSR-12](https://www.php-fig.org/psr/psr-12/) pro čitelnost a jednotný styl
- Na začátek souboru přidáváme direktivu `declare(strict_types=1);` pro striktní kontrolu typů

---
layout: two-cols-header
---
# Konvence

::left::

## ✅ Příklady dobré praxe:

```php
declare(strict_types=1);

class UserProfile {
    private string $userName;

    public function __construct(string $userName) {
        $this->userName = $userName;
    }

    public function getUserName(): string {
        return $this->userName;
    }
}
```

::right::

## ❌ Špatná praxe:

```php
class user_profile {
    var $UserName;

    function GetUserName() {
        return $this->UserName;
    }
}
```

---
layout: image-right
image: https://cover.sli.dev
---

# OOP v PHP

---

# Třída

- Třída obsahuje vlastnosti (properties) a metody (methods)
- Vlastnosti uchovávají data
- Metody provádí operace nad daty
- Třída je šablona, podle které se vytvářejí objekty
- Objekt je konkrétní instance třídy
- Třída musí být unikátní, objektů může být vytvořeno libovolné množství
- Pojmenováváme podstatnými jmény jednotného čísla, např. `Auto`, `Uzivatel`, `Produkt`
- V PHP se třída definuje klíčovým slovem `class`

---

# Obsah třídy

- Vlastnosti (properties) – data, která objekt uchovává
- Metody (methods) – operace, které objekt provádí
  - Konstruktor – metoda, která se volá při vytváření objektu
  - Vlastní metody - operace, které objekt provádí
  - Setter a getter – metody pro nastavení a získání hodnot vlastností
- Na metodu nebo vlastnost se odkazujeme pomocí `->`

---

# Třídy a objekty v PHP

```php
class Auto {
    // vlastnosti
    public string $barva;

    // metody
    public function klakson(): void {
        echo "Píííp!";
    }
}
```

- Použití třídy v jiném souboru: 
```php
declare(strict_types=1);
require_once('Auto.php');

// vytvoření objektu
$mojeAuto = new Auto();
$mojeAuto->barva = "červená";
$mojeAuto->klakson();
```

---

# Více instancí téže třídy

```php
class Auto {
    public string $barva;

    public function klakson(): void {
        echo "Píííp!\n";
    }
}
```

```php
declare(strict_types=1);
require_once('Auto.php');

$auto1 = new Auto();
$auto1->barva = "červená";

$auto2 = new Auto();
$auto2->barva = "modrá";

echo "Auto 1: " . $auto1->barva . "\n";
echo "Auto 2: " . $auto2->barva . "\n";

$auto1->klakson();
$auto2->klakson();
```

---

# Více instancí téže třídy - vhodnější varianta

```php
$barvy = ["červená", "modrá", "zelená"];
$auta = [];

foreach ($barvy as $barva) {
    $auto = new Auto();
    $auto->barva = $barva;
    $auta[] = $auto;
}

foreach ($auta as $index => $auto) {
    echo "Auto " . ($index + 1) . ": " . $auto->barva . "\n";
    $auto->honk();
}
```

---

# Přístup aneb magické this

- `$this` je klíčové slovo, které odkazuje na aktuální objekt
- Pomocí `$this` můžeme přistupovat k vlastnostem a metodám objektu
- `$this` je dostupné pouze uvnitř třídy

```php
class Auto {
    public string $barva;

    public function klakson(): void {
        return "Píííp! Barva: " . $this->barva . "\n";
    }
}
```


---
layout: image-right
image: https://cover.sli.dev
---

# Metody

---

# Metody

- Metoda je funkce definovaná uvnitř třídy
- Může přistupovat k vlastnostem objektu přes $this
- Může mít vstupní parametry a návratovou hodnotu
- Metody bez návratové hodnoty mají návratový typ `void`

```php
class Kalkulacka {
    public function secti(int $a, int $b): int {
        return $a + $b;
    }

    public function vypisVysledek(int $vysledek): void {
        echo "Výsledek: $vysledek\n";        
    }
}

$kalk = new Kalkulacka();
$soucet = $kalk->secti(3, 4);
$kalk->vypisVysledek($soucet);
```


---

# Konstruktor

- Speciální etoda, která se volá při vytváření nové instance třídy (objektu)
- V PHP se jmenuje `__construct`

```php
class Uzivatel {
    public string $jmeno;

    public function __construct(string $jmeno) {
        $this->jmeno = $jmeno;
    }
}

$user = new Uzivatel("Adam");
echo $user->jmeno;
```

---

# Modifikátory přístupnosti

- `public` – přístupný odkudkoliv
- `private` – přístupný pouze uvnitř třídy
- `protected` – přístupný uvnitř třídy a jejích potomků

```php
class Test {
    public int $a;
    private string $b;

    public function setB(string $hodnota): void {
        $this->b = $hodnota;
    }
    
    public function getB(): string {
        return $this->b;
    }
}
```

---

# Shrnutí

- OOP umožňuje strukturovanější a přehlednější kód
- Třídy = šablony, objekty = konkrétní instance
- Konstruktor nastavuje počáteční hodnoty
- Modifikátory určují, co je viditelné ven


---
src: '../../pages/thanku.md'
---