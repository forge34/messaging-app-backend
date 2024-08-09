import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import { configDotenv } from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import router from "./routes/index";

configDotenv();
const app: Express = express();
const port = process.env.PORT || 3000;

const corsOptions: CorsOptions = {
  origin: [" http://localhost:5173"],
  credentials: true,
  allowedHeaders: ["Content-type"],
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);

app.listen(port, () => {});
