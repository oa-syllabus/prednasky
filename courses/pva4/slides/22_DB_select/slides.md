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
title: "DB Select"
exportFilename: "22_DB_select"
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

# Structured Query Language

- Structured Query Language SQL
- Jazyk pro manipulaci s daty v databázích
- Vytvořen v 70. letech
- Standardizován ANSI
- Dialekty: MySQL, PostgreSQL, SQLite, Oracle, MS SQL, ...


---
layout: two-cols
---

# Structured Query Language
- DQL - Data Query Language
- DML - Data Manipulation Language
- DDL - Data Definition Language
- DCL - Data Control Language
- TCL - Transaction Control Language

::right::

<img src="/sql_types.png" width="120%"/>

---
layout: image-right
image: https://cover.sli.dev
---

# Výběr dat

---

# `SELECT`

- Základní příkaz pro výběr dat

```sql
-- komentář
SELECT 
    -- seznam sloupců
    -- sloupce oddělené čárkou, vyjma posledního
    sloupec, 
    sloupec2, ...
FROM 
    -- seznam tabulek a vazeb
    tabulka;

-- středník na konci příkazu, nepovinný, ale doporučený,
-- používá se pro oddělení příkazů, pokud je jich více v jedné dávce
```

Příklad:
```sql
SELECT 
    firstName, 
    lastName
FROM 
    customers;
```

---

# Výběr všech sloupců

- Výběr všech sloupců z tabulky lze provést pomocí `*`
- Oba příklady jsou ekvivalentní, vrací všechny sloupce z tabulky `customers`
- V **praktickém použití se uvádějí sloupce explicitně** a wildcard nepoužíváme!

```sql
SELECT 
    *
FROM
    customers;
```

```sql
SELECT 
    customers.*
FROM
    customers;
```

---

# Alias

- Alias je náhrada názvu sloupce nebo tabulky
- používá pro zkrácení názvu nebo pro přejmenování sloupce
- za název sloupce nebo tabulky po volitelném klíčovém slově `AS` a odděluje se mezerou

```sql
SELECT 
    firstName AS jmeno, 
    lastName AS prijmeni
FROM
    customers;
```

```sql
SELECT 
    z.firstName AS jmeno, 
    z.lastName AS prijmeni
FROM
    customers AS z;
```



---

# Výběr unikátních hodnot

- Pro výběr unikátních hodnot slouží klíčové slovo `DISTINCT`
- Výsledek obsahuje pouze unikátní hodnoty sloupce
- Je-li použito více sloupců, výsledek bude unikátní kombinace hodnot za všechny sloupce

```sql
SELECT DISTINCT
    sloupec
FROM
    tabulka;
```

- Příklad: Výběr unikátních jmen a příjmení z tabulky `customers`
```sql
SELECT DISTINCT 
    firstName,
    lastName
FROM
    customers;
```

---
layout: image-right
image: https://cover.sli.dev
---

# Filtrace dat

---

# `WHERE`

- omezení výběru řádků pomocí klíčového slova `WHERE`
- podmínka může obsahovat operátory porovnání, logické operátory, ...
- `[Název sloupce]` `[Operátor]` `[Hodnota]`

```sql
SELECT 
    sloupec
FROM
    tabulka
WHERE
    podminka;
```

- Příklad: Výběr jmen a příjmení z tabulky `customers` pro zákazníky kampaně s ID 1
```sql
SELECT 
    firstName,
    lastName
FROM
    customers
WHERE
    campaign_id = 1;
```

---
layout: two-cols
---

# Operátory porovnání

- `=` - rovná se
- `<>` - nerovná se
- `>` - větší než
- `<` - menší než
- `>=` - větší nebo rovno
- `<=` - menší nebo rovno
- `BETWEEN` - mezi hodnotami
- `LIKE` - podobné
- `IN` - hodnota v seznamu
- `IS NULL` - hodnota je NULL
- `IS NOT NULL` - hodnota není NULL

::right::

## Logické operátory
- `AND` - logický operátor AND
- `OR` - logický operátor OR
- `NOT` - logický operátor NOT
- `()` - závorky pro určení pořadí operací

---

# `AND`, `OR`, `NOT`

- Logické operátory `AND`, `OR`, `NOT` slouží k spojení podmínek
- `AND` - obě podmínky musí být splněny
- `OR` - alespoň jedna z podmínek musí být splněna
- `NOT` - negace podmínky

```sql
    
SELECT 
    sloupec
FROM
    tabulka
WHERE
    podminka1
    AND
    podminka2;
```

---

# `AND`, `OR`, `NOT` - Příklady

- Výběr jmen a příjmení z tabulky `customers` pro zákazníky kampaně s ID 1 a s emailem
```sql
SELECT 
    firstName,
    lastName
FROM
    customers
WHERE
    campaign_id = 1
    AND
    email IS NOT NULL;
```


---

# `IN`

- Operátor `IN` slouží k porovnání hodnoty s množinou hodnot
- Výsledek je `TRUE`, pokud hodnota je obsažena v množině

```sql
SELECT 
    sloupec
FROM
    tabulka
WHERE
    sloupec IN (hodnota1, hodnota2, ...);
```

---

# `IN` - Příklady

- Výběr jmen a příjmení z tabulky `customers` pro zákazníky kampaně s ID 1 nebo 2
```sql
SELECT 
    firstName,
    lastName
FROM
    customers
WHERE
    campaign_id IN (1, 2);
```

- Výběr jmen a příjmení z tabulky `customers` pro zákazníky kampaní vyjma s ID 1 nebo 2
```sql
SELECT 
    firstName,
    lastName
FROM
    customers
WHERE
    campaign_id NOT IN (1, 2);
```

---

# `LIKE`

- Operátor `LIKE` slouží k porovnání hodnoty s řetězcem
- Výsledek je `TRUE`, pokud hodnota odpovídá vzoru
- Vzor může obsahovat znaky `%, _`

```sql
SELECT 
    sloupec
FROM
    tabulka
WHERE
    sloupec LIKE 'vzor';
```

- Příklad: Výběr jmen a příjmení z tabulky `customers` pro zákazníky s příjmením začínajícím na `A`
```sql
SELECT 
    firstName,
    lastName
FROM
    customers
WHERE
    lastName LIKE 'A%';
```

---

# `BETWEEN`

- Operátor `BETWEEN` slouží k porovnání hodnoty s rozsahem hodnot
- Výsledek je `TRUE`, pokud hodnota je v rozsahu

```sql
SELECT 
    sloupec
FROM
    tabulka
WHERE
    sloupec BETWEEN hodnota1 AND hodnota2;
```

- Příklad: Výběr jmen a příjmení z tabulky `customers` pro zákazníky s ID mezi 1 a 10
```sql
SELECT 
    firstName,
    lastName
FROM
    customers
WHERE
    id BETWEEN 1 AND 10;
```

---

# `IS NULL`

- Operátor `IS NULL` slouží k porovnání hodnoty s `NULL`
- Výsledek je `TRUE`, pokud hodnota je `NULL`

```sql
SELECT 
    sloupec
FROM
    tabulka
WHERE
    sloupec IS NULL;
```

- Příklad: Výběr jmen a příjmení z tabulky `customers` pro zákazníky bez emailu
```sql
SELECT 
    firstName,
    lastName
FROM
    customers
WHERE
    email IS NULL;
```

---
layout: image-right
image: https://cover.sli.dev
---

# Řazení záznamů

---

# `ORDER BY`

- Řazení výsledků pomocí klíčového slova `ORDER BY`
- Slouží k řazení výsledků podle sloupce
- Výchozí řazení je vzestupně, lze použít klíčové slovo `ASC`
- Pro sestupné řazení použijeme klíčové slovo `DESC`

```sql
SELECT 
    sloupec
FROM
    tabulka
ORDER BY
    sloupec ASC|DESC;
```

---

# `ORDER BY` - Příklady

- Výběr jmen a příjmení z tabulky `customers` seřazených podle příjmení vzestupně a křestního sestupně
```sql
SELECT 
    firstName,
    lastName
FROM
    customers
ORDER BY 
    lastName ASC, 
    firstName DESC;
```

---
layout: image-right
image: https://cover.sli.dev
---

# Omezení výsledků

---

# `LIMIT`

- Omezení počtu výsledků pomocí klíčového slova `LIMIT`
- Důležité zejména pro tabulky/dotazy s velkým množstvím dat
- Slouží k omezení počtu výsledků, nikoli pro omezení počtu zobrazených řádků
- `LIMIT` se uvádí na konci příkazu a může být použito i s `ORDER BY`
- Pozor:
  - na použití `LIMIT` bez `ORDER BY` - výsledek může být nekonzistentní
  - na použití v různých databázích - syntaxe je odlišná (např. MSSQL je `TOP`)

```sql
SELECT 
    sloupec
FROM
    tabulka
LIMIT
    pocet;
```

---

# `LIMIT` - Příklad

- Výběr jmen a příjmení z tabulky `customers` omezených na 10 výsledků
```sql
SELECT 
    firstName,
    lastName
FROM
    customers
LIMIT 10;
```

---

# `LIMIT` s `OFFSET`

- Pro vynechání prvních `N` výsledků lze použít klíčové slovo `OFFSET`
- `OFFSET` se uvádí po `LIMIT` a určuje počet vynechaných výsledků
- `OFFSET` se používá společně s `LIMIT` a `ORDER BY`

```sql
SELECT 
    sloupec
FROM
    tabulka
LIMIT
    pocet
OFFSET
    pocet;
```

---

# `LIMIT` s `OFFSET` - Příklad

- Výběr jmen a příjmení z tabulky `customers` omezených na 10 výsledků s vynecháním prvních 5 tzn. **výsledky 6-15**
```sql
SELECT 
    firstName,
    lastName
FROM
    customers
LIMIT 10
OFFSET 5;
```




---
src: '../../pages/thanku.md'
---