import { validateEnv } from './utils/validateEnv';
import express from "express";
import cors from 'cors';
import { config } from './config';
import connectDB from "./configurations/db";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";


const app = express();

validateEnv();
connectDB();

app.use(express.json());
app.use(cors());



app.listen(config.PORT, () => {
    console.log(`\nServer is running on port ${config.PORT} \n`)

})

app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/api", router);

app.use(errorHandler);



