import mongoose from 'mongoose';

export default async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGOdb_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}