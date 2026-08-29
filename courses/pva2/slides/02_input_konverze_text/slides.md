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
title: &title "02 Input, konverze a práce s textem"
exportFilename: "02_input_konverze_text"
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

# `input()`
```python
# Příkaz input() vyžádá zadání vstupu od uživatele
input("Zpráva pro uživatele")

# Vyžádání vstupu a uložení do proměnné username
username = input("Zadej uživatelské jméno: ")

print(username) # Vrátí zadanou hodnotu uživatele
```


---
layout: section
---

# Konverze datových typů

---

# Konverze

```python {1|2|3|4-9|}
int(x) 		# konverze na integer
float(x)	# konverze na float
str(x)		# konverze na string


floatNumber = 14.0
print(floatNumber) # 14.0
print(int(floatNumber)) # 14
print(type(int(floatNumber))) # <class 'int'>
```

<!-- 
Existuje několik vestavěných funkcí, které umožňují převést jeden datový typ na jiný. 

Tyto funkce vracejí nový objekt reprezentující převedenou hodnotu. 

int(x) převede x na celé číslo. 

float(x) převede x na číslo s pohyblivou řádovou čárkou. 

str(x) převede objekt x na řetězcovou reprezentaci.
-->

---

# Konverze a text

```python
number = 9.0
result = number / 2 #dělení
remainder = number % 2 #modulo

# skládání textového řetězce využitím 
print("result = " + str(result)) # 4.5
print("remainder = " + str(remainder)) #1
```
---

# Konverze vs. input

* Pozor na vstup od uživatele s využitím příkazu input
* Zadaná hodnota je vždy datového typu string
* U čísel je vždy nutná konverze

---
layout: section
---

# Rozšířené přiřazení a operace

---

# Rozšířené přiřazení

* Rozšířené přiřazení je jediný příkaz kombinující binární operaci a příkaz přiřazení, například +=, -= atd.
* Rozšířený přiřazovací výraz jako x += 1 lze přepsat jako x = x + 1, čímž se dosáhne podobného efektu.

```python
number = 9.0
print("number = " + str(number))

number -= 2
print("number = " + str(number)) # 7.0

number += 5
print("number = " + str(number)) # 12.0
```

---
layout: two-cols-header
---

# Binární operace

* Binární operace jsou operace, které vyžadují dva operandy.
* Operandy jsou hodnoty, na kterých se provádí operace.
* Binární operace mohou být aritmetické, relační, logické nebo bitové.
* Aritmetické operace: sčítání, odčítání, násobení, dělení, modulo, mocnina
* Relační operace: rovná se, nerovná se, menší než, větší než, menší nebo rovno, větší nebo rovno
* Logické operace: a, nebo, negace
* Bitové operace: a, nebo, negace, posun
* Příklady: `+`, `-`, `*`, `/`, `%`, `**`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `and`, `or`, `not`, `&`, `|`, `~`, `<<`, `>>`

<!--
* Logické operace rozlišují pouze mezi hodnotami True a False.
* Porovnávací operátor rovnosti ==
-->

```python
two = 2
three = 3
isEqual = two == three
print(isEqual) #False
```
---

# Logické binární operace

* `<` menší než
* `>` větší než
* `==` rovná se
* `>=` větší nebo rovno
* `<=` menší nebo rovno
* `!=` nerovnají se

```python
one = 1
two = 2
three = 3

# Toto zřetězené porovnání znamená, že (jedna < dvě) a (dvě < tři)
# vyhodnocení porovnání se provádí současně.
print(one < two < three)

isGreater = three > two
print(isGreater)

```

---
layout: section
---

# Zpracování textu

---

# Řetězení textu

```python
hello = "Hello"
world = 'World'

hello_world = hello + " " + world
print(hello_world)      # Hello World
```
---

# Multiplikace

```python
hello = "hello"
tenOfHellos = hello * 10
print(tenOfHellos) # hellohellohellohellohellohellohellohellohellohello

```
---

# Indexování řetězců

* Ke znaku v řetězci můžete přistupovat, pokud znáte jeho pozici.
* Například příkaz str[index] zobrazí znak na pozici index v řetězci str. 
* Indexování řetězců začíná vždy od 0. 
* Index vyvolá chybu ValueError, pokud se x v řetězci nenachází.
* Indexy mohou být také záporná čísla, pokud potřebujete začít počítat zprava (tj. od konce řetězce). 
* Všimněte si, že jelikož -0 je totéž co 0 , záporné indexy začínají od -1.

```python
text = "This is a very long string!"
  

firstLetter = text[0] # Indexování začíná od 0
print(firstLetter) #T

lastLetter = text[-1] # !
print(lastLetter) # !
```

---

# Podřetězce

```python
str[start:end] # položky start až end-1
str[start:] # položky od začátku do konce pole
str[:end] # položky od začátku do konce-1
str[:] # kopie celého pole
```

```python
monty_python = "Monty Python"
monty = monty_python[:5] #ekvivalentní zápis monty_python[0:5]
print(monty) #Monty

python = monty_python[6:]
print(python) #Python
```

---

# Operátor `in`

```python
ice_cream = "ice cream"
print("cream" in ice_cream)    # Boolean True

contains = "ice" in ice_cream
print(contains) #True

```

---

# Délka řetězce

* Délka řetězce je vypočtena příkazem `len()`
* Příkaz `len()` vrátí počet znaků v řetězci

```python
text = "Příliš žluťoučký kůň úpěl ďábelské ódy"
textLenght = len(text)
print(textLenght) #38
```

---

# Escape sekvence

* Escape sekvence jsou speciální znaky, které se používají k vytvoření speciálních znaků v řetězci.
* Například znak nového řádku se zapisuje jako `\n`
* Znak tabulátoru se zapisuje jako `\t`
* Znak zpětného lomítka se zapisuje jako `\\`

* Zpětné lomítko se používá k vynechání speciálních znaků
* "It\'s me\"
* "She said \"Hello\""
* Pokud chcete vypsat zpětné lomítko, musíte jej také escapovat tzn. print('\\')
* Speciální symbol '\n' je používán pro nový řádek a '\t'‚ jako tabelátor

---
layout: section
---

# Formátování textu

---

# Metody formátování textu

```python
text = "Příliš žluťoučký kůň Řehoř úpěl ďábelské ódy"
print(text.lower()) # všechny znaky budou malé

name = "Adam".upper() # ADAM
print(name)
```

* Metoda `format()` umožňuje vkládat proměnné do řetězce
* Proměnné jsou vkládány do řetězce pomocí složených závorek `{}`

```python
name = "Adam"
print("Hello, My name is {}.".format(name)) # Hello, My name is Adam.
print("Hello, My name is {0}.".format(name)) # Hello, My name is Adam.
print("Hello, My name is {fname}.".format(fname=name")) # Hello, My name is Adam.
print("My name is {fname}, I'm {age}".format(fname = "Adam", age = 18)) # My name is Adam, I'm 18
```

---

## Operátor %

Operátor % za řetězcem slouží ke spojení řetězce s proměnnými.

```python
name = "John"
print("Hello, PyCharm! My name is %s!" % name) # %s pro text

age = 10
print("I'm %d years old" % age) # %d pro celá i reálná čísla
```

---

### F-string

* Formátovaný řetězcový literál neboli f-řetězec je řetězcový literál s předponou 'f' nebo 'F'.
* F-string je způsob formátování řetězců, který umožňuje vkládat proměnné do řetězce pomocí složených závorek `{}`
 * Řetězce mohou obsahovat náhradní pole, což jsou výrazy ohraničené složenými závorkami {}.


```python
name = "Ginger and Fred"
age = "20"
print(f"Hello, My name is {name} and I'm {age} years old.")
```

---
src: '../../pages/thanku.md'
---