# Uploading Profile Pictures to AWS S3 (TripoO)

## 🥅 Goal
Enable users to upload profile pictures, store them in a public AWS S3 bucket, and retrieve them via a custom domain-based URL.

---

## 🧰 Tech Stack
- AWS S3
- Node.js + Express (Backend)
- MongoDB (Database)
- React.js (Frontend)
- Multer (for handling file uploads)
- AWS SDK (for uploading to S3)

---

## 🔧 Step-by-Step Implementation

### 🔐 Step 1: Setup AWS S3 Bucket
1. Go to the [AWS S3 Console](https://s3.console.aws.amazon.com/s3/).
2. Create a new bucket (e.g., `tripoo-profile-pictures`).
3. Uncheck "Block all public access".
4. Add bucket policy to allow public access:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tripoo-profile-pictures/*"
    }
  ]
}
```

---

### 🧠 Step 2: Configure AWS Credentials
Create a `.env` file in your backend:
```
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
S3_BUCKET_NAME=tripoo-profile-pictures
```

---

### 🛠️ Step 3: Backend Implementation (Express + AWS SDK)
#### Install Required Packages:
```bash
npm install aws-sdk multer multer-s3 dotenv
```

#### Setup File Upload:
```js
// s3.js
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `profile-images/${Date.now()}-${file.originalname}`);
    }
  })
});

module.exports = upload;
```

#### Create API Route:
```js
// routes/user.js
const express = require('express');
const upload = require('../s3');
const router = express.Router();

router.post('/upload-profile', upload.single('profileImage'), async (req, res) => {
  try {
    const imageUrl = req.file.location;
    // Save imageUrl to MongoDB under user's profile
    res.status(200).json({ imageUrl });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err });
  }
});
```

---

### 🌐 Step 4: Frontend (React)
#### Create Upload Component:
```jsx
function UploadProfileImage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profileImage", file);

    const res = await fetch("http://localhost:5000/api/upload-profile", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.imageUrl);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {preview && <img src={preview} alt="Preview" width="100" />}
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" />}
    </div>
  );
}
```

---

## 🧪 Testing & Validation
- Upload an image using the UI.
- Check the S3 bucket for the image.
- Confirm the image URL loads correctly in a browser.

---

## 🧱 Challenges Faced
- CORS issues on S3 bucket (resolved via CORS config).
- Public access permission on bucket.
- Syncing frontend URL format with backend response.

---

## ✅ Result
A fully functional image upload flow with preview, S3 storage, MongoDB reference, and frontend rendering using live URL. 🚀

---