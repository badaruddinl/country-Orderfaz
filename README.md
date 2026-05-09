# Country Explorer

Country Explorer is a React app for searching countries from the REST Countries API and viewing country details such as alternate spellings, coordinates, capital, region, calling code, and currency usage.

## Tech Stack

- React 18 with Vite
- React Router
- Redux and redux-thunk
- Tailwind CSS
- Axios
- REST Countries API

## Setup

Install dependencies:

```bash
npm install
```

Create a local environment file from the example:

```bash
cp .env.example .env
```

The app falls back to `https://restcountries.com` when `VITE_BASE_URL` is not set.

## Scripts

Run the development server:

```bash
npm start
```

Build for production:

```bash
npm run build
```

Run the test script:

```bash
npm test
```

## Audit Notes

`npm audit` currently passes with no known vulnerabilities.
