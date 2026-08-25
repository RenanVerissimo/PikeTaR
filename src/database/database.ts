import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("piketar.db");
export const dbPromise = SQLite.openDatabaseAsync("piketar.db");

export async function iniciarBanco() {
    const banco = await dbPromise;

    await banco.execAsync(`
        CREATE TABLE IF NOT EXISTS tarefa (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prioridade TEXT NOT NULL,
            descricaoTarefa TEXT NOT NULL,
            dataCriacao TEXT NOT NULL,
            dataAgendamento TEXT NOT NULL
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