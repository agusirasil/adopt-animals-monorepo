export enum AnimalType {
    Dog = 'dog',
    Cat = 'cat',
    Hamster = 'hamster',
    Pig = 'pig'
}

export enum AnimalGender {
    Male = 'male',
    Female = 'female'
}

export interface IAnimalContact {
    name: string;
    phone: string;
    email: string;
}

export interface IAnimal {
    id: number;
    name?: string;
    type: AnimalType;
    gender: AnimalGender;
    breed: string;
    birthdate: Date;
    zone: string;
    peltColor: string;
    eyesColor: string;
    description: string;
    contact: IAnimalContact;
}

export default IAnimal;
