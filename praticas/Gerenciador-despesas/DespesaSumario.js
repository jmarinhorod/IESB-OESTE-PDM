import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce(
    (acumulador, item) => acumulador + item.valor,
    0
  );

  return (
    <View style={styles.card}>
      <Text style={styles.rotulo}>TOTAL GASTO</Text>
      <Text style={styles.periodo}>{periodo}</Text>

      <Text
        style={[
          styles.total,
          somaDespesas > 200 && styles.totalAlto,
        ]}
      >
        {`R$ ${somaDespesas.toFixed(2).replace('.', ',')}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#172554',
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
  },
  rotulo: {
    color: '#BFDBFE',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  periodo: {
    color: '#FFFFFF',
    marginTop: 5,
  },
  total: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 12,
  },
  totalAlto: {
    color: '#F87171',
  },
});
