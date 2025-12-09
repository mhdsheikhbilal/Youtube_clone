import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 8080;
connectDB().then(()=>{
    app.on("error", (error) => {
        console.error("Error in Express app:", error);
        throw error;
    });
})
.then(() => {
    app.listen(port, () => {
        console.log(`App is running on port ${port}`);
    })
}).catch((error) => {
    console.error("Failed to start the server:", error);
});







/*
import express from "express";

const app = express()

;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.error("Error in Express app:", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
})() */