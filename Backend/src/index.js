import dotenv from "dotenv"
import connectDB from "./config/database.js";
import { log } from "console";
import dns from 'node:dns';
import app from "./app.js"

dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error 
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port : ${process.env.PORT}`);
            
        });

    } catch (error) {
        console.log("MongoDB connection failed!", error);
        
    }
}

startServer();