# 🧠 Express.js Product API

A simple RESTful API built with **Express.js** for managing products using an in-memory array.  
It demonstrates **CRUD operations**, **middleware**, **validation**, **authentication**, **filtering**, **pagination**, and **statistics**.

---

## 🚀 Setup Instructions

### 1️⃣ Clone & Install
```bash
git clone https://github.com/PLP-MERN-Stack-Development/express-js-server-side-framework-ABDURRAHMANKABEER.git
cd express-js-server-side-framework-ABDURRAHMANKABEER
npm install
```

### 2️⃣ Create `.env` File
```
PORT=3000
API_KEY=your-secret-key
```

### 3️⃣ Start the Server
```bash
npm start
```
Access at: **http://localhost:3000**

---

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/products` | Get all products (supports category filter, pagination, search) |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create product (requires API key) |
| PUT | `/api/products/:id` | Update product (requires API key) |
| DELETE | `/api/products/:id` | Delete product (requires API key) |
| GET | `/api/products/stats` | Get count of products by category |

### 🔍 Example Query
```
GET /api/products?category=electronics&page=2&limit=5&search=phone
```

---

## 🧩 Middlewares

| Middleware | Function |
|-------------|-----------|
| `logger.js` | Logs request method, URL, timestamp |
| `auth.js` | Validates API key from headers |
| `validation.js` | Checks product fields before create/update |
| `errorHandler.js` | Handles and formats all API errors |

---

## 🧠 Notes
- All data is stored in-memory (resets when server restarts).  
- Use **Postman** or **curl** for testing.  
- Built following RESTful and modular Express standards.

---

👨‍💻 **Author:** Abdurrahman Kabir  
🔗 [GitHub](https://github.com/ABDURRAHMANKABEER) | [LinkedIn](https://www.linkedin.com/in/abdurrahman-kabir-10580220b)
