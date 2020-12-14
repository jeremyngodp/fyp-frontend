import React from 'react';
import {Grid, Button, Dialog} from '@material-ui/core';
import AddProjectForm from '../../Calendar/AddProject';

class AddProjectButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }
    
    handleClickOpen = () => {
        this.setState({
             open: true
        })
    };
    
    handleClose = () => {
        this.setState({
            open: false
        })
    };
    
    
    render() {
        const { calendarStore, type } = this.props;
        const { open } = this.state;
        
        return (
            <div style={{ margin: '10px 0 10px 0', textAlign: 'center' }}>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Add Project
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    
                    <AddProjectForm handleClose={() =>this.handleClose()} calendarStore={calendarStore}/>
                    
                </Dialog>
             </div>
        )
    }
}

export default AddProjectButton;