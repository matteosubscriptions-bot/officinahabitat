# Officina Habitat — sito

Sito statico (HTML, CSS, JavaScript) costruito sulle *Brand Guidelines v1.0 — novembre 2026*.
Nessuna dipendenza, nessun passaggio di compilazione: i file si aprono e si pubblicano così come sono.

## Pagine

| File | Contenuto | Obiettivo |
|---|---|---|
| `index.html` | Promessa, tre aree, idea centrale, progetti, approccio, metodo, contatto | Far capire e generare richieste |
| `costruire.html` | Lavorazioni, materiali, tipologie di intervento | Richieste di falegnameria e costruzione |
| `coltivare.html` | Tipologie di orto, metodo, realizzazioni | Richieste di progettazione e realizzazione |
| `trasformare.html` | Allestimenti, layout, vincoli, portfolio | Richieste per progetti di furgoni |
| `progetti.html` | Portfolio, scheda standard, filtri per area | Dimostrare competenza e affidabilità |
| `chi-sono.html` | Attività, modo di lavorare, competenze, parole chiave | Creare fiducia |
| `contatti.html` | Modulo, modalità di collaborazione, preventivi | Semplificare il primo contatto |

Navigazione: cinque voci sempre visibili (nessun menu a tendina, nessun hamburger) più il
pulsante «Raccontami il tuo progetto», che sta nello stesso posto in ogni pagina.

## Sistema visivo

Tutti i valori stanno in `:root` dentro `assets/css/style.css`. Palette delle guidelines:

| Ruolo | Token | Valore |
|---|---|---|
| Principale | `--c-verde` | `#293D31` |
| Accento | `--c-terracotta` | `#B66D4D` |
| Accento per testo piccolo | `--c-terracotta-testo` | `#8A4B30` |
| Supporto | `--c-sabbia` | `#D9C9AA` |
| Sfondo chiaro | `--c-avorio` | `#EDE9DF` |
| Testo | `--c-carbone` | `#44443D` |

`--c-terracotta-testo`, `--c-testo-sec` e `--c-bordo-campo` non sono nelle guidelines: sono
varianti aggiunte perché il terracotta puro su avorio dà 3,28:1, sufficiente per testo grande,
bordi e icone (soglia 3:1) ma non per il testo normale (soglia 4,5:1).

Contrasti calcolati con la formula WCAG 2.x:

| Coppia | Rapporto | Uso |
|---|---|---|
| avorio su verde bosco | 9,6:1 | testo su sezioni verdi |
| carbone su avorio | 8,1:1 | testo corrente |
| sabbia su verde bosco | 7,1:1 | occhielli e link su verde |
| `#8A4B30` su avorio | 5,6:1 | occhielli e link su chiaro |
| `#5C5C52` su avorio | 5,6:1 | testo secondario |
| `#6F6F63` su avorio | 4,2:1 | bordi dei campi (≥ 3:1) |
| terracotta su avorio | 3,3:1 | bordi, filetti, anello di focus (≥ 3:1) |

Caratteri: Archivo (titoli e interfaccia), Inter (corpo), Fraunces in corsivo solo per la
citazione. Caricati da Google Fonts con `display=swap` e fallback di sistema.

## Modulo di contatto

Il sito è statico, quindi non c'è un server che riceve il modulo. `assets/js/main.js` convalida
i campi e poi apre il programma di posta con il messaggio già compilato verso l'indirizzo in
`EMAIL`. L'indirizzo è comunque sempre visibile in pagina e nel piè di pagina, così esiste una
strada che funziona anche senza JavaScript (c'è un `<noscript>` che lo dice).

Per passare a un invio vero: apri `assets/js/main.js`, metti l'URL del servizio
(Formspree, Basin, Netlify Forms…) nella costante `ENDPOINT` e il modulo verrà inviato là.

## Pubblicazione su GitHub Pages

Impostazioni del repository → Pages → *Deploy from a branch* → ramo `officinahabitat`, cartella
`/ (root)`. Il sito non usa cartelle con il trattino basso, quindi non serve `.nojekyll`.

## Da sostituire prima di andare online

Vedi `TODO.md`: email, contenuti del portfolio, foto e storia personale sono segnaposto o
mancanti, e il nome va verificato come scritto nelle guidelines.
