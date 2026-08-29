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
title: "Testování"
exportFilename: "37_testovani"
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

# Co je automatické testování?

- Automatizovaný způsob ověření, že program funguje správně.
- Umožňuje rychle odhalit chyby po úpravách kódu.
- Zvyšuje spolehlivost programu.

---

# Proč testujeme?

- Abychom si ověřili, že náš kód dělá to, co očekáváme.
- Ušetříme čas při hledání chyb.
- Pomáhá udržovat kód čistý a přehledný.
- Klíčové při větších projektech nebo spolupráci ve skupině.
- Zrychlují vývoj - méně klikání a opakování.
- Mám jistotu, když upravím kód, nerozbiju něco jiného?

> **Chyby jsou drahé**: čím později chybu najdeš, tím víc stojí.

---

# Typy testů

- **Unit testy** - testují jednotlivé části kódu.
- **Integrační testy** - testují, jak jednotlivé části kódu spolu komunikují.
- **Funkční testy** - testují, zda program dělá to, co má.
- **End-to-end testy** - testují celý program jako celek.

---

# Základní princip: Triple A (AAA)

**"Arrange – Act – Assert"**

1. Arrange - Připrav vstupy a prostředí
2. Act - Zavolej testovanou funkci
3. Assert Ověř výsledek

```python
def test_add():
    # Arrange
    a, b = 2, 3
    # Act
    result = add(a, b)
    # Assert
    assert result == 5
```

---

# Knihovna `pytest`

- Jednoduchá knihovna pro psaní testů v Pythonu.
- Podporuje testování všech typů testů.
  - parametrizované testy.
  - testování výjimek.
  - testování souborů, databází, API, atd.
  - mockování a patchování.
- Píše se jednodušeji než `unittest`.
- Funguje perfektně i v **PyCharmu**.

📦 Instalace (pokud ještě není):
```bash
python -m pip install pytest
```

---

# Struktura projektu

```
projekt/
  src/
    kalkulacka.py
  tests/
    test_kalkulacka.py
```
---

# Základní test

```python
# soubor: src/kalkulacka.py

def secti(a: int, b: int) -> int:
    return a + b

```


```python
# soubor: tests/test_kalkulacka.py

from src.kalkulacka import secti

def test_secti():
    assert secti(2, 3) == 5
```

- Test je standardní funkce, která začíná prefixem `test_`.
- `assert` porovnává skutečný výsledek s očekávaným.
- ✅ Test projde, pokud je výraz assert ... pravda.
- ❌ Pokud ne, pytest vypíše očekávané vs. skutečné hodnoty.

---

# Spuštění testů

- Spuštění všech testů v adresáři:
```bash
pytest
```

- Spuštění konkrétního testu:
```bash
pytest test_kalkulacka.py
```

- Spuštění testů včetně `print` výstupů:
```bash
pytest -s
```

---

## Spuštění testu v PyCharmu

1. Otevři soubor s testem (např. `test_kalkulacka.py`)
2. Klikni pravým tlačítkem kamkoliv do souboru.
3. Vyber **Run 'pytest in test_kalkulacka'**

💡 Výsledek testu se zobrazí dole v panelu *Run/Test Results*.

✅ Zeleně – test prošel  
❌ Červeně – test selhal, PyCharm vypíše podrobnosti

---

# Výstup testu v PyCharmu

Při chybě např.:

```python
def test_secti():
    assert secti(2, 3) == 6  # chyba!
```

PyCharm vypíše:
```
    def test_secti():
>       assert secti(2, 3) == 6
E       assert 5 == 6
E        +  where 5 = secti(2, 3)
```

> Výstup chyb ➡ Pomáhá nám rychle najít chybu.

---

# Testování chyb (výjimek)

```python
import pytest

def deleni(a: int, b: int) -> float:
    return a / b

def test_deleni_nulou():
    with pytest.raises(ZeroDivisionError):
        deleni(1, 0)
```

✅ Pomocí `pytest.raises` otestujeme, že opravdu dojde k výjimce.

---
layout: two-cols-header
---

# Příklad

::left::

`faktura.py`
```python
def vypocet_ceny_s_dph(cena_bez_dph: float, sazba_dph: int) -> float:
    if cena_bez_dph < 0:
        raise ValueError("Cena nesmí být záporná")
    if sazba_dph not in [10, 15, 21]:
        raise ValueError("Neplatná sazba DPH")
    
    cena_s_dph = cena_bez_dph * (1 + sazba_dph / 100)
    return round(cena_s_dph, 2)
```

::right::

`test_faktura.py`
```python
import pytest
from faktura import vypocet_ceny_s_dph

def test_sazba_21_procent():
    assert vypocet_ceny_s_dph(100, 21) == 121.00

def test_sazba_15_procent():
    assert vypocet_ceny_s_dph(200, 15) == 230.00

def test_neplatna_sazba():
    with pytest.raises(ValueError):
        vypocet_ceny_s_dph(100, 5)

def test_zaporna_cena():
    with pytest.raises(ValueError):
        vypocet_ceny_s_dph(-50, 21)
```

---
layout: image-right
image: https://cover.sli.dev
---

# Strategie testování

---

# Přístupy k psaní testů

Existují různé strategie, **kdy** a **jak** testy píšeme:

# 1️⃣ Klasický přístup – testy až po napsání funkce

- Nejdříve napíšeme funkci, která něco dělá.
- Poté vytvoříme testy, abychom si ověřili, že funguje správně.
- Typické ve výuce a při menších projektech.

✅ Jednoduché na pochopení  
⚠️ Můžeme zapomenout na ošetření výjimek nebo krajních případů

---

# 2️⃣ Test Driven Development (TDD)

- **Nejdřív píšeme testy**, pak teprve samotnou funkci.
- Postup:
    1. Napíšeme test, který zatím selhává.
    2. Vytvoříme funkci tak, aby test prošel.
    3. Refaktorujeme (vylepšíme) kód a test stále musí procházet.

💡 Výhody:
- Nutí nás přemýšlet nad zadáním a vstupy/výstupy už předem.
- Kód je od začátku dobře otestovaný.
- Pomáhá u složitějších funkcí nebo týmové práci.

⚠️ Nevýhoda: ze začátku náročnější na myšlení a disciplínu

---

# Příklad TDD

```python
# test_prvni.py
from kalkulacka import secti

def test_secti():
    assert secti(2, 3) == 5
```

Zatím ale `kalkulacka.py` neexistuje!

Pak teprve vytvoříme:

```python
# kalkulacka.py
def secti(a, b):
    return a + b
```

✅ Test projde, funkce je hotová.


---
layout: image-right
image: https://cover.sli.dev
---

# Coverage

---

# Co je coverage?

- Pokrytí = kolik řádků větví kódu prošly testy.
- Neznamená to automaticky kvalitu, ale pomáhá odhalit netestovaná místa.

```bash
pip install pytest-cov
pytest --cov=app --cov-report=term-missing
```

---

# Výstup coverage

```
Name          Stmts   Miss  Cover   Missing
------------------------------------------------------------------------
app.py           10      2    80%   5-6
```

---

# Jak testovat?

## ✅ DO
- jeden test = jedna věc
- testuj hranice (0, 1, prázdný seznam, dlouhé řetězce)
- testuj typické případy i chybové stavy
- piš testy tak, aby byly rychlé a stabilní


## ❌ DON'T
- **nebal vše do jednoho obřího testu**
- netestuj implementační detaily (když se může změnit bez změny chování)
- nepiš testy závislé na pořadí nebo na aktuálním čase


---

# Shrnutí

- Automatické testování zajišťuje, že program funguje správně.
- `pytest` je jednoduchý nástroj pro psaní testů.
- V **PyCharmu** můžeme testy snadno spustit a vidět výsledky.
- Testy se píší jako obyčejné funkce s `assert`.
- Existují různé strategie psaní testů.

---
src: '../../pages/thanku.md'
---