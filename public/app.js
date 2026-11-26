if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => console.error("Ошибка регистрации SW:", err));
  });
}

const form = document.getElementById("filter-form");
const authorInput = document.getElementById("author-input");
const yearInput = document.getElementById("year-input");
const resetBtn = document.getElementById("reset-btn");
const grid = document.getElementById("books-grid");
const statusText = document.getElementById("books-status");

function renderBooks(books) {
  grid.innerHTML = "";

  if (books.length === 0) {
    statusText.textContent = "Ничего не найдено.";
    return;
  }

  statusText.textContent = `Найдено книг: ${books.length}`;

  books.forEach((book) => {
    const card = document.createElement("article");
    card.className = "book-card";

    const title = document.createElement("h3");
    title.textContent = book.title;

    const meta = document.createElement("p");
    meta.textContent = `${book.author}, ${book.year}`;

    card.append(title, meta);
    grid.appendChild(card);
  });
}

async function loadBooks(author = "", year = "") {
  const params = new URLSearchParams();
  if (author.trim()) params.set("author", author.trim());
  if (year.trim()) params.set("year", year.trim());

  const query = params.toString();
  const url = query ? `/api/books?${query}` : "/api/books";

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    renderBooks(await res.json());
  } catch {
    grid.innerHTML = "";
    statusText.textContent = "Нет соединения с сервером.";
  }
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    loadBooks(authorInput.value, yearInput.value);
  });

  resetBtn.addEventListener("click", () => {
    authorInput.value = "";
    yearInput.value = "";
    loadBooks();
  });

  loadBooks();
}