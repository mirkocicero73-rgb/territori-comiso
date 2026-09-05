# Territori Comiso

Applicazione web per il gruppo di ricerca: mappa vettoriale di Comiso, schedario
delle posizioni, divisione in territori bilanciati, tracciamento delle zone già
battute e posizione in tempo reale sul campo.

## Accesso

L'applicazione è **cifrata**. `index.html` contiene solo la schermata di sblocco;
`app.enc` è l'applicazione intera cifrata in AES-GCM 256, con chiave derivata dal
codice di accesso tramite PBKDF2-SHA256 a 310.000 iterazioni. Senza il codice
questo repository non contiene nulla di leggibile: né la mappa, né il codice,
né le schede.

Il codice di accesso non è in questo repository e non viene mai trasmesso:
resta sul dispositivo di chi lo digita.

## Cosa è pubblico

- `informativa/` — l'informativa privacy, volutamente **in chiaro**: serve a essere
  mostrata alle persone interessate, quindi deve essere raggiungibile da chiunque.
- icone e manifest.

## Dati personali

**Nessun dato personale è presente in questo repository.** L'archivio di ogni
utente resta nella memoria del proprio dispositivo e non viene mai inviato
altrove. I campi identificativi (nome, cognome, telefono) sono a loro volta
cifrati con una chiave derivata dal PIN personale di chi li inserisce.

Cartografia © OpenStreetMap contributors (ODbL). Dati demografici ISTAT e ISMU.
