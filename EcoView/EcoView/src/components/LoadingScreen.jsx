import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";
import videoEco from "../assets/animação_logo2.mp4";

const LoadingScreen = ({ isActive }) => {
  const [shouldRender, setShouldRender] = useState(isActive);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
      setIsFadingOut(false);
    } else {
      // Inicia a animação de saída
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 1800); // tempo de fade-out total
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!shouldRender) return null;

  return (
    <div
      className={`loading-overlay ${isFadingOut ? "fade-out" : "fade-in"}`}
    >
      <div className="loading-box">
        <video
          src={videoEco}
          autoPlay
          muted
          loop
          playsInline
          className="loading-video"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="loading-text">Carregando...</div>
        <div className="eco-glow" />
      </div>
    </div>
  );
};

export default LoadingScreen;
