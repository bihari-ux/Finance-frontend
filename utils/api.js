
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


fetch(`${BASE_URL}/api/auth/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
  credentials: "include", 
});


import axios from "axios";

axios.post(
  `${BASE_URL}/api/auth/login`,
  { email, password },
  {
    withCredentials: true, 
  }
);
