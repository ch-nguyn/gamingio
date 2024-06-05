const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Use this after the variable declaration
const app = express();

app.use(cors());

app.use(cookieParser());

app.use(
    helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false })
);

const limiter = rateLimit({
    max: 1000,
    windowMS: 60 * 60 * 1000,
    message: "Too many request from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.set("trust proxy", 1);

// Data sanitization against XSS
app.use(xss());


module.exports = app;