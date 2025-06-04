
# PostgreSQL Mini Project

This is a simple CRUD (Create, Read, Update, Delete) API built with **Node.js**, **Express**, and **PostgreSQL** to manage user records.

## 🚀 Features

- Add new users
- Fetch all users
- Fetch a user by ID
- Update user details
- Delete a user

## 🛠️ Technologies Used

- Node.js (ESM)
- Express.js
- PostgreSQL
- dotenv

## 📁 Project Structure

```
.
├── main.js           # Entry point for the application
├── .env              # Environment variables (excluded from Git)
├── .gitignore
├── package.json
```

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/paschalfidel/node-postgre.git
cd node-postgre
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

Add your PostgreSQL credentials in a `.env` file:

```env
DB_PASSWORD=your_postgres_password
PORT=3000
```

> **Note:** Make sure `.env` is listed in your `.gitignore`.

### 4. Create `.gitignore` File (if not already there)

```bash
# .gitignore
node_modules/
.env
```

### 5. Set Up PostgreSQL Database

Ensure PostgreSQL is running and create the database and table manually using a GUI like pgAdmin:

```sql
CREATE DATABASE demodb;

\c demodb

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  age INT
);
```

### 6. Run the Server

Start the app in development mode:

```bash
npm run dev
```

Or in production:

```bash
npm start
```

Your API should now be live at: `http://localhost:3000`

---

## 📬 API Endpoints

### POST `/users`
Create a new user.

**Body Example:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28
}
```

---

### GET `/users`
Get a list of all users.

---

### GET `/users/:id`
Get a user by their ID.

---

### PUT `/users/:id`
Update a user’s information by ID.

**Body Example:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "age": 30
}
```

---

### DELETE `/users/:id`
Delete a user by ID.

---

## 👤 Author

**Paschal Omereife**
