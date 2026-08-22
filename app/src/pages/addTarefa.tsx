import { useState, useEffect } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { exibirToastSucesso } from '../utils/toastMessage';

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
    const opcoesPeriodo = ["15min", "30min", "1hora", "Outro"]
    const [periodo, setPeriodo] = useState("");
    const [dataNotificacao, setDataNotificacao] = useState("");
    const [horaNotificacao, setHoraNotificacao] = useState("");
    const [minutoNotificacao, setMinutoNotificacao] = useState("");
    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const [mostrarHoras, setMostrarHoras] = useState(false);
    const [horaSelecionada, setHorasSelecionadas] = useState(new Date());

    function handleSalvarTarefa() {
        console.log('Tarefa salva com sucesso!');
        setTarefaExibida(textoTarefa);
        exibirToastSucesso("Tarefa adicionada!", "A tarefa foi salva com sucesso.");
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

            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingTop: 12,
                    paddingBottom: 150,
                }}
                keyboardShouldPersistTaps="handled"
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
                                        //borderColor: selecionado ? corPrioridade : "#ccc",
                                        borderColor: "black",
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
                        marginTop: 30,
                        backgroundColor: "#a9b9be6c",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingBottom: 24,
                        width: 330,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "GoogleSans_400Regular",
                        }}
                    >
                        DESCREVA A TAREFA
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

                <View
                    style={{
                        borderWidth: 1,
                        marginTop: 30,
                        backgroundColor: "#a9b9be6c",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        width: 330,
                        minHeight: 120,
                    }}
                >

                    <Text
                        style={{
                            fontFamily: "GoogleSans_400Regular",
                            textAlign: "center"

                        }}
                    >
                        AGENDE O PERÍODO DA NOTIFICAÇÃO
                    </Text>

                    <View style={{
                        flexDirection: "row",
                        gap: 24,
                        marginTop: 8,

                        justifyContent: "center",
                    }}>
                        {opcoesPeriodo.map((opcaoPeriodo) => {
                            const selecionado = periodo === opcaoPeriodo;
                            return (
                                <Pressable
                                    key={opcaoPeriodo}
                                    onPress={() => {
                                        setPeriodo(opcaoPeriodo);

                                        if (opcaoPeriodo !== "Outro") {
                                            setDataNotificacao("");
                                            setHoraNotificacao("");
                                            setMinutoNotificacao("");
                                        }
                                    }}
                                    style={{
                                        paddingVertical: 8,
                                        paddingHorizontal: 8,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: "#000000",
                                        backgroundColor: selecionado ? "#444644" : "#ffffff",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: selecionado ? "#ffffff" : "#333333",
                                            fontWeight: selecionado ? "700" : "400",
                                        }}
                                    >
                                        {opcaoPeriodo}
                                    </Text>

                                </Pressable>
                            );

                        })}
                    </View>

                    {periodo === "Outro" ? (
                        <View
                            style={{
                                marginTop: 10,
                                gap: 8
                            }}
                        >
                            <View
                                style={{
                                    height: 45,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "#000000",
                                    borderRadius: 8,
                                    backgroundColor: "#ffffff",
                                    paddingHorizontal: 10,
                                }}
                            >
                                <MaterialIcons name="calendar-today" size={28} color="#333333" />
                                <Pressable
                                    onPress={() => setMostrarCalendario((valorAtual) => !valorAtual)}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 8,
                                        paddingHorizontal: 8,
                                    }}
                                >
                                    <Text
                                        style={{
                                            
                                            fontSize: 14,
                                            fontFamily: "GoogleSans_400Regular",
                                            color: dataNotificacao ? "#000000" : "#777777",
                                        }}
                                    >
                                        {dataNotificacao || "Selecionar Dia"}
                                    </Text>
                                </Pressable>
                            </View>

                            {mostrarCalendario ? (
                                <DateTimePicker
                                    value={dataSelecionada}
                                    mode="date"
                                    display="calendar"
                                    onChange={(_event, selectedDate) => {
                                        setMostrarCalendario(false);

                                        if (selectedDate) {
                                            setDataSelecionada(selectedDate);
                                            setDataNotificacao(selectedDate.toLocaleDateString("pt-BR"));
                                        }
                                    }}
                                />
                            ) : null}

                            {/* Campo de escolha de horas e minutos */}

                            <View
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    height: 45,
                                    backgroundColor: "#ffffff",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingHorizontal: 10,

                                }}
                            >
                                <MaterialIcons name="access-time" size={28} color="#333333" />
                                <Pressable
                                    onPress={() => setMostrarHoras(true)}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 8,
                                        paddingHorizontal: 8
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontFamily: "GoogleSans_400Regular",
                                            color: horaNotificacao ? "#000000" : "#777777",
                                        }}
                                    >
                                        {horaNotificacao && minutoNotificacao
                                            ? `${horaNotificacao}:${minutoNotificacao}`
                                            : "Selecionar Horário"}
                                    </Text>


                                </Pressable>
                            </View>

                            {mostrarHoras ? (
                                <DateTimePicker
                                    value={horaSelecionada}
                                    mode="time"
                                    display="spinner"
                                    onChange={(event, selectedTime) => {
                                        setMostrarHoras(false);
                                        if (event.type === "dismissed") {
                                            return;
                                        }
                                        if (selectedTime) {
                                            setHorasSelecionadas(selectedTime);

                                            const hora = selectedTime.getHours().toString().padStart(2, "0");
                                            const minuto = selectedTime.getMinutes().toString().padStart(2, "0");

                                            setHoraNotificacao(hora);
                                            setMinutoNotificacao(minuto);
                                        }
                                    }}
                                />
                            ) : null}
                        </View>
                    ) : null}
                </View>
            </ScrollView >

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
        </>
    );
}
