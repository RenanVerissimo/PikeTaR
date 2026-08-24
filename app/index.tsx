import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useState, useCallback } from 'react';
import { buscarTarefas, deleteTarefa } from '../src/services/api';
import { Tarefa } from '../src/types/tipagem';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
  const router = useRouter();
  const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState("");

  const handleDelete = async (id?: number) => {
    if (!id) {
      return;
    }

    const tarefasAntesDeExcluir = listaTarefas;

    setListaTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id)
    );

    try {
      await deleteTarefa(id);
    } catch (erro) {
      console.error("Erro ao excluir tarefa:", erro);
      setListaTarefas(tarefasAntesDeExcluir);
      setErroCarregamento("Nao foi possivel excluir a tarefa.");
    }
  };

  async function carregarTarefas() {
    try {
      setCarregando(true);
      setErroCarregamento("");

      const tarefas = await buscarTarefas();
      setListaTarefas(tarefas);
    } catch (erro) {
      console.error("Erro ao carregar tarefas:", erro);
      setErroCarregamento("Nao foi possivel carregar as tarefas.");
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [])
  );

  function getCoresPrioridade(prioridade: string) {
    const prioridadeNormalizada = prioridade
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (prioridadeNormalizada === "alta") {
      return {
        cor: "#ef4444",
        fundo: "#fee2e2",
      };
    }

    if (prioridadeNormalizada === "media") {
      return {
        cor: "#eab308",
        fundo: "#fef9c3",
      };
    }

    return {
      cor: "#006eff",
      fundo: "#c9e1f1",
    };
  }

  function formatarData(data: string) {
    if (!data) {
      return "";
    }

    const dataLimpa = data.replace("T", " ").replace(".000Z", "").slice(0, 16);

    const [parteData, parteHora] = dataLimpa.split(" ");
    const [ano, mes, dia] = parteData.split("-");

    return `${dia}/${mes}/${ano} ${parteHora}`;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#f8fafc',
        padding: 24,
        paddingTop: 42,
        flexGrow: 1,
        paddingBottom: 70,
      }}
    >
      <View
        style={{
          alignItems: 'stretch',
          gap: 16,
          marginBottom: 18,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 12,
              color: '#1d4ed8',
              fontWeight: '600',
              marginTop: 4,
            }}
          >
            PikeTaR
          </Text>
          <Text
            style={{
              color: '#0f172a',
              fontSize: 30,
              fontWeight: '800',
              marginTop: 6,
            }}
          >
            Minhas tarefas
          </Text>
          <Text
            style={{
              color: '#64748b',
              fontSize: 14,
              marginTop: 6,
            }}
          >
            Organize o dia por horário e prioridade.
          </Text>
        </View>

        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: '#1d4ed8',
            borderRadius: 8,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            paddingHorizontal: 18,
            paddingVertical: 14,
            boxShadow: '0 8px 16px rgba(29, 78, 216, 0.18)',
            elevation: 3,
          }}
          onPress={() => router.push('/addTarefa')}
        >
          <Text
            style={{
              color: '#ffffff',
              fontSize: 22,
              fontWeight: '700',
              lineHeight: 24,
            }}
          >
            +
          </Text>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 15,
              fontWeight: '700',
            }}
          >
            Add tarefa
          </Text>
        </Pressable>
      </View>


      <View style={{ gap: 12, top: 20 }}>
        {carregando ? (
          <Text
            style={{
              color: '#64748b',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            Carregando tarefas...
          </Text>
        ) : null}

        {erroCarregamento ? (
          <Text
            style={{
              color: '#dc2626',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            {erroCarregamento}
          </Text>
        ) : null}

        {!carregando && !erroCarregamento && listaTarefas.length === 0 ? (
          <Text
            style={{
              color: '#64748b',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            Nenhuma tarefa cadastrada.
          </Text>
        ) : null}

        {listaTarefas.map((tarefa, index) => (
          <Swipeable
            key={tarefa.id ? `tarefa-${tarefa.id}` : `tarefa-${index}`}
            overshootLeft={false}
            leftThreshold={40}
            onSwipeableLeftOpen={() => handleDelete(tarefa.id)}
            renderLeftActions={() => (
              <View
                style={{
                  backgroundColor: '#ff0000',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity onPress={() => handleDelete(tarefa.id)}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontWeight: '700',
                    }}
                  >
                    Excluindo...
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: 8,
                borderWidth: 1,
                flexDirection: 'row',
                gap: 14,
                minHeight: 65,
                overflow: 'hidden',
                paddingRight: 14,
                boxShadow: '0 6px 12px rgba(15, 23, 42, 0.06)',
                elevation: 2,
              }}
            >
              <View
                style={{
                  alignSelf: 'stretch',
                  backgroundColor: getCoresPrioridade(tarefa.prioridade).cor,
                  width: 6,
                }}
              />

              <View style={{ flex: 1, gap: 4 }}>
                <Text
                  style={{
                    color: '#0f172a',
                    fontSize: 16,
                    fontWeight: '500',
                  }}
                >
                  {tarefa.descricaoTarefa}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#1d4ed8',
                    fontWeight: '600',
                    marginTop: 4,
                  }}
                >
                  {formatarData(tarefa.dataAgendamento)}
                </Text>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: getCoresPrioridade(tarefa.prioridade).fundo,
                  borderRadius: 999,
                  flexDirection: 'row',
                  gap: 6,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                }}
              >
                <View
                  style={{
                    backgroundColor: getCoresPrioridade(tarefa.prioridade).cor,
                    borderRadius: 999,
                    height: 8,
                    width: 8,
                  }}
                />
                <Text
                  style={{
                    color: '#0f172a',
                    fontSize: 12,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                  }}
                >
                  {tarefa.prioridade}
                </Text>
              </View>
            </View>
          </Swipeable>
        ))}
      </View>
    </ScrollView >
  );
}

