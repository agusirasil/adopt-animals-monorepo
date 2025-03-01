import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class AnimalListItem extends React.Component {
  editAnimal = () => {
    this.props.goToEdit(this.props.animal);
  }

  deleteAnimal = () => {
    this.props.deleteAnimal(this.props.animal.id);
  }

  render() {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {this.props.animal.name}
        </TableCell>
        <TableCell>{this.props.animal.type}</TableCell>
        <TableCell>{this.props.animal.breed}</TableCell>
        <TableCell>{this.props.animal.gender}</TableCell>
        <TableCell>{this.props.animal.zone}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="Edit" onClick={this.editAnimal}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Delete" onClick={this.deleteAnimal}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

export default AnimalListItem;
