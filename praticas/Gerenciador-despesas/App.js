import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';

import GerenciarDespesa from './GerenciarDespesa';
import TodasDespesas from './TodasDespesas';
import DespesasRecentes from './DespesasRecentes';

const CATEGORIAS = [
  'Todas',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
  'Outros',
];

const INICIAIS = [
  {
    id: '1',
    descricao: 'Supermercado',
    valor: 85.5,
    categoria: 'Alimentação',
    data: new Date().toISOString(),
  },
  {
    id: '2',
    descricao: 'Combustível',
    valor: 70,
    categoria: 'Transporte',
    data: new Date().toISOString(),
  },
  {
    id: '3',
    descricao: 'Cinema',
    valor: 35,
    categoria: 'Lazer',
    data: new Date().toISOString(),
  },
];

export default function App() {
  const [despesas, setDespesas] = useState(INICIAIS);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const [mostrarRecentes, setMostrarRecentes] = useState(false);

  const despesasFiltradas = useMemo(() => {
    let resultado = despesas;

    if (categoriaSelecionada !== 'Todas') {
      resultado = resultado.filter(
        (item) => item.categoria === categoriaSelecionada
      );
    }

    resultado = [...resultado].sort(
      (a, b) => new Date(b.data) - new Date(a.data)
    );

    return mostrarRecentes ? resultado.slice(0, 3) : resultado;
  }, [despesas, categoriaSelecionada, mostrarRecentes]);

  function salvarDespesa(dados) {
    setDespesas((atuais) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        ...dados,
      },
      ...atuais,
    ]);
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#172554" />

      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Meu Bolso</Text>
        <Text style={styles.subtitulo}>Gerenciador de despesas</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.boasVindas}>Olá! 👋</Text>
        <Text style={styles.descricao}>
          Organize seus gastos de maneira simples.
        </Text>

        <GerenciarDespesa onSalvar={salvarDespesa} />

        <Text style={styles.tituloSecao}>Filtrar por categoria</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtros}>
            {CATEGORIAS.map((categoria) => (
              <Pressable
                key={categoria}
                onPress={() => setCategoriaSelecionada(categoria)}
                style={[
                  styles.filtro,
                  categoriaSelecionada === categoria && styles.filtroAtivo,
                ]}
              >
                <Text
                  style={[
                    styles.textoFiltro,
                    categoriaSelecionada === categoria && styles.textoAtivo,
                  ]}
                >
                  {categoria}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View style={styles.linhaTitulo}>
          <Text style={styles.tituloSecao}>Minhas despesas</Text>

          <Pressable
            onPress={() => setMostrarRecentes(!mostrarRecentes)}
            style={styles.botaoRecentes}
          >
            <Text style={styles.textoRecentes}>
              {mostrarRecentes ? 'Ver todas' : 'Recentes'}
            </Text>
          </Pressable>
        </View>

        {mostrarRecentes ? (
          <DespesasRecentes despesas={despesasFiltradas} />
        ) : (
          <TodasDespesas despesas={despesasFiltradas} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  cabecalho: {
    backgroundColor: '#172554',
    padding: 22,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#BFDBFE',
    marginTop: 4,
  },
  conteudo: {
    padding: 18,
    paddingBottom: 35,
  },
  boasVindas: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#172554',
  },
  descricao: {
    color: '#64748B',
    marginTop: 5,
    marginBottom: 18,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#172554',
    marginTop: 14,
    marginBottom: 10,
  },
  filtros: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
  },
  filtro: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
  },
  filtroAtivo: {
    backgroundColor: '#2563EB',
  },
  textoFiltro: {
    color: '#334155',
    fontSize: 12,
  },
  textoAtivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  linhaTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botaoRecentes: {
    backgroundColor: '#DBEAFE',
    padding: 8,
    borderRadius: 8,
  },
  textoRecentes: {
    color: '#1D4ED8',
    fontWeight: '600',
  },
});