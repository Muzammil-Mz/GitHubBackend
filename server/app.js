import express from "express";
import config from "config";

import publicRouter from "./public/index.js";
import reposRouter from "./controllers/repos/index.js";
import gistsRouter from "./controllers/gists/index.js";
import userRouter from "./controllers/user/index.js";
import authMiddleware from "./authMiddleware/jwtAuth.js";
import rateLimit from "express-rate-limit";

import "./utils/dbConnect.js";

const app = express();
app.use(express.json());
const port = config.get("PORT");

let limitter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: "wait for server to respond",
  statusCode: 429,
});

app.get("/", (req, res) => {
  try {
    res.status(200).json("HELLO WORLD");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.use("/api/public", publicRouter);
app.use("/api/public", limitter);

app.use(authMiddleware);
app.use("api/private/user", userRouter);
app.use("api/private/repos", reposRouter);
app.use("api/private/gists", gistsRouter);

app.listen(port, () => {
  console.log(`Server is up and listening`);
});
