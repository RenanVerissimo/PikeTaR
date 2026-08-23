const db = require("../database/db");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [tarefas] = await db.query("SELECT * FROM tarefa");
    res.json(tarefas);
  } catch (erro) {
    console.error("Erro ao buscar tarefas:", erro);
    res.status(500).json({ erro: "Erro ao buscar tarefas" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { prioridade, descricaoTarefa, dataCriacao, dataAgendamento } = req.body;

    const [resultado] = await db.query(
      "INSERT INTO tarefa (prioridade, descricaoTarefa, dataCriacao, dataAgendamento) VALUES (?, ?, ?, ?)",
      [prioridade, descricaoTarefa, dataCriacao, dataAgendamento]
    );

    res.status(201).json({
      mensagem: "Tarefa adicionada com sucesso",
      id: resultado.insertId,
    });
  } catch (erro) {
    console.error("Erro em adicionar tarefa:", erro);
    res.status(500).json({ erro: "Erro ao adicionar tarefa" });
  }
});

module.exports = router;