import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import indexRouter from "./routes/index.js";
import { initializePassport } from "./config/passport.config.js";

const app = express();
dotenv.config();
app.use(cookieParser(process.env.SECRET_COOKIES));
mongoose
  .connect(process.env.URIMONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
initializePassport();
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Cambia a `true` si usas HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    },
    name: "coderCookie",
  })
);
app.use(passport.session());
app.use(passport.initialize());
app.use(express.json()); //fundamental para trabajar con json y recibir correctamente archivos del body
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRouter);
const httpServer = app.listen(process.env.PORT, () => {
  console.log("Servidor iniciado");
});
