// src/config.js
const isLocal = window.location.hostname === "localhost";

export const API_BASE_URL = isLocal
    ? "http://localhost:5000" // Local backend
    : "https://article-backend-production-3153.up.railway.app"; // Railway backend
