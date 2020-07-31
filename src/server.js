const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

//pegar o banco de dados
const db = require("./database/db");

//Configurar pasta publica
server.use(express.static("public"));

//Habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }));

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

server.post("/savepoint", (req, res) => {
  //console.log(req.body);
  //return res.send("ok");

  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  
  `;
  const values = [
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no cadastro");
    }
    console.log("Cadastrado com sucesso");
    console.log(this);
    return res.render("create-point.html", { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get("/search-results", (req, res) => {
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    const total = rows.length;
    return res.render("search-results.html", { places: rows, total: total });
  });
});

server.get("/modal", (req, res) => {
  return res.render("partials/modal.html");
});

server.listen(3333);
