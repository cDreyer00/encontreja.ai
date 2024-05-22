import { ObjectId, Collection } from "mongodb";

export type PetType = 'gato' | 'cachorro'
export type PetGender = 'indefinido' | 'macho' | 'fêmea';
export type PetAge = 'indefinido' | 'jovem' | 'adulto' | 'idoso';
export type PetBreed = 'indefinido' | 'jovem' | 'adulto' | 'idoso';

export default class Pet {
   constructor(
      public type?: string,
      public gender?: string,
      public location?: string,
      public age?: string[],
      public breeds?: string[],
      public colors?: string[],
      public imgUrl?: string,
      public size?: string[],
      public observations?: string,
      public createdAt?: Date,
      public _id?: ObjectId,

      public healthCondition?: string,
      public locationFound?: string,
      public infoOrigin?: string,
   ) { }
}

export function fixPet(target: any) {
   const date = new Date();

   const pet = new Pet()

   pet.createdAt = date;
   pet.type = target.type;
   pet.breeds = validateArr(target.breeds);
   pet.colors = validateArr(target.colors);
   pet.age = validateArr(target.age, 'indefinido');
   pet.size = validateArr(target.size, 'indefinido');
   pet.imgUrl = target.imgUrl;

   pet.healthCondition = target.healthCondition;
   pet.locationFound = target.locationFound;
   pet.infoOrigin = target.infoOrigin;

   return pet;
}

export function validateArr(arr: any, defaultValueIfEmpty: string | undefined = undefined) {
   // if is array, return it
   if (Array.isArray(arr))
      return arr;

   // if is string, return it as array of single element
   if (typeof arr === 'string')
      return [arr]

   if (defaultValueIfEmpty === undefined)
      return [];

   return [defaultValueIfEmpty];
}