import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 12, color: '#1d4ed8', fontWeight: '600', marginTop: 4 }}>
            PikeTaR
          </Text>
          <Text style={styles.titulo}>Minhas tarefas</Text>
          <Text style={styles.subtitulo}>Organize o dia por horario e prioridade.</Text>
        </View>

        <Pressable style={styles.botaoAdd} onPress={() => router.push('/src/layout')}>
          <Text style={styles.botaoAddIcone}>+</Text>
          <Text style={styles.botaoAddTexto}>Add tarefa</Text>
        </Pressable>
      </View>

      <View style={styles.resumo}>
        <Text style={styles.resumoNumero}>{tarefas.length}</Text>
        <View>
          <Text style={styles.resumoTitulo}>tarefas cadastradas</Text>
          <Text style={{ fontSize: 12, color: '#1d4ed8', fontWeight: '600', marginTop: 4 }}>
            Acompanhe pelo grau de importancia
          </Text>
        </View>
      </View>

      <View style={styles.lista}>
        {tarefas.map((tarefa) => (
          <View key={tarefa.id} style={styles.card}>
            <View style={[styles.faixa, { backgroundColor: tarefa.cor }]} />

            <View style={styles.conteudoCard}>
              <Text style={styles.descricao}>{tarefa.descricao}</Text>
              <Text style={{ fontSize: 12, color: '#1d4ed8', fontWeight: '600', marginTop: 4 }}>
                {tarefa.hora}
              </Text>
            </View>

            <View style={[styles.selo, { backgroundColor: tarefa.fundo }]}>
              <View style={[styles.indicador, { backgroundColor: tarefa.cor }]} />
              <Text style={styles.importancia}>{tarefa.importancia}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    padding: 24,
    paddingTop: 64,
    flexGrow: 1,
  },
  header: {
    alignItems: 'stretch',
    gap: 16,
    marginBottom: 18,
  },
  titulo: {
    color: '#0f172a',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 6,
  },
  subtitulo: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 6,
  },
  botaoAdd: {
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
  },
  botaoAddIcone: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
  },
  botaoAddTexto: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  resumo: {
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 18,
    padding: 16,
  },
  resumoNumero: {
    color: '#1d4ed8',
    fontSize: 34,
    fontWeight: '800',
  },
  resumoTitulo: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '700',
  },
  lista: {
    gap: 12,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    minHeight: 82,
    overflow: 'hidden',
    paddingRight: 14,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  faixa: {
    alignSelf: 'stretch',
    width: 6,
  },
  indicador: {
    borderRadius: 999,
    height: 8,
    width: 8,
  },
  conteudoCard: {
    flex: 1,
    gap: 4,
  },
  descricao: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },
  selo: {
    alignItems: 'center',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  importancia: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
