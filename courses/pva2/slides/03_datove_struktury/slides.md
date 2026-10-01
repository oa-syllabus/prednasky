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
title: "Datové struktury"
exportFilename: "03_datove_struktury"
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

# Datové struktury

- **Datová struktura** je způsob, jakým jsou data organizována, uložena a zpracována v počítači.
- **Datová struktura** je základní stavební prvek programovacích jazyků.

## Typy datových struktur
- Seznam `list`
- Tuple `tuple`
- Slovník `dict`


---
layout: cover
background: https://cover.sli.dev
---

# Seznam

---
hideInToc: true
---

# Seznam `list`

- Nejuniverzálnější datová struktura Pythonu
- Zápis čárkou oddělených hodnot v hranatých závorkách
- Mohou obsahovat položky různých typů, ale obvykle jsou všechny položky v seznamu stejného typu.
- Stejně jako text, jsou položky indexovány.
- První položka má index 0, druhá 1 atd.
- Položky mohou být měněny, přidávány nebo odebírány.

---

# Vytvoření seznamu

```python
# Vytvoření seznamu
nazevSeznamu = [prvek, druhyPrvek]

# Přístup na konkrétní prvek seznamu
# V hranaté závorce se uvádí index prvku
nazevSeznamu[0]


cisla = [1, 2, 3, 4, 5]
```


```python
txtVariable = 'var'
intVariable = 1918

# Vytvoření seznamu - kombinace hodnot a proměnnými
listFromVar = ['text', 2021, txtVariable, intVariable]

print(listFromVar)
#['text', 2021, 'var', 1918]
```


---
layout: image-right
image: https://cover.sli.dev
---

# Operace se seznamem


---

# Indexy v seznamu

- Každý prvek má kladný index (od začátku) i záporný index (od konce).

```python
squares = [1, 4, 9, 16, 25]
```

| prvek          | 1  | 4  | 9  | 16 | 25 |
|----------------|----|----|----|----|----|
| index          | 0  | 1  | 2  | 3  | 4  |
| záporný index  | -5 | -4 | -3 | -2 | -1 |

- Index mimo rozsah seznamu skončí chybou.

```python
print( squares[5] )   # IndexError: list index out of range
```

---

# Přístup k prvkům

- Stejně jako práce s textem, lze vrátit jen část prvků
- Prvky se indexují od 0
- Na konkrétní prvek se přistupuje pomocí hranatých závorek a čísla indexu
- Lze použít i záporné indexy, které počítají od konce seznamu
- Lze použít i rozsah prvků `[start:stop:step]` Index start je obsažen ve výstupu, ale index stop už ne `<start:stop)`.
- Pokud není uveden start, bere se od začátku seznamu, pokud není uveden stop, bere se do konce seznamu.

```python
squares = [1, 4, 9, 16, 25]

print( squares[0] ) 	  # první prvek - 1
print( squares[-1] ) 	  # poslední prvek - 25
print( squares[3] ) 	  # čtvrtý prvek - 16
print( squares[1:4] )     # rozsah prvků [4, 9, 16]
print( squares[1:4:2] )   # každý druhý prvek z indexů 1 až 3, tj. indexy 1 a 3 - [4, 16]
print( squares[:3] )      # první tři prvky [1, 4, 9]
```

---
layout: two-cols-header
---

# Přidání a změna prvků

- Datová struktura list je typu `mutable` tj. lze měnit její obsah.
- Změna prvku na konkrétním indexu `seznam[index] = novyPrvek`
- Přidání prvku na konec seznamu `seznam.append(prvek)`
- Přiřazení je možné k řezům seznamů, stejně jako k jednotlivým prvkům seznamu. Tímto způsobem lze dokonce měnit velikost seznamu nebo jej zcela vymazat.

::left::

<v-click>

```python
cubes = [1, 8, 27, 65, 125]  # hups, chyba
# 4 ** 3  tzn. 4 na 3 je 64, ne 65!

# nahrazení chybné hodnoty
cubes[3] = 64

# přidání dalšího prvku (6 na 3)
cubes.append( 6**3 )
print(cubes)  # [1, 8, 27, 64, 125, 216]
```

</v-click>

::right::

<v-click>

```python
animals = ["elephant", "lion", "tiger", "giraffe", "monkey", "dog"]  
print(animals)

# Nahrazení dvou položek "lion" a "tiger" jednou "cat"
animals[1:3] = ["cat"]    
print(animals)  # ['elephant', 'cat', 'giraffe', 'monkey', 'dog']
```
</v-click>

---

# Vložení a hledání prvku

- Vložení prvku na konkrétní index `seznam.insert(index, prvek)` – ostatní prvky se posunou.
- Operátor `in` zjistí, zda prvek v seznamu existuje – stejně jako u textu.

```python
ovoce = ['jablko', 'hruška']

ovoce.insert(0, 'banán')        # vloží na index 0
print(ovoce)                    # ['banán', 'jablko', 'hruška']

print('jablko' in ovoce)        # True
print('kiwi' in ovoce)          # False
print('kiwi' not in ovoce)      # True
```

---

# Odstranění prvků

- Odstranění prvku
    - na konkrétním indexu `del seznam[index]`
    - podle hodnoty `seznam.remove(hodnota)`
    - na konkrétním indexu a vrácení hodnoty `seznam.pop(index)`
- Odstranění všech prvků `seznam.clear()`


---
hideInToc: true
---

# Odstranění prvků

```python
animals = ["elephant", "lion", "tiger", "giraffe", "monkey", "dog"]  

# Odstranění dvou položek dle indexu 1 a 2
# Podle indexu odpovídá prvkům s hodnotou "lion" a "tiger"
del animals[1:3]
print(animals) # ['elephant', 'giraffe', 'monkey', 'dog']

# Smazání všech položek
animals.clear()
print(animals) # []
```

---
hideInToc: true
---

# Odstranění prvků – `remove()` a `pop()`

```python
animals = ["elephant", "lion", "tiger", "dog"]

animals.remove("lion")      # odstraní první výskyt hodnoty
print(animals)              # ['elephant', 'tiger', 'dog']

posledni = animals.pop()    # bez indexu odstraní poslední prvek a vrátí ho
print(posledni)             # dog
print(animals)              # ['elephant', 'tiger']

prvni = animals.pop(0)      # odstraní prvek na indexu 0 a vrátí ho
print(prvni)                # elephant
print(animals)              # ['tiger']
```

---

# Spojení a opakování seznamů

```python
# Spojení seznamů
list1 = [1, 2, 3]
list2 = [4, 5, 6]

spojenySeznam = list1 + list2
print(spojenySeznam)             # [1, 2, 3, 4, 5, 6]

print(spojenySeznam + [7, 8, 9]) # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Opakování seznamu
print([0] * 5)                   # [0, 0, 0, 0, 0]
```

---

# Funkce a metody

- **Funkce** – seznam se předává jako argument `funkce(seznam)`
    - `len()` – vrátí délku seznamu
    - `max()`, `min()` – vrátí největší / nejmenší prvek seznamu
    - `sum()` – vrátí součet prvků seznamu (jen pro čísla)
    - `sorted()` – vrátí **nový** seřazený seznam
- **Metody** – volají se tečkou přímo na seznamu `seznam.metoda()`
    - `count()` – vrátí počet výskytů prvku v seznamu
    - `sort()` – seřadí **původní** seznam, nic nevrací
 
```python
cisla = [1, 8, 3, 3, 4, 5]

print( len(cisla) )       # 6
print( max(cisla) )       # 8
print( min(cisla) )       # 1
print( sum(cisla) )       # 24
print( cisla.count(3) )   # 2
print( sorted(cisla) )    # [1, 3, 3, 4, 5, 8]
```

---

# `sorted()` vs. `sort()`

- `sorted(seznam)` vytvoří **nový** seřazený seznam, původní zůstane beze změny.
- `seznam.sort()` seřadí **původní** seznam a vrátí `None`.

```python
cisla = [3, 1, 2]

serazena = sorted(cisla)
print(serazena)   # [1, 2, 3]
print(cisla)      # [3, 1, 2] - původní seznam beze změny

cisla.sort()
print(cisla)      # [1, 2, 3] - seřazen původní seznam

# Častá chyba - sort() nic nevrací
cisla = cisla.sort()
print(cisla)      # None
```

---
layout: cover
background: https://cover.sli.dev
---

# n-tice (Tuple) 

---
hideInToc: true
---

# Tuple `tuple`

- Tuple je datová struktura Pythonu, která je podobná seznamu.
- Tuple je typu `immutable` tj. **nelze měnit** jeho obsah.
- Zápis čárkou oddělených hodnot v kulatých závorkách.
- Stejně jako seznamy, jsou položky indexovány.

```python
# Vytvoření tuple
nazevTuple = (prvek, druhyPrvek)

# Přístup na konkrétní prvek tuple
# V hranaté závorce se uvádí index prvku
nazevTuple[index]
```

---

# Kdy použít tuple

- Pro data, která se po vytvoření **nemají měnit**.
- Typicky pevný záznam – položky bývají různého typu.
- Tuple lze použít jako klíč ve slovníku, seznam ne.
- Funguje indexování, řezy, `len()`, `in` i `count()` – jako u seznamu.

```python
bod = (3, 5)                    # souřadnice x, y
barva = (255, 0, 0)             # RGB červená
datum = (2026, 10, 1)           # rok, měsíc, den
zak = ('Jana', 17, 'B2')        # jméno, věk, třída

print( zak[0] )                 # Jana
print( len(barva) )             # 3
print( 0 in barva )             # True
```

---
hideInToc: true
---

# Tuple – neměnnost a rozbalení

```python
bod = (3, 5)
bod[0] = 10     # TypeError: 'tuple' object does not support item assignment
```

- **Rozbalení** – hodnoty tuple se přiřadí do více proměnných najednou.

```python
bod = (3, 5)
x, y = bod
print(x)        # 3
print(y)        # 5
```

- **Pozor na jednoprvkový tuple** – rozhoduje čárka, ne závorky.

```python
a = (5)
print(type(a))  # <class 'int'>

b = (5,)
print(type(b))  # <class 'tuple'>
```

---
layout: cover
background: https://cover.sli.dev
---

# Slovník

---
hideInToc: true
---

# Slovník `dict`

- Slovník ukládá dvojice **klíč: hodnota** (`key-value`).
- Slovník je typu `mutable` tj. lze měnit jeho obsah.
- Zápis dvojic `klíč: hodnota` oddělených čárkou ve složených závorkách `{}`.
- K hodnotám se přistupuje přes **klíč**, ne přes pořadí (index).
- Klíče ve slovníku jsou jedinečné.
- Klíčem může být libovolný neměnný typ – nejčastěji řetězec, dále číslo nebo tuple (pokud obsahuje pouze neměnné objekty).
- Jako klíče nelze použít seznamy.
- Hodnotou může být cokoliv – text, číslo, seznam i další slovník.

---

# Deklarace slovníku

```python
# Vytvoření slovníku
nazevSlovniku = {klic: hodnota, klic2: hodnota2}
osobaV1 = {'jmeno': 'John', 'vek': 36, 'zeme': 'Norway'}

# Slovník lze vytvořit i konstruktorem dict()
osobaV2 = dict(jmeno='John', vek=36, zeme='Norway')

osobaV3 = {
  "jmeno": "John",
  "vek": 36,
  "zeme": "Norway"
}
```

---

# Přístup k prvkům

```python
# Přístup na konkrétní prvek slovníku
# V hranaté závorce se uvádí klíč prvku
nazevSlovniku[klic]

print(osobaV1['jmeno'])     # John
print(osobaV1['vek'])       # 36
print(osobaV1['zeme'])      # Norway

print(osobaV2['vek'])       # 36
print(osobaV3['zeme'])      # Norway
```

---

# Přidání, změna a odstranění

- Přiřazení do **nového** klíče položku přidá, do **existujícího** klíče změní její hodnotu.
- Odstranění položky `del slovnik[klic]` nebo `slovnik.pop(klic)` (vrátí hodnotu).

```python
osoba = {'jmeno': 'John', 'vek': 36, 'zeme': 'Norway'}

osoba['email'] = 'john@example.com'   # přidání nového klíče
osoba['vek'] = 37                     # změna hodnoty
del osoba['zeme']                     # odstranění klíče

print(osoba)        # {'jmeno': 'John', 'vek': 37, 'email': 'john@example.com'}
print(len(osoba))   # 3

vek = osoba.pop('vek')
print(vek)          # 37
print(osoba)        # {'jmeno': 'John', 'email': 'john@example.com'}
```

---
hideInToc: true
---

# Chybějící klíč

- Přístup přes `[]` k neexistujícímu klíči skončí chybou `KeyError`.
- `get()` chybu nevyhodí – vrátí `None` nebo zadanou výchozí hodnotu.

```python
osoba = {'jmeno': 'John', 'vek': 36}

print(osoba['prijmeni'])                    # KeyError: 'prijmeni'

print(osoba.get('prijmeni'))                # None
print(osoba.get('prijmeni', 'neuvedeno'))   # neuvedeno
print(osoba.get('jmeno', 'neuvedeno'))      # John
```

---

# Metody

- `keys()` vrátí všechny klíče slovníku
- `values()` vrátí všechny hodnoty slovníku
- `items()` vrátí dvojice (klíč, hodnota)
- `get()` vrátí hodnotu klíče, pokud klíč existuje, jinak vrátí `None`
- `keys()`, `values()` a `items()` nevracejí seznam, ale tzv. pohled (`dict_keys` …). Na seznam ho převede `list()`.

```python
osoba = {'jmeno': 'John', 'vek': 36, 'zeme': 'Norway'}

print(osoba.keys())             # dict_keys(['jmeno', 'vek', 'zeme'])
print(osoba.values())           # dict_values(['John', 36, 'Norway'])
print(osoba.items())            # dict_items([('jmeno', 'John'), ('vek', 36), ('zeme', 'Norway')])
print(list(osoba.keys()))       # ['jmeno', 'vek', 'zeme']
print(osoba.get('jmeno'))       # John
print(osoba.get('prijmeni'))    # None
```

---

# Operátor `in`

- Operátor `in` zjistí, zda **klíč** existuje v daném slovníku.
- Vrací `True` pokud klíč existuje, jinak `False`.
- Hodnoty se prohledávají přes `values()`.

```python
osoba = {'jmeno': 'John', 'vek': 36, 'zeme': 'Norway'}

print('jmeno' in osoba)             # True
print('prijmeni' in osoba)          # False
print('John' in osoba)              # False - 'John' není klíč, ale hodnota
print('John' in osoba.values())     # True
```

---
layout: cover
background: https://cover.sli.dev
---

# Kombinace struktur

---
hideInToc: true
---

# Seznam slovníků

- Struktury lze do sebe vnořovat – hodnotou slovníku může být seznam, prvkem seznamu slovník.
- Přístup se řetězí zleva doprava: nejdřív index v seznamu, pak klíč ve slovníku.

```python
trida = [
    {'jmeno': 'Jana', 'vek': 17, 'znamky': [1, 2, 1]},
    {'jmeno': 'Petr', 'vek': 18, 'znamky': [3, 2]},
]

print( trida[0]['jmeno'] )          # Jana
print( trida[1]['znamky'][0] )      # 3
print( len(trida) )                 # 2

trida.append({'jmeno': 'Eva', 'vek': 17, 'znamky': []})
print( len(trida) )                 # 3
```

- Procházení všech žáků najednou umožní cyklus `for` – přednáška Řídicí struktury.

---

# Shrnutí

- Seznam `list` je `mutable` tj. lze měnit jeho obsah. Zápis čárkou oddělených hodnot v hranatých závorkách `[]`.
- Tuple `tuple` je `immutable` tj. **nelze měnit** jeho obsah. Zápis čárkou oddělených hodnot v kulatých závorkách `()`.
- Slovník `dict` je `mutable` tj. lze měnit jeho obsah a  `key-value` tj. obsahuje klíče a hodnoty. Zápis klíčů a hodnot oddělených dvojtečkou a jednotlivé položky oddělené čárkou v složených závorkách `{}`.

---
src: '../../pages/thanku.md'
---
