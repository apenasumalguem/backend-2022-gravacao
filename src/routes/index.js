const { Router, static: expressStatic } = require("express");
const http = require("http");
const { storage, uploadFolder } = require("../config/upload");
const multer = require("multer");

const Usuarios = require("../controller/usuarios/index");
const Projetos = require("../controller/projetos/index");

const routes = new Router();
const upload = multer({ storage });

routes.get("/", (req, res) => {
  // return res.sendFile("/sandbox/public/index.html");
  return res.status(200).send("Servidor Funcionando").end();
});

routes.get("/refresh", (req, res) => {
  return res.sendFile("/sandbox/public/index.html");
  // return res.status(200).send("Servidor Funcionando").end();
});

routes.put("/api/*", (req, res) => {
  return res.status(400).end();
});

routes.get("/api/db", (req, res) => {
  return res.status(404).end(http.STATUS_CODES[404]);
});

routes.use("/files", expressStatic(uploadFolder));

routes.post("/auth", Usuarios.auth);
routes.post("/signup", Usuarios.signup);
routes.get("/activate/:chave", Usuarios.activate);

routes.get("/teste", (req, res, next) => {
  res.status(200).send("Teste de mensagem").end();
});

//routes.use("/api/*", Usuarios.signup);
//routes.use("/api/*", Usuarios.ensureAuthenticated);

// routes.use(Usuarios.ensureAuthenticated);

routes.post("/api/usuarios", Usuarios.store);
routes.patch("/api/usuarios/:id", Usuarios.update);
routes.patch("/api/avatar/:id", upload.single("avatar"), Usuarios.uploadPhoto);

routes.post("/api/projetos", Projetos.store);
routes.patch("/api/projetos/:id", Projetos.update);

module.exports = { routes };
