import express from "express";
import env from "dotenv";
import authRoute from "./routes/auth.Router.js";
import messageRoute from "./routes/message.Router.js";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { app, server  } from "./lib/socket.js";
import path from "path";


env.config();




const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json({ limit: '5mb' }))
app.use(cookieParser());
app.use(cors(
   { 
    origin: "http://localhost:5173",
    credentials: true
}
))

app.use('/api/auth', authRoute);

app.use('/api/messages', messageRoute);

if (process.env.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
      });
}


server.listen( PORT || 3000, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});