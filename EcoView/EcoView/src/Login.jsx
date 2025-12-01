import { useState } from "react";
import "./Login.css";
import logo from "./assets/logo_ecoview.png";
import { useNavigate } from "react-router-dom";
import { API_HOST } from "../constants";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    telefone: ""
  });

  const navigate = useNavigate();
  async function bunda(){
      fetch("http://localhost:3333/api/user/isAuthed", {
        method : "get",
        headers : {
          "Authorization" : "Bearer " + localStorage.getItem("access-token") || ""
        },
        credentials : "include"
      }).then(response =>{
        if(response.status == 200){
          navigate("/")
        }
        return response.json();
      }).then(data => {
        if(data["access-token"]) localStorage.setItem("access-token", data["access-token"])
        
      })
  }
  bunda();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_HOST+"/api/users/login", { method: "post",
       headers: {
        "Content-Type" : "application/json"
       },
       body : JSON.stringify({
        email : formData["email"],
        password : formData["senha"]
       }),
       credentials: "include"
      }).then(response => {
        if (response.status == 400){
          alert("faltou dados")
        }
        if (response.status == 401){
          alert("dados errados");
        }else if (response.status == 201){
          alert("login realizado")
        }
        return response.json();
      }).then( data => {
        fetch(API_HOST+"/api/user/getname", {credentials: "include"}).then(response =>{
          if(response.status == 401){
            alert("não logado pai")
          }else{
            alert("logado pai")
          }
          return response.json();
        }).then( res =>{
          if(res["access-token"]){
            
            localStorage.setItem("access-token", res["access-token"])
          }
          alert("bundonaaaa")
          alert(Object.values(res))
        }).catch(reason => {
          alert(reason)
        })
      }

      ).catch(error => {
        alert("bunda")
      })
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        {/* Lado esquerdo */}
        <div className="login-form">
          <div className="login-header">
            <img src={logo} alt="EcoView Logo" className="login-logo" />
            <h2>EcoView</h2>
            <p>Plataforma de Indicadores Ambientais</p>
          </div>

          <form onSubmit={handleSubmit}>
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
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>


            <div className="extras">
              <label>
                <input type="checkbox" /> Salvar senha
              </label>
              <a href="#">Esqueceu a Senha?</a>
            </div>

            <button type="submit" className="btn-login">
              Entrar
            </button>
          </form>
        </div>

        {/* Lado direito */}
        <div className="login-info">
          <h2>Descubra o poder dos dados ambientais</h2>
          <p>
            Na Plataforma de Indicadores Ambientais, você terá tudo o que
            precisa para monitorar, comparar e agir com base em informações em
            tempo real.
          </p>
          <button className="btn-create" onClick={() => navigate("/criarconta")}>
              Criar Conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
