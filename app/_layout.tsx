import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { toastConfig } from '../src/utils/toastConfig';
import { db, iniciarBanco } from '@/src/database/database';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";


export default function RootLayout() {
  useDrizzleStudio(db);

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