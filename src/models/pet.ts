import { ObjectId } from "mongodb";

export default class Pet {
   constructor(
      public type:         PetType,
      public gender:       PetGender,
      public age:          PetAge[],
      public breed:        string[],
      public observations: string,
      public id?:          ObjectId,
   ) {}
}

export type PetType   = 'cat'       | 'dog'
export type PetGender = 'undefined' | 'male'  | 'female';
export type PetAge    = 'young'     | 'adult' | 'senior';