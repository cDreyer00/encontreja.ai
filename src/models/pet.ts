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

export function MountPet({ type,
   gender,
   location,
   age,
   breeds,
   colors,
   imgUrl,
   size,
   observations,
   createdAt }: Pet
) {
   return fixPet({ type, breeds, colors, age, location, gender, imgUrl, size, observations, createdAt });
}

export function fixPet(target: any) {
   const date = new Date();

   const pet = new Pet()

   pet.createdAt = date;
   pet.type = target.type;
   pet.breeds = validateArr(target.breeds, undefined, true);
   pet.colors = validateArr(target.colors, undefined, true);
   pet.age = validateArr(target.age, 'incerto');
   pet.size = validateArr(target.size, 'incerto');
   pet.imgUrl = target.imgUrl;
   pet.observations = target.observations;
   pet.location = target.location;
   pet.gender = validateStr(target.gender, 'incerto')

   pet.healthCondition = target.healthCondition;
   pet.locationFound = target.locationFound;
   pet.infoOrigin = target.infoOrigin;

   return pet;
}

export function validateArr(arr: any, defaultValueIfEmpty: string | undefined = undefined, splitString: boolean = false) {
   // if is array, return it
   if (Array.isArray(arr)) {
      if (arr.length === 0 && defaultValueIfEmpty !== undefined)
         return [defaultValueIfEmpty];

      // split by comma and remove empty strings and dots
      if (splitString) {
         let newArr = arr
            .map((el: string) => el.split(','))
            .flat()
            .map((el: string) => {
               let e = el.trim();
               e = e.replace('.', '');
               return e;
            })
            .filter((el: string) => el !== '');

         return newArr;
      }

      return arr;
   }

   // if is string, return it as array of single element
   if (typeof arr === 'string') {
      // split by comma and remove empty strings and dots
      if (splitString) {
         return arr
            .split(',')
            .map((el: string) => el.trim())
            .filter((el: string) => el !== '' && el !== '.');

      }

      return [arr];
   }

   if (defaultValueIfEmpty === undefined)
      return [];

   return [defaultValueIfEmpty];
}

function validateStr(target: string, defaultValue: string | undefined = undefined) {
   if (typeof target !== 'string')
      return defaultValue;

   let newStr = target.trim();
   if (newStr === '')
      return defaultValue;

   return newStr;
}