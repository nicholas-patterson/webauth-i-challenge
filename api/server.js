const express = require("express");
const server = express();
const session = require("express-session");
const KnexSession = require("connect-session-knex")(session);
const userRouter = require("../users/userRouter");
const dbconnection = require("../data/db-config");

const sessionConfig = {
  name: "oreos",
  secret: "shh...dont say anything",
  cookie: {
    maxAge: 1000 * 30,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSession({
    knex: dbconnection,
    tablename: "knexsessions",
    sidfieldname: "sessionid",
    createtable: true,
    clearInterval: 1000 * 60 * 30 // clean out expired session data
  })
};

server.use(express.json());
server.use(session(sessionConfig));
server.use("/api", userRouter);
module.exports = server;
