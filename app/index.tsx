import { Button } from '@react-navigation/elements';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Olá Mundo!</Text>

      <Button onPress={() => router.push('/src/layout')}>
        Testeeeeee
      </Button>
    </View>
  );
}