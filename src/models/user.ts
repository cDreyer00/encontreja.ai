import { ObjectId } from "mongodb";

// nome completo * (obrigatório)
// telefone * (obrigatório se não houver email)
// email * (obrigatório se não houver telefone)
// _
// endereço (opcional):
// cep
// rua
// número
// complemento
// bairro
// cidade
// estado

export default interface User {
   _id: ObjectId;
   name: string;
   phone?: string;
   email?: string;
   address?: {
      cep?: string;
      street?: string;
      number?: string;
      complement?: string;
      neighborhood?: string;
      city?: string;
      state?: string;
   }
}

export function mountUser(user: any): User {
   return {
      _id: new ObjectId(),
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: {
         cep: user.address.cep,
         street: user.address.street,
         number: user.address.number,
         complement: user.address.complement,
         neighborhood: user.address.neighborhood,
         city: user.address.city,
         state: user.address.state
      }
   }
}