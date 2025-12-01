import { useState } from "react";
import "./CriarConta.css";
import logo from "./assets/logo_ecoview.png";
import { API_HOST } from "../constants";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function CriarConta() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_HOST+"/api/users/", {
      method: "post",
      headers: {
        "Content-Type" : "application/json" 
      },
      body: JSON.stringify({
        name: formData["nome"],
        email: formData["email"],
        password: formData["senha"],
        phoneNumber: formData["telefone"]
      })
    }).then(response => {
      if (response.status == 500){
        alert("ja existe")
      }else{
        navigate("/login");
      }
    })
  };

  return (
    <div className="criar-wrapper">
      <div className="criar-box">
        <div className="criar-header">
          <img src={logo} alt="EcoView Logo" className="criar-logo" />
          <h2>Criar Conta</h2>
          <p>Preencha os dados para começar a usar a plataforma</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Crie uma senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Telefone</label>
            <input
              type="tel"
              name="telefone"
              placeholder="+55 (99) 99999-9999"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit"
           className="btn-create-account">
            Criar Conta
          
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default CriarConta;
