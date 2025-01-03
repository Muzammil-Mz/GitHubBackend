import mongoose from "mongoose"
import config from "config"

async function dbConnect() {
    try {
        const db=config.get("DB_URL")
    await mongoose.connect(db)
    console.log("DB CONNECED SUCCESSFULLY ✔✔✔");
    } catch (error) {
        console.log(error);
    }
}

dbConnect()