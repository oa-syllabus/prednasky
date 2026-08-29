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
title: "12 Email"
exportFilename: "12_email"
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

# Použití emailových zpráv

- Nákladově efektivní způsob, jak upozornit uživatele na důležité události.
- Zasílání zpráv skrze kontaktní formuláře.
- Pro vývojáře upozornění na chyby v aplikaci.
- Zasílání aktivačních odkazů pro potvrzení emailové adresy.
- Zasílání odkazů pro obnovení hesla.
- Není doporučeno pro mailing.



---

# Hlavičky emailu

| Hlavička | Popis | Příklad                                  |
| --- | --- |------------------------------------------|
| `From` | Adresa odesílatele | `From: mojeAplikace@wanex.cz`            |
| `To` | Adresa příjemce | `To: prijemce@gmail.com`                 |
| `Bcc` | Skrytá kopie | `Bcc: skrytaKopie@gmail.com`             |
| `Reply-To` | Adresa pro odpověď | `Reply-To: odpoved@mail.cz`            |
| `Subject` | Předmět zprávy | `Subject: Aktivace účtu`                 |
| `Content-Type` | Typ obsahu | `Content-Type: text/html; charset=utf-8` |
| `Date` | Datum odeslání | `Date: Mon, 11 Nov 2024 12:00:00 +0100`  |

---

# Hlavičky emailu

| Hlavička | Popis | Příklad                                  |
| --- | --- |------------------------------------------|
| `MIME-Version` | Verze MIME | `MIME-Version: 1.0`                      |
|`Return-Path` | Návratová adresa | `Return-Path: helpdesk@wanex.cz`         |
| `X-Mailer` | Informace o odesílateli | `X-Mailer: PHP/8.1`                      |
| `X-Priority` | Priorita zprávy | `X-Priority: 1`                          |
| `X-MSMail-Priority` | Priorita zprávy | `X-MSMail-Priority: High`                |
| `Content-Transfer-Encoding` | Kódování obsahu | `Content-Transfer-Encoding: 8bit`        |


---

# Hlavičky emailu

```php
// Obecně hlavičky nejsou povinné
// Pokud chcete posílat HTMl emaily, musí být nastaveno
$hlavicky[] = 'MIME-Version: 1.0';
$hlavicky[] = 'Content-type: text/html; charset=windows-1250';

// Další hlavičky
$hlavicky[] = 'To: Příjemce <prijemce@example.cz>, Druhý příjemce <druhy@example.cz>';
$hlavicky[] = 'From: Moje Aplikace <moje@aplikace.cz>';
$hlavicky[] = 'Cc: kopie@example.com';
$hlavicky[] = 'Bcc: skryta@kopie.cz';
```

---

# `mail()`

- Emailová adresa může být ve tvaru:
  - Čistá emailová adresa `prijemce@domena.com`
  - Emailová adresa s jménem `Jméno Příjemce <prijemce@domena.com>`
- Předmět a obsah zprávy mohou být textové nebo HTML.
- Pro HTML emaily je nutné nastavit `Content-Type` na `text/html`.

```php
$emailPrijemce = 'muj@email.com';
$predmet = 'Předmět emailové zprávy';
$obsah = 'Obsah zprávy';

// Základní poslání
mail($emailPrijemce, $predmet, $obsah, implode("\r\n", $hlavicky));
    
```

---

# Emaily na vývoji

- Pro vývoj je vhodné nastavit `Return-Path` na email, který je schopen přijímat emaily.
- Vývojové prostředí může být blokováno kvůli špatně nastaveným emailům.
- Pro vývoj je vhodné použít nástroje jako Mailtrap, Papercut SMTP,...

## Papercut SMTP
- .NET 8+ Desktop Runtime
  - https://dotnet.microsoft.com/en-us/download/dotnet/8.0
- z poslední release vybrat portable verzi a spustit (Pokud chcete používat pravidelně, stáhnout instalátor)
  - https://github.com/ChangemakerStudios/Papercut-SMTP

---

# Nastavení `php.ini`

- Pro odesílání emailů je nutné mít nastavený SMTP server.
- Nastavení se provádí v souboru `C:\xampp\php\php.ini`

```ini
[mail function]
; For Win32 only.
; http://php.net/smtp
SMTP = localhost
; http://php.net/smtp-port
smtp_port = 25

; Je-li posílání přes externí server, vyplnit
; pro authorizované smtp
auth_username = uzivatel@domena.cz
auth_password = mojeTajneHeslo
```

---

# Doporučení a bezpečnost

- ✅ Validuj e-mailové adresy uživatelů.
- ✅ Omezuj přístup k funkci odesílání.
- ✅ Loguj odeslané zprávy.


⚠️ Nastav správně:
 - SPF (Sender Policy Framework)
 - DKIM (DomainKeys Identified Mail)
 - Reverse DNS a PTR záznamy

---

# Testování odesílání emailů

- Pro testování odesílání emailů můžeš použít nástroje jako Mailtrap nebo Papercut SMTP.
- Tyto nástroje zachytí odeslané emaily a umožní ti je prohlížet bez skutečného odeslání.
- Mailtrap nabízí i funkce jako spam testy, analýzu obsahu a další.
- Papercut SMTP je jednoduchý nástroj pro zachytávání emailů lokálně

| Nástroj                                                              |	Popis |
|----------------------------------------------------------------------| --- |
| [Papercut SMTP](https://github.com/ChangemakerStudios/Papercut-SMTP) | Desktop aplikace pro zachytávání emailů |
| [Mailtrap](https://mailtrap.io/)                                     | Testovací SMTP sandbox |
| [Mailhog](https://github.com/mailhog/MailHog)                                                          | SMTP + Web UI, funguje v Dockeru |

> Nainstaluj si Papercut SMTP a nastav v `php.ini` `SMTP = localhost`, `smtp_port = 25` a spusť Papercut před odesláním emailu.

---
layout: image-right
image: https://cover.sli.dev
---

# Knihovny pro emaily

---

# Knihovny pro emaily
- Pro složitější emaily je vhodné použít knihovny, které usnadňují práci s emaily.
- Mezi nejpoužívanější patří:
  - PHPMailer
  - SwiftMailer
  - Symfony Mailer
- Tyto knihovny umožňují:
  - Snadné přidávání příloh
  - Podpora HTML emailů
  - Podpora SMTP autentizace, TLS/SSL, DKIM...
  - Snadné nastavení hlaviček

---

# PHPMailer
- PHPMailer je jedna z nejpopulárnějších knihoven pro odesílání emailů v PHP.
- Podporuje odesílání přes SMTP, přidávání příloh, HTML emaily a další funkce.
- Instalace pomocí Composeru:
```bash
composer require phpmailer/phpmailer
```

---

# Odeslání emailu pomocí PHPMailer

```php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host = 'smtp.example.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'uzivatel@example.com';
  $mail->Password = 'tajneheslo';
  $mail->SMTPSecure = 'tls';
  $mail->Port = 587;

  $mail->setFrom('from@example.com', 'Moje Aplikace');
  $mail->addAddress('prijemce@example.com');
  $mail->Subject = 'Předmět zprávy';
  $mail->Body = 'Tělo zprávy s podporou <b>HTML</b>';
  $mail->isHTML(true);
  
  $mail->addAttachment('/cesta/k/souboru.pdf', 'soubor.pdf'); // Přidání přílohy

  $mail->send();
  echo 'Zpráva byla odeslána';
} catch (Exception $e) {
  echo "Chyba při odesílání: {$mail->ErrorInfo}";
}
```

---

# Shrnutí

- Emailové zprávy jsou důležitou součástí webových aplikací.
- Hlavičky emailu umožňují nastavit různé parametry zprávy.
- Funkce `mail()` je základní způsob odesílání emailů v PHP.
- Pro složitější emaily je vhodné použít knihovny jako PHPMailer.
- Vždy dbej na bezpečnost a správné nastavení emailových služeb.

---
src: '../../pages/thanku.md'
---