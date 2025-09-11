# Shashank Cheppala — Portfolio

A fast, mobile-first portfolio inspired by Apple-style motion and subtle 3D, built with **React (CRA)**, **Tailwind CSS**, **AOS** animations, **Lottie**, and **react-slick** carousels.

https://your-vercel-url.vercel.app  <!-- replace after deployment -->

---

## ✨ Features

- ⚡ **Responsive**: Looks great on phones, tablets, and desktop
- 🎞️ **Smooth animations**: AOS scroll effects & Lottie (vector) animations
- 🎛️ **Dark/Light** toggle with Tailwind `dark` mode
- 🧩 **Modular sections**: Home, About, Experience, Skills, Projects, Education, Contact
- 📨 **Contact form** via EmailJS (no backend)
- 🖼️ **Project carousel** with `react-slick`
- 🧷 **Typewriter** hero text with `react-simple-typewriter`

---

## 🧰 Tech Stack

- **React 18** (Create React App)
- **Tailwind CSS**
- **AOS** (`aos`) for on-scroll animations
- **Lottie** (`lottie-react`) for JSON animations
- **react-slick** + `slick-carousel` for sliders
- **react-fast-marquee** for skills ticker
- **react-icons**, **react-spinners**, **react-toastify**

---

## 📦 Getting Started

```bash
# 1) Install deps
npm install

# 2) Tailwind build plugins (if not installed)
npm i -D postcss autoprefixer

# 3) Start dev server
npm start

Tailwind setup files (required)

Make sure these exist in project root:

// postcss.config.js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };


// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: { extend: {} },
  plugins: [],
};

🔑 Environment Variables (EmailJS)

Create a .env file in the repo root:

REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id 
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
