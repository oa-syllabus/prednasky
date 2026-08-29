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
title: "Nastavení prostředí"
exportFilename: "20_db_nastaveni"
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

# MySQL server

- MySQL nebo MariaDB jsou nejčastěji používané databázové servery
- MySQL je open-source, MariaDB je fork MySQL
- MySQL je součástí balíku XAMPP


<img src="/xampp_mysql.png" width="80%"/>

---

# Nastavení MySQL serveru
- Po instalaci XAMPP je potřeba nastavit MySQL server
- Spustit XAMPP Control Panel
- Spustit MySQL server
- Nastavit heslo pro uživatele root
- Případně vytvořit nového uživatele

---

# Nastavení hesla pro root

- http://localhost/phpmyadmin
- Přihlásit se jako root
  - Menu `Uživatelské účty`,
  - vybrat uživatele `root` s názvem počítače `localhost`,
  - operace `Upravit oprávnění`
- **Heslo si dobře zapamatujte!** Reset hesla je velmi problematický!

<v-click>
<img src="/pma_ucet.png" width="80%" />
</v-click>

---

# Nastavení hesla pro root

<img src="/pma_zmena_hesla.png" width="50%"/>

<img src="/pma_noveheslo.png" width="50%"/>


---

# Konfigurace phpMyAdmin

- Konfigurační soubor PMA `C:\xampp\phpMyAdmin\config.inc.php`
- upravte konfiguraci pro přihlášení k databázi:

```php {1,3,5}
$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['user'] = 'root';
//$cfg['Servers'][$i]['password'] = '';
$cfg['Servers'][$i]['extension'] = 'mysqli';
$cfg['Servers'][$i]['AllowNoPassword'] = false;
$cfg['Lang'] = '';
```

---

# Vzorová databáze

- Pro účely výuky budeme používat vzorovou databázi `employees`
- Databáze obsahuje tabulky s daty zaměstnanců
- Databáze je dostupná na adrese: https://github.com/datacharmer/test_db/releases/
- ZIP rozbalte do adresáře `c:\xampp\htdocs\db`

---
layout: two-cols
---

# Import vzorové databáze
- V xampp control center spusťte Apache a MySQL
- Otevřete Shell
- V shellu přejděte do adresáře `c:\xampp\htdocs\db` a spusťte import databáze:

```shell
mysql -u root -p < employees.sql
```

- Po dokončení importu uvidíte vytvořené tabulky v databázi `employees`

::right::

```shell
Setting environment for using XAMPP for Windows.
fiser@NBFISER c:\xampp
# cd htdocs\db

fiser@NBFISER c:\xampp\htdocs\db
# mysql -u root -p < employees.sql
Enter password: ****
INFO
CREATING DATABASE STRUCTURE
INFO
storage engine: InnoDB
INFO
LOADING departments
INFO
LOADING employees
INFO
LOADING dept_emp
INFO
LOADING dept_manager
INFO
LOADING titles
INFO
LOADING salaries
data_load_time_diff
00:00:48

fiser@NBFISER c:\xampp\htdocs\db
```

---
src: '../../pages/thanku.md'
---