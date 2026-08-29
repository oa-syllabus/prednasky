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
title: "Týmová aplikace"
exportFilename: "60_team_app"
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

# Úvod

- Vítejte na úvodní hodině týmového projektu! Dnes se zaměříme na vytvoření vlastní aplikace v Pythonu. Budete pracovat v malých týmech a získáte cenné zkušenosti s návrhem, programováním a testováním.



---

# Název společnosti

První krok: Vymyslete název své fiktivní softwarové společnosti.

- Chcete si založit vlastní společnost, která se zabývá vývojem aplikací.
- Každý na papír vymyslí tři názvy společnosti, který by se mu líbil.
- Přemýšlejte o názvu, který bude kreativní, snadno zapamatovatelný. 
- Nebojte se být originální, ale vyhněte se vulgárním nebo urážlivým názvům.

---

# Sestavení týmu

- Vytvořte si tým o 3-4 lidech
- Představte se svým spoluhráčům a krátce si řekněte, kdo má jaké silné stránky.
- Vyberte si týmového lídra, který bude zodpovědný za organizaci práce a komunikaci s učitelem.

---

# Název týmu

Nyní si vytvořte název svého týmu.

- Z názvů společností, které jste napsali na papír, vyberte jeden, který se vám líbí nejvíce.
- Název týmu se promítne do jména vašeho GitHub repozitáře a stane se vaší identitou během celého projektu.
- Váš tým bude tento název používat při všech prezentacích a odevzdávání práce.
- Výsledný název týmu by měl být schválen všemi členy týmu.

---

# Evidence týmu

- Vybraný název týmu napište na papír a předejte učiteli. 
- Pokud je návrh názvu učitelem schválen, vedoucí teamu ho založí přes odkaz.
- Členové se přihlásí do repozitáře a přidají se do svého týmu.

---

# Výběr tématu aplikace

- Každý na papír napíše pět nápadů na téma aplikace, kterou budete chtít tvořit.
- Hledejte něco, co je jednoduché, užitečné a bude vás bavit.
- Klidně se inspirujte každodenními problémy, které byste chtěli vyřešit.

---

# Výběr tématu aplikace 2

- Představte si navzájem své nápady.
- Diskutujte o nich společně a vyberte téma pro realizaci.
- Pokud se nedohodnete, můžete použít téma, které bylo nejčastěji navrženo.

---

# Příklady témat aplikací

Téma si volíte vlastní, ale zde je pár příkladů:

- Hádej číslo - jednoduchá hra, kde počítač náhodně zvolí číslo a hráč ho hádá
- Převodník jednotek - aplikace pro převod mezi několika základními jednotkami (např. délka, hmotnost)
- Generátor hesel - jednoduchý program pro generování náhodných hesel
- Textový analyzátor - spočítání počtu slov, písmen v textu
- Kámen-nůžky-papír - jednoduchá implementace klasické hry
- To-Do seznam - velmi základní správce úkolů (přidat, odebrat, zobrazit)
- Slovník - jednoduchý program pro ukládání a vyhledávání definic

---



# Formální požadavky

Pravidla hry
- Práce bude probíhat ve skupinách po 3-4 lidech.
- Kód ukládejte na GitHub a používejte verzování.
- Každý člen týmu ytvoří alespoň jednu branch a provede několik commitů za svou část práce.
- Připravte jednoduchý README.md soubor s popisem projektu, rozdělení odpovědností členů týmu a návodem na spuštění.

---

# Nefunčkní požadavky

Vaše aplikace by měla splňovat následující:
- Bude napsaná za využití principů objektově orientovaného programování
- Mít testy, které testují všechny metody a ověřují, že všechny funkce fungují správně.
- Testy jsou spouštěny automaticky pomocí GitHubu
- Ošetřovat chyby pomocí výjimek tak, aby program nikdy nepadal, ale zobrazoval srozumitelné hlášky.

## Bonus
- Za přidání grafického rozhraní (např. pomocí tkinter).
- Za unikátní řešení, které jsme dosud nezkoušeli.

---
layout: two-cols
---

# Odevzdání projektu

- Prezentace bude realizována v termínu 26.5. - 13.6.2025
- **nenechávejte na poslední termín**, nemusíte při velkém zájmu dostat prostor

## Co odevzdáte
- Zdrojové kódy v GitHub repozitáři
- Prezentaci odevzdáte jako PDF soubor do repozitáře

::right::

## Prezentace
- Krátká prezentace projektu ukázka funkcionality
- Každý člen týmu krátce popíše svou část práce
- Prezentace by měla obsahovat:
  - Popis aplikace k čemu slouží
  - Jaké funkce nabízí a jak fungují
  - Jaké technologie byly použity
  - Narazili jste na nějaké problémy? Jak jste je vyřešili?
  - Jaké úkoly jste měli v týmu?
  - Prezentujeme jako tým, každý člen odprezentuje svou část




---

# Tipy pro úspěšný projekt

- Držte projekt velmi jednoduchý - zaměřte se hlavně na základní funkčnost.
- Rozdělte si úkoly mezi sebou rovnoměrně a jasně.
- Pravidelně komunikujte v týmu a řešte problémy společně.
- Používejte GitHub pro sledování změn, evidenci chyb a spolupráci.

---

# Funkční požadavky

- Každý na stickit definuje funkční požadavek
- Jeden lístek = jeden požadavek
- Každý vytvoří alespoň 8 požadavků



---
src: '../../pages/thanku.md'
---