import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import SnackbarMessage from '../utils/snackbarMessage';

export default function AddTarefa() {
    const [snackbarVisivel, setSnackbarVisivel] = useState(false);

    function handleSalvarTarefa() {
        console.log('Tarefa salva com sucesso!');
        setSnackbarVisivel(true);

        setTimeout(() => {
            setSnackbarVisivel(false);
        }, 3000);
    }

    return (
        <View style={{ flex: 1 }}>
            <Pressable
                onPress={() => router.push('/')}
                style={({ pressed }) => ({
                    position: 'absolute',
                    top: 60,
                    left: 12,
                    width: 48,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    backgroundColor: pressed ? '#e5e7eb' : 'transparent',
                })}
            >
                <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color="#000"
                    style={{ transform: [{ translateX: 5 }] }}
                />
            </Pressable>

            <Pressable
                onPress={handleSalvarTarefa}
                style={({ pressed }) => ({
                    position: 'absolute',
                    left: 16,
                    right: 16,
                    bottom: 96,
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor: '#000000',
                    borderRadius: 8,
                    backgroundColor: pressed ? '#e5e7eb' : 'transparent',
                    alignItems: 'center',
                })}
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                    Adicionar Tarefa
                </Text>
            </Pressable>

            <SnackbarMessage
                visible={snackbarVisivel}
                message="Tarefa adicionada com sucesso!"
            />
        </View>
    );
}
