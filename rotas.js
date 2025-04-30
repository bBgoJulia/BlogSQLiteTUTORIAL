const express = require("express");

const PORT = 3000; // Porta TCP do servidor HTTP da aplicação

const app = express();

const index = "<a href='/sobre'>Sobre</a> <a href='/info'>Info</a>";
const sobre = "Você está na página 'sobre'<br><a href='/'>Voltar</a>";
const info = "Vocẽ está na página 'info' <br><a href='/'>Voltar</a>";

/* Método express.get necessita de dois parãmetros
Na ARROW FUNCTION, o primeiro são os dados do servidor (REQUISITION - 'req')
O segundo são os dados que serão enviados ao cliente (RESULT - 'res')
|*/
app.get("/", (req, res) => {
  res.send(index);
});

app.get("/sobre", (req, res) => {
  res.send(sobre);
});

app.get("/info", (req, res) => {
  res.send(info);
});

// app.listen() deve ser o último comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
