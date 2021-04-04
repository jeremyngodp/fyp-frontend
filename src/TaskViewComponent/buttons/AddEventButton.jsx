import React from 'react';
import {Grid, Button, Dialog} from '@material-ui/core';
import StudentAddTaskForm from '../../Calendar/StudentComponent/AddTaskStudent';
import StaffAddTaskForm from '../../Calendar/StaffComponent/AddTaskStaff';

export default class AddEventButton extends React.Component {
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
        console.log(type);
        const { open } = this.state;
        
        return (
            <div style={{ margin: '10px 0 10px 0', textAlign: 'center' }}>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Add Event
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                {type ==="Student" ?
                <StudentAddTaskForm calendarStore={calendarStore} handleClose={ () => this.handleClose()} /> 
                :
                <StaffAddTaskForm calendarStore={calendarStore} handleClose={ () => this.handleClose()} />
                }
                </Dialog>
             </div>
        )
    }
}