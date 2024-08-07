import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { dbconnection } from './db/index.js';

import UserRouter from './routes/User.routes.js';
import PostRouter from './routes/Post.routes.js';
import CommentRouter from "./routes/Comment.routes.js"

const app = express();

app.use(cors());
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended : true, limit : "16kb"}));


app.use("/api/user",UserRouter);
app.use("/api/post",PostRouter);
app.use("/api/comment",CommentRouter)


dbconnection();

app.listen(process.env.PORT, () => {
    console.log("server is running on port : ",process.env.PORT)
})