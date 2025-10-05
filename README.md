This README explains how to set up the **Workforce Management System** project, including manual MySQL setup (via XAMPP), RabbitMQ setup (via Docker), and how to run the Node.js backend.

---

```markdown
# 🧑‍💼 Workforce Management System

A simple **Workforce Management System** built with **Node.js**, **Express**, **MySQL**, and **RabbitMQ**.  
It manages employee registration, attendance tracking, and notification messaging through RabbitMQ.

---

## 📁 Project Structure

```

workforce-system/
│
├── src/
│   ├── config/
│   │   ├── db.js            # MySQL connection
│   │   └── rabbitmq.js      # RabbitMQ connection setup
│   │
│   ├── controllers/
│   │   ├── employeeController.js
│   │   ├── attendanceController.js
│   │   └── notificationController.js
│   │
│   ├── routes/
│   │   ├── employeeRoutes.js
│   │   ├── attendanceRoutes.js
│   │   └── notificationRoutes.js
│   │
│   ├── services/
│   │   └── messageService.js
│   │
│   └── app.js               # Main server entry point
│
├── docker-compose.yml        # RabbitMQ container setup
├── package.json
└── README.md

```

---

## ⚙️ Setup Instructions

### 1️⃣ Requirements

Before running the app, ensure you have:
- **XAMPP** (with MySQL & Apache running)
- **Docker Desktop** (for RabbitMQ)
- **Node.js** (v18 or later)
- **npm** (comes with Node.js)

---

### 2️⃣ Create the MySQL Database (using XAMPP GUI)

Since this project doesn’t create the database automatically:

1. Open **XAMPP Control Panel**
2. Start **Apache** and **MySQL**
3. Click **Admin** beside MySQL → it opens **phpMyAdmin**
4. Click **New** on the left sidebar
5. Create a new database named:

```

workforce_db

````

6. Inside that database, run the following SQL in the **SQL tab**:

```sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    position VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('Present', 'Absent', 'Leave') NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
````

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root of the project with:

```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=workforce_db
RABBITMQ_URL=amqp://localhost
```

---

### 4️⃣ Start RabbitMQ using Docker

1. Make sure **Docker Desktop** is running.

2. Open PowerShell or CMD in your project directory and run:

   ```bash
   docker compose up -d
   ```

3. Once started, open RabbitMQ management UI:

   👉 [http://localhost:15672](http://localhost:15672)

   **Login credentials:**

   ```
   Username: guest
   Password: guest
   ```

---

### 5️⃣ Install Node.js Dependencies

In your project directory, run:

```bash
npm install
```

---

### 6️⃣ Start the Backend Server

Run:

```bash
npm start
```

The server should start on:

👉 [http://localhost:4000](http://localhost:4000)

---

### 7️⃣ Test the Endpoints

You can test using **Postman** or **Thunder Client**.

#### ➕ Create Employee

**POST** `/api/employees`

```json
{
  "name": "Destiny Solomon",
  "email": "destiny@example.com",
  "position": "Fullstack Developer"
}
```

#### 📅 Mark Attendance

**POST** `/api/attendance`

```json
{
  "employee_id": 1,
  "date": "2025-10-05",
  "status": "Present"
}
```

#### 📤 Send Notification (via RabbitMQ)

**POST** `/api/notifications`

```json
{
  "message": "New employee added successfully"
}
```

---

## 🧩 RabbitMQ Dashboard

Access the management dashboard here:

* **URL:** [http://localhost:15672](http://localhost:15672)
* **User:** `guest`
* **Password:** `guest`

---

## 🚀 Technologies Used

| Component       | Technology               |
| --------------- | ------------------------ |
| Backend         | Node.js + Express        |
| Database        | MySQL (via XAMPP)        |
| Messaging Queue | RabbitMQ (via Docker)    |
| API Testing     | Postman / Thunder Client |

---

## 👨‍💻 Author

**Destiny Oladipo Solomon**
Passionate Fullstack Developer focused on backend systems, APIs, and modern web architecture.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
