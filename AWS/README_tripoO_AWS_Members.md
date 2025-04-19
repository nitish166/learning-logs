# TripoO AWS Account Access & IAM User Setup

This document outlines how co-founders and future team members can securely access and manage the AWS Console for TripoO.

---

## 📅 Date: 19 April 2025

---

## 1. Root Account Usage (Owner Only)
- **Use Case:** Billing, Payment, Account Recovery only
- **Login Type:** Root Email & Password
- **MFA:** Enabled
- **Note:** Avoid daily usage. Instead, create IAM users for regular access.

---

## 2. IAM User Setup (For Co-Founders and Team Members)

### Step-by-Step Instructions:

#### ✅ Create IAM User
1. Go to: **IAM > Users > Add User**
2. Enter username: (e.g., `shubham`, `nitish`, `intern2025`)
3. Tick: **Provide user access to the AWS Management Console**
4. Choose: **Custom password**
5. Permissions:
   - Select: **Attach policies directly**
   - Search and select: `AdministratorAccess` *(for full access)*
6. Skip tags (optional)
7. Review & Create User

#### ✅ Share with User
- IAM Login URL: `https://054037113688.signin.aws.amazon.com/console`
- Username: (e.g., `shubham`)
- Temporary Password

#### ✅ First-Time Login
1. User logs in and sets a new password
2. User sets up MFA (recommended)

---

## 3. Enable MFA for Each User
- Go to: **IAM > Users > [username] > Security credentials**
- Click on **Manage MFA**
- Choose **Authenticator App** (Google Authenticator or Authy)

---

## 4. Guidelines

| Task | Recommended Account |
|------|----------------------|
| Billing, Payment, Account Settings | Root User |
| AWS Console Access & Daily Work | IAM User |
| Future Interns/Employees | IAM User with limited policies |

---

## 5. Admin Users
| Name | IAM Username | Access Level |
|------|--------------|--------------|
| Nitish | `nitish` | Full (Admin) |
| Shubham | `shubham` | Full (Admin) |

---

## 6. Notes
- Never share root credentials
- Always keep MFA enabled for all IAM users
- Rotate passwords every 3–6 months
- Document new IAM users in this file for tracking

---

*Maintained by TripoO Tech Team.*

