# React Project Setup Methods — Learning Log

## 📅 Date: 17 April 2025

## 1. **Manual Setup** (Vanilla React + Custom Config)

You can create a React project from scratch by manually setting up tools.

### **Key Components:**

- **React & ReactDOM** – Core libraries
- **Babel** – Transpiles JSX/ES6+ to browser-compatible JavaScript
- **Webpack** – Bundles JS, CSS, assets, etc.
- **Bundler (e.g., Parcel)** – Alternate simpler bundling option

### **Pros:**

- Full control and deep understanding
- Highly customizable for special needs

### **Cons:**

- Tedious to set up
- Error-prone for beginners
- Not recommended for quick prototypes

---

## 2. **Create React App (CRA)**

```bash
npx create-react-app my-app  # `npx` runs the create-react-app package without globally installing it

CRA generates a full React boilerplate with config.

Pros:
	•	Quick start with zero config
	•	Includes Webpack, Babel, ESLint, etc.
	•	Popular and well-supported

Cons:
	•	Hard to customize without eject (removes the abstraction to allow full customization but makes future updates harder)
	•	Heavy bundle size
	•	Slower dev builds compared to modern tools


## 3. **Using Vite (Recommended for Modern Development)**


Vite uses ESBuild, a modern JavaScript bundler and minifier written in Go, under the hood for super-fast dev experience.

Pros:
	•	Lightning-fast HMR and build
	•	Minimal config
	•	Supports multiple frameworks

Cons:
	•	Plugins and community support are still catching up (but rapidly maturing)
	•	Slight learning curve for migration from CRA

⸻

```

    ## Best Practices for React Project Setup

    - Clean up unused CRA files (like logos/test files)
    - Use Vite for performance and ease
    - Use Manual setup to understand internals
    - Use CRA for legacy projects or wide team compatibility
