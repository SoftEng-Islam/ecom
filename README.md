# Cyber Todo ⚡

![Cyber Todo Banner](screenshot.png)

> **Manage your tasks with futuristic efficiency.**
> A full-stack, type-safe Todo application built with the modern web stack.

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

## ✨ Features

- **🚀 Modern Stack**: Built with Vue 3, Vite, and TypeScript for blazing fast performance.
- **🎨 Cyber Aesthetic**: Premium dark-mode UI with glassmorphism and smooth animations.
- **💾 Full Stack & Type Safe**: End-to-end type safety with TypeScript, Express backend, and Mongoose for MongoDB.
- **📦 State Management**: Powered by Pinia for reactive and predictable state flow.
- **🔍 Smart Filtering**: Instantly toggle between active and completed tasks.
- **⚡ Real-time Feedback**: Instant interactions with toast notifications.

## 🛠️ Tech Stack

- **Frontend**: Vue 3 (Composition API), Pinia, Vue Router, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, Vite-Express
- **Database**: MongoDB (Mongoose)
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (recommended)
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cyber-todo.git
   cd cyber-todo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   CONNECTION_STRING=mongodb://127.0.0.1:27017/cybertodo
   ```

### Running the App

1. **Start MongoDB**
   ```bash
   mkdir -p ./mongodb-data
   mongod --dbpath ./mongodb-data --port 27017 --unixSocketPrefix ./mongodb-socket
   ```

2. **Start Development Server**
   ```bash
   pnpm run dev
   ```

   Visit `http://localhost:3000/todo` to see the app in action!

## 🔧 Troubleshooting

**MongoDB Port in Use?**
If you encounter port conflicts with MongoDB:

```bash
# Check who is using the port
sudo netstat -tulnp | grep 27017

# Kill the process (replace <PID> with the process ID)
sudo kill <PID>
```

---

<div align="center">
  <sub>Built with ❤️ by SoftEng-Islam</sub>
</div>
