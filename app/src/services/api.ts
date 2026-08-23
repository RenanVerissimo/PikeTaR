import { Tarefa } from "../types/tipagem";

const API_URL = "http://192.168.32.108:3000";

export async function buscarTarefas() {
    const response = await fetch(`${API_URL}/tarefas`);
    return await response.json();
}

export async function adicionarTarefa(tarefa: Tarefa) {
    const response = await fetch(`${API_URL}/tarefas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tarefa),
    });

    return await response.json();
}