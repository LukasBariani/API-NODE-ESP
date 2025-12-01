import React, { useEffect, useState } from "react";
import "./Indicators.css";

import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdLightbulbOutline, MdOutlineAir } from "react-icons/md";
import { API_HOST } from "../../constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import ecoGif from "../assets/icon_disparaervilha_ani2.gif"; 

const currentDeviceId = 1;

const convertMetricsToDB = {
  temperatura: "temperature",
  umidade: "humidity",
  luminosidade: "luminosity",
  qualidadeAr: "gas",
};

const units = {
  temperatura: "°C",
  umidade: "%",
  luminosidade: "lux",
  qualidadeAr: "ppm",
};

export default function Indicators() {
  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState({
    temperatura: null,
    umidade: null,
    luminosidade: null,
    qualidadeAr: null,
  });

  const [selectedMetric, setSelectedMetric] = useState("geral");
  const [hoverBarIndex, setHoverBarIndex] = useState(null);
  const [currentChartData, setCurrentChartData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // === Função de fetch ===
  const getApiData = async () => {
    try {
      const response = await fetch(`${API_HOST}/api/readings/device/${currentDeviceId}`);
      if (!response.ok) throw new Error("Erro na requisição: " + response.status);
      const data = await response.json();
      console.log("✅ Dados recebidos:", data);
      setApiData(Array.isArray(data) ? data : [data]); // ✅ Garante array
    } catch (error) {
      console.error("❌ Erro ao buscar API:", error);
    }
  };

  // Atualiza a cada 5 segundos
  useEffect(() => {
    getApiData();
    const interval = setInterval(getApiData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Atualiza cards
  useEffect(() => {
    if (apiData.length < 1) return;

    const last = apiData[apiData.length - 1];
    const prev = apiData[apiData.length - 2] || last; // ✅ Evita erro se só 1 dado

    setData({
      temperatura: { valor: last.temperature, variacao: last.temperature - prev.temperature },
      umidade: { valor: last.humidity, variacao: last.humidity - prev.humidity },
      luminosidade: { valor: last.luminosity, variacao: last.luminosity - prev.luminosity },
      qualidadeAr: { valor: last.gas, variacao: last.gas - prev.gas },
    });
  }, [apiData]);

  // Atualiza gráfico
  useEffect(() => {
    if (selectedMetric === "geral") {
      setCurrentChartData([]);
      return;
    }

    if (apiData.length === 0) return;

    const newChartData = apiData.map((item) => ({
      name: new Date(item.createdAt).toLocaleTimeString(),
      valor: item[convertMetricsToDB[selectedMetric]],
    }));

    setCurrentChartData(newChartData);
  }, [selectedMetric, apiData]);

  // Responsividade
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cards = [
    {
      id: "temperatura",
      titulo: "Temperatura",
      valor: `${data.temperatura?.valor ?? "--"} ${units.temperatura}`,
      variacao: `${data.temperatura?.variacao > 0 ? "+" : ""}${data.temperatura?.variacao ?? "--"}%`,
      icon: <FaTemperatureHigh size={28} />,
    },
    {
      id: "umidade",
      titulo: "Umidade",
      valor: `${data.umidade?.valor ?? "--"} ${units.umidade}`,
      variacao: `${data.umidade?.variacao > 0 ? "+" : ""}${data.umidade?.variacao ?? "--"}%`,
      icon: <WiHumidity size={30} />,
    },
    {
      id: "luminosidade",
      titulo: "Luminosidade",
      valor: `${data.luminosidade?.valor ?? "--"} ${units.luminosidade}`,
      variacao: `${data.luminosidade?.variacao > 0 ? "+" : ""}${data.luminosidade?.variacao ?? "--"}%`,
      icon: <MdLightbulbOutline size={28} />,
    },
    {
      id: "qualidadeAr",
      titulo: "Qualidade do Ar",
      valor: `${data.qualidadeAr?.valor ?? "--"} ${units.qualidadeAr}`,
      variacao: `${data.qualidadeAr?.variacao > 0 ? "+" : ""}${data.qualidadeAr?.variacao ?? "--"}%`,
      icon: <MdOutlineAir size={28} />,
    },
  ];

  const dataGeral = [
    { name: "Temp.", valor: data.temperatura?.valor ?? 0 },
    { name: "Umid.", valor: data.umidade?.valor ?? 0 },
    { name: "Lumi.", valor: data.luminosidade?.valor ?? 0 },
    { name: "Qual. Ar", valor: data.qualidadeAr?.valor ?? 0 },
  ];

  const chartData = selectedMetric === "geral" ? dataGeral : currentChartData;
  const chartTitle =
    selectedMetric === "geral"
      ? "Comparativo Geral de Indicadores"
      : `Histórico — ${cards.find((c) => c.id === selectedMetric)?.titulo ?? "Métrica"}`;

  return (
    <div className="indicators-wrap">
      <div className="indicators-inner">
        {/* bloco animado */}
        <div className="status-block">
          <div className="status-icon">
            <img src={ecoGif} alt="Carregando dados" /> {/* ✅ Corrigido */}
          </div>
          <div className="status-text">Exibindo Dados do Ambiente</div>
        </div>

        <div className="cards-row">
          {cards.map((card) => {
            const isActive = selectedMetric === card.id;
            return (
              <button
                key={card.id}
                className={`metric-card ${isActive ? "active" : ""}`}
                onClick={() => setSelectedMetric(isActive ? "geral" : card.id)}
              >
                <div className="card-top">
                  <div className="card-icon">{card.icon}</div>
                  <div className="card-title">{card.titulo}</div>
                </div>
                <div className="card-body">
                  <div className="card-value">{card.valor}</div>
                  <div
                    className={`card-variation ${
                      card.variacao.includes("-") ? "neg" : "pos"
                    }`}
                  >
                    {card.variacao}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">{chartTitle}</div>
            <div className="chart-sub">
              {selectedMetric === "geral"
                ? "Mostrando valores atuais de todos os indicadores"
                : "Mostrando evolução temporal (atualização a cada 5s)"}
            </div>
          </div>

          <div className="chart-area">
            <ResponsiveContainer width="100%" height={360}>
              <BarChart
                data={chartData}
                margin={
                  isMobile
                    ? { top: 10, right: 0, left: -20, bottom: 18 }
                    : { top: 10, right: 18, left: 12, bottom: 18 }
                }
              >
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity={1} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.9} />
                  </linearGradient>
                  <linearGradient id="barGradHover" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="6 6" stroke="#e6f0ec" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#0f5132", fontSize: 11 }}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 50 : 30}
                />
                <YAxis tick={{ fill: "#0f5132", fontSize: 11 }} tickCount={isMobile ? 4 : 5} />
                <Tooltip
                  contentStyle={{ background: "#fff", borderRadius: 8 }}
                  formatter={(value) => [`${value} ${units[selectedMetric] || ""}`, "Valor"]}
                />

                <Bar
                  dataKey="valor"
                  radius={[8, 8, 4, 4]}
                  onMouseOver={(_, i) => setHoverBarIndex(i)}
                  onMouseOut={() => setHoverBarIndex(null)}
                  isAnimationActive={false}
                >
                  {chartData.map((_, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={
                        hoverBarIndex === i
                          ? "url(#barGradHover)"
                          : "url(#barGrad)"
                      }
                      cursor="pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

