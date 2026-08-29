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
title: "Datum a čas"
exportFilename: "10_datum_cas"
titleTemplate: "PVA2 %s by Adam Fišer"
info: |
  ## PVA2 Programování a vývoj aplikací

  Uqrčeno pouze pro výukové účely

  [Repository](https://github.com/OA-PVA2-Syllabus/pva2_prednasky) / [Prezentace](https://oa-pva2-syllabus.github.io/pva2_prednasky/)

  Created by [Adam Fišer](https://github.com/AdamFiser)
---
layout: default
---

#  Obsah

<Toc :columns="2" minDepth="1" maxDepth="1"></Toc>
---

# Datum a čas

- V pythonu nejsou datum a čas samostatným datovým typem.
- Pro práci s datem a časem používáme modul `datetime`
- Modul je nativně zabudován, není nutná externí instalace
- Třídy modulu poskytují řadu funkcí pro práci s daty, časy a časovými intervaly. Datum a časový údaj jsou v jazyce Python objektem, takže při manipulaci s nimi vlastně manipulujete s objekty, a nikoli s řetězci nebo timestampem.

---

# Modul `datetime`

- Modul `datetime` obsahuje třídy pro manipulaci s datumem a časem.
- Třídy jsou:
  - `date` - pro manipulaci s datem
  - `time` - pro manipulaci s časem
  - `datetime` - pro manipulaci s datem a časem
  - `timedelta` - pro manipulaci s časovými intervaly
  - `tzinfo` - pro manipulaci s časovými zónami


---

# Třída `date`

- V informatice pracujeme standardně s datem ve formátu `YYYY-MM-DD` např. `2024-12-24`.
- Třída `date` reprezentuje datum.
- Datum je reprezentováno pomocí tří atributů:
  - `year` - rok
  - `month` - měsíc
  - `day` - den
- Datum je neměnný objekt, tzn. po vytvoření nelze změnit jeho hodnoty.

---

# Třída `date` - příklad

```python
# Nahrání modulu a import třídy
from datetime import date

# Vytvoření instance třídy date
d = date(2024, 12, 24)
print("Zadané datum: " + str(d)) # Zadané datum: 2024-12-24

# Aktuální datum
aktualniDatum = date.today() 
print("Aktuální datum: " + str( aktualniDatum) )

# Parciální informace o datu
print("Rok: " + str(aktualniDatum.year))
print("Měsíc: " + str(aktualniDatum.month))
print("Den: " + str(aktualniDatum.day))
```

---

# Třída `time`

- Třída `time` reprezentuje čas.
- Čas je reprezentován pomocí atributů:
  - `hour` - hodina
  - `minute` - minuta
  - `second` - sekunda
  - `microsecond` - mikrosekunda
- Čas je neměnný objekt, tzn. po vytvoření nelze změnit jeho hodnoty.

---

# Třída `time` - příklad

```python
# Nahrání modulu a import třídy
# datetime nahráváme kvůli získání aktuálního času
from datetime import time, datetime

# Vytvoření instance třídy time
t = time(12, 30, 45, 100000)
print("Zadaný čas: " + str(t)) # Zadaný čas: 12:30:45.100000

# Aktuální čas, pro získání aktuálního času používáme modul datetime
# Funkce datetime.now() vrací aktuální datum a čas a pomocí metody time() získáme pouze čas
aktualniDatumCas = datetime.now()
aktualniCas = aktualniDatumCas.time()
print("Aktuální čas: " + str(aktualniCas))
```


```python {all} {lines:true,startLine:11}
# Nebo lépe než pomocí aktualniDatumCas a aktualniCas
aktualniCas = datetime.now().time()
print("Aktuální čas: " + str(aktualniCas))
```

---

# Timestamp

- Timestamp je časový údaj, který udává počet sekund, které uplynuly od 1. ledna 1970.
- V Pythonu můžeme získat timestamp pomocí funkce `time()`.
- Timestamp můžeme převést na datum a čas pomocí funkce `fromtimestamp()`.

```python
from datetime import datetime

# Získání timestampu z aktuálního času
aktualniCas = datetime.now()
timestamp = aktualniCas.timestamp()

print("Timestamp: " + str(timestamp)) # Timestamp: 1740000000.0

# Převod timestampu na datum a čas
dt = datetime.fromtimestamp(timestamp)
print("Datum a čas: " + str(dt)) # Datum a čas: 2025-02-19 21:20:00
```

---

# Třída `datetime`

- Třída `datetime` reprezentuje datum a čas.
- Datum a čas jsou reprezentovány pomocí tří atributů:
  - year - rok
  - month - měsíc
  - day - den
  - hour - hodina
  - minute - minuta
  - second - sekunda
  - microsecond - mikrosekunda

---

# Třída `datetime` - příklad

```python
# Nahrání modulu a import třídy
from datetime import datetime

# Vytvoření instance třídy datetime
dt = datetime(2024, 12, 24, 12, 30, 45, 100000)
print("Zadané datum a čas: " + str(dt)) # Zadané datum a čas: 2024-12-24 12:30:45.100000

# Aktuální datum a čas
aktualniDatumCas = datetime.now()
print("Aktuální datum a čas: " + str(aktualniDatumCas))
```

---
layout: image-right
image: https://cover.sli.dev
---

# Výpočty s datem a časem

---

# Základní operace s datem a časem

- Pro matematické operace s datem a časem můžeme použít operátory `+`, `-`, `*`, `/`.
- Podmínkou pro operace je, že oba objekty musí být **stejného datového typu**.

```python
from datetime import datetime

dt = datetime(2024, 12, 24)

# Určení dne v týdnu pro zadané datum
dt.weekday() # 0-pondělí, 1-úterý, 2-středa, 3-čtvrtek, 4-pátek, 5-sobota, 6-neděle
dt.isoweekday() # 1-pondělí, 2-úterý, 3-středa, 4-čtvrtek, 5-pátek, 6-sobota, 7-neděle

# Rozdíl dvou dat
d1 = datetime(2024, 12, 24, 10, 00, 00)
d2 = datetime(2024, 12, 31, 22, 00, 00)

rozdil = d2 - d1
print("Rozdíl dvou dat: "+str(rozdil)) # 7 days, 12:00:00

# Porovnání dvou dat
d1 < d2 # True
d1 > d2 # False

```

---

# Třída `timedelta`

- Třída `timedelta` reprezentuje časový interval.
- Časový interval je reprezentován pomocí atributů:
  - `days` - dny
  - `weeks` - týdny
  - `hours` - hodiny
  - `minutes` - minuty
  - `seconds` - sekundy
  - `microseconds` - mikrosekundy

```python
from datetime import timedelta

td = timedelta(days=5, seconds=3600)

print("Zadaný časový interval: " + str(td)) # Zadaný časový interval: 5 days, 1:00:00
```

---

# Výpočty s třídou `timedelta`

- Třída `timedelta` umožňuje provádět výpočty s časovými intervaly.
- Výpočty mohou být sčítání, odčítání, násobení a dělení.
- Výsledkem výpočtu je nový objekt třídy `timedelta`.
- Výsledek výpočtu je vždy nový objekt, původní objekt zůstává nezměněný.

```python
from datetime import timedelta

td1 = timedelta(days=5, seconds=3600)
td2 = timedelta(days=2, seconds=7200)

print("Sčítání: " + str(td1 + td2)) # Sčítání: 7 days, 3:00:00
print("Odčítání: " + str(td1 - td2)) # Odčítání: 3 days, 1:00:00
print("Násobení: " + str(td1 * 2)) # Násobení: 10 days, 2:00:00
print("Dělení: " + str(td1 / 2)) # Dělení: 2 days, 12:30:00
```

---

# Příklad

```python
from datetime import datetime, timedelta

datum = datetime(2024, 12, 24, 10, 00, 00)
print("Zadané datum: ")
print(datum)

dnyDoBudoucnosti = 7
vysledek = datum + timedelta(days=dnyDoBudoucnosti, hours=12)
print("Nové budoucí datum: ")
print(vysledek) # 2024-12-31 22:00:00

dnyDoMinulosti = 10
vysledek = datum - timedelta(days=dnyDoMinulosti)
print("Nové datum z minulosti: ")
print(vysledek) # 2024-12-14 10:00:00
```

---
layout: image-right
image: https://cover.sli.dev
---

# Formátování datumu a času

---

# Konverze na text

- Pro konverzi objektů tříd `date`, `time` a `datetime` na textový řetězec používáme metodu `strftime()`.
- Metoda `strftime()` přijímá jako parametr formátovací řetězec, který určuje, jak bude datum a čas zobrazen.
- Formátovací řetězec může obsahovat speciální znaky, které se nahradí odpovídajícími hodnotami.
- Např. `%Y` - rok, `%m` - měsíc, `%d` - den, `%H` - hodina, `%M` - minuta, `%S` - sekunda.

```python
from datetime import datetime

dt = datetime(2024, 12, 24, 10, 00, 00)
print(dt.strftime("%Y-%m-%d %H:%M:%S")) # 2024-12-24 10:00:00
print(dt.strftime("%d.%m.%Y %H:%M")) # 24.12.2024 10:00
```

---

# Konverze z textu

- Pro konverzi textového řetězce na objekt tříd `date`, `time` a `datetime` používáme metodu `strptime()`.
- Metoda `strptime()` přijímá jako parametr textový řetězec a formátovací řetězec, který určuje, jak bude datum a čas interpretován.
- Formátovací řetězec musí odpovídat formátu textového řetězce.

```python
from datetime import datetime

datum = "2024-12-24"
dt = datetime.strptime(datum, "%Y-%m-%d")
print(dt) # 2024-12-24 00:00:00

cas = "10:00:00"
t = datetime.strptime(cas, "%H:%M:%S")
print(t) # 1900-01-01 10:00:00
```

---
layout: image-right
image: https://cover.sli.dev
---

# Světový čas

---
layout: two-cols-header
---

# Časové zóny

- Pro práci s časovými zónami používáme modul `pytz`.
- Modul `pytz` obsahuje databázi časových zón, které můžeme použít pro konverzi času mezi různými zónami.
- Pro konverzi času mezi zónami používáme metodu `astimezone()`.

::left::

```python
from datetime import datetime

# Nahrání modulu a import třídy
from pytz import timezone

# Vytvoření instance třídy datetime
dt = datetime(2024, 12, 24, 12, 30, 45, 100000)

# Převod na časovou zónu
dt = dt.astimezone(timezone('US/Pacific'))
print("V časové zóně US/Pacific je: " + str(dt))
```

::right::

```python
from datetime import datetime
from pytz import timezone
 
format = "%d-%m-%Y %H:%M:%S %Z%z"
 
# Aktuální čas v UTC
aktualniCasUTC = datetime.now(timezone('UTC'))
print(now_utc.strftime(format))
 
casoveZony = [ 'Europe/Prague', 
              'Europe/Kiev',
              'America/New_York',
              'Australia/Sydney',]
 
for tzona in casoveZony: 
    # Převod na jednotlivé zóny
    aktualniCasSvet = aktualniCasUTC.astimezone(timezone(tzona))
    print(tzona, aktualniCasSvet.strftime(format))
```




---
src: '../../pages/thanku.md'
---