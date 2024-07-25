import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";




dotenv.config();
connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    next()
  })


app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET, POST, PATCH, DELETE, PUT",
      credentials: true,
    })
  )
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(routes);
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});