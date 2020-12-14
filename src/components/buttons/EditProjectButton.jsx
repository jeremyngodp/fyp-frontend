import React from 'react';
import {Dialog, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EditProjectForm from '../../Calendar/EditProject';

class EditProjectButton extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false
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
        const { calendarStore, project_id } = this.props;
        const { open } = this.state;
        
        return (
            <div style={{ margin: '10px 0 10px 0', textAlign: 'center' }}>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Edit
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    
                    <EditProjectForm handleClose={() =>this.handleClose()} calendarStore={calendarStore} project_id={project_id}/>
                    
                </Dialog>
             </div>
        )
    }
}

export default EditProjectButton
