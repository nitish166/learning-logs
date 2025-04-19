# Indexes in MongoDB

---

## 📅 Date: 19 April 2025

---

## **What are Indexes?**
Indexes in databases are data structures that improve the speed of data retrieval operations on a database table at the cost of additional storage and write overhead. They are used to quickly locate data without having to search every row in a database table.

In MongoDB, indexes are created on collections and are stored in a structure called a **B-tree** or **B+ tree**, which allows for efficient searching, sorting, and range queries.

---

## **Types of Indexes in MongoDB**

### 1. **Single Field Index**
- Indexes a single field in a collection.
- Example:
  ```javascript
  db.collection.createIndex({ fieldName: 1 }); // Ascending order
  db.collection.createIndex({ fieldName: -1 }); // Descending order
  ```

### 2. **Compound Index**
- Indexes multiple fields in a collection.
- Example:
  ```javascript
  db.collection.createIndex({ field1: 1, field2: -1 });
  ```
Useful for queries that filter or sort on multiple fields.

### 3. **Unique Index**
- Ensures that the indexed field(s) contain unique values.
- Example:
  ```javascript
  db.collection.createIndex({ email: 1 }, { unique: true });
  ```

### 4. **Text Index**
- Used for full-text search on string fields.
- Example:
  ```javascript
  db.collection.createIndex({ description: "text" });
  ```

### 5. **Geospatial Index**
- Used for querying geospatial data.
- Example:
  ```javascript
  db.collection.createIndex({ location: "2dsphere" });
  ```

### 6. **Hashed Index**
- Indexes the hash of the field value.
- Example:
  ```javascript
  db.collection.createIndex({ fieldName: "hashed" });
  ```

### 7. **TTL (Time-to-Live) Index**
- Automatically removes documents after a specified time.
- Example:
  ```javascript
  db.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
  ```
### **Can We Make Multiple Columns as Index?**
Yes, you can create a compound index on multiple fields. For example:
```javascript
db.collection.createIndex({ field1: 1, field2: -1 });
```

## **Impact of Compound Indexes**

### Improved Query Performance
- Compound indexes are useful for queries that filter or sort on multiple fields.

#### Example:
```javascript
db.collection.find({ field1: value1, field2: value2 });
```

### **Index Prefix**

MongoDB can use a compound index for queries that filter on the prefix of the indexed fields.

#### Example:
- **Index:** `{ field1: 1, field2: -1 }`
- **Query:** `db.collection.find({ field1: value1 });` → Index is used.
- **Query:** `db.collection.find({ field2: value2 });` → Index is not used.

### **Increased Storage Usage**
- Compound indexes require more storage space compared to single-field indexes.

### **Write Overhead**
- Every insert, update, or delete operation must update the index, which can slow down write operations.

### **Query Optimization**
- Compound indexes can reduce the need for multiple single-field indexes, optimizing query performance.

## **How Indexes Internally Work?**

1. **Data Structure**  
   MongoDB uses a B-tree or B+ tree data structure to store indexes.  
   B-trees allow for efficient searching, insertion, and deletion operations.

2. **Index Lookup**  
   When a query is executed, MongoDB checks if an index exists for the queried field(s).  
   If an index exists, MongoDB uses the index to quickly locate the matching documents.

3. **Index Scanning**  
   MongoDB scans the index instead of the entire collection to find matching documents.  
   **Example:**  
   ```javascript
   db.collection.find({ field: value });
   ```
   MongoDB scans the index on the field to locate the matching documents.

4. **Index Sorting**  
   Indexes can also be used to sort query results.  
   **Example:**  
   ```javascript
   db.collection.find().sort({ field: 1 });
   ```
```javascript
db.collection.find().sort({ field: 1 });
```

5. **Index Cardinality**  
   Indexes work best when the indexed field has high cardinality (i.e., many unique values).  
   Low cardinality (e.g., boolean fields) may not benefit much from indexing.

6. **Query Execution Stats**  
   You can use the `explain` method to get execution statistics for a query.  
   **Example:**  
   ```javascript
   db.collection.find({ field: value }).explain("executionStats");
   ```

## **Best Practices for Indexes**

### **Index Frequently Queried Fields**
- Create indexes on fields that are frequently used in queries, filters, or sorting.

### **Use Compound Indexes for Multi-Field Queries**
- Combine multiple fields into a single compound index for queries that filter on multiple fields.

### **Avoid Over-Indexing**
- Too many indexes can increase storage usage and slow down write operations.

### **Monitor Index Usage**
- Use the `explain` method to analyze query performance and index usage.

## **Example**

### **Drop Unused Indexes**

Removing unused indexes can help reduce storage requirements and improve write performance.  
You can identify unused indexes by analyzing the query patterns and using MongoDB's `db.collection.getIndexes()` and `db.collection.dropIndex()` methods.

#### Example:
```javascript
// List all indexes in a collection
db.collection.getIndexes();

// Drop an unused index by its name
db.collection.dropIndex("indexName");
```

#### Best Practices:
- Regularly review index usage to identify unused indexes.
- Use the `explain` method to analyze query plans and determine if an index is being utilized.
- Avoid dropping indexes that are critical for query performance.
- Consider the impact on application performance before removing indexes.
- Maintain a backup of the index definition if needed for future use.




