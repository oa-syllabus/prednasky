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
title: "Konstruktor"
exportFilename: "41_konstruktor"
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

# Třída bez konstruktoru

```python
class Auto:
    znacka = None
    spz = None
    vin = None
    ...
```

```python
auto = Auto()
auto.znacka = "Škoda"
auto.spz = "4A2 3020"
```
        

---

# Konstruktor

- Konsruktor je speciální metoda třídy
- Má vždy stejný název `__init__` 
- Automaticky se volá při vytváření instance třídy
- Slouží k inicializaci objektu

---

# Syntaxe konstruktoru

```python
class Auto:
    def __init__(self, znacka, model):
        self.znacka = znacka
        self.model = model
```

```python
auto = Auto("Škoda", "Octavia")
```

```python
# Má-li třída konstruktor, nelze vytvořit instanci bez parametrů
auto = Auto() # Vráti chybu
```

---

# Proč konstruktor?

- Inicializace: Konstruktory umožňují nastavit počáteční hodnoty atributů objektu při jeho vytvoření.
- Minimalizace chyb: Zajišťují, že objekt bude mít všechny potřebné atributy správně inicializované.
- Zlepšení čitelnosti kódu: Konstruktory jasně definují, jaké parametry třída potřebuje při vytvoření instanci.
- Zjednodušení správy objektů: Všechny objekty jsou vytvořeny se stejnou základní strukturou, což pomáhá při práci s většími kódy.

---

# Shrnutí

- Konstruktor je speciální metoda třídy
- Má vždy stejný název `__init__`
- Umožňuje zjednodušit správu objektů a minimalizovat chyby



---
src: '../../pages/thanku.md'
---