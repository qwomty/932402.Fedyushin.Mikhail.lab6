# 932402.Fedyushin.Mikhail.lab6
Лабораторная работа №6 — «Каталог книг»
Веб-приложение с каталогом книг на Node.js и Express, поддерживающее поиск и фильтрацию через API, установку как PWA и работу без подключения к сети.
Студент: Федюшин Михаил · Группа: 932402 · Вариант: 9
---
Что реализовано
Компонент	Описание
Сервер и статика	Node.js + Express, раздача статических файлов из директории `public/`
Страницы	`GET /` (каталог с формой поиска), `GET /about` (информация об авторе)
JSON API	`GET /api/status` (состояние сервера), `GET /api/books` (фильтрация по query-параметрам `author` и `year`), `GET /api/books/author/:author` (выборка по параметру маршрута)
Клиентская часть	Минималистичный адаптивный интерфейс, запросы через `fetch` и `URLSearchParams` без перезагрузки страницы, отрисовка карточек через DOM API
PWA-манифест	`manifest.json` с режимом `standalone`, цветовой схемой и иконками `192×192` и `512×512`
Service Worker	`sw.js`: кеширование статики и базового списка книг при установке (`Cache First`), стратегия `Network First` с fallback на кеш для `/api/*` и удаление устаревших версий кеша при активации
---
Структура проекта
```text
932402.Fedyushin.Mikhail.lab6/
├── .gitignore
├── package.json
├── package-lock.json
├── server.js               # Express-сервер, маршруты и API
├── README.md
└── public/
    ├── index.html          # Главная страница с поиском
    ├── about.html          # Страница «О себе»
    ├── style.css           # Стили интерфейса
    ├── app.js              # Работа с API и регистрация Service Worker
    ├── manifest.json       # PWA-манифест
    ├── sw.js               # Service Worker для офлайн-режима
    └── icons/
        ├── icon-192.png
        └── icon-512.png
```
---
Запуск локально
Убедитесь, что установлен Node.js, затем выполните в корне проекта:
```bash
npm install
npm start
```
После запуска приложение будет доступно по адресу `http://localhost:3000`.
Примеры запросов к API
```bash
# Статус сервера
curl "http://localhost:3000/api/status"

# Все книги
curl "http://localhost:3000/api/books"

# Фильтрация по автору (query-параметр)
curl "http://localhost:3000/api/books?author=Tolstoy"

# Фильтрация по году издания (query-параметр)
curl "http://localhost:3000/api/books?year=1869"

# Комбинированный фильтр
curl "http://localhost:3000/api/books?author=Tolstoy&year=1869"

# Выборка по параметру маршрута
curl "http://localhost:3000/api/books/author/Dostoevsky"
```
