# React Routing — Learning Log

Routing is a core part of building SPA (Single Page Applications) in React. Below are the major approaches and tools to implement routing effectively.

---

## 1. **Basic Routing with React Router DOM**

### Setup:
```bash
npm install react-router-dom
```

### Example:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

✅ Pros:
- Most widely used
- Actively maintained
- Supports nested routes, params, redirection, lazy-loading
- Good community and documentation

❌ Cons:
- Slight learning curve with nested routing
- Breaking changes between major versions (e.g., v5 → v6)

## 2. **Hash-based Routing**

### Example:
```jsx
import { HashRouter, Routes, Route } from 'react-router-dom';
```

✅ Pros:
- Useful when server-side routing support is missing (e.g., GitHub Pages)
- No need to configure server to handle route paths

❌ Cons:
- Adds # in URLs (e.g., yourapp.com/#/home)
- Less SEO friendly

## 3. **File-based Routing (Next.js)**

### Concept:
- Pages are created by adding files inside the pages/ directory
- Automatically creates routes

✅ Pros:
- Zero config routing
- Clean and scalable
- Built-in SSR, SSG support

❌ Cons:
- Not usable in standard React (only Next.js)
- Can’t fully customize route file structure

⸻

## 4. **Custom Route Guards (Auth Routing)**

### Example:
```jsx
<Route
  path="/dashboard"
  element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
/>
```

✅ Pros:
- Control access to private routes
- Easy integration with auth systems

❌ Cons:
- Needs manual setup for each protected route
- Can become repetitive without abstraction

⸻

## 5. **Lazy-loaded Routes**

### Example:
```jsx
const Trips = React.lazy(() => import('./pages/Trips'));

<Route path="/trips" element={
  <Suspense fallback={<Loader />}>
    <Trips />
  </Suspense>
} />
```

✅ Pros:
- Improves performance
- Reduces initial JS bundle

❌ Cons:
- Slight setup effort
- Need to wrap in <Suspense>

⸻

## Final Recommendation (for TripoO & Real Projects)

Use React Router DOM (v6) + Hybrid Route Strategy:

- Use BrowserRouter for clean URLs
- Add auth guards where needed
- Use lazy loading for performance optimization
- Keep routes structured by pages/ or features/

### Directory Example:
```
src/
├── pages/
│   ├── Home.jsx
│   ├── Trips.jsx
│   ├── Dashboard.jsx
├── routes/
│   └── AppRoutes.jsx (centralized route config)
```

Created by Nitish — Routing Patterns & Strategy (TripoO Project)