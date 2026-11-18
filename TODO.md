# Da completare prima della pubblicazione

Elenco di tutto ciò che nel sito è segnaposto, mancante o da verificare. Nessun contenuto è stato
inventato per riempire gli spazi: dove non c'erano dati reali, la pagina dichiara che manca.

## 1. Contatti (bloccante)

- **Email**: `ciao@officinahabitat.it` è un segnaposto. Compare in
  `contatti.html`, nel piè di pagina di tutte le pagine e nella costante `EMAIL`
  di `assets/js/main.js`. Da sostituire in tutti e tre i punti.
- **Telefono e WhatsApp**: non inseriti, perché non disponibili. La lista delle guidelines
  prevede «email, telefono o WhatsApp»: quando il numero esiste, aggiungilo nella colonna
  «Altri modi per scrivermi» di `contatti.html` e nel piè di pagina.
- **Area di lavoro**: in pagina c'è «indicami il comune», non una zona dichiarata. Se vuoi
  dichiarare province o raggio in chilometri, va scritto in `contatti.html`.
- **Informativa privacy**: il modulo contiene una nota breve su come vengono usati i dati, non
  un'informativa completa. Con una partita IVA attiva serve una pagina dedicata, linkata dalla
  casella di consenso e dal piè di pagina.

## 2. Portfolio e immagini (bloccante per la credibilità)

- Non c'è nessun progetto pubblicato: `progetti.html` e le tre pagine di area mostrano uno
  stato vuoto che lo dichiara. **Non sono stati inventati casi studio.**
- Servono almeno 2–3 progetti autentici per area, raccontati con le cinque voci già descritte in
  `progetti.html` (contesto, esigenza, progettazione, realizzazione, risultato).
- Le tre schede «da compilare» in `progetti.html` contengono un riquadro tratteggiato con
  «Foto del progetto da inserire»: sostituiscilo con un `<img>` con `width`, `height`, `alt` e
  `loading="lazy"` per non far saltare il layout.
- Servono anche le autorizzazioni delle persone e dei proprietari dei mezzi fotografati.
- Nessuna immagine di apertura: le pagine usano fondi pieni e una trama leggera, non foto.
  Quando ci sono foto proprie, l'hero è il primo posto dove metterle.

## 3. Testi da completare

- **Storia personale in `chi-sono.html`**: c'è un commento HTML dove va. Formazione, anni di
  esperienza e percorso non erano nelle guidelines e non sono stati inventati.
- **Competenze**: l'elenco è ricavato dalle aree descritte nelle guidelines. Da confermare e
  dettagliare con quello che sai fare davvero (macchinari, certificazioni, corsi).
- **Tempi di risposta**: in `contatti.html` è scritto «entro due giorni lavorativi». Cambialo se
  non è realistico: è una promessa visibile.
- **Limite di competenza in `trasformare.html`**: è scritto che impianto elettrico, gas e
  idraulico vanno a chi è abilitato. Verifica che corrisponda a come lavori.

## 4. Verifiche sul nome (dalle guidelines, § 08)

«Officina Habitat» è una proposta creativa, non una verifica di disponibilità. Prima dell'uso
commerciale: marchi registrati, denominazioni simili, dominio e account social.

## 5. Tecnico

- Scegliere il dominio e, se non è la root del repo, aggiungere il file `CNAME`.
- Aggiungere `og:image` (1200×630) con il logo o una foto di progetto: ora i meta Open Graph
  non hanno immagine, quindi i link condivisi restano senza anteprima.
- Decidere se tenere Google Fonts o servire i caratteri dal repo (meno richieste esterne e
  meno dati verso terzi).
- Opzionale: `sitemap.xml` una volta fissato il dominio.
