
---

# **SEGERVOLERVIX AI Console**  
A secure, futuristic AI interface built with **Next.js**, **Vercel**, and a protected backend proxy for the **Segervolervix API**.

This project includes:

- A **futuristic UI** with glowing neon cyber‑aesthetic  
- A **secure backend proxy** so your API key is never exposed  
- Support for both **Chat** and **Image Generation**  
- A minimal `index.html` loader (per your requirement)  
- Fully deployable on **Vercel**

---

## 🚀 **Features**

- **Secure API routing**  
  All requests go through `/api/chat` or `/api/imagine` before reaching Segervolervix.

- **Environment‑protected API key**  
  Your key is stored server‑side and never sent to the browser.

- **Futuristic cyber‑grid UI**  
  Styled with glowing gradients, neon borders, and animated effects.

- **Chat + Image modes**  
  Switch between text responses and image generation.

- **Vercel‑ready**  
  Zero configuration needed — just deploy.

---

## 📁 **Project Structure**

```
/
├── pages/
│   ├── index.tsx          # Main futuristic UI
│   └── api/
│       ├── chat.ts        # Secure chat proxy
│       └── imagine.ts     # Secure image proxy
├── public/
│   └── index.html         # Loader file (optional but included)
├── next.config.js
├── package.json
└── README.md
```

---

## 🔐 **Security Model**

Your API key is **never exposed to the client**.

Each API route defines:

```ts
const CHAT_URL = "https://segervolervix.space/api/chat";
const IMAGE_URL = "https://segervolervix.space/api/imagine";
const API_KEY = process.env.SEGERVOLERVIX_API_KEY || "YOUR_API_KEY";
```

The frontend calls:

```
/api/chat
/api/imagine
```

Your server then forwards the request to Segervolervix with the API key.

---

## ⚙️ **Environment Variables**

Create a `.env.local` file:

```
SEGERVOLERVIX_API_KEY=your_real_api_key_here
```

Vercel:  
**Project → Settings → Environment Variables → Add**

---

## 🧪 **Local Development**

Install dependencies:

```
npm install
```

Run the dev server:

```
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 🌐 **Deploying to Vercel**

1. Push your project to GitHub  
2. Go to **vercel.com/import**  
3. Select your repo  
4. Add the environment variable:

```
SEGERVOLERVIX_API_KEY
```

5. Deploy

Vercel will automatically build and host your Next.js app.

---

## 🧠 **How the AI Flow Works**

1. User enters a prompt  
2. Frontend sends it to `/api/chat` or `/api/imagine`  
3. Your backend attaches the API key  
4. Backend forwards the request to:

   - `https://segervolervix.space/api/chat`
   - `https://segervolervix.space/api/imagine`

5. Response is returned to the frontend  
6. UI displays the result in a glowing futuristic panel

---

## 🎨 **Futuristic UI**

The interface uses:

- Neon gradients  
- Animated grid overlays  
- Glowing borders  
- Cyberpunk‑style typography  
- Smooth transitions  

All styling is contained inside `index.tsx` using **styled‑jsx**.

---

## 📦 **Dependencies**

- Next.js 14  
- React 18  
- TypeScript  
- Vercel (deployment)

---

## 🛠️ **Customization**

You can modify:

- Colors  
- Glow intensity  
- Grid density  
- Button animations  
- API behavior  
- Response formatting  

If you want, I can generate:

- A **dark‑mode toggle**  
- A **terminal‑style UI**  
- A **3D hologram‑style interface**  
- A **voice input mode**

Just tell me what direction you want to take.

---

## 📄 **License**

MIT License — free to use, modify, and deploy.

---


