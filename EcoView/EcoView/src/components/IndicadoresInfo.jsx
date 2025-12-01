import React from "react";
import "./IndicadoresInfo.css";
import disparaErvilhaImg from "../assets/icon_disparava.png"; 

function IndicadoresInfo() {
  return (
    <div className="indicadores-container">
      <h1 className="titulo">Indicadores Ambientais — EcoView</h1>

      <section className="intro">
        <p>
          O <strong>EcoView</strong> utiliza sensores ambientais integrados ao protótipo físico
          <strong> Dispara-Ervilha</strong> para monitorar e analisar o ambiente em tempo real.
          Cada indicador fornece dados essenciais para entender as condições ambientais e
          promover a sustentabilidade.
        </p>
      </section>

      <section className="indicadores-grid">
        <div className="indicador-card">
          <h2>🌡️ Temperatura</h2>
          <p>
            Mede o nível térmico do ambiente, fundamental para avaliar conforto térmico e
            possíveis variações que impactam plantas, pessoas e equipamentos. O sensor
            <strong> DHT11/DHT22</strong> realiza essa medição com precisão digital.
          </p>
        </div>

        <div className="indicador-card">
          <h2>💧 Umidade do Ar</h2>
          <p>
            Representa a quantidade de vapor de água presente no ar. Um fator essencial para
            compreender o equilíbrio climático e o bem-estar ambiental. Também obtida pelo
            sensor <strong>DHT11/DHT22</strong>.
          </p>
        </div>

        <div className="indicador-card">
          <h2>☀️ Luminosidade</h2>
          <p>
            A intensidade de luz é medida pelo sensor <strong>LDR</strong> (Light Dependent Resistor),
            permitindo identificar níveis de iluminação e orientar ajustes sustentáveis de energia.
          </p>
        </div>

        <div className="indicador-card">
          <h2>🌫️ Qualidade do Ar</h2>
          <p>
            Detecta gases poluentes e compostos nocivos através do sensor <strong>MQ-135</strong>.
            Essa métrica auxilia na identificação de ambientes com ar inadequado e possíveis
            fontes de contaminação.
          </p>
        </div>
      </section>

      <section className="protótipo">
        <h2>🔧 Parte Física — Dispara-Ervilha</h2>
        <div className="prototipo-content">
          <img src={disparaErvilhaImg} alt="Protótipo Dispara-Ervilha" />
          <div className="texto">
            <p>
              A <strong>Dispara-Ervilha</strong> é o protótipo físico que materializa o conceito do
              EcoView, unindo design sustentável e tecnologia embarcada. Impressa em 3D com
              material <strong>PLA</strong> (biodegradável), abriga sensores, microcontrolador e demais
              componentes responsáveis pela coleta e transmissão dos dados.
            </p>
            <p>
              O nome faz alusão à ideia de “propagar” a sustentabilidade, assim como uma ervilha
              que se espalha pela natureza. Seu design foi projetado para proteger os sensores e
              facilitar manutenção, equilibrando estética e funcionalidade.
            </p>
            <p>
              O microcontrolador <strong>Arduino</strong> (ou <strong>ESP32</strong>) se comunica com a
              <strong> API EcoView</strong> via Wi-Fi e protocolo HTTP, transmitindo dados em tempo real
              para a plataforma web. Esses dados são então processados e exibidos de forma
              acessível, educativa e visualmente informativa.
            </p>
            <p>
              A Dispara-Ervilha simboliza a ponte entre o mundo físico e o digital, mostrando como
              a tecnologia pode inspirar a consciência ecológica e a inovação sustentável.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default IndicadoresInfo;
