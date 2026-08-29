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
title: "12 Logování a ladění"
exportFilename: "12_logovani"
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

# Proč vůbec logovat?

- `print()` je **rychlé**, ale:
    - nelze snadno vypnout
    - nevíme, odkud výpis pochází
    - nehodí se pro větší aplikace
- logování = **řízený a systematický výpis informací**


---

# Kdy se logy používají

- ladění chyb
- sledování běhu programu
- hledání příčiny pádu aplikace
- dlouhodobý provoz (server, služba, skript)

💡 *Logy často čte někdo jiný než autor programu.*

---

# Modul `logging`

Python má vestavěný modul `logging`

Výhody:
- různé **úrovně závažnosti**
- možnost zapisovat:
    - do konzole
    - do souboru
- snadné zapnutí / vypnutí logů

---

# Základní použití

```python
import logging

logging.warning("Něco se stalo")
```

Výstup:
```log
WARNING:root:Něco se stalo
```

---

# Úrovně logování

Od nejméně po nejvíce závažné:
- `DEBUG` - detailní informace pro vývojáře *„dívám se programu pod ruce“*
- `INFO` - běžné informace o průběhu programu *„program dělá, co má“*
- `WARNING` - upozornění na potenciální problém *„pozor, něco je divné“*
- `ERROR` - chyba, která zabránila vykonání části programu  *„něco se pokazilo“*
- `CRITICAL` - velmi závažná chyba, která může způsobit pád programu *„konec, dál to nejde“*

```python
import logging

logging.debug("Debug zpráva")
logging.info("Program se spustil")
logging.warning("Podezřelý stav")
logging.error("Nastala chyba")
logging.critical("Kritická chyba")
```

> Ve výchozím nastavení se DEBUG a INFO nezobrazí

---
layout: two-cols-header
---

# Kdy použít jednotlivé úrovně logování

::left::

## DEBUG
- podrobnosti pro programátora
- hodnoty proměnných
- průběh algoritmu
- detailní informace pro ladění 
- `logging.debug(f"Načtená hodnota: {value}")`

## INFO
- běžný a očekávaný stav programu
- důležité události
- zahájení / ukončení procesu 
- `logging.info("Soubor úspěšně načten")`

::right::

## WARNING
- něco není ideální, ale program pokračuje
- podezřelé nebo neobvyklé chování
- blíží se limit (např. místo na disku)
- `logging.warning("Soubor nebyl nalezen, používám výchozí hodnoty")`

---

# Kdy použít jednotlivé úrovně logování

## ERROR
- došlo k chybě
- část programu selhala, ale aplikace běží dál
- `logging.error("Nepodařilo se uložit data")`

## CRITICAL
- velmi závažná chyba
- program nemůže pokračovat
- `logging.critical("Nedostatek paměti, program bude ukončen")`
- `logging.critical("Nelze pokračovat – chybí konfigurační soubor")`

---

# Nastavení úrovně logování

```python
import logging
logging.basicConfig(level=logging.DEBUG)
logging.debug("Debug zpráva, která se už zobrazí")
logging.info("Program se spustil")
```


---

# Logování chyb a výjimek

```python
try:
    a = 10 / 0
except ZeroDivisionError:
    logging.error("Dělení nulou")
```

## Logování výjimky s tracebackem
```python
try:
    a = 10 / 0
except ZeroDivisionError:
    logging.exception("Dělení nulou")
```

---

# Logování do souboru

```python
import logging

logging.basicConfig(
    level=logging.INFO, # Minimální úroveň logování
    filename="app.log", # Definice názvu souboru
    filemode="a" # Režim přidávání (append)
    encoding="utf-8" # Nastavení kódování výstupu pro korektní zobrazení znaků vč. češtiny
)
logging.info("Toto se zapíše do souboru app.log")
```

```log
INFO:root:Program spuštěn
```

---

# Formátování logů

```python
import logging 

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)
logging.info("Program spuštěn")
```

Výstup:
```log
2026-01-03 10:15:12 | INFO | Program spuštěn
```

Co všechno lze do formátu dát

- `%(asctime)s` – čas
- `%(levelname)s` – úroveň
- `%(message)s` – zpráva
- `%(filename)s` – název souboru
- `%(lineno)d` – číslo řádku

---

# Shrnutí
- Logování je důležité pro ladění a sledování aplikací
  - **log → pro programátora / správce**
  - **print / input → pro uživatele**
- Python má vestavěný modul `logging`
- různé úrovně závažnosti logů `Debug`, `Info`, `Warning`, `Error`, `Critical`
- logy lze zapisovat do konzole i do souboru
- logy lze formátovat podle potřeby
- `basicConfig` pro základní nastavení logování - úroveň, soubor, formát

---
src: '../../pages/thanku.md'
---