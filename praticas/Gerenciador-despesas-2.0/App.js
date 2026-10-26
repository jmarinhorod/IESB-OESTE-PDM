import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

export default function App() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('Alimentação');
  const [filtro, setFiltro] = useState('Todas');
  const [despesas, setDespesas] = useState([
    {
      id: '1',
      descricao: 'Compra no mercado',
      valor: 85.50,
      categoria: 'Alimentação',
      data: '26/10/2026',
    },
    {
      id: '2',
      descricao: 'Combustível',
      valor: 120,
      categoria: 'Transporte',
      data: '26/10/2026',
    },
  ]);

  const total = despesas.reduce((soma, item) => soma + item.valor, 0);

  const despesasFiltradas = despesas.filter(
    item => filtro === 'Todas' || item.categoria === filtro
  );

  function adicionarDespesa() {
    const descricaoLimpa = descricao.trim();
    const valorNumerico = Number(valor.replace(',', '.'));

    if (!descricaoLimpa || !valor.trim() || !Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      if (Platform.OS === 'web') {
        window.alert('Informe uma descrição e um valor maior que zero.');
      } else {
        Alert.alert('Atenção', 'Informe uma descrição e um valor maior que zero.');
      }
      return;
    }

    const novaDespesa = {
      id: Date.now().toString(),
      descricao: descricaoLimpa,
      valor: valorNumerico,
      categoria,
      data: new Date().toLocaleDateString('pt-BR'),
    };

    setDespesas(lista => [novaDespesa, ...lista]);
    setDescricao('');
    setValor('');
  }

  function formatarMoeda(numero) {
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function confirmarExclusao(id) {
    const excluir = () => {
      setDespesas(lista => lista.filter(item => item.id !== id));
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Deseja excluir esta despesa?')) excluir();
    } else {
      Alert.alert('Excluir despesa', 'Deseja excluir esta despesa?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: excluir },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Despesas</Text>
      <Text style={styles.subtitulo}>Controle seus gastos com facilidade</Text>

      <View style={styles.resumo}>
        <Text style={styles.resumoLegenda}>Total de despesas</Text>
        <Text style={styles.total}>{formatarMoeda(total)}</Text>
        <Text style={styles.resumoRodape}>
          {despesas.length} lançamento(s) registrado(s)
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.tituloCard}>Adicionar despesa</Text>

        <TextInput
          style={styles.input}
          placeholder="Descrição da despesa"
          value={descricao}
          onChangeText={setDescricao}
          maxLength={80}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor (ex.: 35,90)"
          value={valor}
          onChangeText={setValor}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categorias}>
          {['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Outros'].map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.botaoCategoria,
                categoria === item && styles.categoriaSelecionada,
              ]}
              onPress={() => setCategoria(item)}
            >
              <Text
                style={[
                  styles.textoCategoria,
                  categoria === item && styles.textoCategoriaSelecionada,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarDespesa}>
          <Text style={styles.textoBotao}>+ Adicionar despesa</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.tituloLista}>Lançamentos</Text>

      <View style={styles.filtros}>
        {['Todas', 'Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Outros'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.filtro, filtro === item && styles.filtroAtivo]}
            onPress={() => setFiltro(item)}
          >
            <Text style={[styles.textoFiltro, filtro === item && styles.textoFiltroAtivo]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        style={styles.lista}
        data={despesasFiltradas}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma despesa encontrada.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemDescricao}>{item.descricao}</Text>
              <Text style={styles.itemDetalhe}>
                {item.categoria} • {item.data}
              </Text>
            </View>

            <View style={styles.itemDireita}>
              <Text style={styles.itemValor}>{formatarMoeda(item.valor)}</Text>
              <TouchableOpacity onPress={() => confirmarExclusao(item.id)}>
                <Text style={styles.excluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
    padding: 20,
    paddingTop: 35,
    width: '100%',
    maxWidth: 850,
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172554',
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 5,
    marginBottom: 20,
  },
  resumo: {
    backgroundColor: '#1D4ED8',
    padding: 22,
    borderRadius: 16,
    marginBottom: 20,
  },
  resumoLegenda: {
    color: '#DBEAFE',
    fontSize: 15,
  },
  total: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  resumoRodape: {
    color: '#DBEAFE',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tituloCard: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 9,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
  },
  label: {
    color: '#334155',
    fontWeight: '600',
    marginBottom: 8,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  botaoCategoria: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  categoriaSelecionada: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
  },
  textoCategoria: {
    color: '#475569',
    fontSize: 13,
  },
  textoCategoriaSelecionada: {
    color: '#1D4ED8',
    fontWeight: 'bold',
  },
  botaoAdicionar: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 18,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tituloLista: {
    color: '#172554',
    fontWeight: 'bold',
    fontSize: 21,
    marginBottom: 12,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  filtro: {
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
  },
  filtroAtivo: {
    backgroundColor: '#1D4ED8',
  },
  textoFiltro: {
    fontSize: 12,
    color: '#334155',
  },
  textoFiltroAtivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  lista: {
    flex: 1,
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemDescricao: {
    color: '#1E293B',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemDetalhe: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 5,
  },
  itemDireita: {
    alignItems: 'flex-end',
  },
  itemValor: {
    color: '#15803D',
    fontWeight: 'bold',
    fontSize: 15,
  },
  excluir: {
    color: '#DC2626',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  vazio: {
    color: '#64748B',
    textAlign: 'center',
    padding: 25,
  },
});