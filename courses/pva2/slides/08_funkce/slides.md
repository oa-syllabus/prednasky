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
title: "08 Funkce"
exportFilename: "08_funkce"
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

# Využití funkce

- Funkce jsou vhodný způsob jak rozdělit kód do užitečných bloků.
- Zlepšuje přehlednost a čitelnost zdrojového kódu.
- Umožňuje opakovaně využít část kódu.
- Umožňuje předávat parametry a získávat návratové hodnoty.

---

# Deklarace funkce

- Pro definici funkce se využitá klíčové slovo `def`,
- následuje název funkce a v závorce seznam formálních parametrů. Parametry mohou být i prázdné.
- Deklarace je ukončena dvojtečkou.
- Příkazy tvoří tělo funkce, začínají na dalším řádku a musí být odsazeny.

```python
# funkce s názvem mojeFunkce
def mojeFunkce():
    # Kód musí být odsazen
    return "Ahoj"
```

---

# Návratová hodnota

- Funkce může vracet hodnotu pomocí klíčového slova `return`.
- Pokud funkce nemá `return`, vrací `None`.
- Po `return` se může vyskytovat pouze jedna hodnota.
- Po `return` se funkce ukončí a další příkazy se nevykonají.
- Vrácenou hodnotu můžete použít k přiřazení do proměnné nebo ji jen vypsat.

```python
# funkce s názvem mojeFunkce
def mojeFunkce():
    # Kód musí být odsazen
    return "Ahoj"
    print("Tento řádek se nevykoná")
```

```python
def sumTwoValues(a, b):
  return a + b

# Do proměnné c přiřazen výsledek funkce sumTwoValues
c = sumTwoValues(3, 12) 
```

---

# Deklarace funkce s datovými typy

- Při deklaraci funkce můžeme uvést datové typy parametrů a návratové hodnoty.
- Slouží jako dokumentace a pomáhají s kontrolou kódu.
- Datové typy se uvádí za název parametru za dvojtečku tzn. `parametr: typ`.
- Při použití výchozí hodnoty za rovnítkem `=` tzn. `parametr: typ = vychozi_hodnota`.
- Návratový typ se uvádí za závorkou s parametry za šipkou `->`.
- Datové typy mohou být libovolné, včetně vlastních tříd.

````md magic-move
```python
def pozdrav(jmeno, cislo = 1):
    return "Ahoj " + jmeno + ", tvoje číslo je " + str(cislo)
```
```python
def pozdrav(jmeno: str, cislo: int = 1) -> str:
    return "Ahoj " + jmeno + ", tvoje číslo je " + str(cislo)
```
````

---
layout: cover
background: https://cover.sli.dev
---

# Použití funkce

---

# Volání funkce

- Funkce se používá voláním pomocí jejího názvu a závorek.
- Pokud funkce přijímá parametry, je nutné je předat v závorkách.
- Pokud funkce vrací hodnotu, je možné ji uložit do proměnné.
- Hodnotu lze také přímo vypisovat nebo používat v dalších výrazech.
- Ve funkci můžeme volat i jiné funkce.
- Funkci `print()` ve funkcích nevoláme, ale předáváme jí hodnoty k vypsání.

```python
# funkce s názvem mojeFunkce
def mojeFunkce() -> str:
    # Kód musí být odsazen
    return "Ahoj"
```

```python
# Volání funkce přes název
mojeFunkce() # Volání funkce

var = mojeFunkce() # Volání funkce, výsledek uložen do proměnné var

print( mojeFunkce() ) # Vypíše Ahoj
```

---
hideInToc: true
---

# Volání funkce

```python
# funkce s názvem mojeFunkce
def mojeFunkce() -> str:
    # Kód musí být odsazen
    return "Ahoj"
```

```python
# zavoláme funkci pětkrát
for i in range(5):
    mojeFunkce() 
```

## Volání funkce bez uložení návratové hodnoty
- Funkci můžeme volat i bez uložení návratové hodnoty.
- To je užitečné, pokud nás zajímá pouze efekt funkce, nikoli její výstup.
- Datový typ návratové hodnoty uvádíme jako `None`.

```python
# funkce s názvem pozdrav
def pozdrav(jmeno: str) -> None:
    print("Ahoj " + jmeno)
```

---
layout: cover
background: https://cover.sli.dev
---

# Parametry a argumenty


---

# Parametry funkce

- Parametry jsou hodnoty, které funkce přijímá a jsou nutné pro vykonání funkce.
- Uvádíme v závorce a odděleny čárkou.
- Parametry mají pouze lokální platnost.
- Můžeme nastavit výchozí hodnotu parametru přiřazení hodnoty za `=`

```python
def pozdrav(jmeno: str = "Nezadáno") -> str:
    return "Ahoj " + jmeno
```

```python
print ( pozdrav("Adam") ) # Ahoj Adam
print ( pozdrav() )       # Ahoj Nezadáno
```

---

# Parametry funkce

```python
def mojeFunkce(parameter, secondParam):
  return parameter + " " + secondParam

mojeFunkce("argument") # vrátí chybu TypeError
```

- Ve výchozím nastavení musí být funkce volána se správným počtem parametrů. Pokud funkce očekává 2 parametry, musíte ji zavolat se 2 argumenty.
- nebo můžeme využít výchozí hodnotu parametru

---

# Výchozí hodnota parametru

- Můžeme nastavit výchozí hodnotu parametru přiřazení hodnoty za `=`
- Pokud není parametr předán, použije se výchozí hodnota.
- Parametry se přebírají v pořadí, není-li určeno jinak.



```python
# Výchozí hodnota parametru
def pozdrav(jmeno: str = "UN") -> str:
    return "Ahoj " + jmeno
    
print ( pozdrav() ) # Ahoj UN
```

```python
def multiply(a: int, b:int = 2, c: int = 1) -> int:
    return a * b + c

multiply(3, 14, 10) # Všechny argumenty

multiply(3) # Jeden povinný argument a

multiply(3, 14) # Předány dva argumenty a, b
multiply(3, c=10) # Předány dva argumenty a, c
```

---

# Klíčová slova jako argumenty

- Pokud chcete předat argumenty do funkce, ale nechcete si pamatovat pořadí, můžete použít klíčová slova `kwArg = hodnota`
- Klíčová slova musí být uvedena po pozicích argumentů.
- Klíčová slova mohou být v libovolném pořadí.

````md magic-move
```python
def cat(food, state='stále hladová', action='mňau'):
    print("-- Tahle kočka by nechtěla", action, end=' ')
    print("kdybyste ji dali", food)
    print("-- krásná srst", breed)
    print("-- To je", state, "!")
    
    
cat('kuře')                         # 1 argument dle pozice
cat(food='kuře')                    # 1 argument klíčové slovo
cat(food='rybu', action='kousat')   # 2 kwarg
cat(action='kousat', food='rybu')   # 2 kwarg
cat('beef', 'šťastná', 'syčet')     # 3 poziční argument
cat('objetí', state='vrní')         # 1 poziční, 1 klíčové slovo
```

```python
def cat(food: str, state: str='stále hladová', action:str='mňau') -> None:
    print("-- Tahle kočka by nechtěla", action, end=' ')
    print("kdybyste ji dali", food)
    print("-- krásná srst", breed)
    print("-- To je", state, "!")
    
    
cat('kuře')                         # 1 argument dle pozice
cat(food='kuře')                    # 1 argument klíčové slovo
cat(food='rybu', action='kousat')   # 2 kwarg
cat(action='kousat', food='rybu')   # 2 kwarg
cat('beef', 'šťastná', 'syčet')     # 3 poziční argument
cat('objetí', state='vrní')         # 1 poziční, 1 klíčové slovo
```
````

---

# Side effect

- Funkce je bez tzv. **vedlejších efektů** (side effect), tj. používá pouze své parametry a nepoužívá žádné proměnné definované mimo ni (např. vstup od uživatele). Stejně tak mimo návratové hodnoty nijak neovlivňuje běh programu. 
- Funkci bez vedlejších efektů se říká čistá funkce (pure function). Její výhodou je, že pro stejný vstup vždy vrací stejný výstup, což například usnadňuje testování nebo hledání chyby.

```python
# Špinavá funkce
# čte proměnnou "zvenku". 
# Může tedy v různých situacích vracet různé výsledky.

exchange_rate = 26
def convert_to_euro(crown: float) -> float:
    return crown * exchange_rate

```

```python
# Takto uvedená funkce je již čistou funkcí.
def convert_to_euro(crown: float, exchange_rate: float) -> float:
    return crown * exchange_rate
```

---

# Rekurze

- Rekurze je technika, kdy funkce volá sama sebe.
- Rekurze je užitečná pro řešení problémů, které lze rozdělit na menší části.
- Rekurze může být náročná na paměť, pokud je hloubka rekurze příliš velká.
- Rekurze musí mít podmínku ukončení, aby se zabránilo nekonečnému volání.

```python
def factorial(n: int) -> int:
    if n == 1:
        return 1
    else:
        return n * factorial(n-1)
```

---
layout: cover
background: https://cover.sli.dev
---

# Dokumentace funkcí

---

# Dokumentační řetězce `docstring`

- Docstring je speciální textový řetězec, který slouží k dokumentaci funkce, třídy nebo modulu.
- Píše se hned za hlavičku funkce (pod deklaraci `def`).
- Docstring se uzavírá do trojitých uvozovek `"""` nebo `'''`.
- Pomáhá pochopit, co funkce dělá, jaké má parametry a co vrací.
- Docstring lze zobrazit příkazem `help()` nebo přes .`__doc__`.
- Dodržujeme konvenci [PEP 257](https://www.python.org/dev/peps/pep-0257/):
  - Krátký popis funkce.
  - Prázdný řádek.
  - Detailní popis funkce.
  - Seznam parametrů s jejich popisem.
  - Popis návratové hodnoty.

---

# Příklad docstringu

```python
def pozdrav(jmeno: str) -> str:
    """
    Vrátí pozdrav pro zadané jméno.
    
    Parametry:
        jmeno (str): jméno osoby, která má být pozdravena.
    
    Návratová hodnota:
        str: text pozdravu.
    """
    return f"Ahoj {jmeno}!"
```

```python
print( pozdrav("Adam") )
print( help(pozdrav) )
print( pozdrav.__doc__ )
```

---

# Shrnutí

- Funkce jsou bloky kódu, které lze opakovaně volat.
- **Parametry** jsou proměnné uvedené v deklaraci funkce.
  - mohou mít výchozí hodnoty
  - lze je předávat pomocí klíčových slov kwArg v libovolném pořadí
- **Argumenty** jsou hodnoty předané funkci při jejím volání.
- Návratová hodnota se určuje pomocí klíčového slova `return`. 
- Parametry i výstupní hodnoty mohou mít určené datové typy. Nemá-li funkce `return`, vrací `None`.
- Popisujeme docstringem a držíme se konvence **PEP 257** – krátký popis, prázdný řádek, detaily, parametry, návratová hodnota.
- Funkce by měly být co nejvíce čisté, **bez vedlejších efektů**.
- **Rekurze** je technika, kdy funkce volá sama sebe.


---
src: '../../pages/thanku.md'
---