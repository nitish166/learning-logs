# Learning Log: PDF Upload to S3 and Email Attachment

---

## 📅 Date: 17 April 2025

---

## 1. Problem Statement
The goal was to:
1. Generate a PDF file with booking details.
2. Upload the generated PDF to an S3 bucket for storage.
3. Attach the same PDF to an email and send it to the user.

Initially, there were challenges in handling both functionalities simultaneously:
- The PDF was either uploaded to S3 or attached to the email, but not both.
- The `sendEmail` function was not designed to handle remote files (S3 URLs).

---

## 2. Key Issues Identified
1. **PDF Upload to S3**:
   - The `generateBookingPDF` function was resolving with the S3 URL (`s3Url`), which made it difficult to attach the local file to the email.

2. **Email Attachment**:
   - The `sendEmail` function required a local file path to attach the PDF, but the local file path (`pdfPath`) was not being returned.

3. **File Cleanup**:
   - The locally generated PDF files were not being deleted after use, leading to potential clutter in the `./temp` directory.

---

## 3. Solutions Implemented

### **Solution 1: Return Local File Path (`pdfPath`)**
- Updated the `generateBookingPDF` function to resolve with the local file path (`pdfPath`) instead of the S3 URL.
- This allowed the local file to be attached to the email.

#### **Code Example**
```typescript
writeStream.on('finish', async () => {
  try {
    // Upload the PDF to S3
    const s3Url = await uploadPdfToS3(pdfPath);

    // Resolve with the local file path for email attachment
    resolve(pdfPath);
  } catch (uploadError) {
    reject(uploadError);
  }
});
```

### **Solution 2: Handle Both S3 Upload and Email Attachment**
- The `uploadPdfToS3` function uploads the PDF to S3 asynchronously.
- The `pdfPath` is returned for attaching the file to the email.

#### **Code Example**
```typescript
const pdfPath = await generateBookingPDF(bookingData, trip, tripDate);
await sendEmail(bookingData.email, 'Booking Confirmation', emailHtml, pdfPath);

// Delete the local file after sending the email
fs.unlinkSync(pdfPath);
```

### **Solution 3: Clean Up Local Files**
- After sending the email, the local file is deleted to avoid clutter in the `./temp` directory.

#### **Code Example**
```typescript
// Delete the local file after sending the email
fs.unlinkSync(pdfPath);
```

---

## 4. Key Learnings
1. **Independent Functionalities**:
   - Uploading the PDF to S3 and attaching it to an email are independent processes.
   - By resolving with the local file path (`pdfPath`), both functionalities can coexist without conflict.

2. **Error Handling**:
   - Proper error handling is crucial to ensure that failures in one process (e.g., S3 upload) do not affect the other (e.g., email attachment).

3. **File Cleanup**:
   - Always clean up temporary files after use to avoid unnecessary storage usage.

---

## 5. Final Implementation

### **Updated `generateBookingPDF`**
- The function now:
  - Generates the PDF and saves it locally.
  - Uploads the PDF to S3.
  - Resolves with the local file path for email attachment.

#### **Code Example**
```typescript
writeStream.on('finish', async () => {
  try {
    // Upload the PDF to S3
    const s3Url = await uploadPdfToS3(pdfPath);

    // Resolve with the local file path for email attachment
    resolve(pdfPath);
  } catch (uploadError) {
    reject(uploadError);
  }
});
```

### **Updated Email Sending Logic**
- The `sendEmail` function now attaches the local file (`pdfPath`) to the email.

#### **Code Example**
```typescript
const pdfPath = await generateBookingPDF(bookingData, trip, tripDate);
await sendEmail(bookingData.email, 'Booking Confirmation', emailHtml, pdfPath);

// Delete the local file after sending the email
fs.unlinkSync(pdfPath);
```

## 6. Future Improvements

1. **Optimize File Handling**  
    - Consider streaming the PDF directly to S3 and attaching it to the email without saving it locally.

2. **Include S3 URL in Email**  
    - Include the S3 URL in the email body as a backup for the user to download the PDF.

3. **Monitor S3 Uploads**  
    - Implement logging or monitoring for S3 uploads to ensure reliability.

---

## 7. Final Outcome

- The PDF is successfully uploaded to S3.  
- The same PDF is attached to the email and sent to the user.  
- The local file is deleted after the email is sent, ensuring no clutter in the `./temp` directory.

