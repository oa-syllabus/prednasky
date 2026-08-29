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
title: "00 Úvodní hodina"
exportFilename: "00_uvodni_hodina"
titleTemplate: "PVA4 %s by Adam Fišer"
info: |
  ## PVA4 Programování a vývoj aplikací

  Určeno pouze pro výukové účely
  
  [Repository](https://github.com/OA-PVA4-Syllabus/pva4_prednasky) / [Prezentace](https://oa-pva4-syllabus.github.io/pva4_prednasky/)

  Created by [Adam Fišer](https://github.com/AdamFiser)
---
layout: default
---

<img src="/dev_head.jpg" />
# Programování a vývoj aplikací

---

#  Obsah

<Toc :columns="2" minDepth="1" maxDepth="1"></Toc>
---

# Lektor

## Adam Fišer
Software & solutions architect, analyst and occasional teacher with a passion for 🪴plants, IoT, FVE and economy

* Senior Software architect
* PKP CARGO INTERNATIONAL, a. s.
* IT Freelancer a příležitostný lektor



## Kontakt

* Výhradně jen Teamsy (přes bakaláře **nepište**)
* Email: adam.fiser@wanex.cz
* Tel: +420 777 052 248
* Konzultace: Teamsy, místnost 217, kdykoli po domluvě

---

# Lektor ve zkratkách

* SDLC, OpenRUP, Prince 3, Agile, UML
* BI, BI Tibco, Jasper, Grafana, ETL
* DB servery (MSSQL, PostgreSQL, MySQL)
* SQL, PHP, Python, HTML, CSS, dev patterns, CD/CI, docker
* ERP, DMS, CMS, LMS
* SCM (Git, Github, svn)
* MDM Airwatch, SDN Unifi, IoT a HW obecně
* MS 365, Eset, GA, SEO, marketing a další

---
layout: two-cols-header
---

# Realizované projekty

Role: Projektový manažer, architekt, analytik a občasný vývojář

::left::

- **NIS2 Compliance**  
  *Zavedení procesů a systémů pro splnění požadavků směrnice NIS2 (Network and Information Systems Directive) v rámci kybernetické bezpečnosti.*

- **Systémy a procesy pro DevOps**  
  *Vybudování oddělení a zavedení procesů a systémů pro vývoj a nasazení aplikací.* Docker, Elastic, Sentry, Git/GitHub, Grafana, ...

- **TAF TSI (Technická specifikace pro interoperabilitu)**  
  *železniční nákladní doprava<br>*
  *intermodal a kontejnerová přeprava*

- **Mzdový a personální systémy**  
  *Implementace systémů KS, Pema, Pers, Abra pro správu mezd a personálních dat.*

::right::

- **Mobilní terminály a MDM**  
  *Aplikace pro řízení personálu v terénu* Workspace One, MobiDriver, Navigace

- **Business Intelligence a reporting**  
  *Systémy pro analýzu a výměny dat, automatizace reportů*

- **Řídicí systémy železniční dopravy**  
  *Vývoj operačních a kontrolních systémů pro železniční dopravu.* LWP, Eval, isdl, ...

- **Systém správy oprav**  
  *Řízení oprav a údržby kolejových vozidel.*

---
layout: two-cols-header
hideInToc: true
---

# Realizované projekty

::left::

- **Customer Relationship Management (CRM)**  
  *Systémy pro správu vztahů se zákazníky a kalkulační systém.* kaplan, plusKlub

- **Systém správy dokumentů**  
  *Implementace DMS pro správu smluv, faktur, atd.* Sharepoint, Nintex, Treeinfo, Alfresco

- **Systém pro seznámení s předpisy**  
  *Nástroj pro obeznámení zaměstnanců s interními směrnicemi a předpisy.* Doku, Manes, Alfresco

- **Container Terminal Management System**  
  *Řízení provozu kontejnerových terminálů.* Konti

- a mnoho dalšího ...

::right::

---
layout: section
image: https://cover.sli.dev
hideInToc: true
---

# PVA2 Programování a vývoj aplikací

---
layout: image-right
image: https://cover.sli.dev
---

# PVA4 Programování a vývoj aplikací


## Cíle předmětu 

* Čelit problémům a hledat řešení
* Formulovat problém a jeho řešení počítačovým program
* Získat zkušenost s programováním
* Osvojit si schopnost číst, psát a porozumět programům
* Získat programovací návyky jak programy psát

---
layout: center
hideInToc: true
---

# Já vás programovat nenaučím.
# To dokážete jen <span v-mark.circle.red>vy sami</span> – když budete <span v-mark.underline.orange>zkoušet, ptát se a dělat chyby</span>.

---
layout: center
hideInToc: true
---

# Neřeknu Vám odpověď, ale <span v-mark.underline.orange>pomohu Vám najít cestu</span>, jak na ni přijít.

---
layout: two-cols
---

# Co nás čeká

* Vývojové prostředí a nástroje
  * IDE - PHP Storm/Visual studio…
  * SCM Git, GitHub a Markdown
  * Apache
  * MySQL
* Vývoj webových aplikací
  * PHP
  * Development, test a deploy

::right::

<v-click>

* Databázové systémy
* Entity-Relationship model
* Structured Query Language
* MySQL
* DB (vytvoření, indexy, relace)
* Kompozice DB do aplikace
* Nette Framework

</v-click>

---

# Organizace předmětu

* Výuka probíhá formou přednášek a cvičení
* Cvičení na sebe obsahově anebo výukově navazují
* Přednášky, výukové materiály a úkoly jsou na Moodle: www.oa-opava.net
* Zdrojové kódy odevzdáváme výhradně přes GitHub
* Absence - Po návratu dopracovat chybějící cvičení

---

# Pravidla

- Jídlo a pití dle libosti, ale v rámci mezí slušného chování
- Na toaletu v průběhu hodin, neptáme se, oznámíme, ale vždy jen jednotlivě
- Všechny židle budou vždy dole
- Na konci hodiny, židle nahoru, zavřená okna - odpovídá služba.

---

# Hodnocení a pravidla

Známky získáváte za:

- Průběžná práce a aktivita v hodinách
- Všechny vypracované cvičení a úkoly (Cvičení na sebe navazují)
- Projekty a skupinová cvičení
- Opravy a zlepšení známky
    - Komu se nepovede známka, může si vylepšit opravou. (původní známka zůstává)
    - Domluvě a vlastní iniciativě se meze nekladou.

---

## Testy

- Testy
    - Výukové materiály dovoleny, není-li uvedeno jinak.
    - Kopírování, opisování a AI nikoli.
    - Každý zahájený test znamená jeho známkování (ikdyž není určen pro Vás).
- Absance testu
    - Není-li psán test v řádném termínu, po návratu do dvou vyučovacích hodin požádat o náhradní termín.
    - Žádáme minimálně 2 pracovní dny předem.
    - U delší objektivní absence dle domluvy.
    - Svou klasifikaci si hlídáte sami.

---

# Hodnotící škála

| **Známka**           | **Rozsah** | **Popis**                                                                                                              |
|----------------------|------------|------------------------------------------------------------------------------------------------------------------------|
| **1 – výborný**      | 100–90%    | Kód je funkční, čitelný, efektivní, bezpečný a přehledně strukturovaný.<br>Dodržuje zadání a základní pravidla zápisu. |
| **2 – chvalitebný**  | 89–75%     | Kód je funkční, obsahuje drobné chyby nebo nedostatky.<br>Zadání je splněno.                                           |
| **3 – dobrý**        | 74–60%     | Kód je částečně funkční, obsahuje chyby nebo má výraznější nedostatky.<br>Zadání je splněno jen zčásti.                |
| **4 – dostatečný**   | 59–40%     | Program je neúplný nebo funguje jen částečně. Obsahuje mnoho chyb, ale je vidět snaha o řešení.                        |
| **5 – nedostatečný** | 39–0%      | Program nefunguje nebo zcela chybí. Zadání není splněno.                                                               |

---

# Kritéria hodnocení

1. Technická správnost
    - Správná syntaxe
    - Funkčnost všech částí kódu
    - Bez zbytečných částí kódu

2. Splnění zadání
    - Implementace všech požadovaných funkcionalit

3. Styl kódu:
    - Přehledné odsazení
    - Použití komentářů

4. Bonusové body:
    - Originální a efektivní řešení

---

# Zdroje a literatura

* Hodiny, slidy, poznámky a vlastní poznámky
* Cvičení na GitHubu
* 
## Doporučené zdroje
* https://www.php.net/docs.php
* https://dev.mysql.com/doc/refman/8.0/en/
* https://github.com/EbookFoundation/free-programming-books/blob/master/books/free-programming-books.md#php
A mnoho dalších 


---
layout: image-right
image: /predstaveni.jpg
---


# Představujeme se 

* Kdo jsem?
* Kdo a co mě dovedlo k IT?
* Mám zkušenosti s programováním?
* Jaké mám očekávání od předmětu?
* Co mě na IT baví nebo naopak nebaví?
* Zajímavá informace o mě?

---

# První kroky

Registrace kurzu na Moodle:

* Přejděte na www.oa-opava.net
* Zapište se do kurzu **pva4 2025/2026** - Programování a vývoj aplikací
  (sekce Informační technologie\Adam Fišer\)
* Nastavte si profilovou fotku.

---
src: '../../pages/thanku.md'
---