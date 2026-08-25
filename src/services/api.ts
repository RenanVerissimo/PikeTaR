import { dbPromise } from "../database/database";
import { Tarefa } from "../types/tipagem";


export async function buscarTarefas(): Promise<Tarefa[]> {

    const db = await dbPromise;

    const tarefas = await db.getAllAsync<Tarefa>(`
        SELECT *
        FROM tarefa
        ORDER BY dataAgendamento ASC
    `);

    return tarefas;
}


export async function adicionarTarefa(tarefa: Tarefa) {

    const db = await dbPromise;

    const resultado = await db.runAsync(
        `
        INSERT INTO tarefa (
            prioridade,
            descricaoTarefa,
            dataCriacao,
            dataAgendamento
        )
        VALUES (?, ?, ?, ?)
        `,
        tarefa.prioridade,
        tarefa.descricaoTarefa,
        tarefa.dataCriacao,
        tarefa.dataAgendamento
    );

    return resultado.lastInsertRowId;
}


export async function deleteTarefa(id: number) {

    const db = await dbPromise;

    await db.runAsync(
        `
        DELETE FROM tarefa
        WHERE id = ?
        `,
        id
    );
}