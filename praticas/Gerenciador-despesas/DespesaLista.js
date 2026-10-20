import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <DespesaItem despesa={item} />}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.vazio}>
          <Text style={styles.titulo}>Nenhuma despesa encontrada</Text>
          <Text style={styles.texto}>
            Cadastre uma despesa ou escolha outra categoria.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  vazio: {
    padding: 22,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  titulo: {
    color: '#334155',
    fontWeight: 'bold',
  },
  texto: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
});
