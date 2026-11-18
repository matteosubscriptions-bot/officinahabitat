/* ==========================================================================
   OFFICINA HABITAT — comportamenti del sito
   Miglioramento progressivo: senza JavaScript le pagine restano leggibili,
   i filtri non compaiono e il modulo rimanda all'email diretta.
   ========================================================================== */
(function () {
  'use strict';

  /* Indirizzo a cui arrivano le richieste del modulo. */
  var EMAIL = 'ciao@officinahabitat.it';

  /* Se in futuro usi un servizio di raccolta moduli (Formspree, Basin,
     Netlify Forms...), incolla qui l'URL: il modulo verra' inviato la'
     invece di aprire il programma di posta. */
  var ENDPOINT = '';

  /* ------------------------------------------------------- filtri progetti */
  function avviaFiltri() {
    var blocco = document.getElementById('filtri-progetti');
    var elenco = document.getElementById('elenco-progetti');
    var vuoto = document.getElementById('progetti-nessuno');
    var esito = document.getElementById('filtri-esito');
    if (!blocco || !elenco) { return; }

    var pulsanti = Array.prototype.slice.call(blocco.querySelectorAll('[data-filtro]'));
    var schede = Array.prototype.slice.call(elenco.querySelectorAll('[data-area]'));
    blocco.hidden = false;

    function applica(filtro) {
      var visibili = 0;
      schede.forEach(function (scheda) {
        var mostra = (filtro === 'tutte' || scheda.getAttribute('data-area') === filtro);
        scheda.hidden = !mostra;
        if (mostra) { visibili++; }
      });
      pulsanti.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-filtro') === filtro));
      });
      if (vuoto) { vuoto.hidden = visibili > 0; }
      elenco.hidden = visibili === 0;
      if (esito) {
        esito.textContent = visibili === 0
          ? 'Nessuna scheda per questo filtro.'
          : visibili + (visibili === 1 ? ' scheda mostrata.' : ' schede mostrate.');
      }
    }

    pulsanti.forEach(function (b) {
      b.addEventListener('click', function () { applica(b.getAttribute('data-filtro')); });
    });

    var azzera = document.querySelector('[data-azzera]');
    if (azzera) {
      azzera.addEventListener('click', function () {
        applica('tutte');
        var primo = pulsanti[0];
        if (primo) { primo.focus(); }
      });
    }
  }

  /* -------------------------------------------------------- modulo contatti */
  var REGOLE = {
    nome: {
      etichetta: 'Nome e cognome',
      verifica: function (v) {
        if (!v) { return 'Scrivi il tuo nome, così so come chiamarti.'; }
        if (v.length < 2) { return 'Il nome sembra incompleto: scrivilo per intero.'; }
        return '';
      }
    },
    email: {
      etichetta: 'Email',
      verifica: function (v) {
        if (!v) { return 'Inserisci la tua email: è con quella che ti rispondo.'; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
          return 'Inserisci un’email con la chiocciola, ad esempio nome@dominio.it';
        }
        return '';
      }
    },
    telefono: {
      etichetta: 'Telefono',
      verifica: function (v) {
        if (!v) { return ''; }
        if (!/^[+()\d\s.\-\/]{6,}$/.test(v)) {
          return 'Usa solo cifre, spazi e il prefisso, ad esempio +39 333 1234567';
        }
        return '';
      }
    },
    area: {
      etichetta: 'Di cosa si tratta',
      verifica: function (v) {
        if (!v) { return 'Scegli l’area più vicina, oppure «Non lo so ancora».'; }
        return '';
      }
    },
    luogo: { etichetta: 'Comune o zona del progetto', verifica: function () { return ''; } },
    messaggio: {
      etichetta: 'Raccontami il progetto',
      verifica: function (v) {
        if (!v) { return 'Scrivi due righe su cosa ti serve.'; }
        if (v.length < 15) {
          return 'Aggiungi un dettaglio in più: cosa ti serve e dove va.';
        }
        return '';
      }
    },
    consenso: {
      etichetta: 'Consenso al contatto',
      verifica: function (v) {
        if (v !== 'si') { return 'Spunta la casella per permettermi di risponderti.'; }
        return '';
      }
    }
  };

  function avviaModulo() {
    var form = document.getElementById('form-contatto');
    if (!form) { return; }

    var riepilogo = document.getElementById('riepilogo-errori');
    var riepilogoLista = document.getElementById('riepilogo-lista');
    var pannelloEsito = document.getElementById('esito-invio');
    var pannelloGuasto = document.getElementById('guasto-invio');
    var toccati = {};

    function valore(nome) {
      var el = form.elements[nome];
      if (!el) { return ''; }
      if (el.type === 'checkbox') { return el.checked ? 'si' : ''; }
      return String(el.value || '').trim();
    }

    function mostraErrore(nome, messaggio) {
      var contenitore = document.getElementById('campo-' + nome);
      var avviso = document.getElementById('errore-' + nome);
      var el = form.elements[nome];
      if (!contenitore || !avviso || !el) { return; }
      avviso.textContent = messaggio;
      if (messaggio) {
        contenitore.classList.add('campo--errore');
        el.setAttribute('aria-invalid', 'true');
      } else {
        contenitore.classList.remove('campo--errore');
        el.removeAttribute('aria-invalid');
      }
    }

    function controlla(nome) {
      var messaggio = REGOLE[nome].verifica(valore(nome));
      mostraErrore(nome, messaggio);
      return messaggio;
    }

    Object.keys(REGOLE).forEach(function (nome) {
      var el = form.elements[nome];
      if (!el) { return; }
      /* Validazione a campo finito, non mentre si digita. */
      el.addEventListener('blur', function () {
        toccati[nome] = true;
        controlla(nome);
      });
      var evento = (el.type === 'checkbox' || el.tagName === 'SELECT') ? 'change' : 'input';
      el.addEventListener(evento, function () {
        if (toccati[nome] || el.getAttribute('aria-invalid') === 'true') { controlla(nome); }
      });
    });

    function componiTesto() {
      var righe = [
        'Area: ' + valore('area'),
        'Nome: ' + valore('nome'),
        'Email: ' + valore('email'),
        'Telefono: ' + (valore('telefono') || 'non indicato'),
        'Comune o zona: ' + (valore('luogo') || 'non indicato'),
        '',
        'Il progetto:',
        valore('messaggio'),
        '',
        'Consenso al contatto: si'
      ];
      return righe.join('\n');
    }

    function nascondiPannelli() {
      if (riepilogo) { riepilogo.hidden = true; }
      if (pannelloEsito) { pannelloEsito.hidden = true; }
      if (pannelloGuasto) { pannelloGuasto.hidden = true; }
    }

    function invia() {
      nascondiPannelli();

      var errori = [];
      Object.keys(REGOLE).forEach(function (nome) {
        toccati[nome] = true;
        var messaggio = controlla(nome);
        if (messaggio) { errori.push({ nome: nome, messaggio: messaggio }); }
      });

      if (errori.length) {
        if (riepilogo && riepilogoLista) {
          riepilogoLista.innerHTML = '';
          errori.forEach(function (e) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + e.nome;
            a.textContent = REGOLE[e.nome].etichetta + ': ' + e.messaggio;
            a.addEventListener('click', function (ev) {
              ev.preventDefault();
              var campo = form.elements[e.nome];
              if (campo) { campo.focus(); }
            });
            li.appendChild(a);
            riepilogoLista.appendChild(li);
          });
          riepilogo.hidden = false;
          riepilogo.focus();
        } else {
          var primo = form.elements[errori[0].nome];
          if (primo) { primo.focus(); }
        }
        return;
      }

      try {
        if (ENDPOINT) {
          form.action = ENDPOINT;
          form.method = 'post';
          form.submit();
          return;
        }
        var oggetto = 'Richiesta dal sito — ' + valore('area') + ' — ' + valore('nome');
        window.location.href = 'mailto:' + EMAIL +
          '?subject=' + encodeURIComponent(oggetto) +
          '&body=' + encodeURIComponent(componiTesto());
        form.hidden = true;
        if (pannelloEsito) {
          pannelloEsito.hidden = false;
          pannelloEsito.focus();
        }
      } catch (e) {
        if (pannelloGuasto) {
          pannelloGuasto.hidden = false;
          pannelloGuasto.focus();
        }
      }
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      invia();
    });

    var riprova = document.getElementById('riprova-invio');
    if (riprova) { riprova.addEventListener('click', invia); }

    var nuovo = document.getElementById('nuovo-messaggio');
    if (nuovo) {
      nuovo.addEventListener('click', function () {
        form.reset();
        Object.keys(REGOLE).forEach(function (nome) { mostraErrore(nome, ''); });
        toccati = {};
        nascondiPannelli();
        form.hidden = false;
        var campo = form.elements.nome;
        if (campo) { campo.focus(); }
      });
    }
  }

  avviaFiltri();
  avviaModulo();
}());
