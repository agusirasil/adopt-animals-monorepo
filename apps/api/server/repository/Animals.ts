import IAnimal, { AnimalGender, AnimalType } from './IAnimal';

export const getNextId = () => {
  var animalWithHighestId = animalsRepository.sort((a, b) => b.id - a.id)[0];
  if (animalWithHighestId === undefined) {
    return 1; // List is empty, so use 1 as first animal id.
  } else {
    return animalWithHighestId.id + 1; // List is not empty, increase one to the highest id for the next animal.
  }
}

const animalsRepository: Array<IAnimal> = [
  {
    id: 1,
    name: 'Morena',
    type: AnimalType.Dog,
    gender: AnimalGender.Female,
    birthdate: new Date('2020-06-14'),
    breed: 'Mestizo',
    zone: 'Aguada',
    eyesColor: 'Marron',
    peltColor: 'Negro',
    description: 'Fue encontrada por la calle arenal grande esquina martin garcia, busque al posible dueño y no lo encontre al parecer era callejera, y bueno no puedo hacerme cargo por mucho tiempo mas, ya tengo otra mascota',
    contact: {
      name: 'Jorge Gonzales',
      email: 'jorge.gonzales@gmail.com',
      phone: '099 999 999'
    }
  },
  {
    id: 2,
    name: 'Morro',
    type: AnimalType.Dog,
    gender: AnimalGender.Male,
    birthdate: new Date('2024-08-12'),
    breed: 'Mestizo',
    zone: 'Palermo',
    eyesColor: 'Marron',
    peltColor: 'Negro',
    description: 'El perrito negro más lindo que podes encontrar',
    contact: {
      name: 'Pepe Rodriguez',
      email: 'pepe.rodriquez@gmail.com',
      phone: '098 888 888'
    }
  }
];

export default animalsRepository;