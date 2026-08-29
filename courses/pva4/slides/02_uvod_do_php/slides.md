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
title: "02 Úvod do PHP"
exportFilename: "02_uvod_do_php"
titleTemplate: "PVA4 %s by Adam Fišer"
info: |
  ## PVA4 Programování a vývoj aplikací

  Určeno pouze pro výukové účely
  
  [Repository](https://github.com/OA-PVA4-Syllabus/pva4_prednasky) / [Prezentace](https://oa-pva4-syllabus.github.io/pva4_prednasky/)

  Created by [Adam Fišer](https://github.com/AdamFiser)
---
layout: intro
---

<img src="/php_img.png" />

---

#  Obsah

<Toc :columns="2" minDepth="1" maxDepth="1"></Toc>
---

# Hypertextový preprocesor PHP

* Původní význam zkratky PHP byl Personal Home Page. 
* Vzniklo v roce 1996, od té doby prošlo velkými změnami a nyní tato zkratka znamená PHP: Hypertext Preprocessor.
* PHP je interpretovaný programovací jazyk
* Přípona .php (alternativně phtml, php3, php5)

<!--
PHP je dynamický programovací jazyk fungující na straně serveru. Všechny operace, jež jsou v něm napsány, tak neprovádí uživatelovo zařízení, ale datacentrum hostingu. To pak posílá do návštěvníkova prohlížeče pouze výsledek ve formě čistého HTML kódu. S tím je spojena řada výhod v čele s malou náročností na hardware koncového uživatele a relativní bezpečnost kódu.
Obrovskou předností tohoto jazyka je také jeho široká podpora a rozšířenost. Jelikož se dnes v podstatě jedná o standardní řešení, jež používají miliony projektů po celém světě, je PHP podporováno a nainstalováno snad na všech dostupných hostinzích. Za svých osmnáct let existence si navíc díky široké a aktivní komunitě dokázalo vybudovat velmi obsáhlé knihovny funkcí, které výrazně urychlují programátorům práce.
Relativně jednoduše je pomocí PHP řešeno také napojení na databáze. Jazyk nemá problém komunikovat s naprostou většinou dnes používaných typů, samozřejmě včetně té nejoblíbenější – MySQL. PHP je tak dobře a relativně rychle použitelné ať už řešíte e-shop, redakční systém či jinou webovou aplikaci.
Interpretovaný = pracuje na straně serveru. 
-->

---

# Globální servery využívající PHP

* Facebook
* Wikipedia
* Tumblr
* Slack
* MailChimp
* Etsy
* WordPress
* Yahoo
* Flickr
* Spotify
* Baidu

---

# PHP - výhody

Proč používat PHP

- **Jednoduché použití** – Jazyk se velmi snadno učí i implementuje. Je hojně používán v CMS např. WordPress, Joomla a Drupal.
- **Nákladově efektivní** – Je open source, nevyžaduje žádné licence.
- **Fast2Market** – Rychlé uvedení na trh. S využitím frameworků můžete vytvářet aplikace velmi rychle a efektivně.
- **Kompatibilita** – PHP podporuje všechny hlavní operační systémy a webové servery.
- **Bezpečnost** – skriptovací jazyk na straně serveru má bezpečnostní vrstvu
- **Obrovská komunita** – Neskutečně velká komunita vývojářů sdílející své zkušenosti a kódy.

---

# PHP - nevýhody

Proč nepoužívat PHP

- **Rychlost** – PHP je interpretovaný jazyk, což znamená, že je pomalejší než kompilované jazyky.
- **Špatná kvalita kódu** – PHP je velmi flexibilní jazyk, což může vést k napsání špatného kódu.
- **Špatná podpora** – PHP nenabízí placenou podporu pro vývojáře.
- ~~**Bezpečnost** – PHP je známý svými bezpečnostními problémy.~~
- ~~**Špatná dokumentace** – PHP má špatnou dokumentaci.~~
- ~~**Nízká škálovatelnost** – PHP je špatný pro velké projekty.~~

---

# Jak funguje PHP

<img src="/jak_funguje_php.png" />

<!--
Webový prohlížeč návštěvníka odešle požadavek na webový server, kde je stránka umístěna.
Pokud má požadovaná webová stránka příponu PHP (např. název souboru.php), předá ji webový server interpretu PHP, který je nainstalován na webovém serveru.
Interpret PHP získá soubor PHP z pevného disku a spustí kód PHP. Odesílá nebo přijímá informace z databáze, pokud je k tomu skript PHP napsán. Poté vygeneruje výstup ve formě kódu HTML a odešle jej na web.
-->

---
src: '../../pages/thanku.md'
---