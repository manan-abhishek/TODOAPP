# TODO App 📝

A simple **full-stack TODO application** built with **Node.js, Express, MongoDB, and vanilla JavaScript**.  
This app allows users to add, delete, and mark tasks as completed. Data is persisted using MongoDB.

---

## Demo

![TODO App Demo](demo.gif) <!-- screenshot or GIF -->

---

## Features

- Add new tasks  
- Delete tasks  
- Mark tasks as completed  
- Persist tasks in **MongoDB**  
- Full-stack JavaScript application

---

## Tech Stack

**Backend:**  
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- dotenv (for environment variables)  
- CORS  

**Frontend:**  
- HTML  
- CSS  
- JavaScript (vanilla JS)  

---

## Folder Structure

TODOAPP/
│
├─ backend/
│ ├─ models/
│ │ └─ Task.js
│ ├─ routes/ (optional)
│ ├─ server.js
│ └─ .env
│
├─ frontend/
│ ├─ index.html
│ ├─ style.css
│ └─ script.js
│
└─ .gitignore



## Installation

1. Clone the repository:

```bash
git clone https://github.com/manan-abhishek/TODOAPP.git
cd TODOAPP/backend
Install backend dependencies:

bash
Copy code
npm install
Create a .env file in backend/ with:

ini
Copy code
MONGO_URI=mongodb://127.0.0.1:27017/todoapp
PORT=5000
Start the backend:

bash
Copy code
node server.js
Open frontend/index.html in your browser or use live-server:

bash
Copy code
cd ../frontend
npx live-server
Usage
Add a new task in the input box

Click Add → task appears in the list

Mark task as completed or delete it

Tasks persist in MongoDB

Future Improvements
User authentication (login/signup)

Cloud deployment (Heroku / Vercel / Railway)

Responsive UI with frameworks like React

License
This project is open-source. Feel free to use and modify.

Author
Abhishek Kumar Nayak

LinkedIn: [ LinkedIn URL]

GitHub: https://github.com/manan-abhishek
