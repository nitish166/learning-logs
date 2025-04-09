# Deployment Workflow: Learning Log

## **Date**: 9 April 2025  
## **Topics Covered**:
1. **Backend and Frontend Configuration for Deployment**:
   - Updating `.env` files for backend and frontend before deployment.
   - Ensuring environment-specific configurations are in place.

2. **Accessing the EC2 Machine**:
   - Logging into the EC2 instance to make necessary changes.

3. **CI/CD Pipeline for Deployment**:
   - Automating the deployment process while ensuring `.env` files are updated.

---

## **1. Backend and Frontend Configuration**

### **Backend**
- **Purpose**: The backend requires an updated `.env` file to reflect production-specific configurations (e.g., database credentials, API keys).
- **Steps**:
  1. Update the `.env` file in the local `tripper-backend` directory with production-specific values.
  2. Ensure sensitive information like `JWT_SECRET`, `AWS_ACCESS_KEY_ID`, and `MONGO_URI` are correctly set.
  3. Before deploying, verify that the `.env` file is updated on the EC2 instance.

### **Frontend**
- **Purpose**: The frontend requires an updated `.env.production` file for production-specific configurations (e.g., API base URL, Google Client ID).
- **Steps**:
  1. Update the `.env.production` file in the local `tripper-frontend` directory with production-specific values.
  2. Ensure values like `VITE_API_BASE_URL`, `VITE_GOOGLE_CLIENT_ID`, and `VITE_RAZORPAY_KEY_ID` are correctly set.
  3. Before deploying, verify that the `.env.production` file is updated on the EC2 instance.

---

## **2. Accessing the EC2 Machine**

### **Purpose**
To manually update the `.env` files on the EC2 instance before deploying the code changes.

### **Steps**
1. Open the terminal on your local machine.
2. Use the following command to log in to the EC2 instance:
   ```bash
   ssh -i trippo.pem ubuntu@<EC2_PUBLIC_IP>
   ```
3. Ensure the trippo.pem file is present in the directory where the command is executed.
4. Navigate to the backend and frontend directories on the EC2 instance:
   - For the backend:
     - `cd /path/to/tripper-backend`
   - For the frontend:
     - `cd /path/to/tripper-frontend`
5. Update the `.env` files:
   - For the backend:
     - `nano .env`
   - For the frontend:
     - `nano .env.production`
   - Save the changes and exit the editor.

## **3. CI/CD Pipeline for Deployment**
### **Purpose**
To automate the deployment process while ensuring that the .env files are updated before deploying the code changes.

### **Steps**
1. Update .env Files Locally:
   - Ensure that the `.env` file for the backend and the `.env.production` file for the frontend are updated with the latest production-specific values.
2. Push Code Changes to the Repository:
   - Commit and push the code changes to the appropriate branch (e.g., main or production).
3. CI/CD Pipeline:
   - The CI/CD pipeline will handle the following:
     - Pull the latest code from the repository.
     - Install dependencies for both the backend and frontend.
     - Build the frontend application.
     - Restart the backend server.
     - Ensure the pipeline is configured to exclude .env files from being overwritten during deployment.
4. Verify Deployment:
   - After the pipeline completes, verify that the application is running correctly in production.

## **4. Best Practices**
1. Keep .env Files Secure
   - Add .env files to .gitignore to prevent them from being committed to the repository.
2. Validate .env Files
   - Before deploying, validate that all required environment variables are set in the .env files.
3. Automate .env Updates
   - Consider using a secrets manager (e.g., AWS Secrets Manager, HashiCorp Vault) to manage environment variables securely and automate updates.
4. Test Before Deployment
   - Test the application locally with the updated .env files to ensure everything works as expected.

## **5. Sample Commands**
- Login to EC2:
  - `ssh -i trippo.pem ubuntu@<EC2_PUBLIC_IP>`
- Navigate to Backend Directory:
  - `cd /path/to/tripper-backend`
- Navigate to Frontend Directory:
  - `cd /path/to/tripper-frontend`
- Update .env File:
  - `nano .env`
- Update .env.production File:
  - `nano .env.production`

## **Next Steps**
- Automate the .env file updates using a secrets manager.
- Document the required environment variables for both backend and frontend.
- Monitor the CI/CD pipeline to ensure smooth deployments.
