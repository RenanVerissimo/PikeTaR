const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/database/db");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

const tarefasRoutes = require("./src/routes/tarefas");

app.use("/tarefas", tarefasRoutes);


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
