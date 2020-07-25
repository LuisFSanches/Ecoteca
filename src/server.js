const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

//Configurar pasta publica
server.use(express.static("public"));

//Configurando template engine
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

server.get("/search-results", (req, res) => {
  return res.render("search-results.html");
});

server.get("/modal", (req, res) => {
  return res.render("modal.html");
});

server.listen(3333);
