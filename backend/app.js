const express = require("express");
const app = express();
const todoRouter = require("./routes/todoRouter");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const pool = require("./db/pool");

require("dotenv").config();

app.use(cors());
app.use(express.json());

const pgSession = require("connect-pg-simple")(session);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new pgSession({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

require("./config/passport");
app.use(passport.session());

app.use("/", todoRouter);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
