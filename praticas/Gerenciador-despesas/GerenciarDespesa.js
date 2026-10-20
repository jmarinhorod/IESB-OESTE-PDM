import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
  'Outros',
];

export default function GerenciarDespesa({ onSalvar }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);

  function tratarValor(texto) {
    const normalizado = texto.replace(',', '.');

    if (/^\d*\.?\d{0,2}$/.test(normalizado)) {
      setValor(texto);
    }
  }

  function salvarDespesa() {
    const valorNumerico = Number(valor.replace(',', '.'));

    if (!descricao.trim() || !valor.trim() || !categoria) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha a descrição, o valor e a categoria.'
      );
      return;
    }

    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Valor inválido', 'Digite um valor maior que zero.');
      return;
    }

    onSalvar({
      descricao: descricao.trim(),
      valor: valorNumerico,
      categoria,
      data: data.toISOString(),
    });

    setDescricao('');
    setValor('');
    setCategoria('');
    setData(new Date());
  }

  function alterarData(event, dataSelecionada) {
    if (Platform.OS === 'android') {
      setMostrarData(false);
    }

    if (dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Cadastrar despesa</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Conta de energia"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="0,00"
        value={valor}
        onChangeText={tratarValor}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategoria(item)}
            style={[
              styles.botaoCategoria,
              categoria === item && styles.categoriaAtiva,
            ]}
          >
            <Text
              style={[
                styles.textoCategoria,
                categoria === item && styles.textoCategoriaAtivo,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Data da despesa</Text>
      <Pressable
        style={styles.botaoData}
        onPress={() => setMostrarData(true)}
      >
        <Text>{data.toLocaleDateString('pt-BR')}</Text>
        <Text>📅</Text>
      </Pressable>

      {mostrarData && (
        <DateTimePicker
          value={data}
          mode="date"
          maximumDate={new Date()}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={alterarData}
        />
      )}

      <Pressable style={styles.botaoSalvar} onPress={salvarDespesa}>
        <Text style={styles.textoSalvar}>Adicionar despesa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 12,
  },
  label: {
    color: '#334155',
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  botaoCategoria: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
  },
  categoriaAtiva: {
    backgroundColor: '#2563EB',
  },
  textoCategoria: {
    color: '#334155',
    fontSize: 12,
  },
  textoCategoriaAtivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  botaoData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 12,
    borderRadius: 10,
  },
  botaoSalvar: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  textoSalvar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
