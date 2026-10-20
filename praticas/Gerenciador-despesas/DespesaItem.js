import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function getDataFormatada(data) {
  return new Date(data).toLocaleDateString('pt-BR');
}

export default function DespesaItem({ despesa }) {
  return (
    <View style={styles.item}>
      <View style={styles.informacoes}>
        <Text style={styles.descricao}>{despesa.descricao}</Text>

        <Text style={styles.data}>
          {getDataFormatada(despesa.data)}
        </Text>

        <View style={styles.tag}>
          <Text style={styles.categoria}>{despesa.categoria}</Text>
        </View>
      </View>

      <Text style={styles.valor}>
        {despesa.valor.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  informacoes: {
    flex: 1,
    paddingRight: 8,
  },
  descricao: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  data: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#E2E8F0',
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 7,
  },
  categoria: {
    color: '#334155',
    fontSize: 11,
    fontWeight: '600',
  },
  valor: {
    color: '#0F766E',
    fontWeight: 'bold',
  },
});
