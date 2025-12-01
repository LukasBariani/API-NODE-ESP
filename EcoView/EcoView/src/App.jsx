import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// 🔹 Importação dos componentes principais
import Navbar from "./components/Navbar";
import Indicators from "./components/Indicators";
import Login from "./Login";
import CriarConta from "./CriarConta";
import Relatorios from "./components/Relatorios";
import LoadingScreen from "./components/LoadingScreen";
import IndicadoresInfo from "./components/IndicadoresInfo"; // ✅ Import adicionado

import "./App.css";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [closeMenuTrigger, setCloseMenuTrigger] = useState(false);

  // ✅ Mostra tela de loading inicial (ao abrir o site)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Mostra animação de loading toda vez que trocar de página
  useEffect(() => {
    setLoading(true);
    setCloseMenuTrigger(true); // fecha o menu lateral ao trocar rota

    const minTime = 1500; // tempo mínimo de exibição da animação
    let done = false;

    const finishLoading = () => {
      if (!done) {
        done = true;
        setLoading(false);
        setCloseMenuTrigger(false);
      }
    };

    // Se o carregamento for lento, espera até terminar
    const timeout = setTimeout(finishLoading, minTime);

    // Usa requestIdleCallback (se disponível) para detectar quando a página está pronta
    if (window.requestIdleCallback) {
      window.requestIdleCallback(finishLoading);
    } else {
      window.addEventListener("load", finishLoading);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("load", finishLoading);
    };
  }, [location]);

  return (
    <>
      {/* Tela de carregamento animada */}
      <LoadingScreen isActive={loading} />

      {/* Navbar com controle de fechamento automático */}
      <Navbar closeMenuTrigger={closeMenuTrigger} />

      {/* Rotas do aplicativo */}
      <Routes>
        <Route path="/" element={<Indicators />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criarconta" element={<CriarConta />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/indicadores-info" element={<IndicadoresInfo />} /> {/* ✅ Nova tela */}
      </Routes>
    </>
  );
}

export default App;
