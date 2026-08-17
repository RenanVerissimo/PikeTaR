/* import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Href, router } from 'expo-router';

const TEST_NOTIFICATION_CATEGORY = 'teste_notificacao';
const TEST_NOTIFICATION_OK_ACTION = 'OK';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerNotificationCategoriesAsync() {
  if (Platform.OS === 'web') {
    return;
  }

  await Notifications.setNotificationCategoryAsync(TEST_NOTIFICATION_CATEGORY, [
    {
      identifier: TEST_NOTIFICATION_OK_ACTION,
      buttonTitle: 'OK',
      options: {
        opensAppToForeground: false,
      },
    },
  ]);
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'web') {
    return null;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#1d4ed8',
    });
  }

  await registerNotificationCategoriesAsync();

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert('Notificações bloqueadas', 'Ative as notificações do PikeTaR nas configurações do celular.');
    return null;
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;

  if (!projectId) {
    console.warn('EAS projectId nao encontrado. Rode "eas init" para habilitar push notifications remotas.');
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync({ projectId });
  console.log('Expo Push Token:', token.data);

  return token.data;
}

export async function exibirNotificacao() {
  if (Platform.OS === 'web') {
    const message = 'Teste as notificacoes em um aparelho Android ou iOS.';

    if (typeof window !== 'undefined') {
      window.alert(`Indisponivel no web\n\n${message}`);
    }

    console.log(message);
    return;
  }

  await registerNotificationCategoriesAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'PikeTaR',
      body: 'Notificação de teste funcionando.',
      data: { url: '/' },
      categoryIdentifier: TEST_NOTIFICATION_CATEGORY,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 1,
    },
  });
}

function useNotificationNavigation() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;

      if (typeof url === 'string') {
        router.push(url as Href);
      }
    }

    function handleResponse(response: Notifications.NotificationResponse) {
      if (response.actionIdentifier === TEST_NOTIFICATION_OK_ACTION) {
        console.log('Usuario confirmou que viu a notificacao.');
        return;
      }

      if (response.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER) {
        redirect(response.notification);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response?.notification) {
        handleResponse(response);
      }
    });

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      handleResponse(response);
    });

    return () => {
      subscription.remove();
    };
  }, []);
}

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useNotificationNavigation();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(setExpoPushToken)
      .catch((error) => {
        console.warn('Erro ao registrar notificacoes:', error);
      });
  }, []);

  return expoPushToken;
}
 */