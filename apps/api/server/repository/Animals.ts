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
    birthdate: new Date('2018-06-14'),
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
  }
];

export default animalsRepository;