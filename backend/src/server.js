import express from "express";
import env from "dotenv";
import authRoute from "./routes/auth.Router.js";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";


env.config();


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);


app.listen( PORT || 3000, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});