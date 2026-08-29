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
title: "DB Agregace"
exportFilename: "24_DB_agregace"
titleTemplate: "PVA4 %s by Adam Fišer"
info: |
  ## PVA4 Programování a vývoj aplikací

  Určeno pouze pro výukové účely

  [Repository](https://github.com/OA-PVA4-Syllabus/pva4_prednasky) / [Prezentace](https://oa-pva4-syllabus.github.io/pva4_prednasky/)

  Created by [Adam Fišer](https://github.com/AdamFiser)
---
layout: default
---

#  Obsah

<Toc :columns="2" minDepth="1" maxDepth="1"></Toc>
---

# Agregace

- Agregace v SQL znamená zpracování více řádků z tabulky a jejich sloučení do jednoho výsledku.
- Používá se například pro výpočty součtů, průměrů nebo počtu záznamů.
- Agregace se provádí pomocí tzv. **agregačních funkcí**.


---

# Agregační funkce

- **`COUNT()`** - Spočítá počet záznamů.
- **`SUM()`** - Spočítá součet hodnot ve sloupci.
- **`AVG()`** - Vypočítá průměr hodnot ve sloupci.
- **`MIN()`** - Najde nejmenší hodnotu ve sloupci.
- **`MAX()`** - Najde největší hodnotu ve sloupci. 

---

# Klauzule `GROUP BY`

- Klauzule `GROUP BY` slouží k seskupení výsledků podle hodnoty ve sloupci.
- Používá se společně s agregačními funkcemi.
- Výsledkem je jeden řádek pro každou skupinu.


## Syntaxe:
```sql
SELECT sloupec, agregační_funkce(sloupec)
FROM tabulka
GROUP BY sloupec;
```

## Příklad:
```sql
SELECT kategorie, COUNT(*) as pocet
FROM produkty
GROUP BY kategorie;
```

---

# Filtrace výsledků

- Pro filtrování výsledků agregace se používá klauzule `HAVING`.
- `HAVING` funguje podobně jako `WHERE`, ale pracuje s výsledky agregace.
- `HAVING` se používá společně s `GROUP BY`.
- `HAVING` se používá pro filtrování skupin, zatímco `WHERE` pro řádky.

## Syntaxe:
```sql
SELECT sloupec, agregační_funkce(sloupec)
FROM tabulka
GROUP BY sloupec
HAVING podmínka;
```

## Příklad:
```sql
SELECT kategorie, COUNT(*) as pocet
FROM produkty
GROUP BY kategorie
HAVING COUNT(*) > 5;
```

---

# Praktické příklady

```sql
-- Počet produktů v každé kategorii
SELECT kategorie, COUNT(*) as pocet
FROM produkty
GROUP BY kategorie;
```

```sql
-- Průměrná cena produktů v každé kategorii
SELECT kategorie, AVG(cena) as prumer
FROM produkty
GROUP BY kategorie;
```

```sql
-- Počet produktů v každé kategorii s více než 5 produkty
SELECT kategorie, COUNT(*) as pocet
FROM produkty
GROUP BY kategorie
HAVING COUNT(*) > 5;
```

```sql
-- Celková cena a počet objednávek všech zákazníků
SELECT zakaznik.jmeno,
       SUM(objednavky.cena) as celkova_cena,
       COUNT(objednavky.id) as pocet_objednavek
FROM zakaznik
    LEFT JOIN objednavky ON objednavky.zakaznik_id = zakaznik.id
GROUP BY zakaznik.jmeno;
```

---

# Shnutí

- Agregace slouží k zpracování více řádků do jednoho výsledku.
- Používá se pro výpočty součtů, průměrů nebo počtu záznamů.
- Nejčastěji používané funkce jsou  `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.
- Klauzule `GROUP BY` slouží k seskupení výsledků podle hodnoty ve sloupci.
- Klauzule `HAVING` slouží k filtrování výsledků agregace.

---
src: '../../pages/thanku.md'
---