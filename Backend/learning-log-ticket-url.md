# Learning Log: Implementing Ticket URL Functionality in TripoO Backend

---

## **Objective**

To generate a PDF ticket for bookings, upload it to AWS S3, store the S3 URL (`ticketUrl`) in the `Booking` table, and make it accessible via a public URL.

---

## **Steps Implemented**

### **1. Added Public Policy to the `pdfs` Folder**

- Updated the S3 bucket policy to allow public access to the `pdfs` folder.
- This was done to make the `ticketUrl` publicly accessible temporarily.

#### **Updated S3 Bucket Policy**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicAccessToPublicFolder",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tripoo-images-bucket/public/*"
    },
    {
      "Sid": "AllowPublicAccessToPdfsFolder",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tripoo-images-bucket/pdfs/*"
    }
  ]
}
```

### **2. Updated the Booking Model**

- Added a new field `ticketUrl` to the Booking model to store the S3 URL of the uploaded ticket.

#### **Updated Booking Schema**

```javascript
ticketUrl: {
  type: String,
  required: false,
},
```

### **3. Enhanced the updateBooking Method**

- Modified the updateBooking method in BookingService to accept an optional second parameter (updateData) for updating specific fields in the booking.

#### **Updated updateBooking Method**

```typescript
public async updateBooking(bookingId: string, updateData: Partial<IBooking> = {}): Promise<IBooking | null> {
  return await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });
}
```

### 4. Updated the generateBookingPDF Function

Generated a PDF ticket using pdfkit.
Uploaded the PDF to the pdfs folder in S3 using the uploadPdfToS3 utility.
Updated the ticketUrl field in the Booking table with the S3 URL.

#### **Updated generateBookingPDF Function**

```typescript
writeStream.on("finish", async () => {
  try {
    // Upload the PDF to S3
    const s3Url = await uploadPdfToS3(pdfPath);

    // Update the ticketUrl in the booking table
    await BookingService.updateBooking(bookingData._id, {
      ticketUrl: s3Url,
    });

    resolve(pdfPath);
  } catch (uploadError) {
    reject(uploadError);
  }
});
```

### **Challenges Faced**

1. **S3 Bucket Policy**

   - **Issue**: The `pdfs` folder in the S3 bucket initially lacked a public policy, making the `ticketUrl` inaccessible.
   - **Solution**: Added a public policy to the `pdfs` folder to allow public access.

2. **File Name Mismatch**

   - **Issue**: The file name used during the upload included a timestamp, but the file name used to generate the `ticketUrl` did not include the timestamp.
   - **Solution**: Ensured consistency in file naming by adopting a predictable format (`booking_<bookingId>.pdf`).

3. **Updating the `updateBooking` Method**

   - **Issue**: The existing `updateBooking` method only accepted a single parameter (`bookingId`), making it difficult to update specific fields like `ticketUrl`.
   - **Solution**: Modified the method to accept an optional second parameter (`updateData`) for flexible updates.

4. **Security Concerns**
   - **Issue**: The `ticketUrl` is currently publicly accessible, posing a security risk as it contains sensitive information.
   - **Next Step**: Implement pre-signed URLs to make the `ticketUrl` private and accessible only for a limited time.

### **Next Steps**

1. **Implement Pre-Signed URLs**

   - Remove the public policy from the `pdfs` folder.
   - Use AWS S3 pre-signed URLs to provide temporary access to the `ticketUrl`.

2. **Encrypt Sensitive Files**

   - Use AWS S3 Server-Side Encryption (SSE) to encrypt the tickets at rest.

3. **Monitor Access**
   - Use AWS CloudTrail to monitor access to the `pdfs` folder for auditing purposes.

## **Key Learnings**

- **Consistency in File Naming**:  
  Ensure the file name used during upload matches the file name used to generate the URL.

- **Flexible Update Methods**:  
  Making the `updateBooking` method flexible by allowing optional parameters improves code maintainability.

- **Security Best Practices**:  
  Public access to sensitive files should be avoided. Pre-signed URLs are a better alternative.

- **Outcome**:
  The ticketUrl is now stored in the Booking table and accessible via a public URL.
  The system is functional, and the next step is to enhance security by making the ticketUrl private.
