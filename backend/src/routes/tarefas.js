const db = require("../database/db");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [tarefas] = await db.query(
      "SELECT id_tarefa AS id, prioridade, descricaoTarefa, dataCriacao, dataAgendamento FROM tarefa"
    );

    res.json(tarefas);

  } catch (erro) {
    console.error("Erro ao buscar tarefas:", erro);

    res.status(500).json({
      erro: erro.message
    });
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await db.query(
      "DELETE FROM tarefa WHERE id_tarefa = ?",
      [id]
    );

    res.json({
      mensagem: "Tarefa excluída com sucesso",
      linhasAfetadas: resultado.affectedRows,
    });
  } catch (erro) {
    console.error("Erro ao excluir tarefa:", erro);
    res.status(500).json({ erro: "Erro ao excluir tarefa" });
  }
});

module.exports = router;
