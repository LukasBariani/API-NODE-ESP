export interface DeviceModel {
  id: string | number 
  name: string
  apiKey: string           // chave secreta para o ESP enviar dados
  userId: string | number  // FK para o User dono do ESP
  createdAt: Date
  updatedAt: Date
}