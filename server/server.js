import express from "express";
import dotenv from "dotenv";
import dbConnection from "./utils/dbConfig.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import bookmarkRoute from "./routes/bookmark.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://entertainment-app-890q.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, "../dist");

//app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.static(staticFilesPath));
app.get("*", function (req, res) {
  //res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  res.sendFile(path.join(staticFilesPath, "index.html"));
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/bookmark", bookmarkRoute);

dbConnection();
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server Running at PORT ${PORT}`);
});
