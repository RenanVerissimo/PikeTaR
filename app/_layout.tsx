import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { toastConfig } from '../src/utils/toastConfig';
import { iniciarBanco } from '@/src/database/database';

export default function RootLayout() {
  useEffect(() => {
    iniciarBanco()
      .then(() => {
        console.log('Banco SQLite iniciado');
      })
      .catch((erro: unknown) => {
        console.error('Erro ao iniciar SQLite:', erro);
      });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}