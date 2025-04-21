# Redirecting to the Intended Page After Login

---

## 📅 Date: 21 April 2025

---

## **Problem Statement**
When a user tries to perform an action that requires authentication (e.g., booking a trip), they are redirected to the login page. However, after logging in, the application redirects them to a default page (e.g., `/trips`) instead of the page they were on before logging in (e.g., `/trips/:tripId/summary`) or the next intended page (e.g., `/payment/:tripId`).

---

## **Solution**
To fix this issue, we preserve the user's intended destination using React Router's `state` mechanism. The `state` is passed when redirecting to the login page and is used after successful login to navigate the user back to their intended page.

---

## **Steps to Fix**

### **1. Redirect to Login with State**
When redirecting to the login page, pass the current location as part of the `state`.

#### **Code Example in `TripSummary.jsx`**
```javascript
navigate("/login", { state: { from: location } });

```

### **2. Handle Redirect After Login**
After successful login, check if the `state` contains a `from` property (the user's intended destination). If it exists, redirect the user to that page. Otherwise, redirect them to a default page (e.g., `/trips`).

#### **Code Example in `LoginComponent.jsx`**
```javascript
const redirectTo = location.state?.from?.pathname || "/trips";
navigate(redirectTo, { replace: true });
```

---

### **3. Testing the Fix**

#### **Scenario 1: Redirect to Intended Page**
1. Navigate to `/trips/:tripId/summary`.
2. Try booking a trip without being logged in.
3. You should be redirected to the login page, and the current location (`/trips/:tripId/summary`) should be stored in the `state`.
4. Login.
5. After logging in, you should be redirected back to `/trips/:tripId/summary` or the next intended page (e.g., `/payment/:tripId`).

#### **Scenario 2: Default Redirect**
1. Go to the login page directly (e.g., `/login`).
2. After logging in, you should be redirected to a default page (e.g., `/trips`).

---

### **Key Learnings**
- **Preserving State:** Use React Router's `state` mechanism to preserve the user's intended destination when redirecting to the login page.
- **Conditional Redirect:** After login, check if the `state` contains a `from` property and redirect the user accordingly.
- **Default Fallback:** If no intended destination is stored, redirect the user to a default page (e.g., `/trips`).

---

### **Outcome**
- Users are redirected back to their intended page after logging in.
- If no intended page is stored, users are redirected to a default page.
