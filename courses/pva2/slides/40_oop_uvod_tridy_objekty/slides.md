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
title: "OOP - Úvod, Třídy, Objekt"
exportFilename: "40_oop_uvod_tridy_objekty"
titleTemplate: "PVA2 %s by Adam Fišer"
info: |
  ## PVA2 Programování a vývoj aplikací

  Určeno pouze pro výukové účely
  
  [Repository](https://github.com/OA-PVA2-Syllabus/pva2_prednasky) / [Prezentace](https://oa-pva2-syllabus.github.io/pva2_prednasky/)

  Created by [Adam Fišer](https://github.com/AdamFiser)
---
layout: default
---

#  Obsah

<Toc :columns="2" minDepth="1" maxDepth="1"></Toc>
---

# Cíle přednášky

- Pochopit rozdíl mezi třídou a objektem.
- Naučit se, jak vytvořit třídu a objekt v Pythonu.
- Osvojit si základní syntax objektově orientovaného programování (OOP).

---

# Objektově orientované programování

- Doposud jsme programovali v procedurálním stylu
- Objektově orientované programování (OOP) je programovací paradigma
- Pomocí OOP se snažíme modelovat reálný svět
- Hlavními koncepty OOP jsou dědičnost, zapouzdření a polymorfizmus
- Snažíme se psát přehlednější, udržovatelnější kód.

## Rozdíl od procedurálního přístupu

- Procedurální styl: kód seskupený okolo funkcí/procedur.
- OOP styl: kód seskupený do objektů – data (atributy) a funkce (metody) pospolu.

---

# OOP


- V OOP se snažíme rozdělit program do samostatných částí **tříd** a tyto části spolu komunikují pomocí **metod** a **vlastností**
- OOP je založeno na objektech tj. strukturách, které obsahují jak informace (data), tak funkce (metody), které s těmi daty umí pracovat. 
- Hlavním konceptem OOP je svázat data a funkce, které s nimi pracují, do jednoho celku tak, aby k těmto datům neměla přístup žádná jiná část kódu aplikace. 
- V Pythonu je všechno objekt. Přesněji řečeno: všechno, co můžeme uložit do Pythoní proměnné – každá hodnota – je objekt. Čísla, řetězce, funkce, seznamy, soubory, metody, moduly, třídy, matice – všechno jsou objekty. (Nemusí a obecně neplatí pro jiné jazyky)

---

# Třída vs Objekt

- Objekt je něco "živého", co právě teď existuje tzn. má instanci, může něco vykonávat nebo reagovat na jiné objekty.
- Třída je staticky napsaný kód, který se bude teprve vyhodnocovat a po celou dobu zůstává stejný. Jaká si šablona popisující objekt.
- Třída je uživatelem definovaná datová struktura, která spojuje datové členy a metody do jednoho celku.
- Třída je plán/šablona kódu pro vytváření objektů.
- Pomocí třídy můžete vytvořit libovolný počet objektů. Jsme limitování pouze HW zdroji.
- Třída je statická, objekt je „živý“ za běhu programu.

## Příklad
- Třída: Auto
- Objekty: Škoda Octavia, Ford Focus, BMW X5

- Třída: Zvíře
- Objekty: Pes, Kočka, Papoušek

---
layout: cover
background: https://cover.sli.dev
---

# Třída

---
hideInToc: true
---

# Třída

- Třída je základním stavebním prvkem OOP. 
- Jedná se o šablonu, která definuje vlastnosti a chování určitého typu objektu.
- Obsahuje atributy (vlastnosti) a metody (funkce).

<v-click>

> Třída je šablona, podle které vytváříme objekty

</v-click>

<v-click>

- Před název třídy se používá klíčové slovo `class`
- Název tříd se píše s velkým počátečním písmenem
- Jedna třída = jeden soubor, nelze ji rozdělit mezi více.
- Každá třída se zapisuje do samostatného souboru, který je pojmenován stejně, jako název třídy.
- Třída musí být unikátní. V celé aplikaci může existovat pouze jednou.
- Instancí může existovat neomezené množství. Jsme limitováni pouze HW zdroji.

</v-click>



---
hideInToc: true
---

# Třída

- Atributy: Proměnné (property) definující vlastnosti objektu.
- Metody: Funkce nebo procedury, které provádějí určité akce nebo manipulují s atributy třídy.
- Konstruktor: Speciální metoda, která se volá při vytváření nového objektu a inicializuje jeho atributy.
- Destruktor: Speciální metoda, která se volá při zániku objektu a může provádět úklidové operace.

<v-click>

Ukázka třídy `Auto.py`
    
```python
# Vytvoření třídy Auto
# Klíčové slovo class <názevTřídy>
# Název třídy - první písmeno velké
# Název souboru odpovídá názvu třídy, standardně v jednoném čísle

class Auto:
    # Obsah třídy
```

</v-click>

---

# Atributy

- Atributy jsou proměnné, které náleží objektu.
- Atributy se definují v konstruktoru třídy.

<v-click>

Ukázka atributů
    
```python
class Auto:
    # Atribut třídy
    atribut = "hodnota"
    
    znacka = "Škoda"

    # Prázdná hodnota
    model = None        
```

</v-click>

---

# Přístup k atributům

- Atributy třídy se volají pomocí tečkové notace `objekt.atribut`
- Atributy třídy mohou být veřejné, chráněné nebo privátní

```python
# Vytvoření objektu mojeAuto, instance třídy Auto
mojeAuto = Auto()
mojeAuto.znacka = "Škoda"
mojeAuto.model = "Octavia"

print(mojeAuto.znacka) # Škoda
print(mojeAuto.model) # Octavia
```

---

# Přístup k atrubutům ve třídě

- V třídě se na atributy odkazuje pomocí klíčového slova `self`
- `self` je reference na objekt, který je vytvořen z třídy
- `self` je vždy první parametr v metodě

```python
class Auto:
    znacka = "Škoda"
    model = None
    
    def info(self):
        return f"{self.znacka} {self.model}"
```

---

# Konstanty

- jsou atributy, jejichž hodnota se nemění
- definují se jako privátní atributy a pojmenovávají se velkými písmeny
- definují se v těle třídy, mimo metody
- jsou dostupné pouze z třídy, ne z objektu
- volají se pomocí názvu třídy


Ukázka kontant

```python
class Matematika:
    PI = 3.14
```
    
```python
class Auto:
    MAX_RYCHLOST = 250
```


---

# Třída - příklad

```python{1|2-5|7-11|13-15|all}
class Auto:
    # Atributy
    znacka = None
    model = None
    rok_vyroby = None

    # Metoda
    def info(self):
        return f"{self.znacka} {self.model} z roku {self.rok_vyroby}"
```

---
layout: cover
background: https://cover.sli.dev
---

# Objekty

---

# Objekt

- **Objekt je konkrétní instance třídy**
- má vlastnosti (atributy) a chování (metody), které jsme nadefeinovali v třídě
- Objekty mohou spolupracovat mezi sebou
- Objekty mohou být vytvářeny, mazány a modifikovány za běhu programu
- Objekt je vytvořením instance třídy, která je šablonou pro objekt
- Třídu importuje do programu `from soubor import Trida`
---

# Příklad

```python
from auto import Auto  # Import třídy Auto ze souboru auto.py

# Vytvoření objektu auto1, instance třídy Auto
auto1 = Auto() 
```

---

# Více současných instancí stejné třídy 

- Každý objekt má svůj lokální kontext, který platí v jeho vnitřnostech. 
- Můžeme vytvořit mnoho nezávislých instancí té samé třídy a s těmi libovolně manipulovat.
- Instancí můžeme vytvořit dokonce dynamický počet a například je uložit jako prvky pole. 
- Všechny instance jsou uloženy v operační paměti – pozor na disponibilní zdroje.

<v-click>

```python
#objekt = Třída()
pes = Pes()

druhyPes = Pes()

kolie = Pes()
```

</v-click>

---

# Více současných instancí stejné třídy


```python
pavla = Zamestnanec()
pavla.jmeno = "Pavla"

zuzka = Zamestnanec()
zuzka.jmeno = "Zuzana"

zam = Zamestnanec()
zam.jmeno = "Igor"
```

<v-click>

Nebo lépe, s využitím kolekce:
    
```python
zamestnanci = []
zamestnanci.append( Zamestnanec("Pavla") )
zamestnanci.append( Zamestnanec("Zuzana") )
zamestnanci.append( Zamestnanec("Igor") )
```
</v-click>

---

# Přístup k atrubutům objektu

- Atributy objektu se volají pomocí tečkové notace `objekt.atribut`
- Atributy objektu mohou být veřejné, chráněné nebo privátní
- Veřejné atributy jsou dostupné zvenčí, chráněné pouze z třídy a dědičných tříd, privátní pouze z třídy.
- Pokud se pokusíme přistoupit k privátnímu atributu, Python vyhodí chybu `AttributeError`


```python
mojeAuto = Auto()
mojeAuto.model = "Octavia"
print(mojeAuto.info()) # Škoda Octavia
```

---

## Shrnutí

- Třída je šablona, objekt je instance této šablony.
- Atributy definují vlastnosti objektu.
- Metody definují chování objektu.
- Použití `__init__` metody umožňuje inicializaci objektu s počátečními hodnotami.

---
src: '../../pages/thanku.md'
---