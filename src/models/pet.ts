import { ObjectId, Collection } from "mongodb";

export type PetType = 'gato' | 'cachorro'
export type PetGender = 'indefinido' | 'macho' | 'fêmea';
export type PetAge = 'indefinido' | 'jovem' | 'adulto' | 'idoso';
export type PetBreed = 'indefinido' | 'jovem' | 'adulto' | 'idoso';

export default class Pet {
   constructor(
      public type: string,
      public gender: string,
      public location: string,
      public age: string[],
      public breeds: string[],
      public colors: string[],
      public imgUrl: string,
      public size?: string,
      public observations?: string,
      public _id?: ObjectId,
   ) { }
}