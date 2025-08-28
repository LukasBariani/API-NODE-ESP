import requests
import random
import time

# URL da sua API (quando rodar local: http://localhost:3333/api/readings)
API_URL = "http://localhost:3333/api/readings"

# API key do device (tem que existir no seu repositório de devices)
API_KEY = "def456"  # exemplo, ajuste conforme seu deviceRepo

def generate_data():
    """Gera dados aleatórios de temperatura e umidade"""
    return {
        "temperature": round(random.uniform(20.0, 35.0), 2),
        "humidity": round(random.uniform(30.0, 90.0), 2)
    }

def send_data():
    headers = {"x-api-key": API_KEY}
    while True:
        data = generate_data()
        try:
            response = requests.post(API_URL, json=data, headers=headers)
            if response.status_code == 201:
                print("✅ Enviado:", data)
            else:
                print("⚠️ Erro:", response.status_code, response.text)
        except Exception as e:
            print("❌ Falha de conexão:", e)
        
        time.sleep(5)  # espera 5s antes de enviar novamente


if __name__ == "__main__":
    print("📡 Simulador ESP iniciado...")
    send_data()
