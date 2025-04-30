const bodyParser = require("body-parser"); // Importa o body-parser
const express = require("express"); // Importa biblioteca do express
const sqlite3 = require("sqlite3"); // Importa biblioteca sqlite3

const PORT = 8000; // Porta TCP do servidor HTTP da aplicação

const app = express(); //Instãncia para uso de express

let config = { titulo: "", rodape: "" };

const db = new sqlite3.Database("user.db"); // Instância para uso de SQLite3, e usa o arquivo 'user.db'
// Este método permite enviar comandos SQl em modo 'sequencial'
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT,
    email TEXT, tel TEXT, cpf TEXT, rg TEXT)`
  );
});

// __dirname é variável interna do nodejs que guarda o caminho absoluto do projeto
// console.log(__dirname);

// Aqui será acrescentado uma rota "/static", parar a pasta __dirname + "/static"
// O app.use é usado para acrescenter rotas novas para o express gerenciar e poder usar
// Middleware para isso, que neste caso é o express.static, que gerencia rotas estáticas
app.use("/static", express.static(__dirname + "/static"));

// Middleware para processar as requisições do body parameters do cliente
app.use(bodyParser.urlencoded({ extended: true }));

//Configurar EJS como o motor de visualização
app.set("view engine", "ejs");

// Cria conexão com o banco de dados
const index =
  "<a href='/'>Home</a> <a href='/sobre'>Sobre</a> <a href='/login'>login</a> <a href='/cadastro'>Cadastro</a>";
const sobre = "Você está na página 'sobre'<br><a href='/'>Voltar</a>";
const login = "Você está na página 'login' <br><a href='/'>Voltar</a>";
const cadastro = "Você está na página 'cadastro' <br><a href='/'>Voltar</a>";

/* Método express.get necessita de dois parãmetros
Na ARROW FUNCTION, o primeiro são os dados do servidor (REQUISITION - 'req')
O segundo são os dados que serão enviados ao cliente (RESULT - 'res')
|*/
app.get("/", (req, res) => {
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/
  // res.send(index);
  console.log("GET /index");
  // res.render(index);
  res.redirect("/cadastro"); // Redireciona para a ROTA cadastro
});

app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM users";
  db.all(query, (err, row) => {
    console.log(`GET /usuarios ${JSON.stringify(row)}`);
    // res.send("Lista de usuários");
    config = { titulo: "Blog da turma - Sesi", rodape: "" };
    res.render("partials/usertable", config);
  });
});

// GET do cadastro
app.get("/cadastro", (req, res) => {
  console.log("GET /cadastro");
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/cadastro
  config = { titulo: "Blog da turma - Sesi", rodape: "" };
  res.render("pages/cadastro", config);
});

// POST do cadastro
app.post("/cadastro", (req, res) => {
  console.log("POST /cadastro");
  // Linha para depurar se esta vindo dados no req.body
  !req.body
    ? console.log(`Body vazio: ${req.body}`)
    : console.log(JSON.stringify(req.body));

  const { username, password, email, tel, cpf, rg } = req.body;

  // Colocar aqui as validações e inclusão no banco de dados do cadastro de usuário
  // 1. Validar dados do usuário

  // 2. Saber se ele já ex  iste no banco
  const query =
    "SELECT * from users WHERE email = ? OR cpf = ? OR rg = ? OR username = ?";
  db.get(query, [email, cpf, rg, username], (err, row) => {
    if (err) throw err;

    if (row) {
      // A variável 'row' irá retornar os dados do banco de dados,
      // executado através do SQL, variável query
      res.send("Usuário já cadastrado, refaça o cadastro");
    } else {
      // 3. Se usuário não existe no banco, cadastrá-lo
      const insertQuery =
        "INSERT INTO users (username, password, email, tel, cpf, rg) VALUES (?,?,?,?,?,?)";
      db.run(insertQuery, [username, password, email, tel, cpf, rg], (err) => {
        // Inserir a lógica do INSERT
        if (err) throw err;
        res.send("Usuário cadastrado com sucesso");
      });
    }
  });

  // res.send(
  //   `Bem-vindo usuário: ${req.body.username}, seu email é ${req.body.email}`
  // );
});

// Programação de rotas do método GET do HTTP 'app.get()'
app.get("/sobre", (req, res) => {
  console.log("GET /sobre");
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/sobre
  config = { titulo: "Blog da turma - Sesi", rodape: "" };
  res.render("pages/sobre", config);
});

// GET Login
app.get("/login", (req, res) => {
  console.log("GET /login");
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/login
  config = { titulo: "Blog da turma - Sesi", rodape: "" };
  res.render("pages/login", config);
});

// Rota para processar o formulário de login
app.post("/login", (req, res) => {
  console.log("POST /login");
  res.send("Login ainda não implementado");
});

app.get("/dashboard", (req, res) => {
  console.log("GET /dashboard");
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/login
  config = { titulo: "Blog da turma - Sesi", rodape: "" };
  res.render("pages/dashboard", config);
});

// app.listen() deve ser o último comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
