import { Stack } from 'expo-router';

import { usePushNotifications } from '@/hooks/use-push-notifications';

export default function RootLayout() {
  usePushNotifications();

  return <Stack screenOptions={{ headerShown: false }} />;
}
