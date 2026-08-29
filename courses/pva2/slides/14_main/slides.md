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
title: "14 Main"
exportFilename: "14_main"
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


# Co je `__name__`

- Python si pro každý soubor (modul) nastaví proměnnou `__name__`.

Platí:

- přímé spuštění souboru → `__name__ == "__main__"`
- import souboru → `__name__ == "nazev_modulu"`

---

# Ukázka: hodnota __name__

`print("Hodnota __name__ je:", __name__)`

Vyzkoušej:
- python demo_name.py
- import z jiného souboru (uvidíš jinou hodnotu)

---

# Problém: kód běží při importu

app.py
```python
def pozdrav(jmeno: str) -> str:
    return f"Ahoj, {jmeno}!"

print(pozdrav("Pepa"))  # spustí se i při importu
```

runner.py
```python
import app
print("Import hotový.")
```
➡️ Import vyvolá i výpis z app.py (nechceme).

---

# Řešení: `main guard`

Opravené app.py:
```python
def pozdrav(jmeno: str) -> str:
    return f"Ahoj, {jmeno}!"

if __name__ == "__main__":
    print(pozdrav("Pepa"))
```

Teď:

- python app.py → vypíše pozdrav
- import app → nic se samo nespustí

---

# Proč funkce `main()`

main() je „dirigent“ programu:
- načte vstupy
- zavolá další funkce
- vypíše výstup
- ošetří chyby / ukončení

Výhody:
- přehlednější program
- snadnější testování
- žádné vedlejší efekty při importu

---

# Doporučená struktura

- pomocné funkce nahoře
- main() řídí tok
- guard úplně dole

```python
def funkce_a():
    ...

def funkce_b():
    ...

def main():
    ...
    funkce_a()
    funkce_b()

if __name__ == "__main__":
    main()
```

---

# Praktický příklad: pozdrav (I/O vs logika)

```python
def nacti_jmeno() -> str:
    return input("Zadej jméno: ").strip()

def pozdrav(jmeno: str) -> str:
    return f"Ahoj, {jmeno}!"

def main():
    jmeno = nacti_jmeno()
    if not jmeno:
        print("Nezadal jsi jméno.")
        return
    print(pozdrav(jmeno))

if __name__ == "__main__":
    main()
```

---

# Aplikace

```python
def vypocet_dph(cena: float, sazba: float = 0.21) -> float:
    return cena * (1 + sazba)

def main():
    cena = float(input("Zadej cenu bez DPH: "))
    print("Cena s DPH:", vypocet_dph(cena))

if __name__ == "__main__":
    main()
```

---

# Použití z jiného souboru

runner.py
```python
from app import vypocet_dph

print(vypocet_dph(100))
print(vypocet_dph(100, 0.12))
```

➡️ Importuješ funkci bez spuštění `main()` z `app.py`.

---

# Časté chyby

Kód v globálu - tzn. mimo funkce
- spustí se při importu
- print("Start")  # běží i při importu

Příliš mnoho logiky v main()
- main() má řídit tok, ne obsahovat vše.

Míchání I/O a logiky
- ideál: výpočty vrací hodnotu
- main() řeší čtení a výpis

---



---
src: '../../pages/thanku.md'
---