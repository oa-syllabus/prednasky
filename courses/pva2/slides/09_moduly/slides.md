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
title: "Moduly"
exportFilename: "Moduly"
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

# Moduly

- Moduly jsou základní stavební jednotkou programu v Pythonu.
- Používají se pro organizaci kódu a jeho znovupoužitelnost. 
- Využitím modulů můžeme rozdělit kód do logických celků, což zvyšuje přehlednost a snižuje složitost.
- Moduly jsou soubory obsahující definice funkcí a tříd, které mou být použity v jiných programech.
- Načítány pomocí příkazu `import`, typicky na začátku souboru.
- Při opakovaném importu jsou moduly načítány pouze jednou.
- Import je z aktuálního adresáře nebo z adresářů v proměnné `PYTHONPATH`.

---

# Příklad použití existujícího modulu

- Modul `math` obsahuje matematické funkce.
- Pro použití modulu je nutné jej před použitím importovat.
- Importujeme pomocí příkazu `import`.
- Příklad použití funkce `sqrt` pro výpočet odmocniny z čísla 16.

```python
# import modulu
import math

# použití funkce z modulu
print(math.sqrt(16))
```

### Import více modulů
    
```python
# Více modulů na jednom řádku
import math, random
```

```python
# Každý modul samostatně
import math
import random
```

---

# Import funkcí z modulu

- Import funkcí z modulu umožňuje importovat pouze vybrané funkce.
- Umožňuje zkrátit název funkce.
- Import funkcí se provádí pomocí klíčového slova `from`.

```python
from math import sqrt
print(sqrt(16))
```

### Import všech funkcí

- Import všech funkcí z modulu, ale jaký má potom význam vybírat fce z modulu, když je importujeme všechny?

```python
from math import *
print(sqrt(16))
```

---

# Alias

- Alias je alternativní jméno pro funkci nebo modul.
- Používá se pro zkrácení jména nebo pro přejmenování.
- Alias se definuje pomocí klíčového slova `as`.

```python
import math as m
print(m.sqrt(16))
```

## Alias pro všechny funkce

```python
from math import sqrt as odmocnina
print(odmocnina(16))
```



---

# Vlastní modul

- Vlastní modul vytvoříme vytvořením souboru s příponou `.py`.
- Modul může obsahovat
  - definice funkcí, tříd, proměnných a konstant.
  - kód, který se spustí při importu modulu.
  - testy, které se spustí při importu modulu.
  - dokumentaci, která se zobrazí při dotazu na `help()`.


```python
# vytvoření modulu
# obsah souboru mymodule.py
def plus(a, b):
    return a + b
```

```python
# jinySoubor.py
# import vlastního modulu
import mymodule

# použití funkce z modulu
print(mymodule.plus(2, 3)) # 5
```




---
src: '../../pages/thanku.md'
---