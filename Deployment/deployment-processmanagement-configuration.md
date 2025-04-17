# TripoO Learning Log: Deployment, Process Management, and Configuration

## 1. Handling Port Conflicts & Process Managers
- **Error**: `EADDRINUSE: address already in use :::3000`
- **Cause**: Two processes binding the same port (e.g., pm2 + `npm start`).
- **Solutions**:
  - **Use PM2 exclusively**:
    ```bash
    pm2 ls
    pm2 delete <old-process>
    pm2 start dist/app.js --name tripoo-backend
    pm2 logs tripoo-backend
    ```
  - **Or stop PM2 before manual start**:
    ```bash
    pm2 stop tripoo-backend
    npm run start
    ```
  - **Change port**:
    ```bash
    PORT=3001 npm run start
    ```
  - **Kill old process**:
    ```bash
    sudo lsof -t -i:3000 | xargs sudo kill -9
    ```

## 2. CI/CD Pipeline: Folder Setup & Env Sync
- **Temp Folder**:
  - Ensure `tmp/uploads` exists on EC2:
    ```bash
    mkdir -p /home/ubuntu/Tripper-Backend/tmp/uploads
    chown -R ubuntu:ubuntu /home/ubuntu/Tripper-Backend/tmp
    ```
- **Env Management**:
  - Keep `.env` out of Git; sync via CI (e.g., GitHub Actions + Secrets).
  - Example snippet:
    ```yaml
    - name: Copy .env to server
      uses: appleboy/scp-action@v0.1.5
      with:
        source: .env.prod
        target: /home/ubuntu/Tripper-Backend/.env
    ```

## 3. Configuration Management Strategies
- **ZooKeeper**  
  Pros: centralized, live updates via watches  
  Cons: operational overhead
- **AWS Parameter Store / Secrets Manager**  
  Pros: secure, IAM‑driven, versioned  
  Cons: AWS‑only, some cost
- **CI Env Injection**  
  Pros: simple, no code changes  
  Cons: requires redeploy on secret rotation




