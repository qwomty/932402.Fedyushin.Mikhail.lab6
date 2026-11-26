const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const books = [
  { title: "Война и мир", author: "Leo Tolstoy", year: 1869 },
  { title: "Анна Каренина", author: "Leo Tolstoy", year: 1878 },
  { title: "Идиот", author: "Fyodor Dostoevsky", year: 1869 },
  { title: "Преступление и наказание", author: "Fyodor Dostoevsky", year: 1866 },
  { title: "Мастер и Маргарита", author: "Mikhail Bulgakov", year: 1967 },
  { title: "1984", author: "George Orwell", year: 1949 },
  { title: "Дюна", author: "Frank Herbert", year: 1965 }
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    service: "Book Catalog API",
    booksCount: books.length,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get("/api/books", (req, res) => {
  const { author, year } = req.query;
  let result = books;

  if (typeof author === "string" && author.trim() !== "") {
    const queryAuthor = author.trim().toLowerCase();
    result = result.filter((book) =>
      book.author.toLowerCase().includes(queryAuthor)
    );
  }

  if (typeof year === "string" && year.trim() !== "") {
    const queryYear = Number(year.trim());
    result = result.filter((book) => book.year === queryYear);
  }

  res.json(result);
});

app.get("/api/books/author/:author", (req, res) => {
  const paramAuthor = req.params.author.trim().toLowerCase();
  const result = books.filter((book) =>
    book.author.toLowerCase().includes(paramAuthor)
  );
  res.json(result);
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});