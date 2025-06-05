
# 📝 Next.js Blog App

A modern, full-featured blog application using the **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **lowdb** for local JSON-based persistence. It supports static generation, server-side rendering, and full CRUD functionality.

---

## 🏗️ Architecture Overview

### 🔧 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: in-memory db
- **API**: RESTful API routes (via `/api`)


## 🔁 Application Flow

1. **Homepage** (`/`)  
   - Uses SSG to fetch all posts from `/api/posts`
   - Rendered at build time and revalidated every 10s

2. **Blog Detail Page** (`/posts/[slug]`)  
   - Uses `generateStaticParams` + `fetch` to pre-render post pages at build time

3. **Create New Post** (`/new-post`)  
   - Client-side form to submit a new post via `POST /api/posts`

4. **Edit Post** (`/edit-post/[slug]`)  
   - Fetch post by slug, allow edit and update via `PUT /api/posts/[slug]`

5. **Quote Page** (`/quote`)  
   - Uses SSR to fetch a new quote from `https://api.quotable.io/random` on every request

6. **API Routes**  
   - Located in /api/posts/`, they interact with db and support full CRUD

---

## ⚙️ Setup & Run Instructions

### 1. Clone the repository

```bash
git clone https://github.com/divyamarora92/NextBlog.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📦 API Endpoints

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/posts`        | Fetch all posts      |
| POST   | `/api/posts`        | Create a new post    |
| GET    | `/api/posts/[slug]` | Get a single post    |
| PUT    | `/api/posts/[slug]` | Update a post        |
| DELETE | `/api/posts/[slug]` | Delete a post        |

---
## 🌐 Live Demo

🔗 Deployed on Vercel:  
[https://nextblog.vercel.app](https://next-blog-6b2x67qj8-divyamarora92s-projects.vercel.app/)

