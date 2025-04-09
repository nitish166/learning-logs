# Backend and Frontend Configuration: Learning Log

## **Date**: 9 April 2025  
## **Topics Covered**:
1. **Backend Configuration**:
   - Identifying and replacing hardcoded keys with environment variables.
   - Securing sensitive information like database credentials, API keys, and secrets.
   - Refactoring backend code to use `.env` variables.

2. **Frontend Configuration**:
   - Managing environment variables in the frontend.
   - Replacing hardcoded values like API base URLs, Google Client IDs, Razorpay keys, etc.
   - Organizing reusable configurations (e.g., image URLs, contact information).

---

## **Backend: Key Learnings**

### **1. Replacing Hardcoded Keys**
- **Problem**: Hardcoded keys like `JWT_SECRET`, `AWS_ACCESS_KEY_ID`, and `MONGO_URI` were found in the backend code.
- **Solution**:
  - Moved sensitive keys to the `.env` file.
  - Used `process.env` to access these keys in the code.
  - Example:
    ```typescript
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1h' });
    ```

### **2. MongoDB Configuration**
- **Problem**: Hardcoded MongoDB URI with credentials.
- **Solution**:
  - Split the URI into `MONGO_USERNAME`, `MONGO_PASSWORD`, and `MONGO_URI`.
  - Constructed the URI dynamically in the code.
  - Example:
    ```properties
    MONGO_USERNAME=<username>
    MONGO_PASSWORD=<password>
    MONGO_URI=mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@<cluster-url>/<database-name>?retryWrites=true&w=majority
    ```

### **3. AWS S3 Configuration**
- **Problem**: Hardcoded AWS keys in the code.
- **Solution**:
  - Moved `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION` to the `.env` file.
  - Configured the AWS SDK dynamically.
  - Example:
    ```typescript
    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    ```

### **4. JWT Secrets**
- **Problem**: Weak and hardcoded JWT secrets.
- **Solution**:
  - Replaced weak secrets with strong, random strings.
  - Example:
    ```properties
    JWT_SECRET=<secure_random_jwt_secret>
    REFRESH_TOKEN_SECRET=<secure_random_refresh_token_secret>
    ```

### **5. Google OAuth and Razorpay Keys**
- **Problem**: Hardcoded Google Client ID and Razorpay keys.
- **Solution**:
  - Moved `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `RAZORPAY_KEY_ID`, and `RAZORPAY_KEY_SECRET` to the `.env` file.
  - Example:
    ```typescript
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    ```

### **6. CORS Configuration**
- **Problem**: Hardcoded allowed origins in the CORS configuration.
- **Solution**:
  - Used `CORS_ORIGINS` in the `.env` file to manage allowed origins.
  - Example:
    ```properties
    CORS_ORIGINS=http://localhost:5173,http://<production-url>
    ```

---

## **Frontend: Key Learnings**

### **1. Managing Environment Variables**
- **Problem**: Hardcoded API base URLs, Google Client IDs, Razorpay keys, etc.
- **Solution**:
  - Used `VITE_*` environment variables in the `.env.development` file.
  - Accessed them using `import.meta.env`.
  - Example:
    ```javascript
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
    ```

### **2. Replacing Hardcoded Values**
- **Problem**: Hardcoded values like image URLs and contact information.
- **Solution**:
  - Moved reusable values to configuration files.
  - Example:
    ```javascript
    export const IMAGES = {
      PARTNER_WITH_US: '<image-url>',
    };
    ```

### **3. Validating Environment Variables**
- **Problem**: Missing validation for required environment variables.
- **Solution**:
  - Added a validation step to ensure all required variables are defined.
  - Example:
    ```javascript
    const requiredEnvVars = ['VITE_API_BASE_URL', 'VITE_GOOGLE_CLIENT_ID', 'VITE_RAZORPAY_KEY_ID'];
    requiredEnvVars.forEach((key) => {
      if (!import.meta.env[key]) {
        console.error(`Missing environment variable: ${key}`);
      }
    });
    ```

---

## **General Recommendations**
1. **Secure `.env` Files**:
   - Add `.env` files to `.gitignore` to prevent them from being committed to the repository.

2. **Use Strong Secrets**:
   - Generate strong, random strings for secrets like `JWT_SECRET` and `REFRESH_TOKEN_SECRET`.

3. **Test in All Environments**:
   - Test the application in both development and production environments to ensure all environment variables are correctly loaded.

4. **Centralize Configuration**:
   - Use configuration files for reusable values like image URLs, contact information, etc.

---

## **Next Steps**
1. Refactor the backend and frontend code to remove any remaining hardcoded values.
2. Test the application thoroughly to ensure all configurations are working as expected.
3. Document the required environment variables for both backend and frontend.

---
