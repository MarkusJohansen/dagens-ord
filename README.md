# Dagens ord 🔡

Hobby-prosjekt for to ordsmeder som syntes ord og utrykk er gøy 🤝

Dagens ord er en nettside som serverer deg et nytt morsomt ord eller utrykk hver dag 🤘 Dette kan være alt ifra morsomme dialekt ord til uttrykk født i popkulturen 😀

## Teknologi 🧑‍💻

Klient applikasjonen er hovedsaklig bygget på typescript `react` med `tailwindCSS` på toppen av classless css rammeverket `ChimeraCSS` for styling. Server applikasjonen er en kotlin `Ktor` server, som bruker `Supabase kotlin SDK` som en ORM mot vår `Supabase` database (Ja, vi vet at dette er å skyte spurv med kanon).

Liste over teknologier:

- Typescript
- React
- TailwindCSS
- [ChimeraCSS](https://github.com/ChimeraCSS/ChimeraCSS)
- Axios
- Kotlin
- Ktor
- Kotlin Supabase SDK
- Gradle
- Bun

## Bidra 🙌

Dersom du liker prosjektet kan du bidra med å sende inn forslag til uttrykk, i skjemaet på nettsiden, åpne pull requests eller melde inn issues på GitHub 🤓

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
