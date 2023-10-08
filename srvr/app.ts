import express, { Express } from "express";
import bodyParser from "body-parser";
import rootRouter from "./src/features/RootRouter";
import cors from "cors";
import dbConnect from "./src/db/mgdbConnection";

const app: Express = express();
const PORT = 3001;

const corsOptions = {
  credentials: true,
};

dbConnect();

app.use(cors(corsOptions))

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());

app.use("/api/v1", rootRouter);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Running on the server ", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
start();


