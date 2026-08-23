import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../src/utils/toastConfig';

//import { usePushNotifications } from '@/hooks/use-push-notifications';
import React from 'react';

export default function RootLayout() {
  //usePushNotifications();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
