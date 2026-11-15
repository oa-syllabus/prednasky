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
title: "Funkce"
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

<Toc :columns="3" minDepth="1" maxDepth="1"></Toc>
---

# Úvod

- Proč funkce
- Definice a volání funkce
- Návratová hodnota - `return` a `print`
- Parametry a argumenty
- Typové anotace
- Proměnné ve funkcích - lokální a globální
- Čisté funkce a vedlejší efekty
- Dokumentace funkcí
- Rekurze

Celou přednáškou nás provází jeden příklad: **výpočet ceny objednávky v e-shopu**.

---
layout: two-cols-header
---

# Proč funkce

- Funkce je **pojmenovaný blok kódu**, který můžeme spustit kdykoli a kolikrát chceme.

::left::

## Bez funkce

```python
cenaTricka = 250
print("Tričko:", cenaTricka * 1.21)

cenaMikiny = 690
print("Mikina:", cenaMikiny * 1.21)

cenaCepice = 180
print("Čepice:", cenaCepice * 1.21)
```

- Sazba DPH se změní. Kolik míst musíme opravit?

::right::

## S funkcí

```python
def cenaVcetneDph(cena: float) -> float:
    return cena * 1.21

print("Tričko:", cenaVcetneDph(250))
print("Mikina:", cenaVcetneDph(690))
print("Čepice:", cenaVcetneDph(180))
```

- Výpočet je na **jednom** místě - princip DRY (Don't Repeat Yourself).
- Název funkce říká, **co** kód dělá.
- Funkci lze samostatně otestovat.

---
layout: cover
background: https://cover.sli.dev
---

# Definice a volání funkce

---

# Definice funkce

```python
def cenaVcetneDph(cena: float, sazbaDph: float) -> float:
    vysledek = cena * (1 + sazbaDph)
    return vysledek
```

| Část | Význam |
|---|---|
| `def` | klíčové slovo zahajuje definici, za ním je název funkce |
| `cena: float` | parametr a jeho datový typ, parametry oddělujeme čárkou |
| `-> float:` | datový typ návratové hodnoty, dvojtečka ukončuje hlavičku funkce |
| odsazené řádky | tělo funkce - standardně **4 mezery** |
| `return` | ukončí funkci a vrátí výsledek |

---

# Pojmenování funkcí

- V tomto kurzu píšeme názvy funkcí i proměnných ve stylu **camelCase**: `cenaVcetneDph`, `pocetKusu`.
  - [PEP 8](https://peps.python.org/pep-0008/#function-and-variable-names) doporučuje snake_case (`cena_vcetne_dph`). Důležité je držet **jeden styl** v celém projektu.
- Funkce, která něco dělá, má v názvu sloveso: `vypisUctenku`, `spocitejSlevu`.
- Funkce, která vrací `True`/`False`, se jmenuje jako otázka: `jeSkladem`, `maDopravuZdarma`.
- Funkce musí být definovaná **dříve**, než ji zavoláme.

```python
vypisPozdrav()      # NameError: name 'vypisPozdrav' is not defined

def vypisPozdrav() -> None:
    print("Vítejte v e-shopu")
```

---

# Volání funkce

- Funkci zavoláme jejím názvem a kulatými závorkami `()`.
- Samotná definice nic nespustí. Kód v těle se provede až při volání.
- Při volání program „skočí“ do těla funkce a po jeho dokončení pokračuje za místem volání.
- Průběh si můžeš krokovat v [Python Tutor](https://pythontutor.com/python-compiler.html).

```python
def vypisPozdrav() -> None:
    print("Vítejte v e-shopu")

print("Start")
vypisPozdrav()
vypisPozdrav()
print("Konec")
```

```text
Start
Vítejte v e-shopu
Vítejte v e-shopu
Konec
```

---
layout: cover
background: https://cover.sli.dev
---

# Návratová hodnota

---

# `return`

- `return` předá výsledek zpět na místo, odkud byla funkce zavolána.
- Po `return` funkce **okamžitě skončí**. Kód za ním se neprovede.
- Vrácenou hodnotu můžeme uložit do proměnné, použít ve výrazu nebo předat jiné funkci.

```python
def cenaVcetneDph(cena: float, sazbaDph: float) -> float:
    return cena * (1 + sazbaDph)
    print("Sem se program nikdy nedostane")
```

```python
tricko = cenaVcetneDph(250, 0.21)              # uložení do proměnné
celkem = tricko + cenaVcetneDph(180, 0.21)     # použití ve výrazu
print(cenaVcetneDph(690, 0.21))                # předání funkci print()
```

---
layout: two-cols-header
---

# `return` a `print` nejsou totéž

- `print()` zobrazí hodnotu **uživateli**. Program s ní dál pracovat nemůže.
- `return` předá hodnotu **programu**. Ten ji může uložit, spočítat s ní nebo vypsat.

::left::

## `print` - výsledek se ztratí

```python
def slevaPrint(cena: float) -> None:
    print(cena * 0.9)

x = slevaPrint(100)   # vypíše 90.0
print(x * 2)          # TypeError
```

```text
TypeError: unsupported operand type(s)
for *: 'NoneType' and 'int'
```

::right::

## `return` - výsledek můžeme použít

```python
def slevaReturn(cena: float) -> float:
    return cena * 0.9

x = slevaReturn(100)  # nic nevypíše
print(x * 2)          # 180.0
```

- **Pravidlo:** funkce, která počítá, výsledek **vrací**. Vypisuje až hlavní program.

---

# Funkce bez `return` vrací `None`

- Pokud funkce nemá `return`, vrací speciální hodnotu `None` (nic).
- Takové funkce voláme kvůli tomu, co **udělají** - například něco vypíšou.
- Prázdný `return` funkci předčasně ukončí.

```python
def vypisUctenku(zbozi: str, cena: float) -> None:
    if cena <= 0:
        print("Chybná cena")
        return              # předčasné ukončení funkce
    print(f"{zbozi}: {cena} Kč")

vysledek = vypisUctenku("Tričko", 250)   # vypíše Tričko: 250 Kč
print(vysledek)                          # None
```

---

# Vrácení více hodnot

- Funkce vrací vždy **jeden** objekt.
- Pokud za `return` napíšeme více hodnot oddělených čárkou, vrátí se jako n-tice (`tuple`).
- N-tici můžeme hned při volání rozbalit do více proměnných.

```python
def rozdelCenu(cenaSDph: float, sazbaDph: float) -> tuple[float, float]:
    zaklad = cenaSDph / (1 + sazbaDph)
    dph = cenaSDph - zaklad
    return zaklad, dph

vysledek = rozdelCenu(121, 0.21)
print(vysledek)                 # (100.0, 21.0)

zaklad, dph = rozdelCenu(121, 0.21)
print(zaklad)                   # 100.0
print(dph)                      # 21.0
```

---
layout: two-cols-header
---

# Funkce, které vracejí `True` nebo `False`

- Hodí se pro kontroly a ověřování, výsledek pak použijeme v podmínce.

::left::

## Takto ne

```python
def maDopravuZdarma(cenaObjednavky: float) -> bool:
    if cenaObjednavky >= 1500:
        return True
    else:
        return False
```

- Porovnání už samo vrací `True` nebo `False`.

::right::

## Takto ano

```python
def maDopravuZdarma(cenaObjednavky: float) -> bool:
    return cenaObjednavky >= 1500
```

```python
if maDopravuZdarma(1800):
    print("Doprava zdarma")
else:
    print("Doprava 99 Kč")
```

---

# Co vypíše? - `return`

```python
def zkontroluj(cena: float) -> str:
    if cena > 1000:
        return "drahé"
    return "levné"
    print("hotovo")

print(zkontroluj(1500))
print(zkontroluj(500))
```

<v-click>

```text
drahé
levné
```

První `return` funkci ukončí. Řádek `print("hotovo")` se neprovede nikdy.

</v-click>

---
layout: cover
background: https://cover.sli.dev
---

# Parametry a argumenty

---

# Parametr a argument

- **Parametr** je proměnná v definici funkce. Platí jen uvnitř funkce.
- **Argument** je konkrétní hodnota, kterou předáme při volání.
- Při volání se argumenty přiřadí parametrům: `cena = 250`, `sazbaDph = 0.21`.

```python
# cena a sazbaDph jsou parametry
def cenaVcetneDph(cena: float, sazbaDph: float) -> float:
    return cena * (1 + sazbaDph)

# 250 a 0.21 jsou argumenty
cenaVcetneDph(250, 0.21)
```

- Funkci musíme zavolat se správným počtem argumentů, jinak Python vyvolá výjimku:

```python
cenaVcetneDph(250)
```

```text
TypeError: cenaVcetneDph() missing 1 required positional argument: 'sazbaDph'
```

---

# Výchozí hodnota parametru

- Parametr s výchozí hodnotou je **nepovinný**. Výchozí hodnotu zapíšeme za datový typ a `=`: `sazbaDph: float = 0.21`.
- Pokud argument nepředáme, použije se výchozí hodnota.
- Nepovinné parametry musí být až **za** povinnými.

```python
def cenaVcetneDph(cena: float, sazbaDph: float = 0.21) -> float:
    return cena * (1 + sazbaDph)

cenaVcetneDph(250)          # sazbaDph = 0.21 (základní sazba)
cenaVcetneDph(250, 0.12)    # sazbaDph = 0.12 (snížená sazba)
```

```python
# SyntaxError - povinný parametr cena je za nepovinným
def cenaVcetneDph(sazbaDph: float = 0.21, cena: float) -> float:
    return cena * (1 + sazbaDph)
```

---

# Poziční a pojmenované argumenty

- **Poziční** argumenty se přiřadí parametrům podle pořadí.
- **Pojmenované** argumenty (keyword arguments) zapíšeme jako `nazevParametru=hodnota`. Na pořadí pak nezáleží.
- Pojmenované argumenty se hodí, když má funkce více nepovinných parametrů a chceme nastavit jen některý.
- Pojmenované argumenty musí být až **za** pozičními.

```python
def cenaObjednavky(cena: float, sleva: float = 0, doprava: float = 99) -> float:
    return cena - sleva + doprava

cenaObjednavky(1000)                    # 1099
cenaObjednavky(1000, 100)               # 999
cenaObjednavky(1000, 100, 0)            # 900
cenaObjednavky(1000, doprava=0)         # 1000 - sleva zůstala výchozí
cenaObjednavky(doprava=0, cena=1000)    # 1000 - pořadí pojmenovaných nevadí
```

```python
cenaObjednavky(cena=1000, 100)          # SyntaxError - poziční za pojmenovaným
```

---

# Co vypíše? - argumenty

```python
def popis(zbozi: str, cena: float = 100, mena: str = "Kč") -> str:
    return f"{zbozi}: {cena} {mena}"

print(popis("Tričko"))
print(popis("Mikina", 690))
print(popis("Čepice", mena="EUR"))
```

<v-click>

```text
Tričko: 100 Kč
Mikina: 690 Kč
Čepice: 100 EUR
```

U čepice jsme cenu nepředali, proto se použila výchozí hodnota `100`.

</v-click>

---

# Typové anotace

- Datové typy u parametrů a návratové hodnoty se nazývají **typové anotace**.
- Parametr: `nazev: typ`, s výchozí hodnotou `nazev: typ = hodnota` (zde mezery kolem `=` píšeme).
- Návratový typ za šipkou `->`.

| Anotace | Význam |
|---|---|
| `int`, `float`, `str` | celé číslo, desetinné číslo, text |
| `bool` | `True` nebo `False` |
| `list[str]` | seznam textů |
| `tuple[float, float]` | dvojice čísel |
| `None` | funkce nic nevrací |

---
hideInToc: true
---

# Typové anotace - Python je nekontroluje

- **Pozor:** Python typy při běhu **nekontroluje**. Anotace jsou dokumentace a nápověda pro editor (VS Code, PyCharm) nebo nástroj `mypy`.

```python
def cenaVcetneDph(cena: float, sazbaDph: float = 0.21) -> float:
    return cena * (1 + sazbaDph)

cenaVcetneDph("250")    # editor zvýrazní chybu, Python spadne až uvnitř funkce
```

```text
TypeError: can't multiply sequence by non-int of type 'float'
```

---
layout: cover
background: https://cover.sli.dev
---

# Proměnné ve funkcích

---

# Lokální proměnné

- Parametry a proměnné vytvořené uvnitř funkce jsou **lokální**.
- Vzniknou při zavolání funkce a po jejím skončení zaniknou.
- Mimo funkci nejsou vidět. Výsledek dostaneme ven jen přes `return`.

```python
def cenaVcetneDph(cena: float) -> float:
    sazba = 0.21
    return cena * (1 + sazba)

print(cenaVcetneDph(100))
print(sazba)
```

```text
121.0
NameError: name 'sazba' is not defined
```

---

# Globální proměnné

- Proměnná vytvořená mimo funkce je **globální**. Funkce ji může číst.
- Přiřazení uvnitř funkce vytvoří **novou lokální** proměnnou. Globální proměnná se nezmění.

```python
cena = 1000

def zlevni(cena: float) -> float:
    cena = cena * 0.9       # lokální proměnná cena
    return cena

print(zlevni(500))          # 450.0
print(cena)                 # 1000 - globální proměnná se nezměnila
```

- Klíčové slovo `global` dovolí globální proměnnou ve funkci změnit. **Nepoužíváme ho** - funkce pak závisí na stavu mimo sebe a chyby se špatně hledají.
- Co funkce potřebuje, dostane **parametrem**. Co vytvoří, předá přes **`return`**.

---

# Co vypíše? - lokální a globální proměnná

```python
sleva = 100

def cenaPoSleve(cena: int) -> int:
    sleva = 200
    return cena - sleva

print(cenaPoSleve(1000))
print(sleva)
```

<v-click>

```text
800
100
```

`sleva = 200` uvnitř funkce vytvořila lokální proměnnou. Globální `sleva` zůstala `100`.

</v-click>

---
layout: two-cols-header
---

# Seznam jako argument

- Seznam se do funkce **nekopíruje**. Funkce pracuje se stejným seznamem jako volající.
- Když funkce seznam změní (`append()`, `remove()`), změna je vidět i mimo funkci.

::left::

## Funkce mění předaný seznam

```python
def pridejDoKosiku(kosik: list[str],
                   zbozi: str) -> None:
    kosik.append(zbozi)

muj = ["tričko"]
pridejDoKosiku(muj, "mikina")
print(muj)    # ['tričko', 'mikina']
```

- `-> None` napovídá, že funkce mění vstup.

::right::

## Funkce vrací nový seznam

```python
def bezVyprodanych(kosik: list[str],
                   vyprodane: list[str]) -> list[str]:
    vysledek = []
    for zbozi in kosik:
        if zbozi not in vyprodane:
            vysledek.append(zbozi)
    return vysledek

muj = ["tričko", "mikina", "čepice"]
dostupne = bezVyprodanych(muj, ["mikina"])
print(muj)        # beze změny
print(dostupne)   # ['tričko', 'čepice']
```

---

# Past - seznam jako výchozí hodnota

```python
def pridejPolozku(zbozi: str, kosik: list[str] = []) -> list[str]:
    kosik.append(zbozi)
    return kosik

print(pridejPolozku("tričko"))
print(pridejPolozku("mikina"))
```

<v-click>

```text
['tričko']
['tričko', 'mikina']
```

- Výchozí hodnota se vytvoří **jen jednou** při definici funkce. Všechna volání sdílejí stejný seznam.
- Řešení: výchozí hodnota `None` a nový seznam vytvoříme až uvnitř funkce.

```python
def pridejPolozku(zbozi: str, kosik: list[str] | None = None) -> list[str]:
    if kosik is None:
        kosik = []
    kosik.append(zbozi)
    return kosik
```

</v-click>

---
layout: two-cols-header
---

# Čisté funkce a vedlejší efekty

- **Vedlejší efekt** - funkce mění něco mimo sebe nebo komunikuje s okolím: `print()`, `input()`, změna předaného seznamu, změna globální proměnné, zápis do souboru.
- **Čistá funkce** - výsledek závisí jen na parametrech a nemá vedlejší efekty. Pro stejný vstup vrací vždy stejný výstup, a proto se snadno testuje.

::left::

## Nečistá funkce

```python
kurzEur = 25.0

def naEura(koruny: float) -> float:
    print("Převádím...")       # vedlejší efekt
    return koruny / kurzEur    # závisí na globální proměnné
```

::right::

## Čistá funkce

```python
def naEura(koruny: float, kurzEur: float) -> float:
    return koruny / kurzEur
```

```python
print(naEura(1000, 25.0))      # 40.0
```

---

# Stavba programu s funkcemi

- Každá funkce dělá **jednu věc**. Funkce mohou volat jiné funkce.
- Nahoře jsou definice funkcí, dole hlavní program.
- Hlavní program načte vstup (`input()`), zavolá funkce a vypíše výsledek (`print()`).

```python
def cenaVcetneDph(cena: float, sazbaDph: float = 0.21) -> float:
    return cena * (1 + sazbaDph)

def maDopravuZdarma(cenaObjednavky: float) -> bool:
    return cenaObjednavky >= 1500

def cenaDopravy(cenaObjednavky: float) -> int:
    if maDopravuZdarma(cenaObjednavky):
        return 0
    return 99

# hlavní program: vstup -> výpočet -> výstup
cena = float(input("Cena zboží bez DPH: "))
celkem = cenaVcetneDph(cena)
celkem += cenaDopravy(celkem)
print(f"K úhradě: {celkem:.2f} Kč")
```

---
layout: cover
background: https://cover.sli.dev
---

# Dokumentace funkcí

---

# Dokumentační řetězec - docstring

- Docstring je text v trojitých uvozovkách `"""` hned pod hlavičkou funkce.
- Podle [PEP 257](https://peps.python.org/pep-0257/): první řádek je krátké shrnutí (celá věta), pak prázdný řádek a podrobnosti.
- Parametry a návratovou hodnotu popisujeme podle [Google stylu](https://google.github.io/styleguide/pyguide.html#383-functions-and-methods) - sekce `Args:` a `Returns:`.
- Docstring zobrazí `help(nazevFunkce)`, `nazevFunkce.__doc__` i editor po najetí myší na název funkce.

```python
def cenaVcetneDph(cena: float, sazbaDph: float = 0.21) -> float:
    """Vrátí cenu zboží včetně DPH.

    Args:
        cena: Cena bez DPH v Kč.
        sazbaDph: Sazba DPH jako desetinné číslo, výchozí je 0.21.

    Returns:
        Cena včetně DPH v Kč.
    """
    return cena * (1 + sazbaDph)

help(cenaVcetneDph)
```

---
layout: two-cols-header
---

# Rekurze

- Rekurze je technika, kdy funkce volá **sama sebe**.
- Každé volání musí úlohu zmenšit a rekurze musí mít **ukončovací podmínku**.
- Bez ukončovací podmínky Python po zhruba 1000 vnořených voláních vyvolá `RecursionError`.
- Většinu úloh lze napsat i cyklem. Rekurze se hodí na stromové struktury, např. složky na disku.

::left::

```python
def odpocet(n: int) -> None:
    if n <= 0:              # ukončovací podmínka
        print("Start!")
        return
    print(n)
    odpocet(n - 1)          # volání sebe sama

odpocet(3)                  # 3, 2, 1, Start!
```

::right::

```python
def soucet(n: int) -> int:
    """Vrátí součet 1 + 2 + ... + n."""
    if n <= 1:              # ukončovací podmínka
        return n
    return n + soucet(n - 1)

print(soucet(4))            # 10
```

---

# Shrnutí

- Funkce je pojmenovaný blok kódu. Definujeme ji pomocí `def`, voláme názvem a závorkami.
- Funkce, která počítá, výsledek **vrací** přes `return`. Funkce bez `return` vrací `None`.
- **Parametr** je proměnná v definici, **argument** je hodnota při volání.
  - Parametry mohou mít výchozí hodnotu, argumenty lze předat pozičně nebo pojmenovaně.
- Typové anotace jsou dokumentace. Python je při běhu nekontroluje.
- Proměnné ve funkci jsou lokální. Data jdou do funkce parametrem a ven přes `return`. Klíčové slovo `global` nepoužíváme.
- Funkce může změnit předaný seznam. Seznam jako výchozí hodnotu nahradíme `None`.
- Preferujeme čisté funkce bez vedlejších efektů. `input()` a `print()` patří do hlavního programu.
- Funkce dokumentujeme docstringem. Rekurze potřebuje ukončovací podmínku.

---

# Cvičení

- Základní: [Py_09_Funkce](https://github.com/oa-pva2-syllabus/Py_09_Funkce)
  - definice a volání funkce, `return`, výchozí hodnoty, práce se seznamem
- Pokročilé: [Py_10_Funkce_pokrocile](https://github.com/oa-pva2-syllabus/Py_10_Funkce_pokrocile)
  - Státy světa, SMS brána, Hodnocení zakázky

---
src: '../../pages/thanku.md'
---
