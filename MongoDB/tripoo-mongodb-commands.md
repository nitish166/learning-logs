# MongoDB Learning Log

This log captures key MongoDB commands and patterns we discussed for managing collections and updating documents in the TripoO application.

---

## 📅 Date: 20 April 2025

---

## 1. Deleting All Documents in a Collection

- **Delete all documents but keep the collection and indexes**:

  ```js
  use yourDatabaseName;
  db.bookings.deleteMany({});
  ```

- **Drop the entire collection (removes indexes too)**:

  ```js
  use yourDatabaseName;
  db.bookings.drop();
  ```

- **One-liner from terminal**:

  ```bash
  mongo "<URI>/<DB>" --eval "db.bookings.deleteMany({});"
  ```

## 2. Updating a Single Document by `_id`

- **Target a specific document** (using `updateOne` and `ObjectId`):

  ```js
  use yourDatabaseName;

  db.tripdates.updateOne(
    { _id: ObjectId("67f1f17d748a039a253g554a") },
    { $set: { totalSlots: 15, availableSlots: 15 } }
  );
  ```

- **One-liner from terminal**:

  ```bash
  mongo "<URI>/<DB>" \
    --eval 'db.tripdates.updateOne({ _id: ObjectId("67f1f17d748a039a253g554a") },{ $set:{ totalSlots:15, availableSlots:15 } });'
  ```

## 3. Bulk Updating All Documents in a Collection

- **Set the same values on every document** (using `updateMany` with an empty filter `{}`):

  ```js
  use yourDatabaseName;

  db.tripdates.updateMany(
    {},
    { $set: { totalSlots: 15, availableSlots: 15 } }
  );
  ```

- **One-liner from terminal**:

  ```bash
  mongo "<URI>/<DB>" \
    --eval 'db.tripdates.updateMany({}, { $set: { totalSlots: 15, availableSlots: 15 } });'
  ```

---

**Next Steps & Best Practices**:

1. **Back up** your data before running bulk deletes or updates.
2. Use **staging environments** to validate commands.
3. Consider **schema versioning** or **audit logs** for production data changes.
4. Automate repetitive tasks with scripts or CI jobs (e.g., using `mongo` CLI).

