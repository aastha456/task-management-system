import express from "express";
import cors from 'cors';
import { config} from './config';
import connectDB from "./configurations/db";

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.listen(config.PORT, () => {
    console.log(`\nServer is running on port ${config.PORT} \n`)

})
