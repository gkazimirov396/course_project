````markdown
# 🎓 Student Performance Analysis System

This project is a course assignment for Object-Oriented Programming (OOP). It is a web application built with **React**, **TypeScript**, **Supabase**, and follows **OOP principles** using class-based components and encapsulated logic.

## 📚 Description

The system allows for:

- Basic **authentication** (login/logout)
- Viewing a **table of students** with:
  - Grades across multiple subjects
  - Sortable and filterable functionality
- Creating and deleting student records
- Handling optional subject fields and displaying `"N/a"` for missing data
- Validation to ensure correct input values (e.g., grades between 0–100)

All components are implemented using **class-based React components**, and shared logic is separated using **services** and **Higher-Order Components (HOCs)** to comply with OOP principles.

---

## 🔧 Technologies Used

- **React** with TypeScript
- **Supabase** (PostgreSQL + Auth)
- **React Router** (v6, with custom `withRouter` HOC for OOP compatibility)
- **CSS Modules** for styling

---

## 🧠 Features

### ✅ Authentication

- Login with Supabase credentials
- Protected routes after login

### ✅ Student List

- Table of students pulled from Supabase
- Average grade column calculated on the fly
- Sort by average grade (ascending/descending)
- Filter by subject name
- Delete individual students

### ✅ Add New Student

- Form to create a new student
- Required fields: name, group, faculty, specialty
- Optional fields: management, oop, cyberwars, game theory
- Input validation:
  - Required fields must not be empty
  - Grades must be between 0 and 100
  - Null grades shown as `"N/a"`

---

## 📁 Project Structure

```bash
src/
├── components/
│   ├── StudentList.tsx
│   ├── StudentTable.tsx
│   └── NewStudent.tsx
├── services/
│   └── SupabaseService.ts
├── hoc/
│   └── withRouter.tsx
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── types/
│   └── supabase.ts
├── styles/
│   └── *.css
└── App.tsx
```
````

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/student-performance-oop.git
cd student-performance-oop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-or-service-role-key
```

### 4. Run the app

```bash
npm run dev
```

---

## 🔐 Supabase Setup

Ensure your Supabase project has a `students` table with the following structure:

| Column      | Type             |
| ----------- | ---------------- |
| id          | integer (PK)     |
| first_name  | varchar          |
| last_name   | varchar          |
| group       | varchar          |
| faculty     | varchar          |
| specialty   | varchar          |
| management  | double precision |
| oop         | double precision |
| cyberwars   | double precision |
| game_theory | double precision |

Make sure Supabase Auth is enabled with email/password providers.

---

## 💡 Design & OOP Principles

- Uses **class-based components** to emphasize OOP design
- Service layer (`SupabaseService`) encapsulates DB logic
- `withRouter` HOC wraps routing behavior for OOP compliance
- Separation of concerns via components (e.g., `StudentTable`)

---

## 📃 License

This project is developed as part of a university coursework and is intended for educational use.

---

## 🙋‍♂️ Author

- **Kazimirov Hryhorii** – Group ІА-201

```

```
