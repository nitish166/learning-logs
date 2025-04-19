# ✅ JavaScript & Node.js Challenge Solutions
---

## 📅 Date: 19 April 2025

---

This markdown file contains three completed coding challenges with their problem descriptions and final working solutions. Each solution was verified by test cases and follows best practices.

---

## 🚀 1. JavaScript: Immutable Copy

### 📄 Problem:
Implement a `MyClass` that has properties `a`, `b`, `c`, and method `sum()`. You must add:
- `getImmutableCopy()` → returns a frozen (immutable) clone.
- `isMutable()` → returns `true` if it's the original instance, `false` if immutable.

### ✅ Final Solution:
```js
class MyClass {
  constructor(a, b, c, mutable = true) {
    this.a = a;
    this.b = b;
    this.c = c;
    this._isMutable = mutable;
  }

  sum() {
    return this.a + this.b + this.c;
  }

  getImmutableCopy() {
    const copy = new MyClass(this.a, this.b, this.c, false);
    return Object.freeze(copy);
  }

  isMutable() {
    return this._isMutable;
  }
}
```

---

## ⚽ 2. React: Football Match Fetcher

### 📄 Problem:
Create a React component that:
- Renders years (2011–2017)
- On click, fetches match data from `https://jsonmock.hackerrank.com/api/football_competitions?year=YYYY`
- Displays:
  - Total matches with `data-testid="total-matches"`
  - Each match in `<li>` using `data-testid="match-list"`
  - If no data, show `data-testid="no-result"`

### ✅ Final Code (App.js):
```jsx
import React, { useState } from "react";

const App = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [matches, setMatches] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];

  const fetchData = async (year) => {
    setSelectedYear(year);
    const res = await fetch(`https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`);
    const data = await res.json();
    setMatches(data.data || []);
    setHasFetched(true);
  };

  return (
    <div>
      <h2>Select a Year</h2>
      {years.map((year) => (
        <button key={year} onClick={() => fetchData(year)}>{year}</button>
      ))}

      {hasFetched && matches.length > 0 && (
        <div data-testid="total-matches">Total matches: {matches.length}</div>
      )}

      {hasFetched && matches.length > 0 && (
        <ul data-testid="match-list">
          {matches.map((match, i) => (
            <li key={i}>Match {match.name} won by {match.winner}</li>
          ))}
        </ul>
      )}

      {hasFetched && matches.length === 0 && (
        <div data-testid="no-result">No Matches Found</div>
      )}
    </div>
  );
};

export default App;
```

---

## 🕵️ 3. Node.js: Open Graph Metadata Scraper

### 📄 Problem:
Build a `TinyScraper` class that:
- Extends `EventEmitter`
- Accepts a `url` and optional `timeout`
- Emits events: `scrapeStarted`, `scrapeSuccess`, `error`, `timeout`
- Extracts Open Graph meta tags using cheerio and returns them in JSON format

### ✅ Final `tiny-scraper.js`:
```js
const EventEmitter = require("events");
const http = require("http");
const cheerio = require("cheerio");

class TinyScraper extends EventEmitter {
  constructor(url, timeout = 2000) {
    super();
    this.url = url;
    this.timeout = timeout;

    process.nextTick(() => {
      this.emit("scrapeStarted", this.url);
    });

    this.scrape();
  }

  scrape() {
    let isTimeout = false;

    const request = http.get(this.url, (res) => {
      if (res.statusCode >= 400) {
        clearTimeout(timeoutRef);
        this.emit("error", new Error(`Status code: ${res.statusCode}`));
        request.destroy();
        return;
      }

      let html = "";

      res.on("data", (chunk) => {
        if (!isTimeout) html += chunk;
      });

      res.on("end", () => {
        if (isTimeout) return;
        clearTimeout(timeoutRef);

        try {
          const $ = cheerio.load(html);
          const ogData = {};

          $('meta[property^="og:"]').each((_, el) => {
            const property = $(el).attr("property");
            const content = $(el).attr("content");
            if (property && content) {
              ogData[property.replace("og:", "")] = content;
            }
          });

          this.emit("scrapeSuccess", ogData);
        } catch (err) {
          this.emit("error", err);
        }
      });
    });

    const timeoutRef = setTimeout(() => {
      isTimeout = true;
      request.destroy();
      this.emit("timeout");
    }, this.timeout);

    request.on("error", (err) => {
      if (!isTimeout) {
        clearTimeout(timeoutRef);
        this.emit("error", err);
      }
    });
  }
}

module.exports = TinyScraper;
```

---



