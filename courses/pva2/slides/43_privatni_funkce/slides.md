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
title: "Privátní funkce"
exportFilename: "43_privatni_funkce"
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

# Základní privátní funkce

- Privátní funkce je metoda třídy, ke které nemá přístup zvenčí
- V Pythonu se privátní funkce označuje podtržítkem na začátku názvu `__`
- Privátní funkce je dostupná pouze z třídy, ve které je definována
- První privátní funkce je konstruktor `__init__`

---

# Veřejné vs. privátní funkce

- Veřejné funkce jsou dostupné zvenčí
- Privátní funkce jsou dostupné pouze z třídy

| Typ funkce | Syntaxe          | Přístup       |
|------------|------------------|---------------|
| Veřejná    | `def funkce()`   | Zvenčí        |
| Privátní   | `def __funkce()` | Pouze z třídy |

---

# Příklad

```python
class Auto:
    def __init__(self, spz):
        self.spz = spz
        
    def __start_motor(self):
        print("Motor nastartován")
    
    def jed(self):
        self.__start_motor()
        print("Auto jede")

# Vytvoření instance
auto = Auto("ABC123")
auto.jed()

# Pokus o přímý přístup ke start motoru vyvolá chybu
# auto.__start_motor()  # AttributeError
```

---

# Privátní funkce

- `__init__` - konstruktor, volá se při vytvoření instance
- `__del__` - destruktor, volá se při zrušení instance
- `__str__` - převede objekt na řetězec
- `__len__` - délka objektu
- `__doc__` - dokumentace objektu
- a další viz [dokumentace](https://docs.python.org/3/reference/datamodel.html#special-method-names)

--- 

# `__del__` - destruktor

- Volá se při zrušení instance
- Používá se pro uvolnění zdrojů
- Například zavření souboru, odpojení od databáze

```python
class Auto:
    def __init__(self, znacka, spz):
        self.znacka = znacka
        self.spz = spz

    def __del__(self):
        print(f"Auto {self.znacka} bylo zrušeno")
```

---

# `__str__`
- převede objekt na řetězec
- Používá se pro výpis objektu
- Například pro výpis informací o objektu

```python
class Auto:
    def __init__(self, znacka, spz):
        self.znacka = znacka
        self.spz = spz

    def __str__(self):
        return f"Auto zn. {self.znacka}, SPZ {self.spz}"
```

---

# `__len__`

- Vrací délku objektu
- Používá se pro zjištění délky objektu- 

```python
class Auto:
    def __init__(self, znacka, spz):
        self.znacka = znacka
        self.spz = spz

    def __len__(self):
        return len(self.spz)
```

---

# `__doc__` - dokumentace objektu

- Používá se pro získání dokumentace objektu
- Například pro zobrazení nápovědy

```python
class Auto:
    """Třída Auto"""
    def __init__(self, znacka, spz):
        self.znacka = znacka
        self.spz = spz
```

---

# Příklad

```python
class Auto:
    """Třída Auto"""
    def __init__(self, znacka, spz):
        self.znacka = znacka
        self.spz = spz

    def __str__(self):
        return f"Auto zn. {self.znacka}, SPZ {self.spz}"

    def __len__(self):
        return len(self.spz)

    def __del__(self):
        print(f"Auto {self.znacka} bylo zrušeno")
```

---

# Závěr

- Privátní funkce jsou metody třídy, ke kterým nemá přístup zvenčí
- V Pythonu se privátní funkce označuje podtržítkem na začátku názvu `__`
- Privátní funkce jsou například konstruktor `__init__`, `__del__`, `__str__`, `__len__`, `__doc__` a další




---
src: '../../pages/thanku.md'
---