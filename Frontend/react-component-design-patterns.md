# React Component Design Patterns — Learning Log

Designing your component structure is crucial for scalability, maintainability, and team collaboration. Here are the common patterns:

---

## 📅 Date: 17 April 2025

---

## 1. **Folder-by-Component Structure (Atomic / Dumb Components)**

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.css
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.module.css
```

**✅ Pros:**
- Easy to locate reusable components
- Great for UI libraries and atomic design
- Clean separation of concerns (JSX, CSS, tests)

**❌ Cons:**
- Doesn’t scale well for feature-heavy apps
- Hard to track feature-specific logic across folders

---

## 2. **Feature-Based Structure (Domain-driven Design)**

```
src/
├── features/
│   ├── bookings/
│   │   ├── BookingList.jsx
│   │   ├── BookingForm.jsx
│   │   ├── bookingSlice.js
│   │   └── bookingAPI.js
│   ├── trips/
│   │   ├── TripCard.jsx
│   │   └── tripUtils.js
```

**✅ Pros:**
- Groups UI + logic together (Redux, API, components)
- Easier onboarding for new devs
- Great for scaling mid/large apps

**❌ Cons:**
- Might duplicate UI logic across features
- Less modular/reusable if not planned properly

---

## 3. **Hybrid Structure (Component + Feature Mix)**

```
src/
├── features/
│   └── bookings/
│       └── BookingForm.jsx
├── components/
│   └── Button.jsx
```

**✅ Pros:**
- Reusable shared components live in `components/`
- Feature-specific components are scoped to `features/`
- Combines best of both approaches

**❌ Cons:**
- Requires clear folder discipline
- Can get inconsistent if team isn’t aligned

---

## 4. **Colocation with Route-based Lazy Loading**

```
src/
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── HeroSection.jsx
│   └── Trips/
│       ├── TripList.jsx
│       └── TripDetails.jsx
```

**✅ Pros:**
- Great for Next.js or apps with lazy-loading routes
- Improves code-splitting and page performance
- Promotes encapsulated features with routing

**❌ Cons:**
- Might confuse shared vs route-local components
- Component reuse across pages can be tricky

---

## Final Recommendation (TripoO-style Project):

> Use **Hybrid Approach**:
- `components/` → for generic, reusable UI
- `features/` → for domain-based logic and UI
- `pages/` → for top-level routing pages

---

*Created by Nitish — Component Design Patterns Log (TripoO Project Setup)*
