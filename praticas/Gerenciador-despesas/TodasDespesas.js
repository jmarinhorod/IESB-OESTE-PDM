import React from 'react';
import DespesaSaida from './DespesaSaida';

export default function TodasDespesas({ despesas }) {
  return (
    <DespesaSaida
      despesas={despesas}
      periodo="Todas as despesas"
    />
  );
}
