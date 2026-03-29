const express = require("express");
const errorMiddleware = require("./middlewares/error.middleware");
const app = express();
const CookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(CookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const authRoutes = require("./routes/auth.routes");
app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

module.exports = app;
