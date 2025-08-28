export interface UserModel {
  id: string | number    // ID único do usuário
  name: string               // Nome do usuário
  email: string              // Email único para login
  passwordHash: string       // Senha já criptografada (bcrypt)
  createdAt: Date            // Data de criação
  updatedAt: Date   
}