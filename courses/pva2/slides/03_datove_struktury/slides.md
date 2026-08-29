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


list = [1, 2, 3, 4, 5]
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
print( squares[1:4:2] )   # každý druhý prvek v rozsahu 1-4 tj [4,16]
print( squares[:3] )      # první tři prvky [1, 4, 9]
```

---
layout: two-cols-header
---

# Přidání a změna prvků

- Datová struktura list je typu `mutable` tj. lze měnit její obsah.
- Změna prvku na konkrétním indexu `list[index] = novyPrvek`
- Přidání prvku na konec seznamu `list.append(prvek)`
- Přiřazení je možné k řezům seznamů, stejně jako k jednotlivým prvkům seznamu. Tímto způsobem lze dokonce měnit velikost seznamu nebo jej zcela vymazat.

::left::

<v-click>

```python
cubes = [1, 8, 27, 65, 125]  # hups, chyba
# 4 ** 3  tzn. 4 na 3 je 64, ne 65!

# nahrazení chybné hodnoty
cubes[3] = 64  
cubes[4] = 4**4

# přidání dalšího prvku
cubes.append( 4**5 )  
```

</v-click>

::right::

<v-click>

```python
animals = ["elephant", "lion", "tiger", "giraffe", "monkey", "dog"]  
print(animals)

# Nahrazení dvou položek "lion" a "tiger" jednou "cat"
animals[1:3] = ["cat"]    
print(animals)
```
</v-click>

---

# Odstranění prvků

- Odstranění prvku
    - na konkrétním indexu `del list[index]`
    - podle hodnoty `list.remove(hodnota)`
    - na konkrétním indexu a vrácení hodnoty `list.pop(index)`
- Odstranění všech prvků `list.clear()`





---
hideInToc: true
---

# Odstranění prvků

```python
animals = ["elephant", "lion", "tiger", "giraffe", "monkey", "dog"]  

# Odstranění dvou položek dle indexu 1 a 2
# Podle indexu odpovídá prvkům s hodnotou "lion" a "tiger"
del animals[1:3]
print(animals) # ['elephant', 'giraffe', 'monkey', 'dog‘]

# Smazání všech položek
animals = []
print(animals)
```

---

# Sjednocení

```python
# Sjednocení seznamu
list1 = [1, 2, 3]
list2 = [4, 5, 6]

sjednocenySeznam = list1 + list2
print(sjednocenySeznam)             # [1, 2, 3, 4, 5, 6]

print(sjednocenySeznam + [7, 8, 9]) # [1, 2, 3, 4, 5, 6, 7, 8, 9]

```

---

# Funkce

- `len()` - vrátí délku seznamu
- `max()` - vrátí největší prvek seznamu
- `min()` - vrátí nejmenší prvek seznamu
- `sum()` - vrátí součet prvků seznamu
- `count()` - vrátí počet výskytů prvku v seznamu
- `sorted()` - vrátí seřazený seznam
 
```python
list = [1, 8, 3, 3, 4, 5]

len(list)       # 6
max(list)       # 8
min(list)       # 1
sum(list)       # 24
list.count(3)   # 2
sorted(list)    # [1, 3, 3, 4, 5, 8]
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

- Slovník je datová struktura Pythonu, která je podobná seznamu.
- Slovník je typu `mutable` tj. lze měnit její obsah a  `key-value` tj. obsahuje klíče a hodnoty.
- Zápis klíčů a hodnot oddělených dvojtečkou a jednotlivé položky oddělené čárkou v složených závorkách.
- Klíče mohou být různého typu, ale hodnoty obvykle stejného typu.
- Klíčem může být libovolný neměnný typ. 
- Klíčem mohou být vždy řetězce a čísla; tuply lze použít jako klíče, pokud obsahují pouze neměnné objekty. 
- Jako klíče nelze použít seznamy.
- Stejně jako seznamy, jsou položky indexovány.

---

# Deklarace slovníku

```python
# Vytvoření slovníku
nazevSlovniku = {klic: hodnota, klic2: hodnota2}
osobaV1 = {'jmeno': 'John', 'vek': 36, 'zeme': 'Norway'}

Slovník lze vytvářet i pomocí construktoru dict
osobaV2 = dict(jmeno='John', vek=36, zeme='Norway')

osobaV3 = {
  "name": "John",
  "age": 36,
  "country": "Norway"
}
```

---

# Přístup k prvkům

```python
# Přístup na konkrétní prvek slovníku
# V hranaté závorce se uvádí klíč prvku
nazevSlovniku[klic]

print(osobaV1['jmeno'])     # John
print(osobav1['vek'])       # 36
print(osobaV1['zeme'])      # Norway

print(osobaV2['vek'])       # 36
print(osobaV3['zeme'])      # Norway
```

---

# Metody

- `keys()` vrátí seznam klíčů slovníku
- `values()` vrátí seznam hodnot slovníku
- `items()` vrátí seznam klíčů a hodnot slovníku
- `get()` vrátí hodnotu klíče, pokud klíč existuje, jinak vrátí `None`

```python
osoba = {'jmeno': 'John', 'vek': 36, 'zeme': 'Norway'}

print(osoba.keys())             # ['jmeno', 'vek', 'zeme']
print(osoba.values())           # ['John', 36, 'Norway']
print(osoba.items())            # [('jmeno', 'John'), ('vek', 36), ('zeme', 'Norway')]
print(osoba.get('jmeno'))       # John
print(osoba.get('prijmeni'))    # None
```

---

# Operátor `in`

- Operátor `in` se používá k zjištění, zda klíč nebo hodnota existuje v daném slovníku.
- Vrací `True` pokud klíč nebo hodnota existuje, jinak `False`

```python
osoba = {'jmeno': 'John', 'vek': 36, 'zeme': 'Norway'}

print('jmeno' in osoba)         # True
print('prijmeni' in osoba)      # False
print('John' in osoba)          # False
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
- Tuple je typu `immutable` tj. **nelze měnit** její obsah.
- Zápis čárkou oddělených hodnot v kulatých závorkách.
- Mohou obsahovat položky různých typů, ale obvykle jsou všechny položky v tuple stejného typu.
- Stejně jako seznamy, jsou položky indexovány.

```python
# Vytvoření tuple
nazevTuple = (prvek, druhyPrvek)

# Přístup na konkrétní prvek tuple
# V hranaté závorce se uvádí index prvku
nazevTuple[index]
```

---

# Shrnutí

- Seznam `list` je `mutable` tj. lze měnit její obsah. Zápis čárkou oddělených hodnot v hranatých závorkách `[]`.
- Slovník `dict` je `mutable` tj. lze měnit její obsah a  `key-value` tj. obsahuje klíče a hodnoty. Zápis klíčů a hodnot oddělených dvojtečkou a jednotlivé položky oddělené čárkou v složených závorkách `{}`.
- Tuple `tuple` je `immutable` tj. **nelze měnit** její obsah. Zápis čárkou oddělených hodnot v kulatých závorkách `()`.

---
src: '../../pages/thanku.md'
---