import { Alert, Platform } from 'react-native';

export async function prepararNotificacoes() {
  const { setNotificationHandler } = await import('expo-notifications/build/NotificationsHandler');
  const { getPermissionsAsync, requestPermissionsAsync } = await import(
    'expo-notifications/build/NotificationPermissions'
  );

  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === 'android') {
    const { default: setNotificationChannelAsync } = await import(
      'expo-notifications/build/setNotificationChannelAsync'
    );
    const { AndroidImportance } = await import(
      'expo-notifications/build/NotificationChannelManager.types'
    );

    await setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#1d4ed8',
    });
  }

  const { status: statusAtual } = await getPermissionsAsync();
  let statusFinal = statusAtual;

  if (statusAtual !== 'granted') {
    const { status } = await requestPermissionsAsync();
    statusFinal = status;
  }

  if (statusFinal !== 'granted') {
    Alert.alert(
      'Notificacoes bloqueadas',
      'Ative as notificacoes do PikeTaR nas configuracoes do celular.'
    );
    return false;
  }

  return true;
}

export async function agendarNotificacaoTarefa(titulo: string, dataAgendamento: Date) {
  const permitido = await prepararNotificacoes();

  if (!permitido) {
    throw new Error('Permissao de notificacao nao concedida.');
  }

  if (dataAgendamento.getTime() <= Date.now()) {
    throw new Error('A data da notificacao precisa estar no futuro.');
  }

  const { default: scheduleNotificationAsync } = await import(
    'expo-notifications/build/scheduleNotificationAsync'
  );
  const { SchedulableTriggerInputTypes } = await import(
    'expo-notifications/build/Notifications.types'
  );

  await scheduleNotificationAsync({
    content: {
      title: 'Tarefa',
      body: titulo,
      sound: true,
    },
    trigger: {
      type: SchedulableTriggerInputTypes.DATE,
      date: dataAgendamento,
    },
  });
}

export function usePushNotifications() {
  return;
}
