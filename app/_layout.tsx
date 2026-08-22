import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

//import { usePushNotifications } from '@/hooks/use-push-notifications';
import React from 'react';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={4}
      style={{ borderLeftColor: '#22c55e', minHeight: 74, width: '92%' }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={4}
      style={{ borderLeftColor: '#ef4444', minHeight: 74, width: '92%' }}
    />
  ),
};

export default function RootLayout() {
  //usePushNotifications();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
