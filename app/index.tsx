import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const tarefas = [
  {
    id: '1',
    descricao: 'Revisar tarefas do dia',
    hora: '08:30',
    importancia: 'OK',
    cor: '#22c55e',
    fundo: '#dcfce7',
  },
  {
    id: '2',
    descricao: 'Responder mensagens pendentes',
    hora: '10:00',
    importancia: 'Atencao',
    cor: '#facc15',
    fundo: '#fef9c3',
  },
  {
    id: '3',
    descricao: 'Finalizar entrega principal',
    hora: '14:00',
    importancia: 'Critico',
    cor: '#ef4444',
    fundo: '#fee2e2',
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#f8fafc',
        padding: 24,
        paddingTop: 64,
        flexGrow: 1,
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
            shadowColor: '#1d4ed8',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.18,
            shadowRadius: 16,
            elevation: 3,
          }}
          onPress={() => router.push('/src/layout')}
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


      <View style={{ gap: 12 }}>
        {tarefas.map((tarefa) => (
          <Swipeable key={tarefa.id}>
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
                shadowColor: '#0f172a',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 2,
              }}
            >
              <View
                style={{
                  alignSelf: 'stretch',
                  backgroundColor: tarefa.cor,
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
                  {tarefa.descricao}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#1d4ed8',
                    fontWeight: '600',
                    marginTop: 4,
                  }}
                >
                  {/* {tarefa.hora} */}
                </Text>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: tarefa.fundo,
                  borderRadius: 999,
                  flexDirection: 'row',
                  gap: 6,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                }}
              >
                <View
                  style={{
                    backgroundColor: tarefa.cor,
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
                  {tarefa.importancia}
                </Text>
              </View>
            </View>
          </Swipeable>
        ))}
      </View>
    </ScrollView>
  );
}
