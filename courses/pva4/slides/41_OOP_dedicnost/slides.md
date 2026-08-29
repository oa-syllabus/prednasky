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
title: "OOP Dědičnost"
exportFilename: "41_OOP_dedicnost"
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

# Dnes se naučíme

- Pochopit princip dědičnosti v objektově orientovaném programování.
- Naučit se používat klíčové slovo `extends` v PHP.
- Umět přepisovat metody a volat metody rodiče pomocí `parent::`.
- Vytvořit jednoduchý příklad dědičnosti.

---

# Dědičnost

- Dědičnost je mechanismus, který umožňuje vytvářet nové třídy na základě existujících tříd.
- Nová třída (potomek, dcera) dědí vlastnosti a metody své rodičovské třídy (předka).
- Dědičnost umožňuje opětovné použití kódu a usnadňuje správu a rozšiřování aplikací.
- V PHP se dědičnost implementuje pomocí klíčového slova `extends`.

```php
class RodicovskaTrida {
  // kód třídy
}

class PotomekTrida extends RodicovskaTrida {
  // kód potomka
}
```

---

# Příklad dědičnosti

- Vytvoříme rodičovskou třídu `Osoba`, která bude mít vlastnosti jako jméno, příjmení a věk.
- Vytvoříme dceřinou třídu `Student`, která bude dědit z třídy `Osoba`.



```php {*}{maxHeight:'180px'}
// Rodičovská třída
class Osoba {
  private string $jmeno;
  private string $prijmeni;
  private int $vek;
  
  public function __construct(string $jmeno, string $prijmeni, int $vek) {
    $this->jmeno = $jmeno;
    $this->prijmeni = $prijmeni;
    $this->vek = $vek;
  }
  
  public function getJmeno(): string {
    return $this->jmeno;
  }
  
  public function getPrijmeni(): string {
    return $this->prijmeni;
  }
  
  public function getVek(): int {
    return $this->vek;
  }
  
  public function setVek(int $vek): void {
    $this->vek = $vek;
  }
  
  public function getCeleJmeno(): string {
    return $this->jmeno . ' ' . $this->prijmeni;
  }
}
```


```php {*}{maxHeight:'180px'}
// Dceřiná třída
class Student extends Osoba {
  private string $cisloStudenta;
  private array $predmety = [];
  
  public function __construct(
    string $jmeno, 
    string $prijmeni, 
    int $vek, 
    string $cisloStudenta
  ) {
    parent::__construct($jmeno, $prijmeni, $vek);
    $this->cisloStudenta = $cisloStudenta;
  }
  
  public function getCisloStudenta(): string {
    return $this->cisloStudenta;
  }
  
  public function pridejPredmet(string $predmet): void {
    $this->predmety[] = $predmet;
  }
  
  public function getPredmety(): array {
    return $this->predmety;
  }
}
```

---

# Použití dědičnosti

```php
declare(strict_types=1);
require_once('Student.php');

// Vytvoření instance třídy Student
$student = new Student('Jan', 'Novák', 20, 'S123456');

// Použití metod z rodičovské třídy
echo $student->getCeleJmeno(); // Vypíše: Jan Novák
echo $student->getVek();       // Vypíše: 20

// Použití metod z dceřiné třídy
$student->pridejPredmet('Matematika');
$student->pridejPredmet('Programování');
print_r($student->getPredmety()); // Vypíše pole předmětů
```

---
layout: image-right
image: https://cover.sli.dev
---

# Pokročilé koncepty

---

# Modifikátory přístupnosti a dědičnost


| Modifikátor | V rodičovské třídě | V dceřiné třídě | Mimo třídy  |
|-------------|:------------------:|:---------------:|:-----------:|
| `private`     |         ✅          |        ❌        |      ❌      |
| `protected`   |         ✅          |        ✅        |      ❌      |
| `public`      |         ✅          |        ✅        |      ✅      |



---
layout: two-cols
---

# Konstruktory a dědičnost

- Když vytvoříme dceřinou třídu, můžeme použít konstruktor rodičovské třídy pomocí `parent::__construct()`.
- To zajistí, že vlastnosti rodičovské třídy budou inicializovány správně.
- Pokud dceřiná třída **má vlastní konstruktor**, musíme zavolat konstruktor rodičovské třídy.
- Pokud dceřiná třída **nemá konstruktor**, použije se konstruktor z rodičovské třídy


```php
// Rodičovská třída
class Vozidlo {
  protected string $znacka;
  protected string $model;
  
  public function __construct(string $znacka, string $model) {
    $this->znacka = $znacka;
    $this->model = $model;
  }
}
```

::right::

```php
// Dceřiná třída s vlastním konstruktorem
class Auto extends Vozidlo {
  private int $pocetDveri;
  
  public function __construct(string $znacka, string $model, int $pocetDveri) {
    // Volání konstruktoru rodičovské třídy
    parent::__construct($znacka, $model);
    
    // Inicializace vlastních atributů
    $this->setPocetDveri($pocetDveri);
  }
  
  public function setPocetDveri(int $pocetDveri): void {
    if ($pocetDveri < 2 || $pocetDveri > 5) {
      throw new InvalidArgumentException("Počet dveří musí být mezi 2 a 5.");
    }
    $this->pocetDveri = $pocetDveri;
  }
}
```

```php
// Dceřiná třída bez vlastního konstruktoru
class Motorka extends Vozidlo {
  // Nemá vlastní konstruktor, použije se konstruktor z třídy Vozidlo
}
```



---
layout: two-cols-header
---

# Override aneb Přepisování metod

- Dědičnost umožňuje přepisování metod rodičovské třídy v dceřiné třídě.
- Pokud je metoda v dceřiné třídě přepsána, použije se tato nová verze místo původní.
- Přepisování metod se provádí jednoduše tím, že v dceřiné třídě vytvoříme metodu se stejným názvem jako v rodičovské třídě.

::left::

```php
class Osoba {
  protected string $jmeno;
  protected string $prijmeni;
  
  // konstruktor a další metody...
  
  public function zobrazInformace(): string {
    return "Osoba: {$this->jmeno} {$this->prijmeni}";
  }
}

```

::right::

```php
class Student extends Osoba {
  private string $cisloStudenta;
  
  // konstruktor...
  
  // Přepsání metody z rodičovské třídy
  public function zobrazInformace(): string {
    return "Student: {$this->jmeno} {$this->prijmeni}, " . 
           "číslo studenta: {$this->cisloStudenta}";
  }
}
```

---

# Volání rodičovské metody

- V dceřiné třídě můžeme volat metody rodičovské třídy pomocí `parent::`.
- To je užitečné, pokud chceme rozšířit funkčnost rodičovské metody, ale zároveň zachovat její původní chování.

```php
class Student extends Osoba {
  private string $cisloStudenta;
  
  // konstruktor...
  
  // Volání rodičovské metody a rozšíření její funkčnosti
  public function zobrazInformace(): string {
    // Nejprve získám výstup z rodičovské metody
    $info = parent::zobrazInformace();
    
    // Následně přidám vlastní informace
    return $info . ", číslo studenta: {$this->cisloStudenta}";
  }
}
```

---

# Shrnutí

- Dědičnost je klíčový koncept v objektově orientovaném programování.
- `extends` se používá k vytvoření dceřiných tříd.
- Potomek dědí vlastnosti a metody rodiče.
- Můžeme metody přepisovat (overriding).
- Pomocí `parent::` lze volat metody rodičovské třídy.
- Využíváme datově striktní typování, gettery a settery pro zapouzdření.

---
src: '../../pages/thanku.md'
---