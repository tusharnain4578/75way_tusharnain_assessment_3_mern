import { configDotenv } from "dotenv";

configDotenv();

export const corsConfig = {
    origin: process.env.FRONTEND_BASE_URL || 'http://localhost:5173',
    credentials: true,
}

export const socketCorsConfig = {
    origin: process.env.FRONTEND_BASE_URL || 'http://localhost:5173',
    // methods: ["GET", "POST"]
}