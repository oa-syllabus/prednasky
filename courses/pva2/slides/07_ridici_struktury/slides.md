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
title: "Řídicí struktury"
exportFilename: "07_ridici_struktury"
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

<Toc :columns="3" minDepth="1" maxDepth="1"></Toc>
---

# Úvod

- Operátory - porovnávací, logické a členské
- Podmínky `if`, `elif`, `else`
- Cykly
  - `for`
  - `while`
  - náhrada `do while`
- Řízení cyklu - `break`, `continue`, `pass`, `else`

---
layout: two-cols-header
---

# Porovnávací operátory

- Porovnají dvě hodnoty, výsledkem je vždy `True` nebo `False`.

::left::

| Operátor | Význam | Příklad | Výsledek |
|---|---|---|---|
| `==` | rovná se | `5 == 5` | `True` |
| `!=` | nerovná se | `5 != 3` | `True` |
| `<` | menší než | `3 < 5` | `True` |
| `>` | větší než | `3 > 5` | `False` |
| `<=` | menší nebo rovno | `5 <= 5` | `True` |
| `>=` | větší nebo rovno | `4 >= 5` | `False` |

::right::

- Pozor: `=` je přiřazení (`x = 5`), `==` je porovnání (`x == 5`).
- Python umí porovnání řetězit: `0 < x < 10` znamená `0 < x and x < 10`.

---

# Logické operátory

- `and` - logický součin, výsledek je `True` jen když platí **obě** strany
- `or` - logický součet, výsledek je `True` když platí **alespoň jedna** strana
- `not` - negace, obrátí `True` na `False` a naopak

```python
vek = 17
ma_souhlas_rodicu = True

print(vek >= 18 and ma_souhlas_rodicu)  # False
print(vek >= 18 or ma_souhlas_rodicu)   # True
print(not ma_souhlas_rodicu)            # False
```

---

# Členské operátory

- `in` - je prvek v kolekci (seznam, n-tice, množina, klíče slovníku, text)?
- `not in` - není prvek v kolekci?

```python
ovoce = ["jablko", "banán", "třešeň"]

print("banán" in ovoce)        # True
print("hruška" not in ovoce)   # True
print("dam" in "Adam")         # True - u textu hledá podřetězec
```

---
layout: cover
background: https://cover.sli.dev
---

# Podmínky

---

# Podmínka `if`

- Podmínka je výraz, jehož výsledkem je `True` nebo `False`.
- Tělo podmínky se provede jen tehdy, když je podmínka splněna.
- Hlavička začíná klíčovým slovem `if` a končí dvojtečkou `:`.
- Tělo podmínky musí být odsazené - standardně **4 mezery** ([PEP 8](https://peps.python.org/pep-0008/#indentation)).
- Podmínku nepíšeme do závorek, Python je nepotřebuje.

```python
if podminka:
    # tělo podmínky - provede se jen při splnění podmínky
    prikaz()
```

```python
a = 200
b = 100
if a > b:
    print("a je větší než b")  # Vypíše "a je větší než b"
```

---

# `else`

- `else` - provede se, když podmínka **není** splněna.
- Nemá vlastní podmínku, jen dvojtečku.

```python
a = 200
b = 100
if b > a:
    print("b je větší než a")
else:
    print("b není větší než a")  # Vypíše tuto větev
```

---

# `elif`

- `elif` (zkratka z „else if“) - další podmínka, testuje se jen tehdy, když žádná předchozí neplatila.
- `elif` může být více, `else` na konci je nepovinné.
- Provede se **nejvýše jedna** větev - ta první, jejíž podmínka platí.

```python
a = 200
b = 100
if b > a:
    print("b je větší než a")
elif a == b:
    print("a a b jsou stejné")
else:
    print("a je větší než b")  # Vypíše tuto větev
```

---

# Co vypíše? - pořadí podmínek

```python
body = 92

if body >= 50:
    print("Dostatečně")
elif body >= 70:
    print("Dobře")
elif body >= 90:
    print("Výborně")
```

<v-click>

```text
Dostatečně
```

První splněná podmínka ukončí celé větvení. Podmínky musí jít od nejpřísnější: nejdřív `>= 90`, pak `>= 70`, nakonec `>= 50`.

</v-click>

---
layout: two-cols-header
---

# Skládání podmínek - `and` a `or`

::left::

## `and`

- `True` jen když platí **obě** podmínky

```python
a = 200
b = 100
c = 300

if a > b and c > a:
    print("Obě podmínky jsou splněny")
```

```python
a = 1
b = 0

if a == 1 and b == 1:
    print("ano")
else:
    print("ne")  # Vypíše ne
```

::right::

## `or`

- `True` když platí **alespoň jedna** podmínka

```python
a = 1
b = 0

if a == 1 or b == 1:
    print("ano")  # Vypíše ano
else:
    print("ne")
```

---
layout: cover
background: https://cover.sli.dev
---

# Cykly

---

# Cyklus

- Cyklus opakuje blok kódu. Jeden průchod cyklem se nazývá **iterace**.
  - `for` - projde postupně všechny prvky posloupnosti (seznam, text, `range()`, slovník)
  - `while` - opakuje blok kódu, dokud platí podmínka
  - `do while` - v Pythonu **neexistuje**, nahrazuje se pomocí `while True` a `break`

| Situace | Cyklus |
|---|---|
| Chci projít všechny prvky seznamu nebo textu | `for` |
| Vím předem, kolikrát se má kód opakovat | `for` + `range()` |
| Nevím, kolikrát se bude opakovat (např. dokud uživatel nezadá správnou hodnotu) | `while` |

---

# Cyklus `for`

- Cyklus `for` prochází prvky posloupnosti - seznamu, n-tice, textu, slovníku nebo `range()`.
- V každé iteraci obsahuje proměnná (zde `prvek`) další prvek posloupnosti.

```python
for prvek in posloupnost:
    # tělo cyklu je odsazené
    # provede se jednou pro každý prvek posloupnosti
```

```python
for i in range(5):
    print(i)
```

Výstup:
```text
0
1
2
3
4
```

---

# Vsuvka - funkce `range()`

- `range()` vytvoří posloupnost celých čísel - `range(start, stop, step)`.
- `start` je nepovinný (výchozí `0`), `step` je nepovinný (výchozí `1`).
- Hodnota `stop` se do posloupnosti **nikdy nezahrne**.
- Vrací objekt `range`, ne seznam - čísla vytváří až při procházení. Seznam z něj získáme přes `list(range(5))`.

| Volání | Vytvořená čísla |
|---|---|
| `range(5)` | `0, 1, 2, 3, 4` |
| `range(2, 6)` | `2, 3, 4, 5` |
| `range(0, 10, 2)` | `0, 2, 4, 6, 8` |
| `range(5, 0, -1)` | `5, 4, 3, 2, 1` |

---
layout: two-cols-header
---

# Cyklus `for` - procházení seznamu

- `for` v Pythonu je cyklus typu **foreach** - prochází přímo prvky, index nepotřebujeme.

::left::

## Takto ne

```python
seznam = [10, 50, 75, 80]

for i in range(len(seznam)):
    print(seznam[i])
```

- Zbytečně složité, index tu k ničemu nepotřebujeme.

::right::

## Takto ano

```python
seznam = [10, 50, 75, 80]

for cislo in seznam:
    print(cislo)
```

Výstup:
```text
10
50
75
80
```

---

# Cyklus `for` - když potřebuji i pořadí

- Funkce `enumerate()` vrací dvojice (pořadí, prvek).
- Parametr `start` určí, od kterého čísla se počítá (výchozí `0`).

```python
ovoce = ["jablko", "banán", "třešeň"]

for poradi, kus in enumerate(ovoce, start=1):
    print(poradi, kus)
```

Výstup:
```text
1 jablko
2 banán
3 třešeň
```

---

# Cyklus `for` - procházení textu

- Text je posloupnost znaků, `for` ho prochází znak po znaku.

```python
hello_world = "Hello, World!"

for znak in hello_world:  # Vypíše každý znak na samostatný řádek
    print(znak)
```

```python
text = "programování"
pocet = 0
for znak in text:
    if znak in "aeiouyáéíóúůý":
        pocet += 1
print("Počet samohlásek:", pocet)  # Počet samohlásek: 5
```

---
layout: two-cols-header
---
# Cyklus `for` - procházení kolekcí

::left::
## Seznam

```python
ovoce = ["jablko", "banán", "třešeň"]
for kus in ovoce:
    print(kus)
```

Výstup:
```text
jablko
banán
třešeň
```

::right::

## Slovník

- Samotný `for` prochází jen **klíče**, dvojice klíč-hodnota vrací `.items()`.

```python
osoba = {"jmeno": "Adam", "vek": 40, "plat": 13500.0}
for klic, hodnota in osoba.items():
    print(klic, hodnota)
```

Výstup:
```text
jmeno Adam
vek 40
plat 13500.0
```

---

# Vnořené cykly

- Cyklus může být uvnitř jiného cyklu.
- Vnitřní cyklus proběhne **celý** v každé iteraci vnějšího cyklu.

```python
for radek in range(1, 4):
    for sloupec in range(1, 4):
        print(radek * sloupec, end=" ")
    print()  # po každém řádku odřádkuje
```

Výstup:
```text
1 2 3
2 4 6
3 6 9
```

- `print(..., end=" ")` místo odřádkování vypíše mezeru.

---

# Co vypíše? - `range()`

```python
for i in range(10, 0, -3):
    print(i)
```

<v-click>

```text
10
7
4
1
```

Začíná na `10`, odečítá `3` a skončí před `0`. Hodnota `stop` se nikdy nezahrne.

</v-click>

---
layout: image-right
image: https://cover.sli.dev
---

# Řízení cyklu

- `break`
- `continue`
- `pass`
- `else`

---

# `break`

- `break` - okamžitě ukončí cyklus, program pokračuje kódem za cyklem.
- U vnořených cyklů ukončí jen ten nejvnitřnější.

```python
for i in range(5):
    if i == 3:
        break
    print(i)
```

Výstup:
```text
0
1
2
```

---

# `continue`

- `continue` - přeskočí zbytek těla cyklu a pokračuje další iterací.

```python
for i in range(5):
    if i == 3:
        continue
    print(i)
```

Výstup:
```text
0
1
2
4
```

---

# `pass`

- `pass` - prázdný příkaz, **nedělá nic**.
- Používá se tam, kde Python vyžaduje tělo bloku, ale kód ještě nemáme napsaný.
- Na rozdíl od `continue` nic nepřeskočí.

```python
for i in range(5):
    if i == 3:
        pass  # TODO: doplnit později
    print(i)
```

Výstup:
```text
0
1
2
3
4
```

---
layout: two-cols-header
---

# `else` u cyklu

- `else` za cyklem se provede, když cyklus doběhne **bez** `break`.
- Typické použití je hledání - `else` řeší situaci „nic jsem nenašel“.

::left::

```python
for i in range(3):
    print(i)
else:
    print("Konec")
```

Výstup:
```text
0
1
2
Konec
```

::right::

```python
cisla = [3, 7, 11, 15]
for cislo in cisla:
    if cislo % 2 == 0:
        print("Sudé číslo:", cislo)
        break
else:
    print("Žádné sudé číslo")
```

Výstup:
```text
Žádné sudé číslo
```

Kdyby seznam obsahoval sudé číslo, `break` by cyklus ukončil a `else` by se neprovedlo.

---

# Co vypíše? - `break` a `continue`

```python
for i in range(1, 8):
    if i % 2 == 0:
        continue
    if i > 5:
        break
    print(i)
```

<v-click>

```text
1
3
5
```

Sudá čísla přeskočí `continue`. Při `i = 7` platí `i > 5` a `break` cyklus ukončí.

</v-click>

---
layout: cover
background: https://cover.sli.dev
---

# Cyklus while

---

# Cyklus `while`

- Opakuje blok kódu, **dokud podmínka platí**. Podmínka se kontroluje před každou iterací.
- Tělo cyklu musí změnit něco, na čem podmínka závisí - jinak podmínka platí pořád a vznikne **nekonečná smyčka**. Program pak přerušíme klávesami `Ctrl+C`.

```python
while podminka:
    # tělo cyklu je odsazené
    # opakuje se, dokud podmínka platí
```

```python
i = 1
while i <= 5:
    print(i)  # postupně vypíše 1, 2, 3, 4, 5
    i += 1    # bez tohoto řádku by cyklus nikdy neskončil

print("Konec")
```

---

# Cyklus `while` - neznámý počet opakování

- `while` se hodí tam, kde předem nevíme, kolikrát se cyklus zopakuje.

```python
# Kolik čísel 1, 2, 3, ... musím sečíst, aby součet přesáhl 20?
soucet = 0
cislo = 0
while soucet <= 20:
    cislo += 1
    soucet += cislo

print("Sečetl jsem čísla 1 až", cislo)  # Sečetl jsem čísla 1 až 6
print("Součet:", soucet)                 # Součet: 21
```

---

# Co vypíše? - odsazení

```python
i = 0
while i < 3:
    print(i)
i += 1
```

<v-click>

```text
0
0
0
...
```

Nekonečná smyčka. Řádek `i += 1` není odsazený, takže nepatří do těla cyklu. Hodnota `i` zůstane `0` a podmínka platí pořád.

</v-click>

---

# Náhrada cyklu `do while`

- Cyklus `do while` provede tělo **alespoň jednou** a podmínku kontroluje až na konci.
- Python ho nemá. Nahrazuje se nekonečným cyklem `while True` a příkazem `break`.

```python
while True:
    # tělo cyklu se provede alespoň jednou
    if not podminka:
        break  # podmínka přestala platit, cyklus končí
```

---
hideInToc: true
---

# Náhrada cyklu `do while` - příklad

- Typické použití: opakovaně se ptát, dokud uživatel nezadá platnou hodnotu.

```python
while True:
    vek = int(input("Zadej věk: "))
    if vek >= 0:
        break
    print("Věk nesmí být záporný, zkus to znovu.")

print("Tvůj věk je", vek)
```

Ukázkový běh:
```text
Zadej věk: -5
Věk nesmí být záporný, zkus to znovu.
Zadej věk: 17
Tvůj věk je 17
```

---

# Shrnutí

- Porovnávací operátory porovnají hodnoty, výsledkem je `True` nebo `False`.
- Logické operátory `and`, `or`, `not` spojují a obracejí podmínky, `in` a `not in` testují členství v kolekci.
- Podmínky `if`, `elif`, `else` řídí, která větev programu se provede. Provede se nejvýše jedna větev.
- Cykly
  - `for` prochází prvky posloupnosti, s `range()` opakuje kód daný počet krát
  - `while` opakuje kód, dokud platí podmínka - pozor na nekonečnou smyčku
  - `do while` Python nemá, nahrazuje se pomocí `while True` a `break`
- Řízení cyklu: `break` cyklus ukončí, `continue` přeskočí na další iteraci, `pass` nedělá nic, `else` se provede, když cyklus skončil bez `break`.

---
src: '../../pages/thanku.md'
---
