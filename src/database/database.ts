import * as SQLite from "expo-sqlite";

export const dbPromise = SQLite.openDatabaseAsync("piketar.db");

export async function iniciarBanco() {
    const db = await dbPromise;

    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS tarefa (
            id_tarefa INTEGER PRIMARY KEY AUTOINCREMENT,
            prioridade TEXT NOT NULL,
            descricaoTarefa TEXT NOT NULL,
            dataCriacao TEXT NOT NULL,
            dataAgendamento TEXT NOT NULL,
            notificacaoId TEXT
        );
    `);
}

export async function buscarTarefas() {
    const db = await dbPromise;

    return await db.getAllAsync(`
        SELECT
            id_tarefa AS id,
            prioridade,
            descricaoTarefa,
            dataCriacao,
            dataAgendamento,
            notificacaoId
        FROM tarefa
        ORDER BY dataAgendamento ASC
    `);
}