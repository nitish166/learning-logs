# Authentication Process in TripoO

## 🥅 Goal
Implement a secure and scalable authentication system for the TripoO application, supporting multiple login methods (OTP-based login and Google OAuth) while ensuring token-based authentication with refresh token functionality.

---

## 🧰 Methods Tried

### 1. **OTP-Based Login**
- **Process**:
  - Users enter their phone number.
  - An OTP is sent to the user's phone via an external service.
  - The user enters the OTP, which is verified on the backend.
  - Upon successful verification, an access token and refresh token are issued.

- **Challenges**:
  - **OTP Delivery Issues**:
    - Delays in OTP delivery due to third-party SMS service limitations.
    - Solution: Switched to a more reliable SMS provider.
  - **Token Expiry**:
    - Users were logged out frequently due to short-lived access tokens.
    - Solution: Implemented refresh token functionality to issue new access tokens without requiring re-login.

---

### 2. **Google OAuth Login**
- **Process**:
  - Users log in using their Google account.
  - The frontend retrieves a Google ID token, which is sent to the backend for verification.
  - Upon successful verification, an access token and refresh token are issued.

- **Challenges**:
  - **Google OAuth Integration**:
    - Initial issues with setting up the Google Client ID and redirect URI.
    - Solution: Configured the correct redirect URI in the Google Cloud Console and ensured the frontend and backend were in sync.
  - **Vendor Account Restrictions**:
    - Vendors logging in via Google were restricted if their accounts were under review.
    - Solution: Added backend logic to check the `isActive` status of vendor accounts and return appropriate error messages.

---

## 🔐 Token-Based Authentication

### 1. **Access Token**
- **Purpose**: Short-lived token used for authenticating API requests.
- **Implementation**:
  - Generated using `jsonwebtoken` with a 15-minute expiry.
  - Stored in an HTTP-only cookie for security.

### 2. **Refresh Token**
- **Purpose**: Long-lived token used to issue new access tokens when the current one expires.
- **Implementation**:
  - Generated using `jsonwebtoken` with a 7-day expiry.
  - Stored in an HTTP-only cookie and validated on the backend.
  - Associated with the user in the database for additional security.

---

## 🧱 Challenges Faced

### 1. **Infinite Refresh Loop**
- **Issue**:
  - The frontend kept trying to refresh the token when the backend returned a `401 Unauthorized` response.
- **Solution**:
  - Updated the Axios interceptor to handle token refresh failures gracefully and redirect to the login page if the refresh token was invalid.

### 2. **CORS Issues**
- **Issue**:
  - Cross-origin requests from the frontend to the backend were blocked due to missing CORS headers.
- **Solution**:
  - Configured the backend to allow requests from the frontend's origin and enabled `credentials` in the CORS policy:
    ```javascript
    const corsOptions = {
      origin: 'http://localhost:5173',
      credentials: true,
    };
    app.use(cors(corsOptions));
    ```

### 3. **Token Storage**
- **Issue**:
  - Initially stored tokens in `localStorage`, which was vulnerable to XSS attacks.
- **Solution**:
  - Moved tokens to HTTP-only cookies to enhance security.

### 4. **Logout Process**
- **Issue**:
  - Users were not fully logged out because the refresh token was not cleared from the backend.
- **Solution**:
  - Implemented a `logout` endpoint to clear both the access token and refresh token cookies and remove the refresh token from the database.

---

## 🔧 Final Implementation

### Backend
1. **Endpoints**:
   - `/users/login` (OTP-based login)
   - `/users/google-login` (Google OAuth login)
   - `/users/refresh-token` (Refresh token endpoint)
   - `/users/logout` (Logout endpoint)

2. **Token Management**:
   - Access tokens are short-lived (15 minutes).
   - Refresh tokens are long-lived (7 days) and stored securely in the database.

3. **Security Enhancements**:
   - Tokens are stored in HTTP-only cookies.
   - CORS policy allows only trusted origins.

---

### Frontend
1. **Login Methods**:
   - OTP-based login with phone number and OTP verification.
   - Google OAuth login using the Google Sign-In button.

2. **Token Handling**:
   - Axios is configured with `withCredentials: true` to include cookies in requests.
   - An Axios interceptor handles token refresh automatically.

3. **State Management**:
   - Redux Toolkit is used to manage authentication state.
   - The `restoreAuthState` action restores the user's session on page load.

---

## ✅ Result
- A secure and scalable authentication system with support for OTP-based login and Google OAuth.
- Improved user experience with automatic token refresh and seamless session restoration.
- Enhanced security by using HTTP-only cookies for token storage.

---

Let me know if you need further details or adjustments! 🚀