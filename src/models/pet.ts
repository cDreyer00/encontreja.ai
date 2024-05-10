import { ObjectId, Collection } from "mongodb";

export type PetType   = 'gato'       | 'cachorro'
export type PetGender = 'indefinido' | 'macho'  | 'fêmea';
export type PetAge    = 'jovem'      | 'adulto' | 'idoso';

export default class Pet {
   constructor(
      public type:         PetType,
      public gender:       PetGender,
      public age:          PetAge[],
      public breed:        string[],
      public observations: string,
      public imgUrl:       string,
      public _id?:         ObjectId,
   ) {}
}