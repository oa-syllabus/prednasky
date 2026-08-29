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
title: "Výjimky"
exportFilename: "11_vyjimky"
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

# Výjimky

- Výjimkou `Exception` je mechanismus, kterým Python oznamuje, že během běhu programu nastala chyba.
- Mohou být vyvolány programem nebo interpretrem.
- Takovou chybu se ve vývoji snažíme ošetřit zachycením výjimky `except` blokem.
- Pokud výjimku nezachytíme, program skončí s chybou.


---

# Jak vypadá výjimka?

- Zkusíme spustit následující kód:
```python
a = 10
b = 0
print( a/b ) # Dělení nulou
```

- Co se stane? Interpret Pythonu vyvolá výjimku `ZeroDivisionError`
```python {4}
Traceback (most recent call last):
  File "test.py", line 3, in <module>
    print(a/b)
ZeroDivisionError: division by zero
```

---

# Jak zachytit výjimku?

- Výjimku zachytíme pomocí bloku `try` a `except`
- V bloku `try` se nachází kód, který může vyvolat výjimku
- V bloku `except` zachytíme výjimku a můžeme s ní pracovat
- Pokud výjimka nenastane, blok `except` se neprovede

```python
try:
    a = 10
    b = 0
    print( a/b ) # Dělení nulou
except ZeroDivisionError:
    print("Nelze dělit nulou")
```



---

# Jak číst traceback?

- Traceback ukazuje posloupnost volání funkcí, které vedly k chybě
- Začíná nejnovější volání funkcí a končí nejstarším
- Uvádí název souboru, číslo řádku a kód, který způsobil chybu
- Na konci je uveden typ výjimky a zpráva o chybě

```python
Traceback (most recent call last):
  File "test.py", line 3, in <module>
    print(a/b)
ZeroDivisionError: division by zero
```

- 1️⃣ `File "test.py", line 3` - Název souboru a číslo řádku kde nastala chyba ➡️ Sem se máme při opravě kódu podívat jako první
- 2️⃣ `print(a/b)` - Konkrétní řádek kódu, který způsobil výjimku
- 3️⃣ `ZeroDivisionError: division by zero` - Říká nám, jaký druh chyby nastal a upřesňuje, že se pokoušíme dělit nulou

---

# SyntaxError ≠ výjimka za běhu

> Ne každou chybu lze zachytit

- SyntaxError nelze zachytit pomocí try/except
- try/except řeší jen chyby za běhu programu

```python
# Tohle je SyntaxError – program se ani nespustí
if True
    print("Ahoj")
```

```python
# Tohle je výjimka za běhu
print(10 / 0)
```

---

# Jaké chyby existují?

https://docs.python.org/3/library/exceptions.html#exception-hierarchy


- `ArithmeticError` - Obecná aritmetická chyba
    - `ZeroDivisionError` - Dělení nulou
    - `OverflowError` - Přetečení
    - `FloatingPointError` - Chyba s pohyblivou řádovou čárkou

- `SyntaxError` - Chyba syntaxe
  - `IndentationError` - Chyba odsazení
  - `TabError` - Chyba tabulátoru (kombinování mezer a tabulátorů v odsazení)

---

# Jaké chyby existují?

- `NameError` - Neexistující proměnná
- `TypeError` - Nesprávný typ proměnné
- `ValueError` - Nesprávná hodnota proměnné
- `IndexError` - Index mimo rozsah
- `KeyError` - Klíč neexistuje
- `FileNotFoundError` - Soubor nenalezen
- `ImportError` - Chyba při importu modulu


---

# Jak zachytit všechny výjimky?

> Pozor, typický příklad špatné praxe!

- Pokud chceme zachytit všechny výjimky, můžeme použít blok `except` bez specifikace typu výjimky
- Použitím `as e` uložíme výjimku do proměnné `e` a tu následně zobrazíme uživateli

```python
try:
    a = 10
    b = 0
    print( a/b ) # Dělení nulou
    
# Zachytíme všechny výjimky a uložíme je do proměnné e
except Exception as e:
    print("Chyba:", e)
```

---

# Špatná praxe - chytání všeho

- Někdy se můžeme setkat s kódem, který chytá všechny výjimky bez rozlišení
- Toto není doporučené, protože to může skrýt skutečné chyby v kódu
- Měli bychom vždy zachytávat konkrétní výjimky, které očekáváme

```python
try:
    open("data.txt")
except Exception:
    print("Něco se pokazilo")
```

- nevíme co
- špatně se ladí
- může skrýt chybu v logice

> Chytej co nejkonkrétnější výjimku, kterou očekáváš.

```python
except FileNotFoundError:
    print("Soubor neexistuje")
```

---

# Zachytit více výjimek

- Můžeme zachytit více výjimek pomocí více bloků `except`
- Každý blok `except` zachytí jiný typ výjimky
- Výjimky se zpracovávají shora dolů, takže pokud chceme zachytit konkrétní výjimku, musíme ji mít výše

```python
try:
    a = 10
    b = 0
    print( a/b ) # Dělení nulou
    
# Zachycení konkrétní výjimky
except ZeroDivisionError:
    print("Nelze dělit nulou")
    
# Zachycení nadřazené výjimky skupiny výpočetních chyb
except ArithmeticError: 
  print("Výpočetní chyba")
  
# Zachycení všech výjimek
except Exception as e:
    print("Chyba:", e)
```

---

# Blok `else` a `finally`

- Blok `else` se provede, pokud v bloku `try` nenastala výjimka
- Blok `finally` se provede vždy, bez ohledu na to, zda v bloku `try` nastala výjimka nebo ne

```python
try:
    a = 10
    b = 2
    print( a/b ) # Dělení nulou
except ZeroDivisionError:
    print("Nelze dělit nulou")
except ArithmeticError as e:
    print("Aritmetická chyba:", e)
else:
    print("Vše proběhlo v pořádku")
finally:
    print("Konec programu")
```

---

# Vlastní vyvolání výjimky

- Můžeme vyvolat vlastní výjimku pomocí klíčového slova `raise`
- Výjimku můžeme vyvolat s vlastním textem


```python
try:
    raise Exception("Vlastní chyba")
except Exception as e:
    print("Chyba:", e)
```

<v-click>

```python
def sumSquare(strana):
    if strana > 0:
        return strana ** 2
    else:
        # raise zpracování a vyvolá exception
        # za raise se udává typ výjimky. nejčastěji ValueError
        raise ValueError(f'Délka strany musí být kladná. Zadáno: {strana}')
```
</v-click>

<v-click>

```python
# Zavoláme funkci `sumSquare` s parametrem -5 a očekáváme výjimku `ValueError`
# Vrátí chybu `ValueError: Délka strany musí být kladná. Zadáno: -5`
try:
    print(sumSquare(-5))
except ValueError as e:
    print("Chyba:", e)
```
</v-click>

---

# Využijte podmínky ve svůj prospěch

- Cyklus se bude opakovat neustále dokola, dokud nebude zadáno, co jsme od uživatele požadovali

```python
def numInput():
    while True:
        answer = input('Zadej celé číslo: ')
        try:
          	# Zkusí se provést konverze na číslo
            # Pokud není úspěšná, je vrácena chyba
            return int(answer)
        except ValueError:
            print('Nebylo zadáno celé číslo!')

numInput()
```



---
src: '../../pages/thanku.md'
---