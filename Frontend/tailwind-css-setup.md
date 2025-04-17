# Tailwind CSS Setup — Learning Log

## 📅 Date: 17 April 2025

Tailwind CSS v4 brings an ultra-minimal and modern developer experience. Here’s how to set it up with both CRA and Vite.

---

## 1. **Setup with Create React App (CRA)**

### **Step-by-Step:**

```bash
npx create-react-app my-app
cd my-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure Tailwind (tailwind.config.js):

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update styles (src/index.css):

@tailwind base;
@tailwind components;
@tailwind utilities;

Import CSS in your entry file (index.js):

import './index.css';

✅ Done! You can now use Tailwind classes in your JSX.


## 2. **Setup with Vite**

### **Step-by-Step:**

```bash
npm create vite@latest my-app --template react
cd my-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure Tailwind (tailwind.config.js):

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add Tailwind Directives (src/index.css):

@tailwind base;
@tailwind components;
@tailwind utilities;

Tailwind v4 automatically removes unused styles using JIT and doesn’t require manual purge configuration.

## ✅ Tailwind v4 Highlights:

- No need for purge config – Smart file scanning
- Just-in-time engine by default
- Fast dev & build performance
- Cleaner setup across CRA and Vite

## 📝 Recommendation:

- Use Vite + Tailwind v4 for fastest setup and best DX
- CRA setup works well but can feel heavier in large projects