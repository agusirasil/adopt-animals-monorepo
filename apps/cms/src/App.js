import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AnimalList from './AnimalList';
import Header from './Header';
import Breadcrumb from './Breadcrumb'
import AnimalForm from './AnimalForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: 'list',
      animalToEdit: null,
      animals: [
        {
          id: 1,
          name: "Roco",
          type: "dog",
          gender: "male",
          breed: "Labrador",
          birthdate: "2019-07-06",
          zone: "Buceo",
          peltColor: "Gris",
          eyesColor: "Negro",
          description: "Divertido, mimoso y bueno.",
          contact: {
            name: "Andres Amor",
            email: "andy.7love@gmail.com",
            phone: "099999999"
          }
        }
      ]
    }
  }

  addAnimal = (newAnimal) => {
    this.setState({
      animals: [...this.state.animals, {
        id: newAnimal.name,
        ...newAnimal
      }]
    });
  }

  editAnimal = (id, newAnimalData) => {
    this.setState({
      animals: this.state.animals.map(item => item.id === id ? newAnimalData : item)
    })
  }

  deleteAnimal = (id) => {
    this.setState({
      animals: this.state.animals.filter(item => item.id !== id)
    });
  }

  goToNewAnimal = () => {
    this.setState({
      section: 'newAnimal'
    });
  }

  goToEdit = (animal) => {
    this.setState({
      section: 'editAnimal',
      animalToEdit: animal
    });
  }

  goToList = () => {
    this.setState({
      section: 'list'
    });
  }

  currentSection() {
    switch (this.state.section) {
      case 'newAnimal':
        return (
          <AnimalForm
            goToList={this.goToList}
            addAnimal={this.addAnimal}
          />
        );
      case 'editAnimal':
        return (
          <AnimalForm
            goToList={this.goToList}
            editAnimal={this.editAnimal}
            animal={this.state.animalToEdit}
          />
        );
      case 'list':
      default:
        return (
          <AnimalList
            animals={this.state.animals}
            goToEdit={this.goToEdit}
            deleteAnimal={this.deleteAnimal}
          />
        );
    }
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Header />

        <main>
          <Container maxWidth="lg">
            <Breadcrumb
              goToList={this.goToList}
              goToNewAnimal={this.goToNewAnimal}
              section={this.state.section}
              animal={this.state.animalToEdit}
            />

            {this.currentSection()}
          </Container>
        </main>
      </div>
    );
  }
}

export default App;
