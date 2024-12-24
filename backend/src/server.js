import express from "express";
import env from "dotenv";
import authRoute from "./routes/auth.Router.js";
import messageRoute from "./routes/message.Router.js";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'


env.config();


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
   { 
    origin: "http://localhost:5173",
    credentials: true
}
))

app.use('/api/auth', authRoute);

app.use('/api/message', messageRoute);


app.listen( PORT || 3000, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});