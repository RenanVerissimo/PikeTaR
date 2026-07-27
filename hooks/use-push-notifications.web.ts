export async function registerForPushNotificationsAsync() {
  return null;
}

export async function exibirNotificacao() {
  if (typeof window !== 'undefined') {
    window.alert('Teste as notificacoes em um aparelho Android ou iOS.');
  }
}

export function usePushNotifications() {
  return null;
}
