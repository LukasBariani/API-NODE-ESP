<div align="center">
    <img src="icon_disparava.png" alt="Icone do EcoView" height="200">
    <h1 align="center">EcoView: Plataforma de Indicadores Ambientais</h1>
    <p align="center">Monitoramento ambiental em tempo real com IoT, Node.js e Dashboard responsivo.</p>
</div>

<br/>

<div align="center">
    </div>

<hr>

<h2>Sobre o Projeto</h2>
<p>O <strong>EcoView</strong> é uma plataforma desenvolvida para atender à crescente necessidade de monitoramento ambiental contínuo e em tempo real[cite: 7]. O projeto busca suprir a ausência de ferramentas acessíveis e integradas que possibilitem a coleta, análise e visualização de indicadores ambientais em diversos setores[cite: 8, 26, 34].</p>
<p>O objetivo principal é construir um protótipo funcional capaz de exibir indicadores ambientais, realizar comparações por setor, gerar relatórios automatizados e auxiliar na definição de metas de sustentabilidade[cite: 9, 12, 28, 36, 64]. [cite_start]Sua relevância reside na contribuição para a governança ambiental baseada em dados e no apoio a processos de compliance ambiental[cite: 10, 41].</p>

<hr>

<h2>Funcionalidades</h2>
<ul>
   <li><strong>Monitoramento em Tempo Real:</strong> Coleta e visualização contínua de dados de sensores[cite: 9, 50].</li>
    <li><strong>Indicadores Coletados:</strong> Dados de temperatura, umidade, luminosidade, gás (qualidade do ar) e umidade do solo[cite: 11, 44, 50].</li>
    <li><strong>Comparação e Relatórios:</strong> Possibilidade de comparar dados entre diferentes setores e gerar relatórios automatizados[cite: 9, 12, 51].</li>
    <li><strong>Dashboard Responsivo:</strong> Interface moderna e de fácil compreensão para acompanhar os parâmetros ambientais[cite: 11, 46, 55].</li>
    <li><strong>API de Recebimento de Dados:</strong> Backend em Node.js para receber as leituras dos sensores via ESP32[cite: 11, 45].</li>
</ul>

<hr>

<h2>Tecnologias Utilizadas</h2>
[cite_start]<p>O desenvolvimento da plataforma utiliza uma arquitetura baseada em **Internet das Coisas (IoT)**[cite: 14]:</p>
<ul>
    <li><strong>Hardware:</strong> Simulação de sensores (DHT11, LDR, MQ-135, umidade do solo) no <strong>Tinkercad</strong>, conectados a um microcontrolador <strong>Arduino/ESP32</strong>[cite: 11, 32, 44].</li>
    <li><strong>Backend (API):</strong> <strong>Node.js</strong> com <strong>Typescript</strong> e o framework <strong>Express</strong>, utilizando <strong>Sequelize</strong> como ORM e <strong>MySQL</strong> para o banco de dados[cite: 11, 32, 45]. A API é responsável por receber as leituras dos sensores e armazená-las.</li>
    <li><strong>Frontend (Dashboard):</strong> Dashboard responsivo para visualização em tempo real[cite: 11, 32, 46].</li>
</ul>

<hr>

<h2>Metodologia de Desenvolvimento</h2>
[cite_start]<p>O projeto seguiu uma metodologia prática e estruturada[cite: 43]:</p>
<ol>
    [cite_start]<li><strong>Simulação e Coleta:</strong> Sensores simulados no Tinkercad são conectados a um ESP32/Arduino para coleta de dados contínua[cite: 11, 44].</li>
   <li><strong>Transmissão para API:</strong> Os dados são enviados para a API em Node.js[cite: 11, 45].</li>
   <li><strong>Armazenamento:</strong> Os dados são armazenados de forma organizada e segura em um banco de dados MySQL[cite: 11, 45].</li>
   <li><strong>Visualização:</strong> Criação de um dashboard responsivo para visualização dos indicadores, comparação de setores e geração de relatórios[cite: 11, 46].</li>
</ol>
<p>O protótipo físico, batizado de **Dispara-Ervilha**, foi impresso em 3D com PLA biodegradável e simboliza a união entre tecnologia e sustentabilidade, representando a ligação entre o mundo físico e digital do projeto[cite: 60, 61, 62].</p>

<hr>

<h2>Estrutura da API (ESP Monitoring API)</h2>
<p>A API em Node.js possui a seguinte estrutura e funcionalidades chave:</p>
<ul>
    <li><strong>Estrutura de Arquivos:</strong>
        <ul>
            <li><code>src/models</code>: Models Sequelize (User, Device, Reading).</li>
            <li><code>src/controllers</code>: Controladores da API.</li>
            <li><code>src/routes</code>: Rotas da API.</li>
        </ul>
    </li>
    <li><strong>Funcionalidades da API:</strong>
        <ul>
            <li>Cadastro de usuários e dispositivos (com <code>apiKey</code>).</li>
            <li>Recebimento de leituras de sensores (temperature, humidity, luminosity, gas).</li>
            <li>Endpoints para listar leituras, buscar por <code>deviceId</code>, última leitura e leituras filtradas por período.</li>
        </ul>
    </li>
    <li><strong>Integração com ESP32:</strong> O ESP32 coleta dados e envia um payload JSON contendo as leituras dos sensores (DHT11, LDR, MQ-135).</li>
</ul>

<hr>

<h2>Autores</h2>
<ul>
    <li>Vinícius Gonzaga Pereira</li>
   <li>Mariana de Oliveira Rigueiro </li>
   <li>Lukas Rodrigues Bariani </li>
    <li>Matheus Mendonça de Lima</li>
</ul>
<p>Desenvolvido na Etec da Zona Leste.</p>