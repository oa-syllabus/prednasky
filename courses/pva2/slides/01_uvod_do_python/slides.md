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
title: "01 Úvod do Python"
exportFilename: "01_uvod_do_python"
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

# Úvod do Python

* Nenaučíme se dost na to, abyste mohli začít přidávat speciální efekty do dalšího velkého filmu o superhrdinech.
* Naučíte se dost na to, abyste mohli začít řešit problémy reálného světa pomocí kódu.
* NEBO se prostě začít bavit


---

# Historie a základní informace

* První zmínky v 1991
* Autor: Guido van Rossum, Math institute Stiching, Holand
* Vychází z jazyka ABC
* Název: Monty Python's Flying Circus
* Operační systémy: Linux, Windows, macOS a další
* Web: python.org
* Python 2 vs Python 3

---

# K čemu se používá Python

* vývoj webových stránek (backend tj. na straně serveru)
* vývoj softwaru
* matematika
* systémové skriptování
* Datové analýzy
* IoT
* Umělá inteligence

---

# IDE
Integrated Development Environment

* PyCharm Community https://www.jetbrains.com/pycharm/
* Visual Studio Code Extension: Python, pylint
* Visual Studio Python Tools for Visual Studio (součást instalátoru)

---

# PyCharm
## Nastavení IDE
praktická ukázka

---

# Na každém znaku záleží
## Česká klávesnice

<img src="/klavesnice_cs.png" />

---

## Anglická klávesnice
<img src="/klavesnice_en.png" />

---

# První program
```python
print("Hello World")
```
---

# Odsazení
* Odsazení se týká mezer na začátku řádku kódu.
* Zatímco v jiných programovacích jazycích slouží odsazení v kódu pouze ke zlepšení čitelnosti, v jazyce Python je odsazení velmi důležité.
* Odsazení používá k označení bloku kódu.
* Počet mezer záleží na programátorovi, ale musí být minimálně jedna. Standardně 4, resp. tabulátor
    
```python
if 5 > 2:
    print("Pět je větší než dva!")
```

---

# Osvojte si správné návyky ihned!

* Komentáře v kódu pomáhají vám nebo někomu jinému porozumět
  * co váš program dělá
  * Co dělá konkrétní řádek nebo část kódu
  * Proč jste se rozhodli udělat něco určitým způsobem
  * Cokoli, co by mohlo být užitečné vědět, pokud se na kód budu později dívat a snažit se ho pochopit!


---
layout: two-cols-header
---

# Komentáře
* Komentáře slouží pro dokumentování kódu
* Začínají znakem <kbd>#</kbd> (sharp)
* Pravý <kbd>AltGr</kbd> + <kbd>x</kbd>

::left::

## Jednořádkový komentář
* <kbd>#</kbd> před každým komentářem

```python
# Komentář na jeden řádek
# Druhý řádek s komentářem
var = 5 # Komentář za kód
```

::right::

## Víceřádkový komentář 
* na začátku a konci tři dvojité uvozovky <kbd>"""</kbd>
```python
"""
Komentář
rozepsaný na
více
řádků
Hello World
"""
```

---
src: '../../pages/thanku.md'
---