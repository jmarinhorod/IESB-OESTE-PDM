import React from 'react';
import DespesaSaida from './DespesaSaida';

export default function DespesasRecentes({ despesas }) {
  return (
    <DespesaSaida
      despesas={despesas}
      periodo="Despesas recentes"
    />
  );
}
