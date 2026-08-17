import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import SnackbarMessage from '../utils/snackbarMessage';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';

export default function AddTarefa() {
    const [snackbarVisivel, setSnackbarVisivel] = useState(false);
    const [gravando, setGravando] = useState(false);
    const [textoTarefa, SetTextoTarefa] = useState("");
    const [tarefaExibida, setTarefaExibida] = useState("");


    function handleSalvarTarefa() {
        console.log('Tarefa salva com sucesso!');
        setTarefaExibida(textoTarefa);
        setSnackbarVisivel(true);

        setTimeout(() => {
            setSnackbarVisivel(false);
        }, 3000);
    }

    function voltar() {
        console.log('Voltar para a tela inicial');
        router.push('/')
    }

    function handleGravacao() {
        console.log("gravando!");
        setGravando(!gravando);
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
                }}
            >
                <Pressable
                    onPress={() => voltar()}
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
                    onPress={handleGravacao}
                    style={({ pressed }) => ({
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        backgroundColor: gravando
                            ? '#dc2626'
                            : pressed
                                ? '#000f6177'
                                : '#0347cf',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}
                >
                    <MaterialIcons name={gravando ? 'stop' : 'mic'}
                        size={28}
                        color="#ffffff"
                    />


                </Pressable>

                {gravando ? (
                    <Text
                        style={{
                            marginTop: 16,
                            fontFamily: "Arial",
                        }}>Gravando</Text>
                ) : null}


                <TextInput
                    value={textoTarefa}
                    onChangeText={SetTextoTarefa}
                    placeholder="Digite aqui"
                    style={{
                        marginTop: 84,
                        borderColor: "black",
                        height: 80,
                        width: 240,
                        //borderBlockColor: "black",
                        color: '#000',
                        borderWidth: 1,
                        borderRadius: 8,
                        fontSize: 16,
                    }}
                >
                </TextInput>

                {tarefaExibida ? (
                <Text>{tarefaExibida}</Text>
                ): null}
                
            </View>

            <Pressable
                onPress={handleSalvarTarefa}
                style={({ pressed }) => ({
                    position: 'absolute',
                    left: 72,
                    right: 72,
                    bottom: 82,
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor: '#000000',
                    borderRadius: 8,
                    backgroundColor: pressed ? '#e6ebe5' : '#188b01',
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
