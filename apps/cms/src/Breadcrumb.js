import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        flexWrap: 'wrap',
        marginTop: '20px',
        display: 'flex',
        height: '70px'
    },
    fab: {
        flex: '0 0 56px'
    },
    breadCrumb: {
        flex: 1,
        alignSelf: 'center'
    }
});

class Breadcrumb extends React.Component {
    additionalSection() {
        switch (this.props.section) {
            case 'newAnimal':
                return <Typography color="textPrimary">Create new animal</Typography>;
            case 'editAnimal':
                return <Typography color="textPrimary">{this.props.animal.name}</Typography>;
            case 'list':
            default:
                return null;
        }
    }

    addNewAnimalButton() {
        if (this.props.section !== 'newAnimal') {
            return (
                <Fab color="primary" aria-label="Add" className={this.props.classes.fab} onClick={this.props.goToNewAnimal}>
                    <AddIcon />
                </Fab>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Breadcrumbs aria-label="Breadcrumb" className={this.props.classes.breadCrumb}>
                    <Link color="inherit" href="#/" onClick={this.props.goToList}>
                        Animals
                    </Link>
                    {this.additionalSection()}
                </Breadcrumbs>
                {this.addNewAnimalButton()}
            </div>
        );
    }
}

export default withStyles(styles)(Breadcrumb);
