import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./GraficoIndicador.css"; // Importa o CSS específico

export default function GraficoIndicador({ 
  data, 
  dataKey, 
  cor, 
  titulo, 
  unidade,
  tendencia = "estavel" // 'positiva', 'negativa', 'estavel'
}) {
  
  // Função para formatar a data no tooltip
  const formatTooltipLabel = (label) => {
    try {
      const date = new Date(label);
      return `Hora: ${date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    } catch {
      return `Hora: ${label}`;
    }
  };

  // Função para formatar o valor no tooltip
  const formatTooltipValue = (value) => {
    return [`${Number(value).toLocaleString('pt-BR')} ${unidade}`, titulo];
  };

  // Ícone baseado na tendência
  const getTendenciaIcon = () => {
    switch (tendencia) {
      case 'positiva': return '↗';
      case 'negativa': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="grafico-card">
      {/* Indicador de tendência */}
      <div className={`tendencia-indicator tendencia-${tendencia}`}>
        <span>{getTendenciaIcon()}</span>
        <span>
          {tendencia === 'positiva' ? 'Subindo' : 
           tendencia === 'negativa' ? 'Descendo' : 'Estável'}
        </span>
      </div>

      <h3>{titulo}</h3>
      
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis 
            dataKey="createdAt" 
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => {
              try {
                const date = new Date(value);
                return date.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                });
              } catch {
                return value;
              }
            }}
          />
          <YAxis 
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => {
              if (value >= 1000) {
                return `${(value / 1000).toFixed(0)}k`;
              }
              return value;
            }}
          />
          <Tooltip
            formatter={formatTooltipValue}
            labelFormatter={formatTooltipLabel}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={cor}
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 2, fill: '#fff' }}
            activeDot={{ r: 5, strokeWidth: 2, fill: '#fff' }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}