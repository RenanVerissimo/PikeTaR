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

import React from 'react';
import { adicionarTarefa } from '../services/api';

export default function AddTarefa() {
    const [textoTarefa, SetTextoTarefa] = useState("");
    const [tarefaExibida, setTarefaExibida] = useState("");

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



    async function handleSalvarTarefa() {
        const novaTarefa = {
            prioridade,
            descricaoTarefa: textoTarefa,
            dataCriacao: formatarDataMysql(new Date()),
            dataAgendamento:
                dataAgendamento
        };

        await adicionarTarefa(novaTarefa);

        exibirToastSucesso("Tarefa adicionada!", "A tarefa foi salva com sucesso.");
    }

    const dataAgendamentoCalculada = new Date();
    dataAgendamentoCalculada.setMinutes(
        dataAgendamentoCalculada.getMinutes() + Number(periodo)
    );

    const dataAgendamento = formatarDataMysql(dataAgendamentoCalculada);

    function formatarDataMysql(data: Date) {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");
        const hora = String(data.getHours()).padStart(2, "0");
        const minuto = String(data.getMinutes()).padStart(2, "0");
        const segundo = String(data.getSeconds()).padStart(2, "0");

        return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
    }
    function voltar() {
        console.log('Voltar para a tela inicial');
        router.push('/')
    }

    function periodosCalculados() {
        const dataAtual = new Date();
        const dataMaisPeriodo = new Date(dataAtual);

        dataMaisPeriodo.setMinutes(dataMaisPeriodo.getMinutes() + Number(periodo));

        const dataFormatada = dataMaisPeriodo.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        return dataFormatada;
    }

    function formatDataHora() {
        const data = dataSelecionada.toLocaleDateString("pt-BR");
        const hora = horaNotificacao;
        const minuto = minutoNotificacao;


        return "data: " + data + " hora: " + hora + " minuto: " + minuto;
    }

    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 40,

            }}
            keyboardShouldPersistTaps="handled"
        >
            <View
                style={{
                    height: 120,
                    width: "100%",
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
                style=
                {{
                    gap: 12,
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 12,
                    paddingBottom: 16,
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
                        gap: 16,
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
                                        color: selecionado ? "#fff" : "#000000",
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
                    gap: 12
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
                    }}
                >
                    AGENDE O PERÍODO DA NOTIFICAÇÃO
                </Text>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 16,
                    marginTop: 12
                }}>
                    <Pressable
                        onPress={() => { setPeriodo("15") }}
                        style={{
                            borderWidth: 1,
                            borderRadius: 8,
                            width: 66,
                            height: 40,
                            backgroundColor: periodo === "15" ? "#a9b9be6c" : "#ffffff",
                            alignItems: "center",
                            justifyContent: "center",
                        }}

                    >
                        <Text
                            style={{
                                fontFamily: "GoogleSans_400Regular",
                                includeFontPadding: false,
                            }}
                        >
                            15Min
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => { setPeriodo("30") }}
                        style={{
                            borderWidth: 1,
                            borderRadius: 8,
                            width: 66,
                            height: 40,
                            backgroundColor: periodo === "30" ? "#a9b9be6c" : "#ffffff",
                            alignItems: "center",
                            justifyContent: "center",
                        }}

                    >
                        <Text
                            style={{
                                fontFamily: "GoogleSans_400Regular",
                                includeFontPadding: false,
                            }}
                        >
                            30Min
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => { setPeriodo("60") }}
                        style={{
                            borderWidth: 1,
                            borderRadius: 8,
                            width: 66,
                            height: 40,
                            backgroundColor: periodo === "60" ? "#a9b9be6c" : "#ffffff",
                            alignItems: "center",
                            justifyContent: "center",
                        }}

                    >
                        <Text
                            style={{
                                fontFamily: "GoogleSans_400Regular",
                                includeFontPadding: false,
                            }}
                        >
                            1h
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => { setPeriodo("Outro") }}
                        style={{
                            borderWidth: 1,
                            borderRadius: 8,
                            width: 68,
                            height: 40,
                            backgroundColor: periodo === "Outro" ? "#a9b9be6c" : "#ffffff",
                            alignItems: "center",
                            justifyContent: "center",
                        }}

                    >
                        <Text
                            style={{
                                fontFamily: "GoogleSans_400Regular",
                                includeFontPadding: false,
                            }}
                        >
                            Outro
                        </Text>
                    </Pressable>

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
                                onPress={() => setMostrarCalendario(true)}
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

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10
                }}>
                <Pressable
                    onPress={handleSalvarTarefa}
                    style={({ pressed }) => ({
                        width: 220,
                        height: 48,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderRadius: 32,
                        backgroundColor: pressed ? "#e6ebe5" : "#188b01",
                        alignItems: "center",
                        justifyContent: "center",
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
            </View>
        </ScrollView>
    );
}
