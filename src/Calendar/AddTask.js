import React, {useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {format} from 'date-fns';
import EventIcon from '@material-ui/icons/Event';
import SubjectIcon from '@material-ui/icons/Subject';
import ClassIcon from '@material-ui/icons/Class';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { DialogTitle, DialogContent, makeStyles, Grid, Typography, Select, MenuItem, DialogActions, Button, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: 'auto'
    },
    formControl: {
        minWidth: 120,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        padding: '5px 5px',
    }
}));


function AddTaskForm ({handleClose, calendarStore, calendarRef}){
    
    let start = new Date()
    // let dateStr = format(start, 'yyyy-MM-dd')
    const classes = useStyles()
    const [state, setState] = useState({
        category: 'report',
        selectedDueDate: start,
        project_id: 0,
    })

    const handleDueDateChange = (e) => {
        setState({
            ...state,
            selectedDueDate: e,
        })
    }

    const handleCategoryChange = (e) => { //handles category change
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        const { selectedDueDate, project_id, category } = state;
        
        let fSelectedDueDate = format(selectedDueDate, 'yyyy-MM-dd')
        console.log(fSelectedDueDate)
        if (selectedDueDate.getDay() === 6 || selectedDueDate.getDay() === 0) {
            return alert("Weekends are not allowed to be added. Please choose another date instead.")
        }

        if (selectedDueDate < start) {
            return alert("It is past the Due Date. Please choose another date instead.")
        }
        // var project_id = calendarStore.getUserData.project_id
        // var student_id = calendarStore.getUserData.id

        // let calendarAPI = calendarRef.current.getAPI();
        
        // calendarAPI.addEvent({
        //     title: category,
        //     start: fSelectedDueDate,
        //     end: fSelectedDueDate,
        //     // project_id: project_id,
        // })
        calendarStore.addData({
            title: category,
            start: fSelectedDueDate,
            end: fSelectedDueDate,
            // project_id: project_id,
        });

        // axios post calling here
        

        alert('New Event Added');

        handleClose();

    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <div>
                <DialogTitle>Add an event</DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit} method="POST">
                        <Grid container className={classes.root} spacing={1}>
                            <Grid item xs={1}><ClassIcon fontSize="small" style={{ float: 'right' }} /></Grid>
                            <Grid item xs={11}>
                            
                                <div style={{ display: 'flex' }}>
                                    <Typography >Task Type: </Typography>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="select-category"
                                        value={state.category}
                                        name="category"
                                        onChange={(e)=>handleCategoryChange(e)}
                                    >
                                        <MenuItem value="report">Report</MenuItem>
                                        <MenuItem value="meeting" label="Meeting">Meeting</MenuItem>
                                        <MenuItem value="submission">Document Submission</MenuItem>
                                    </Select>
                                </div>
                            </Grid>

                            <Grid item container xs={12} md={12} spacing={1}>
                                <Grid item xs={1} md={1}>
                                    <EventIcon fontSize="small" style={{ float: 'right' }} />
                                </Grid>     
                                <Grid item xs={11} md={11}>
                                    <div style={{ display: 'flex' }}>
                                    <Typography >Due Date: </Typography>
                                    <KeyboardDatePicker
                                        format="MM/dd/yyyy"
                                        value={state.selectedDueDate}
                                        name="selectedDueDate"
                                        onChange={(e) => handleDueDateChange(e)}
                                        style={{ width: '30%' }}
                                    >Choose Submission Date:</KeyboardDatePicker>
                                    </div>
                                </Grid>

                                <Grid item xs={1} md={1}>
                                    <SubjectIcon fontSize="small" style={{ float: 'right' }} />
                                </Grid> 
                                
                                <Grid item xs={10} md={10}>
                                    <Typography >Summary</Typography>
                                    <TextField id="filled-multiline-static" multiline rows={4} variant="outlined"/>
                                </Grid>
                
                            </Grid>
                        {/* 3rd: Option to repeat until? */}
                        {/* 
                                1. Event Category (weekly report, meeting or others)
                                1a. If "others", need to pop up a textfield to fill in what's the others
                                2. Start Date & Time
                                3. End Date & Time //would task_due_date be the same??
                                4. Offer to repeat? But optional, leave if you have time
                            */}
                        {/* <div>
                                <Typography className={classes.secondaryHeading}>Repeat?</Typography>
                                <TextField type="number" value={repeatValue} name="repeatValue" placeholder="No. of times to repeat" onChange={e => setState({repeatValue: e.target.value})}></TextField>
                            </div> */}
                        </Grid>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" autoFocus>
                                Add Event
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </div>
        </MuiPickersUtilsProvider>
    );
        
    
    
}

export default AddTaskForm;