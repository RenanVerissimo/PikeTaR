import { useState, useEffect } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import SnackbarMessage from '../utils/snackbarMessage';
import { TextInput } from 'react-native-gesture-handler';

import {
    GoogleSans_400Regular,
    useFonts,
} from '@expo-google-fonts/google-sans';

import {
    AudioModule,
    RecordingPresets,
    setAudioModeAsync,
    useAudioPlayer,
    useAudioPlayerStatus,
    useAudioRecorder,
    useAudioRecorderState,
} from 'expo-audio';
import React from 'react';

export default function AddTarefa() {
    const [snackbarVisivel, setSnackbarVisivel] = useState(false);
    const [textoTarefa, SetTextoTarefa] = useState("");
    const [tarefaExibida, setTarefaExibida] = useState("");
    const [uriGravacao, setUriGravacao] = useState<string | null>(null);
    const gravador = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const estadoGravador = useAudioRecorderState(gravador);
    const player = useAudioPlayer(null);
    const estadoPlayer = useAudioPlayerStatus(player);
    const [fontesCarregadas, erroFonte] = useFonts({
        GoogleSans_400Regular
    });
    const [prioridade, setPrioridade] = useState("");
    const opcoesPrioridade = ["Alto", "Médio", "Baixo"];


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

    async function handleGravacao() {
        try {
            if (estadoGravador.isRecording) {
                await gravador.stop();

                if (gravador.uri) {
                    setUriGravacao(gravador.uri);
                    player.replace(gravador.uri);
                    console.log('Gravação salva:', gravador.uri);
                }

                return;
            }

            if (estadoPlayer.playing) {
                player.pause();
            }

            await gravador.prepareToRecordAsync();
            gravador.record();
        } catch (erro) {
            console.error('Erro ao gravar:', erro);
            Alert.alert('Erro', 'Não foi possível realizar a gravação.');
        }
    }

    async function handleReproduzirGravacao() {
        if (!uriGravacao) {
            return;
        }

        if (estadoPlayer.playing) {
            player.pause();
            return;
        }

        if (estadoPlayer.didJustFinish ||
            (estadoPlayer.duration > 0 && estadoPlayer.currentTime >= estadoPlayer.duration)) {
            await player.seekTo(0);
        }

        player.play();
    }

    async function handleLimparGravacao() {
        if (estadoPlayer.playing) {
            player.pause();
        }

        await player.seekTo(0);
        setUriGravacao(null);
    }

    useEffect(() => {
        async function configurarAudio() {
            const permissao = await AudioModule.requestRecordingPermissionsAsync();

            if (!permissao.granted) {
                Alert.alert(
                    'Permissão necessária',
                    'Permita o acesso ao microfone para gravar uma tarefa.'
                );
                return;
            }

            await setAudioModeAsync({
                allowsRecording: true,
                playsInSilentMode: true,
            });
        }

        configurarAudio();
    }, []);

    if (!fontesCarregadas && !erroFonte) {
        return null;
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

            {/*             <View
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
                        backgroundColor: estadoGravador.isRecording
                            ? '#dc2626'
                            : pressed
                                ? '#000f6177'
                                : '#0347cf',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}
                >
                    <MaterialIcons name={estadoGravador.isRecording ? 'stop' : 'mic'}
                        size={28}
                        color="#ffffff"
                    />
                </Pressable>

                {estadoGravador.isRecording ? (
                    <Text
                        style={{
                            position: 'absolute',
                            top: 210,
                            fontFamily: "GoogleSans_400Regular",
                            color: '#dc2626',
                        }}
                    >
                        Gravando... {Math.round(estadoGravador.durationMillis / 1000)}s
                    </Text>
                ) : null}

                {uriGravacao ? (
                    <View
                        style={{
                            marginTop: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <Pressable
                            onPress={handleReproduzirGravacao}
                            style={({ pressed }) => ({
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                paddingVertical: 8,
                                paddingHorizontal: 14,
                                borderRadius: 20,
                                backgroundColor: pressed ? '#dbeafe' : '#eff6ff',
                            })}
                        >
                            <MaterialIcons
                                name={estadoPlayer.playing ? 'pause' : 'play-arrow'}
                                size={24}
                                color="#0347cf"
                            />
                            <Text
                                style={{
                                    fontFamily: 'GoogleSans_400Regular',
                                    textAlign: "center",
                                    color: '#0347cf',
                                }}
                            >
                                {estadoPlayer.playing ? 'Pausar áudio' : 'Ouvir áudio'}
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={handleLimparGravacao}
                            accessibilityLabel="Limpar áudio gravado"
                            style={({ pressed }) => ({
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: pressed ? '#fee2e2' : '#fef2f2',
                            })}
                        >
                            <MaterialIcons name="delete" size={22} color="#dc2626" />
                        </Pressable>
                    </View>
                ) : null}


                <TextInput
                    value={textoTarefa}
                    onChangeText={SetTextoTarefa}
                    placeholder="Digite aqui"
                    multiline={true}
                    style={{
                        textAlignVertical: 'top',
                        marginTop: 48,
                        borderColor: "black",
                        height: 80,
                        width: 240,
                        //borderBlockColor: "black",
                        color: '#000',
                        borderWidth: 2,
                        borderRadius: 8,
                        fontSize: 16,
                        padding: 12,
                        fontFamily: "GoogleSans_400Regular"
                    }}
                >
                </TextInput>

                {tarefaExibida ? (
                    <Text>{tarefaExibida}</Text>
                ) : null}

            </View> */}

            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: 12,

                }}
            >

                <View
                    style=
                    {{
                        gap: 4,
                        borderWidth: 1,
                        borderRadius: 8,
                        padding: 12,
                        paddingBottom: 24,
                        backgroundColor: "#a9b9be6c",
                        width: 330,

                    }}
                >
                    <Text
                        style={{
                            fontFamily: "GoogleSans_400Regular",
                        }}
                    >NÍVEL DE PRIORIDADE:</Text>


                    <View
                        style={{
                            flexDirection: "row",
                            gap: 12,
                            justifyContent: "center",
                            marginBottom: 12,
                            borderWidth: 0,
                            //borderRadius: 8,
                            //padding: 10

                        }}
                    >
                        {opcoesPrioridade.map((opcao) => {
                            const selecionado = prioridade === opcao;
                            const corPrioridade =
                                opcao === "Alto"
                                    ? "#dc2626" // vermelho
                                    : opcao === "Médio"
                                        ? "#facc15" // amarelo
                                        : "#93c5fd"; // azul fraco

                            return (
                                <Pressable
                                    key={opcao}
                                    onPress={() => setPrioridade(opcao)}
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 24,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: selecionado ? corPrioridade : "#ccc",
                                        backgroundColor: selecionado ? corPrioridade : "#fff",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: selecionado ? "#fff" : "#333",
                                            fontWeight: selecionado ? "700" : "400",
                                        }}
                                    >
                                        {opcao}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View
                    style={{
                        borderWidth: 1,
                        margin: 30,
                        backgroundColor: "#a9b9be6c",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingBottom: 24,
                        width: 330,
                    }}
                >
                    <Text
                        style={{
                            //marginTop: 8,
                            fontFamily: "GoogleSans_400Regular",
                            fontSize: 16

                        }}
                    >
                        Descreva a tarefa
                    </Text>
                    <TextInput
                        value={textoTarefa}
                        onChangeText={SetTextoTarefa}
                        placeholder="Digite aqui"
                        multiline={true}
                        style={{
                            textAlignVertical: 'top',
                            height: 80,
                            width: "100%",
                            borderWidth: 1,
                            borderRadius: 8,
                            fontSize: 14,
                            padding: 10,
                            fontFamily: "GoogleSans_400Regular"
                        }}
                    />

                    {tarefaExibida ? (
                        <Text>{tarefaExibida}</Text>
                    ) : null}
                </View>
            </View>

            <Pressable
                onPress={handleSalvarTarefa}
                style={({ pressed }) => ({
                    position: 'absolute',
                    left: 16,
                    right: 16,
                    bottom: 60,
                    paddingVertical: 14,
                    paddingHorizontal: 22,
                    borderWidth: 1,
                    borderColor: '#000000',
                    borderRadius: 32,
                    backgroundColor: pressed ? '#e6ebe5' : '#188b01',
                    alignItems: 'center',
                    justifyContent: 'center',
                })}
            >
                <Text
                    style={{
                        fontSize: 16,
                        lineHeight: 20,
                        fontFamily: 'GoogleSans_400Regular',
                        textAlign: 'center',
                        includeFontPadding: false,
                    }}
                >
                    Salvar
                </Text>
            </Pressable>

            <SnackbarMessage
                visible={snackbarVisivel}
                message="Tarefa adicionada com sucesso!"
            />
        </>
    );
}
