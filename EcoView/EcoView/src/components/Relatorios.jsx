import React, { useEffect, useState, useRef } from "react";
import "./Relatorios.css";
import {
    FaTemperatureHigh,
    FaFileDownload,
    FaFire,
    FaSnowflake,
    FaThermometerHalf,
    FaTint,
    FaTintSlash,
    FaCheckCircle,
    FaLightbulb,
    FaMoon,
    FaSun,
    FaExclamationTriangle,
    FaSkullCrossbones,
    FaLeaf,
    FaArrowUp,
    FaArrowDown,
    FaMinus,
    FaWind
} from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdLightbulbOutline, MdOutlineAir } from "react-icons/md";
import GraficoIndicador from "./GraficoIndicador";
// Os imports abaixo são necessários para o PDF
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { API_HOST } from "../../constants";


// Estes imports do Recharts não são usados diretamente aqui, mas você os manteve no original
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const currentDeviceId = 1;

export default function Relatorios() {
    // Referência para o conteúdo que será exportado para PDF
    const reportRef = useRef(null); 

    const [apiData, setApiData] = useState([]);
    const [status, setStatus] = useState({});
    const [stats, setStats] = useState({});
    const [alerts, setAlerts] = useState([]);

    // Função para buscar os dados
    const getApiData = async () => {
        try {
            // Ajuste na URL para garantir a barra "/" antes de "api" se não estiver no API_HOST
            const url = `${API_HOST.endsWith('/') ? API_HOST : API_HOST + '/'}api/readings/device/${currentDeviceId}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erro na requisição: " + response.status);
            const data = await response.json();
            setApiData(data);
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    // Buscar dados na montagem e a cada 5 segundos
    useEffect(() => {
        getApiData();
        const interval = setInterval(getApiData, 5000);
        return () => clearInterval(interval);
    }, []);

    // Análises automáticas, tendências e estatísticas (Máx, Mín, Média)
    useEffect(() => {
        if (apiData.length < 2) return;

        const ultimo = apiData[apiData.length - 1];
        const penultimo = apiData[apiData.length - 2];

        // --- Análises (Status) ---
        const analises = {
            temperatura:
                ultimo.temperature > 30
                    ? { text: "Está muito quente", icon: <FaFire className="icon-danger" /> }
                    : ultimo.temperature < 15
                    ? { text: "Ambiente frio", icon: <FaSnowflake className="icon-info" /> }
                    : { text: "Temperatura agradável", icon: <FaThermometerHalf className="icon-success" /> },

            umidade:
                ultimo.humidity < 40
                    ? { text: "O ar está seco", icon: <FaTintSlash className="icon-warning" /> }
                    : ultimo.humidity > 70
                    ? { text: "Alta umidade", icon: <FaTint className="icon-info" /> }
                    : { text: "Umidade normal", icon: <FaCheckCircle className="icon-success" /> },

            luminosidade:
                ultimo.luminosity < 100
                    ? { text: "Ambiente escuro", icon: <FaMoon className="icon-info" /> }
                    : ultimo.luminosity > 700
                    ? { text: "Ambiente claro", icon: <FaSun className="icon-warning" /> }
                    : { text: "Luminosidade moderada", icon: <FaLightbulb className="icon-success" /> },

            qualidadeAr:
                ultimo.gas > 1000
                    ? { text: "Qualidade do ar ruim", icon: <FaSkullCrossbones className="icon-danger" /> }
                    : ultimo.gas > 600
                    ? { text: "Qualidade do ar regular", icon: <FaExclamationTriangle className="icon-warning" /> }
                    : { text: "Qualidade do ar boa", icon: <FaLeaf className="icon-success" /> },
        };

        // --- Tendência ---
        const tendencia = {
            tempTrend:
                ultimo.temperature > penultimo.temperature
                    ? { text: "Subindo", icon: <FaArrowUp className="trend-up" /> }
                    : ultimo.temperature < penultimo.temperature
                    ? { text: "Caindo", icon: <FaArrowDown className="trend-down" /> }
                    : { text: "Estável", icon: <FaMinus className="trend-stable" /> },

            humTrend:
                ultimo.humidity > penultimo.humidity
                    ? { text: "Aumentando", icon: <FaArrowUp className="trend-up" /> }
                    : ultimo.humidity < penultimo.humidity
                    ? { text: "Diminuindo", icon: <FaArrowDown className="trend-down" /> }
                    : { text: "Estável", icon: <FaMinus className="trend-stable" /> },

            lumTrend:
                ultimo.luminosity > penultimo.luminosity
                    ? { text: "Mais claro", icon: <FaArrowUp className="trend-up" /> }
                    : ultimo.luminosity < penultimo.luminosity
                    ? { text: "Mais escuro", icon: <FaArrowDown className="trend-down" /> }
                    : { text: "Estável", icon: <FaMinus className="trend-stable" /> },

            gasTrend:
                ultimo.gas > penultimo.gas
                    ? { text: "Qualidade piorando", icon: <FaArrowUp className="trend-danger" /> }
                    : ultimo.gas < penultimo.gas
                    ? { text: "Qualidade melhorando", icon: <FaArrowDown className="trend-success" /> }
                    : { text: "Estável", icon: <FaMinus className="trend-stable" /> },
        };

        // --- Estatísticas (Máx, Mín, Média) ---
        const valores = {
            tempMax: Math.max(...apiData.map((d) => d.temperature)),
            tempMin: Math.min(...apiData.map((d) => d.temperature)),
            tempAvg: apiData.reduce((a, b) => a + b.temperature, 0) / apiData.length,

            humMax: Math.max(...apiData.map((d) => d.humidity)),
            humMin: Math.min(...apiData.map((d) => d.humidity)),
            humAvg: apiData.reduce((a, b) => a + b.humidity, 0) / apiData.length,

            lumMax: Math.max(...apiData.map((d) => d.luminosity)),
            lumMin: Math.min(...apiData.map((d) => d.luminosity)),
            lumAvg: apiData.reduce((a, b) => a + b.luminosity, 0) / apiData.length,

            gasMax: Math.max(...apiData.map((d) => d.gas)),
            gasMin: Math.min(...apiData.map((d) => d.gas)),
            gasAvg: apiData.reduce((a, b) => a + b.gas, 0) / apiData.length,
        };

        setStatus({ ...analises, ...tendencia });
        setStats(valores);

        // --- Alertas em tempo real ---
        const novosAlertas = [];
        if (ultimo.temperature > 35)
            novosAlertas.push("🚨 Temperatura crítica detectada!");
        if (ultimo.humidity < 20)
            novosAlertas.push("⚠️ Umidade extremamente baixa!");
        if (ultimo.gas > 1200)
            novosAlertas.push("🔴 Qualidade do ar perigosa!");

        setAlerts(novosAlertas);
    }, [apiData]);

    // Função para Exportar para PDF
    const handleExportPdf = async () => {
        if (!reportRef.current) return;

        const options = {
            scale: 2, 
            useCORS: true, 
        };

        const canvas = await html2canvas(reportRef.current, options);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210; 
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10; 

        // Adiciona o cabeçalho com Data e Hora
        const now = new Date();
        const dateTime = now.toLocaleDateString("pt-BR") + " " + now.toLocaleTimeString("pt-BR");
        
        pdf.setFontSize(10);
        pdf.setTextColor(150); 
        pdf.text("Relatório Gerado em: " + dateTime, 10, 5); // Cabeçalho (x, y)

        // Adiciona a imagem do Canvas
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Lidar com múltiplas páginas
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight + 10;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`Relatorio_Ambiental_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}.pdf`);
    };

    return (
        <div className="relatorios-wrap">
            
            {/* O conteúdo dentro desta div será capturado para o PDF */}
            <div ref={reportRef}> 
                <h1>Relatórios Ambientais</h1>
                <p>Análise completa dos dados coletados em tempo real</p>

                {/* Alertas */}
                {alerts.length > 0 && (
                    <div className="alert-box">
                        {alerts.map((a, i) => (
                            <p key={i}>{a}</p>
                        ))}
                    </div>
                )}

                {/* Cards com textos inteligentes */}
                <div className="relatorio-cards">
                    <div className="rel-card">
                        <FaTemperatureHigh />
                        <h3>Temperatura</h3>
                        <div className="status-line">
                            {status.temperatura?.icon}
                            <p>{status.temperatura?.text}</p>
                        </div>
                        <div className="trend-line">
                            {status.tempTrend?.icon}
                            <small>{status.tempTrend?.text}</small>
                        </div>
                        <p className="stats">Média: {stats.tempAvg?.toFixed(1)}°C</p>
                    </div>

                    <div className="rel-card">
                        <WiHumidity size={32} />
                        <h3>Umidade</h3>
                        <div className="status-line">
                            {status.umidade?.icon}
                            <p>{status.umidade?.text}</p>
                        </div>
                        <div className="trend-line">
                            {status.humTrend?.icon}
                            <small>{status.humTrend?.text}</small>
                        </div>
                        <p className="stats">Média: {stats.humAvg?.toFixed(1)}%</p>
                    </div>

                    <div className="rel-card">
                        <MdLightbulbOutline />
                        <h3>Luminosidade</h3>
                        <div className="status-line">
                            {status.luminosidade?.icon}
                            <p>{status.luminosidade?.text}</p>
                        </div>
                        <div className="trend-line">
                            {status.lumTrend?.icon}
                            <small>{status.lumTrend?.text}</small>
                        </div>
                        <p className="stats">Média: {stats.lumAvg?.toFixed(1)} lx</p>
                    </div>

                    <div className="rel-card">
                        <MdOutlineAir />
                        <h3>Qualidade do Ar</h3>
                        <div className="status-line">
                            {status.qualidadeAr?.icon}
                            <p>{status.qualidadeAr?.text}</p>
                        </div>
                        <div className="trend-line">
                            {status.gasTrend?.icon}
                            <small>{status.gasTrend?.text}</small>
                        </div>
                        <p className="stats">Média: {stats.gasAvg?.toFixed(1)} ppm</p>
                    </div>
                </div>

                <h1>Histórico dos Indicadores</h1>
                <div className="graficos-grid">
                    {/* O componente GraficoIndicador deve ser renderizado corretamente para ser capturado no PDF */}
                    <GraficoIndicador data={apiData} dataKey="temperature" cor="#ef4444" titulo="Temperatura" unidade="°C" />
                    <GraficoIndicador data={apiData} dataKey="humidity" cor="#3b82f6" titulo="Umidade" unidade="%" />
                    <GraficoIndicador data={apiData} dataKey="luminosity" cor="#facc15" titulo="Luminosidade" unidade="lx" />
                    <GraficoIndicador data={apiData} dataKey="gas" cor="#10b981" titulo="Qualidade do Ar" unidade="ppm" />
                </div>
            </div> {/* Fim do conteúdo para o PDF */}

            {/* Botão de Exportar */}
            <button className="export-btn" onClick={handleExportPdf}>
                <FaFileDownload /> Exportar Relatório Completo
            </button>
        </div>
    );
}