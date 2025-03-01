import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2, 0),
    width: '100%'
  },
  textField: {
    marginRight: theme.spacing(4),
    width: 300,
  },
  textArea: {
  },
  dense: {
    marginTop: 19,
  },
  button: {
    margin: theme.spacing(1),
  },
  menu: {
    width: 200,
  }
});

class AnimalForm extends React.Component {
  constructor(props) {
    super(props);
    this.genders = ['male', 'female'];
    this.types = ['dog', 'cat'];

    if (this.props.animal) {
      // It is an Animal EDIT.
      // The form starts with the values of the animal to edit.
      this.state = {
        name: this.props.animal.name,
        type: this.props.animal.type,
        gender: this.props.animal.gender,
        breed: this.props.animal.breed,
        birthdate: this.props.animal.birthdate,
        zone: this.props.animal.zone,
        peltColor: this.props.animal.peltColor,
        eyesColor: this.props.animal.eyesColor,
        description: this.props.animal.description,
        contact: {
          name: this.props.animal.contact.name,
          email: this.props.animal.contact.email,
          phone: this.props.animal.contact.phone
        }
      };
    } else {
      // It is a NEW Animal.
      // The form starts with empty values.
      this.state = {
        name: "",
        type: "dog",
        gender: "male",
        breed: "",
        birthdate: "",
        zone: "",
        peltColor: "",
        eyesColor: "",
        description: "",
        contact: {
          name: "",
          email: "",
          phone: ""
        }
      };
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleContactChange = name => event => {
    this.setState({
      contact: {
        ...this.state.contact,
        [name]: event.target.value
      }
    });
  };

  handleSubmit = () => {
    if (this.props.animal) {
      // It is an Animal EDIT.
      // Use editAnimal method.
      this.props.editAnimal(this.props.animal.id, {
        id: this.props.animal.id,
        name: this.state.name,
        type: this.state.type,
        gender: this.state.gender,
        breed: this.state.breed,
        birthdate: this.state.birthdate,
        zone: this.state.zone,
        peltColor: this.state.peltColor,
        eyesColor: this.state.eyesColor,
        description: this.state.description,
        contact: {
          name: this.state.contact.name,
          email: this.state.contact.email,
          phone: this.state.contact.phone
        }
      });
    } else {
      // It is a NEW Animal.
      // Use addAnimal method.
      this.props.addAnimal({
        name: this.state.name,
        type: this.state.type,
        gender: this.state.gender,
        breed: this.state.breed,
        birthdate: this.state.birthdate,
        zone: this.state.zone,
        peltColor: this.state.peltColor,
        eyesColor: this.state.eyesColor,
        description: this.state.description,
        contact: {
          name: this.state.contact.name,
          email: this.state.contact.email,
          phone: this.state.contact.phone
        }
      });
    }

    this.props.goToList();
  }

  render() {
    return (
      <form className={this.props.classes.container} noValidate autoComplete="off">
        <Paper className={this.props.classes.paper}>
          <Typography variant="h5">
            Animal information
          </Typography>
          <TextField
            id="name"
            label="Name"
            className={this.props.classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />

          <TextField
            id="type"
            select
            label="Type"
            className={this.props.classes.textField}
            value={this.state.type}
            onChange={this.handleChange('type')}
            SelectProps={{
              MenuProps: {
                className: this.props.classes.menu,
              },
            }}
            helperText="Please select animal type"
            margin="normal"
          >
            {this.types.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="gender"
            select
            label="Gender"
            className={this.props.classes.textField}
            value={this.state.gender}
            onChange={this.handleChange('gender')}
            SelectProps={{
              MenuProps: {
                className: this.props.classes.menu,
              },
            }}
            helperText="Please select animal gender"
            margin="normal"
          >
            {this.genders.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="breed"
            label="Breed"
            className={this.props.classes.textField}
            value={this.state.breed}
            onChange={this.handleChange('breed')}
            margin="normal"
          />

          <TextField
            id="birthdate"
            label="Birthdate"
            className={this.props.classes.textField}
            value={this.state.birthdate}
            onChange={this.handleChange('birthdate')}
            margin="normal"
            placeholder="YYYY-MM-DD"
            helperText="Format: YYYY-MM-DD - Example: 2018-07-06"
          />

          <TextField
            id="zone"
            label="Zone"
            className={this.props.classes.textField}
            value={this.state.zone}
            onChange={this.handleChange('zone')}
            margin="normal"
          />

          <TextField
            id="peltColor"
            label="Pelt color"
            className={this.props.classes.textField}
            value={this.state.peltColor}
            onChange={this.handleChange('peltColor')}
            margin="normal"
          />

          <TextField
            id="eyesColor"
            label="Eyes color"
            className={this.props.classes.textField}
            value={this.state.eyesColor}
            onChange={this.handleChange('eyesColor')}
            margin="normal"
          />

          <TextField
            id="description"
            label="Description"
            className={this.props.classes.textArea}
            placeholder="Very cute, funny and playful"
            helperText="Please add an animal description, appereance, behaviour, mood..."
            fullWidth
            margin="normal"
            value={this.state.description}
            onChange={this.handleChange('description')}
          />
        </Paper>
        <Paper className={this.props.classes.paper}>
          <Typography variant="h5">
            Contact information
          </Typography>

          <TextField
            id="contactName"
            label="Name"
            className={this.props.classes.textField}
            value={this.state.contact.name}
            onChange={this.handleContactChange('name')}
            margin="normal"
          />

          <TextField
            id="contactEmail"
            label="Email"
            className={this.props.classes.textField}
            value={this.state.contact.email}
            onChange={this.handleContactChange('email')}
            margin="normal"
          />

          <TextField
            id="contactPhone"
            label="Phone"
            className={this.props.classes.textField}
            value={this.state.contact.phone}
            onChange={this.handleContactChange('phone')}
            margin="normal"
          />

        </Paper>

        <div>
          <Button variant="contained" className={this.props.classes.button} onClick={this.props.goToList}>
            Cancel
        </Button>
          <Button variant="contained" color="primary" className={this.props.classes.button} onClick={this.handleSubmit}>
            {this.props.animal ? 'Save' : 'Create'}
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(AnimalForm);
