import "reflect-metadata";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import * as routes from "./routes";
import "./database/connection";

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
  ],
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

const app = express();

app.use(cors(options));
app.use(express.json());
app.use(routes.init());

const port = 3000;
app.listen(port, () => console.log(`✔️ Server started at port ${port}`));
