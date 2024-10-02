# Dagens Ord Admin App

Dette er en administrasjonsapplikasjon for **Dagens Ord**, der administratorer kan håndtere forslag fra brukere. Funksjonene inkluderer:

- **Godkjenne** forslag: Brukerens forslag blir lagt til i databasen.
- **Avslå** forslag: Forslag som ikke er relevante, kan fjernes fra listen.

For å få tilgang til funksjonene, må du ha tilgang til en administratorbruker.

## Bruk

For å starte appen, kjør:
```bash
bun i
bun dev
```

- Logg inn som administrator.
- Velg om du vil **godkjenne** eller **avslå** et forslag.

Applikasjonen vil oppdatere seg i sanntid basert på endringer i forslagene.
