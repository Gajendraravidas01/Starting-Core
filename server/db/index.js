import mongoose from "mongoose";
import 'dotenv/config';

const dbconnection = () => {
    try {
        mongoose.connect(`${process.env.MONGO_URL}/blogdb`)
        .then(() => {
            console.log("database connected successfully!")
        })
        .catch((error) => {
            console.log("error in connection of database")
        })
    } catch (error) {
        console.log("something went wrong in db connection",error)
    }
}

export {dbconnection}