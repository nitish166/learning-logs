# Role-Based Access Control (RBAC): Learning Log

## 📅 Date: 12 April 2025

## ✅ Topics Covered:
1. Backend Role-Based Middleware
2. Role-Based UI Rendering (Frontend)
3. Challenges & Solutions
4. Next Steps

---

## 1️⃣ Backend Role-Based Middleware

### ✅ Middleware Example
```typescript
import { Request, Response, NextFunction } from "express";

const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export default checkRole;
```

### ✅ Protected Routes Example
```typescript
import express from "express";
import checkRole from "../middleware/checkRole";
import AdminController from "../controllers/AdminController";
import VendorController from "../controllers/VendorController";

const router = express.Router();

router.get("/admin/dashboard", checkRole(["admin"]), AdminController.getDashboard);
router.get("/vendor/orders", checkRole(["vendor"]), VendorController.getOrders);

export default router;
```

---

## 2️⃣ Role-Based UI Rendering (Frontend)

### ✅ Conditional Rendering with Redux
```javascript
import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const role = useSelector((state) => state.auth.user?.role);

  return (
    <div>
      <h1>Dashboard</h1>
      {role === "admin" && <AdminPanel />}
      {role === "vendor" && <VendorPanel />}
      {role === "user" && <UserPanel />}
    </div>
  );
};

export default Dashboard;
```

### ✅ Example: Admin Panel Component
```javascript
const AdminPanel = () => (
  <div>
    <h2>Admin Panel</h2>
    <ul>
      <li>Manage Users</li>
      <li>System Settings</li>
    </ul>
  </div>
);
```

---

## 3️⃣ Challenges & Solutions

### ❌ Problem: Frontend role manipulation  
🔒 **Solution**: Always validate role in backend middleware.

### ❌ Problem: Role mismatch between frontend & backend  
🔄 **Solution**: Include role in JWT or login API response and store it in Redux.

```javascript
const login = async (credentials) => {
  const { data } = await axios.post("/auth/login", credentials);
  dispatch(setUser(data.user)); // contains role
};
```

---

## 4️⃣ Next Steps

- 🔁 Refactor middleware for permission-based access (CRUD-level granularity).
- 🚀 Add caching to minimize DB calls.
- 📋 Add logging for unauthorized access attempts.

---

## 🧠 Redux Slice Example
```javascript
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
```
