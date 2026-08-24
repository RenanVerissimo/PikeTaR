type NavegadorComNotificacao = typeof globalThis & {
  Notification?: typeof Notification;
  alert?: (mensagem: string) => void;
  setTimeout: typeof setTimeout;
};

const navegador = globalThis as NavegadorComNotificacao;

export async function registerForPushNotificationsAsync() {
  return prepararNotificacoes();
}

export async function prepararNotificacoes() {
  const Notificacao = navegador.Notification;

  if (!Notificacao) {
    navegador.alert?.('Este navegador nao suporta notificacoes.');
    return false;
  }

  if (Notificacao.permission === 'granted') {
    return true;
  }

  if (Notificacao.permission === 'denied') {
    navegador.alert?.('Ative as notificacoes do PikeTaR nas configuracoes do navegador.');
    return false;
  }

  const permissao = await Notificacao.requestPermission();

  if (permissao !== 'granted') {
    navegador.alert?.('Ative as notificacoes do PikeTaR nas configuracoes do navegador.');
    return false;
  }

  return true;
}

export async function agendarNotificacaoTarefa(titulo: string, dataAgendamento: Date) {
  const Notificacao = navegador.Notification;
  const permitido = await prepararNotificacoes();

  if (!permitido || !Notificacao) {
    throw new Error('Permissao de notificacao nao concedida.');
  }

  const tempoAteNotificacao = dataAgendamento.getTime() - Date.now();

  if (tempoAteNotificacao <= 0) {
    throw new Error('A data da notificacao precisa estar no futuro.');
  }

  navegador.setTimeout(() => {
    new Notificacao('Tarefa', {
      body: titulo,
    });
  }, tempoAteNotificacao);
}

export function usePushNotifications() {
  return;
}
