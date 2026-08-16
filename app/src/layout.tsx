import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { exibirNotificacao } from '@/hooks/use-push-notifications';


export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [testandoNotificacao, setTestandoNotificacao] = useState(false);

    async function testarNotificacao() {
        if (testandoNotificacao) {
            return;
        }

        setTestandoNotificacao(true);

        try {
            await exibirNotificacao();
        } finally {
            setTimeout(() => {
                setTestandoNotificacao(false);
            }, 1000);
        }
    }

    return (

        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >

            <Pressable
                onPress={() => router.push('/')}
                style={{
                    position: 'absolute',
                    top: 72,
                    left: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                }}
               
            >
                <Ionicons name="arrow-back" size={20} color="#000" />
                <Text>Voltar</Text>
            </Pressable>

            <Text>Olá Mundo!</Text>



            <Button onPress={() => {
                void testarNotificacao();
            }}>
                {testandoNotificacao ? 'Enviando...' : 'Testar notificação'}
            </Button>
        </View>
    );
}
