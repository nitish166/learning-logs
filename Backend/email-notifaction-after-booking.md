# Learning Log: Implementing Booking Confirmation with PDF Storage and Email Notification

## **Date**: 14 April 2025  

---

## 1. Problem Statement
The goal was to implement a booking confirmation system that generates a PDF with booking details, sends it as an email attachment, and stores the PDF in an AWS S3 bucket for future reference.

---

## 2. Key Features Implemented
1. **PDF Generation**:
   - Used the `pdfkit` library to dynamically generate a PDF containing booking details.
   - Ensured the PDF includes trip name, trip date, number of people, and total amount.

2. **Email Notification**:
   - Used `nodemailer` to send an email to the user with the booking confirmation details.
   - Attached the generated PDF to the email.

3. **AWS S3 Integration**:
   - Uploaded the generated PDF to an S3 bucket using the AWS SDK (`@aws-sdk/client-s3`).
   - Included a link to the PDF in the email for the user to download.

4. **Temporary File Management**:
   - Ensured the temporary PDF file is deleted from the local system after it is uploaded to S3.

---

## 3. Steps Taken

### Step 1: PDF Generation
- Installed `pdfkit` to generate PDFs dynamically.
- Created a utility function `generateBookingPDF` to:
  - Generate a PDF with booking details.
  - Save the PDF in a temporary directory (`temp`).

### Step 2: Email Notification
- Installed `nodemailer` to send emails.
- Created a utility function `sendEmail` to:
  - Send an email with booking details.
  - Attach the generated PDF to the email.

### Step 3: AWS S3 Integration
- Installed `@aws-sdk/client-s3` to interact with AWS S3.
- Created a utility function `uploadFileToS3` to:
  - Upload the generated PDF to an S3 bucket.
  - Return the S3 URL of the uploaded file.

### Step 4: Temporary File Management
- Ensured the `temp` directory is created dynamically if it does not exist.
- Deleted the temporary PDF file after it was successfully uploaded to S3.

---

## 4. Challenges Faced and Solutions

### Challenge 1: Missing `temp` Directory
- **Issue**: The `temp` directory did not exist, causing errors when saving the PDF.
- **Solution**: Added logic to dynamically create the `temp` directory if it does not exist.

### Challenge 2: Undefined Booking ID
- **Issue**: The booking ID (`_id`) was undefined when generating the PDF file path.
- **Solution**: Ensured the booking was saved to the database before generating the PDF.

### Challenge 3: AWS S3 Integration
- **Issue**: Required proper configuration of AWS credentials and bucket details.
- **Solution**: Used environment variables to securely store AWS credentials and bucket information.

---

## 5. Technologies Used
- **Node.js**: Backend runtime environment.
- **pdfkit**: For generating PDFs.
- **nodemailer**: For sending emails.
- **@aws-sdk/client-s3**: For interacting with AWS S3.
- **dotenv**: For managing environment variables.

---

## 6. Future Improvements
1. Add error handling for failed S3 uploads and email sending.
2. Implement a retry mechanism for failed uploads or email notifications.
3. Store metadata about the uploaded PDF (e.g., S3 URL) in the database for easy retrieval.

---

## 7. Final Outcome
1. The PDF is generated dynamically with booking details.
2. The email is sent to the user with the PDF attached.
3. The PDF is uploaded to AWS S3 for future reference.
4. The temporary PDF file is deleted from the local system after uploading to S3.

---