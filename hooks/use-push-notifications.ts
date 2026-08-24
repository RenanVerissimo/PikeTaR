import { Alert, Platform } from 'react-native';
import Constants from 'expo-constants';

function estaNoExpoGoAndroid() {
  return Platform.OS === 'android' && Constants.appOwnership === 'expo';
}

export async function prepararNotificacoes() {
  if (Platform.OS === 'web') {
    return false;
  }

  if (estaNoExpoGoAndroid()) {
    Alert.alert(
      'Expo Go limitado',
      'No Android, teste notificacoes no APK ou em uma development build.'
    );
    return false;
  }

  const Notifications = await import('expo-notifications');

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#1d4ed8',
    });
  }

  const { status: statusAtual } = await Notifications.getPermissionsAsync();
  let statusFinal = statusAtual;

  if (statusAtual !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
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
  if (Platform.OS === 'web' || estaNoExpoGoAndroid()) {
    return;
  }

  const permitido = await prepararNotificacoes();

  if (!permitido) {
    throw new Error('Permissao de notificacao nao concedida.');
  }

  if (dataAgendamento.getTime() <= Date.now()) {
    throw new Error('A data da notificacao precisa estar no futuro.');
  }

  const Notifications = await import('expo-notifications');

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Tarefa',
      body: titulo,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: dataAgendamento,
    },
  });
}

export function usePushNotifications() {
  return;
}
