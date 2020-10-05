import React from 'react';
import {Grid, Button, Dialog} from '@material-ui/core';
import AddTaskForm from '../../Calendar/AddTask'

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
        const { calendarStore, type, calendarRef } = this.props;
        const { open } = this.state;
        // var start = new Date();
        // start.setHours(0, 0, 0, 0);
        // var end = new Date();
        // end.setHours(0, 0, 0, 0);
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
                {/* Need to determine if student or staff then route to eventform or staffeventform */}
                
                {/* <EventForm calendarStore={calendarStore} start={start} end={end} onSubmit={(event) => this.handleFormSubmit(event)} handleClose={() => this.handleClose()} /> */}
                
                {/* <StaffEventForm calendarStore={calendarStore} start={start} end={end} onSubmit={(event) => this.handleFormSubmit(event)} handleClose={() => this.handleClose()} /> */}
                <AddTaskForm calendarStore={calendarStore} handleClose={ () => this.handleClose()} calendarRef={calendarRef}/>
                
                </Dialog>
             </div>
        )
    }
}