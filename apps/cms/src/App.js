import React from "react";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AnimalList from "./AnimalList";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import AnimalForm from "./AnimalForm";
import { LinearProgress, CircularProgress } from "@material-ui/core";
import Api from "./ApiHandler";

const styles = theme => ({
  loadingCircle: {
    display: 'flex',
    justifyContent: 'center',
    padding: '48px'
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "list",
      isLoading: true,
      initialFetchComplete: false,
      animalToEdit: null,
      animals: []
    };
  }

  componentDidMount() {
    this.syncAnimalList();
  }

  syncAnimalList = () => {
    Api.getAnimalList().then((animals) => {
      this.setState({
        isLoading: false,
        initialFetchComplete: true,
        animals
      });
    });
  }

  addAnimal = (newAnimal) => {
    this.setState({
      isLoading: true,
      animals: [
        ...this.state.animals,
        {
          id: newAnimal.name,
          ...newAnimal,
        },
      ],
    });

    Api.createAnimal(newAnimal).then(() => {
      this.syncAnimalList();
    });
  };

  editAnimal = (id, newAnimalData) => {
    this.setState({
      isLoading: true,
      animals: this.state.animals.map((item) =>
        item.id === id ? newAnimalData : item
      ),
    });

    Api.updateAnimal(id, newAnimalData).then(() => {
      this.syncAnimalList();
    });
  };

  deleteAnimal = (id) => {
    this.setState({
      isLoading: true,
      animals: this.state.animals.filter((item) => item.id !== id),
    });

    Api.deleteAnimal(id).then(() => {
      this.syncAnimalList();
    });
  };

  goToNewAnimal = () => {
    this.setState({
      section: "newAnimal"
    });
  };

  goToEdit = (animal) => {
    this.setState({
      section: "editAnimal",
      animalToEdit: animal,
    });
  };

  goToList = () => {
    this.setState({
      section: "list",
    });
  };

  currentSection() {
    switch (this.state.section) {
      case "newAnimal":
        return (
          <AnimalForm goToList={this.goToList} addAnimal={this.addAnimal} />
        );
      case "editAnimal":
        return (
          <AnimalForm
            goToList={this.goToList}
            editAnimal={this.editAnimal}
            animal={this.state.animalToEdit}
          />
        );
      case "list":
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
          {this.state.isLoading && <LinearProgress />}
          {!this.state.initialFetchComplete && <Container className={this.props.classes.loadingCircle} maxWidth="sm"><CircularProgress size="3rem" /></Container>}
          {this.state.initialFetchComplete && (
            <Container maxWidth="lg">
              <Breadcrumb
                goToList={this.goToList}
                goToNewAnimal={this.goToNewAnimal}
                section={this.state.section}
                animal={this.state.animalToEdit}
              />

              {this.state.initialFetchComplete && this.currentSection()}
            </Container>
          )}
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);