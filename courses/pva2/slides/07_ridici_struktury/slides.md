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
title: "Řídící struktury"
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

<Toc :columns="2" minDepth="1" maxDepth="1"></Toc>
---

# Úvod

- Binární operace
- Podmínky
- Cykly
  - for
  - while
  - do while

---

# Porovnávací operace

- `<` menší než
- `>` větší než
- `==` rovná se
- `>=` větší nebo rovno
- `<=` menší nebo rovno
- `!=` nerovnají se

---

# Logické operátory


- `and` logický součin - obě hodnoty musejí být splněny
- `or`  logický součet - alespoň jedna hodnota musí být splněna
- `not` negace hodnoty

---

# Členské operátory

- `in` - je prvek v kolekci
- `not in` - není prvek v kolekci


---
layout: cover
background: https://cover.sli.dev
---

# Podmínky

---

# Podmínky `if`

- Podmínka je výrok, který je vyhodnocen na pravda nebo nepravda
- Příkazy jsou vykonány pouze pokud je podmínka splněna
- Příkazy musí být odsazeny
- `if` je klíčové slovo
- `:` ukončuje podmínku

```python
if (podminka):
    # Při splnění podmínky je vykonán program za dvojtečkou
    # Příkazy musí být odsazeny
```

---

# Podmínky `if` - příklad

```python
a = 200
b = 100
if (a > b):
    print("a je větší než b") # Vypíše "a je větší než b"
```

---

# `else`

- `else` - vykoná se pokud podmínka není splněna

```python
a = 200
b = 100
if b > a:
  print("b je vetsi nez a")
else:
  print("a je vetsi nez b")
```

---

# `elif`

- `else` - vykoná se pokud podmínka není splněna

```python
a = 200
b = 100
if b > a:
  print("b je vetsi nez a")
elif a == b:
  print("a a b jsou stejne")
else:
  print("a je vetsi nez b")

```

---

# Skládání podmínek - `and`

- `and` - logický součin
- Výsledek je `True` pouze pokud jsou obě podmínky `True`

```python
a = 200
b = 100
c = 300

if (a > b and c > a):
  print("Obě podmínky jsou splněny")
```

```python
a= 1
b= 0

if( a==1 and b==1 ): # Vypíše ne
    print("ano")
else:
    print("ne") 
```

---

# Skládání podmínek - `or`

- `or` - logický součet
- Výsledek je `True` pokud je alespoň jedna podmínka `True`


```python
if( a==1 or b==0 ): # Vypíše ano
    print("ano")
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

- Cyklus je opakování bloku kódu
  - `for` - opakuje blok kódu určitý počet krát
  - `while` - opakuje blok kódu dokud je podmínka splněna
  - `do while` - opakuje blok kódu dokud je podmínka splněna

---

# Cyklus `for`

- Cyklus for se používá k procházení prvky určité posloupnosti, jako jsou seznamy, n-tice, řetězce nebo slovníky.

```python
for i in posloupnost:
    # blok kódu je odsazen
    # provádějte kód s prvkem
    # tento kód se opakuje pro každý prvek v posloupnosti
```


```python
for i in range(5):
    print(i)
``` 

Výstup: 
```python
0
1
2
3
4
```


---

# Vsuvka - funkce `range()`

- `range()` - vytvoří posloupnost čísel

```python
# funkce range generuje sekvenci celých čísel
range(start, stop, step)

# cyklus
# Funkce range(5) vrací seznam[0,1,2,3,4]
# Pro každé číslo i v seznamu
for i in range(5):
	print(i)
```

---

# Cyklus `for` - příklad

- Zobrazení hodnot seznamu

```python
seznam = [10, 50, 75, 80]
 
# Pro každý prvek v seznamu
# Musíme nejprve zjistit délku seznamu len(seznam) a poté prvky projdeme
for x in range( len(seznam) ): 
    print(seznam[x]) 

# Cyklus vrátí:
10
50
75
80
```

---

# Cyklus `for` - příklad přes text

- Zobrazení znaků řetězce

```python
# Python texty jsou hodně podobné seznamům.
hello_world = "Hello, World!"

for ch in hello_world:    # Vytiskne každý znak z hello_world
    print(ch)
```

---
layout: two-cols-header
---
# Cyklus `for` - příklad pro kolekce

- V python sice nemáme klasický for each, ale můžeme použít klasický for pro projití kolekce

::left::
## Seznam

```python
fruits = ['jablko', 'banán', 'třešeň']
for fruit in fruits:
    print(fruit)
```

Výstup:
```
jablko
banán
třešeň
```

::right::

## Slovník

```python

person = {'name': 'Adam', 'age': 40, 'salary': 13500.0}
for key, value in person.items():
    print(key, value)
```

Výstup:
```
name Adam
age 40
salary 13500.0
```


---
layout: image-right
image: https://cover.sli.dev
---

# Možnosti řízení toku

- `break`
- `continue`
- `pass`
- `else`

---

# `break`

- `break` - ukončí cyklus a pokračuje na další kód

```python
for i in range(5):
    if i == 3:
        break
    print(i)
```

Výstup:
```python
0
1
2
```

---


# `continue`

- `continue` - přeskočí zbytek kódu v cyklu a pokračuje další iterací

```python
for i in range(5):
    if i == 3:
        continue
    print(i)
```

Výstup:
```python
0
1
2
4
```

---


# `pass`

- `pass` - pouze přeskočí blok kódu
- často se používá na místě, kde chcete mít správnou syntaxi a definujete strukturu kódu, ale ještě nechcete psát kód.

```python
for i in range(5):
    if i == 3:
        pass
    print(i)
```

Výstup:
```python
0
1
2
3
4
```

---

# `else`

- `else` - blok kódu, který se vykoná po dokončení cyklu

```python
for i in range(5):
    print(i)
else:
    print("Konec")
```

Výstup:
```python
0
1
2
3
4
Konec
```

---
layout: image-right
image: https://cover.sli.dev
---

# While

---

# Cyklus `while`

- Cyklus while opakovaně provádí blok kódu, dokud je splněná určitá podmínka. 
- Nutné ošetřit aby podmínka byla někdy splněna – riziko nekonečné smyčky.


```python
while podminka:
    # vykonávaný kód cyklu je odsazen
    # tento kód se opakuje, dokud je splněna podmínka
    # podmínka se kontroluje na začátku každé iterace
```

```python
sum = 1
while sum <= 10:
    print(sum) # postupně vypíše narůstající součet 1,2,3,...10
    sum += 1

print("Konec")
```

---

# Cyklus do while

- Cyklus do while je podobný cyklu while, ale podmínka se kontroluje až po prvním provedení bloku kódu.
- Používá, když chcete, aby se blok kódu vykonal alespoň jednou, i když podmínka není splněna.
- Python nemá vestavěnou konstrukci do while, ale můžeme ji simulovat pomocí cyklu while a příkazu break.

```python
while True:
    # vykonávaný kód cyklu je odsazen
    # tento kód se opakuje, dokud není splněna podmínka
    if not podminka:
        break
```

---
hideInToc: true

# Cyklus do while - příklad

```python
count = 0
while True:
    print("Počet je:", count)
    count += 1
    if count >= 5:
        break
```

Výstup:
```python
Počet je: 0
Počet je: 1
Počet je: 2
Počet je: 3
Počet je: 4
```


---

# Shrnutí

- Porovnávací operátory slouží k porovnání hodnot
- Logické operátory umožňují kombinovat více podmínek
- Podmínky `if`, `elif`, `else` umožňují řídit tok programu na základě podmínek
- Cyklus
  - `for` umožňuje iteraci přes posloupnosti
  - `while` opakuje blok kódu, dokud je splněna podmínka
  - `do while` zajišťuje, že se blok kódu vykoná alespoň jednou
- Řídící příkazy `break`, `continue`, `pass` a `else` umožňují další kontrolu toku cyklů



---
src: '../../pages/thanku.md'
---