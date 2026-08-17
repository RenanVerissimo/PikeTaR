import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import SnackbarMessage from '../utils/snackbarMessage';
import React from 'react';

export default function AddTarefa() {
    const [snackbarVisivel, setSnackbarVisivel] = useState(false);

    function handleSalvarTarefa() {
        console.log('Tarefa salva com sucesso!');
        setSnackbarVisivel(true);

        setTimeout(() => {
            setSnackbarVisivel(false);
        }, 3000);
    }

    function voltar() {
        console.log('Voltar para a tela inicial');
        router.push('/')
    }


    return (
        <>

            <View
                style={{
                    height: 120,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    paddingLeft: 12,
                    paddingBottom: 12,
                    //backgroundColor: '#ff0404',
                }}
            >
                <Pressable
                    onPress={() => voltar()}
                    style={({ pressed }) => ({
                        position: 'absolute',
                        //backgroundColor: 'red',
                        //zIndex: 10,
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
            </View>

            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: 140,
                }}
            >
                <Pressable
                    onPress={() => { }}
                    style={({ pressed }) => ({
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        backgroundColor: pressed ? '#000f6177' : '#0347cf',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}
                >
                    <MaterialIcons name="mic" size={28} color="#ffffff" />

                </Pressable>
            </View>
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
        </>
    );
}
