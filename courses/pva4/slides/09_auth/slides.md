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
title: "Řízení bezpečnosti"
exportFilename: "09_auth"
titleTemplate: "PVA4 %s by Adam Fišer"
info: |
  ## PVA4 Programování a vývoj aplikací

  Určeno pouze pro výukové účely

  [Repository](https://github.com/OA-PVA4-Syllabus/pva4_prednasky) / [Prezentace](https://oa-pva2-syllabus.github.io/pva2_prednasky/)

  Created by [Adam Fišer](https://github.com/AdamFiser)
---
layout: default
---

#  Obsah

<Toc :columns="2" minDepth="1" maxDepth="1"></Toc>
---

# Úvod

- Autentizace
- Autorizace
- Session
- Přihlášení uživatele



---

# Autentizace

- Autentizace – ověření identity subjektu neboli zjištění, zda-li daný subjekt je ten, za který se vydává. Subjektem může být osoba, systém, zpráva
- Je bezpečnostní opatření zajišťující ochranu před falešnou identikou.

---

# Autentizace

## Identita
Prokázaní identity lze rozdělit dle toho:
- Co subjekt má – identifikační karta, platební karta, klíč, telefon
- Co subjekt zná – PIN, heslo, fráze, klíče
- Čím subjekt je – biometrické údaje (otisk prstu, sítnice)

## Faktory autentizace
- Jednofaktorová – ověření pouze dle jednoho způsobu. Typicky uživatelské jméno a heslo
- Dvoufaktorová – k ověření jsou použity dva prvky. Typicky co člověk má a zná např. mobilní telefon a SMS nebo token
- Třífaktorová – přidává oblast spojenou s osobou – biometrii.

> Čím vyšší bezpečnost služby vyžadují, tím je nutné použít silnější autentizaci.

---
layout: image-right
image: https://cover.sli.dev
---

# Kde používáte dvou/tří-faktorovou autentizaci?

---

# Autorizace

- Autorizace – oprávnění k provedení určité akce nebo k přístupu k určitému zdroji.
- Zajišťuje, že uživatel může provádět pouze ty akce, ke kterým má oprávnění.
- Autorizace je založena na autentizaci, kdy se ověří identita uživatele a na základě toho se mu přidělí oprávnění.
- Autorizace je nedílnou součástí řízení přístupových oprávnění tzv. identity management k datům, souborům, adresářům, operacím atd. 

---

# Přístupová práva

- Přístupová práva znamenají úroveň oprávnění zaměstnance nebo uživatele systému k něčemu přistoupit, něco využívat. Přístupová práva se udělují obvykle na základě oprávnění, svolení nebo svěřených pravomocí.
- Přístupová práva se mohou týkat různých oblastí, např. k datům, souborům, adresářům, operacím, službám, aplikacím, zařízením, prostředkům, informacím, údajům, zdrojům, systémům, sítím, službám, funkcím, úkolům, činnostem, procesům, úkonům, akcím, činnostem, postupům, metodám, technologiím, nástrojům

---

# Authorization management

- Řízení oprávnění se zabývá přístupem osob k aktivům (různým objektům), nejčastěji k datům. 
- Cílem je ochrana aktiv před neoprávěným užitím nebo vstupem. 
- Díky řízení oprávnění tedy organizace chrání své zdroje.
- Řízení oprávnění se týká konkrétních osob, protože se vždy vztahuje ke konkrétnímu člověku. Může ale zahrnovat i oprávnění systémů (které zprostředkovaně umožňují autentizaci lidí - uživatelů). Příkladem je přihlašování uživatelů přes takzvané single-sign-on.

---
layout: image-right
image: https://cover.sli.dev
---

# Navrhněte login proces pro webovou aplikaci

<!--
každý student si vytvoří svůj vlastní návrh
čas 5 minut
jaké kroky musí aplikace a uživatel udělat, při přihlašování
-->

---

# Proces přihlášení

<img src="/login_process.png" width="70%"/>

`Zdroj: 29.1.2022 https://www.pngkey.com/maxpic/u2e6w7r5o0u2w7t4/`


---

# Hesla

- Vždy předpokládejte, že se k heslům může dostat útočník.
- Hesla nikdy neukládáme jako plain-text (čistý text)
- Zabezpečení hesel:
  - Šifrováním – nutnost použití šifrovacího klíče, který v případě úniku umí dešifrovat hesla – riziková operace a v praxi se nepoužívá
  - Hash a jeho odvozeniny

---

# Hashování hesel

- Hashování je proces, kdy se heslo převede na hashovou hodnotu.
- Hashování je jednosměrný proces, tzn. z hashové hodnoty nelze zpětně získat heslo.
- Hashovací funkce jsou jednosměrné matematické algoritmy používané k mapování dat jakékoli velikosti na bitový řetězec pevné velikosti. 
- Kryptografické hašovací funkce se široce používají v praktikách zabezpečení informací, jako jsou digitální podpisy, kódy pro ověřování zpráv a jiné formy ověřování. 

---

# Základní hash

- Stejná zpráva vždy vede ke stejné hashovací hodnotě (tj. funkce je nedeterministická). - **POZOR: Zásadní bezpečnostní problém!**
- Hodnota hash se vypočítá rychle.
- Je nemožné mít dvě zprávy se stejnou hodnotou hash (známé jako „kolize“).
- Je nemožné úmyslně vytvořit zprávu, která poskytne danou hodnotu hash. 
- Mírné změny ve zprávě by měly výslednou hodnotu hash značně změnit, aby se zdálo, že nesouvisí s původním hashem
- např. SHA-256, SHA-3, MD5, SHA-1

---

# Nevýhody základního hash
- Tato metoda má však jednu nevýhodu, uživatelé, kteří si zadají stejné heslo, mají i stejné hashe. 
- Uživatel, který si zadá stejné heslo na různých systémech, má pak na různých systémech stejný hash. 
- Pokud je použito slabé heslo, lze takové heslo velice rychle prolomit za pomocí předvypočtených hashů (precomputed hashes) uložených v rainbow tables.

---

# Solený hash

- Solený hash je metoda, která řeší problém s kolizemi a předvypočtenými hashi.
- K uživatelskému heslu se přidá unikátní řetězec tzv. sůl (salt). Každý uživatel má jiný řetězec.
- Použitím Salt Hash znemožníme útok za použití předvypočtených hashů
- Pokud si dva uživatelé zadají stejné heslo, budou mít v systému uloženy dva zcela odlišné hashe.

<img src="/salthash.png" width="90%"/>

---

# Jak se tvoří solený hash

- Heslo uživatele se spojí s náhodným řetězcem (sůl) a výsledný řetězec se zahashuje.

- Heslo zadané uživatelem a sůl vygenerovaná systémem se spojí do jednoho řetězce a až pro ten spočte hash.
- Sůl je možné vložit před heslo (prefix), za heslo (postfix) případně doprostřed či kombinace.
- Solí by měl být dostatečně náhodný řetězec znaků, o určité délce. 
- Sůl není tajná informace a tudíž není potřeba ji chránit.
- Útočník by musel pro úspěšné lámání hesel zjistit, jak přesně algoritmus se solí zachází. To útočník může zjistit, ale také nemusí, zaleží na tom, zda může provést analýzu kódu
- Hashovací funkce MD5 a SHA nejsou bezpečné!
- Vyvarujte se opakování hashování. Paradoxně čím častěji ji spouštíte, nezvyšujete bezpečnost.

---

## Uložení dat
- Pro přihlášení uživatele budete mít v databázi uloženo:
  - Uživatelské jméno
  - Výsledek hashovací funkce
  - Počet cyklů (míra složitosti)
  - Samotná sůl

---

# Login

- Přihlášení uživatele je proces, kdy uživatel zadá své uživatelské jméno a heslo.
- Systém si vyhledá, jaká sůl byla použita, k heslu ji přičte, spočte hash a výsledek porovná.
- Pokud se vypočtený hash bude shodovat s hashem uloženým v systému, uživatel zadal heslo správně, v opačném případě bylo heslo zadáno chybně

---

# Hashování v praxi

```php
$password = 'tajne_heslo'; // Heslo uživatele, typicky z formuláře při registraci
```

```php

// Funkce pro osolení hesla
// Tajný algoritmus, jak zabezpečit heslo uživatele
function osoleneHeslo(string $password): string {
    $salt = 'urWfWwT9KAXuAUH*^w7sH&9@g';
    return $salt . $password . chunk_split($salt, 4 ,".");
}
```

...


```php

// Vygeneruje bezpečný hash s vyšší složitostí (výchozí je 10):
// Do funkce předáváme osolené heslo a nastavíme algoritmus na BCRYPT a složitost na 12
echo password_hash( osoleneHeslo($password), PASSWORD_BCRYPT, ['cost' => 12]);
// ukázka výstupu: $2y$12$tq.y6I1biT8I91a8hreuQeEmGXNtp2dsLuKqDdLu8sobhXHhqOpHG
```

---

# Hashování v praxi

```php
// Hash hesla uživatele načteme standardně z databáze. 
// Pro ukázku hash nyní vygenerujeme stejným algoritmem jako v předchozím slajdu
$ulozenyHash = password_hash($saltedPassFromForm, PASSWORD_BCRYPT, ['cost' => 12]); 
```

```php
...
// Krok 2: ověření hesla
// Zkontrolujeme heslo zadané uživatelem ve formuláři s uloženým heslem

// Uživatelské heslo z formuláře osolíme stejným mechanismem jako při registraci
$saltedPassFromForm = osoleneHeslo('tajne_heslo'); 

// Funkcí password_verifi ověříme shodu osoleného hesla s získaným hashem původního hesla
if (password_verify($saltedPassFromForm, $ulozenyHash)) {
    echo 'Heslo je platné';
} else {
    echo 'Neplatné heslo.';
}
```

---
layout: two-cols-header
---
# Heslo

::left::

<img src="/hive_2023.jpg" width="100%"/>

::right::

<img src="/hive_years.gif" width="100%"/>

---

<img src="/hygiene.png" />

---

<img src="/casmm.png" width="60%"/>

---

# Správci hesel
**Nejlepší heslo je žádné heslo**, ale pokud už musíte mít heslo, tak alespoň spravujte hesla správně.

- 1password pro studenty zdarma
  - Podmínka je mít aktivní ověřený github student a ten už máme
  - https://blog.1password.com/github-student-developer-pack/
- Bitwarden
- Dashlane
- Keepasxc

Vyvarovat se:
- Ukládání hesel v prohlížeči
- Lastpass – správce hesel s mnoha úniky
- Používání stejného hesla na více místech

---
layout: image-right
image: https://cover.sli.dev
---

# Zákon o kybernetické bezpečnosti

---

# Zákon o kybernetické bezpečnosti

## Klíčové informace
- Zákon č. 264/2025 Sb., o kybernetické bezpečnosti, vyhlášen 4. 8. 2025. 
- Účinnost od 1. 11. 2025. 
- Nahrazuje dřívější zákon č. 181/2014 Sb. a implementuje směrnici NIS2 (EU 2022/2555). 
- Cíl: zvýšit odolnost a bezpečnost kritické infrastruktury a digitálních služeb v ČR.

## Co se mění – hlavní změny
- Rozšíření působnosti: týká se více než ~6 000 organizací napříč odvětvími (energetika, doprava, zdravotnictví, infrastruktura, výzkum apod.).
- Zavedení dvou režimů pro poskytovatele regulované služby:
    - „vyšší režim“ (essential entities)
    - „nižší režim“ (important entities)
- Nové povinnosti: samoidentifikace, registrace u Národní úřad pro kybernetickou a informační bezpečnost (NÚKIB) do 60 dnů, zavedení bezpečnostních opatření, hlášení incidentů.

---

# Zákon o kybernetické bezpečnosti

## Povinnosti organizací
- Určení odpovědné osoby pro kybernetickou bezpečnost, v „vyšším režimu“ jmenování manažera kybernetické bezpečnosti.
- Zavedení systému řízení bezpečnostních rizik, vymezení aktiv, aktualizace smluv s dodavateli.
- Hlášení incidentů: základní hlášení do 24 hodin, následné doplnění do 72 hodin.

## Sankce a odpovědnost
- Významné pokuty: v „vyšším režimu“ až **250 mil. Kč** nebo **2 % celosvětového obratu**; v „nižším režimu“ až **175 mil. Kč** nebo **1,4 % obratu**.
- Nově možnost dočasného zákazu výkonu funkce člena statutárního orgánu při závažném opakovaném porušení.

## Dopad pro vás – co udělat
- Provést **analýzu**, zda vaše organizace spadá pod zákon (poskytovatel regulované služby).
- Zajistit **registraci** u NÚKIB v čas, pokud je to relevantní.
- Vypracovat či aktualizovat **interní politiku kybernetické bezpečnosti**, definovat role, procesy rizik, incidentů.
- Zajistit **školení** zaměstnanců a vedení, připravit dokumentaci pro audit.
- Nepodceňovat – pro vedení organizace je to strategická záležitost, ne jen IT otázka.

---
src: '../../pages/thanku.md'
---