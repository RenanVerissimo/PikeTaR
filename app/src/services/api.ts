import { Tarefa } from "../types/tipagem";

const API_URL = "http://192.168.32.108:3000";

export async function buscarTarefas(): Promise<Tarefa[]> {
    const response = await fetch(`${API_URL}/tarefas`);

    if (!response.ok) {
        throw new Error("Erro ao buscar tarefas");
    }

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

    if (!response.ok) {
        throw new Error("Erro ao adicionar tarefa");
    }

    return await response.json();
}


export async function deleteTarefa(id: number) {
    const response = await fetch(`${API_URL}/tarefas/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir tarefa");
    }

    return await response.json();
}