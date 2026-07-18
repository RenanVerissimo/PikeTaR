import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useRouter } from 'expo-router';

import { scheduleTestNotificationAsync } from '@/hooks/use-push-notifications';


export default function Layout({ children }: { children: React.ReactNode }) {
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

            <Button onPress={() => router.push('/')}>
                Voltar
            </Button>

            <Button onPress={scheduleTestNotificationAsync}>
                Testar notificacao
            </Button>
        </View>
    );
}
