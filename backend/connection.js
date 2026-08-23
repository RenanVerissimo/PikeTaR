const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.DB_PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

app.get("/teste-db", async (req, res) => {
  try {
    const db = require("./src/database/db");

    const [resultado] = await db.query("SELECT 1 AS teste");

    res.json(resultado);
  } catch (erro) {
    console.error("ERRO TESTE BANCO:", erro);

    res.status(500).json({
      erro: erro.message
    });
  }
});

const tarefasRoutes = require("./src/routes/tarefas");

app.use("/tarefas", tarefasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});