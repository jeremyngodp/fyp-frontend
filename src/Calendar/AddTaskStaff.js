import React, {useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {format} from 'date-fns';
import EventIcon from '@material-ui/icons/Event';
import SubjectIcon from '@material-ui/icons/Subject';
import ClassIcon from '@material-ui/icons/Class';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { DialogTitle, DialogContent, makeStyles, Grid, Typography, Select, MenuItem, DialogActions, Button, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import axiosAddTask from '../AxiosCall/axiosAddTask.js';
import { isNull } from 'lodash';

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


function StaffAddTaskForm ({handleClose, calendarStore}){
    
    let start = new Date()
    const projectList =  calendarStore.getProjectList;
    // let dateStr = format(start, 'yyyy-MM-dd')
    const classes = useStyles()
    const [state, setState] = useState({
        category: 'report',
        selectedDueDate: start,
        project_id: '0',
        title: '',
        student_id: '0',
        chosen_project: projectList[0],
    })
    

    const handleProjectChange = (e) =>{
        const chosen_project =  projectList.find(project => project.id === e.target.value);
        setState({
            ...state,
            project_id: e.target.value,
            chosen_project: chosen_project,
        })
        console.log(chosen_project.student.id);
    }

    const handleStudentChange = (e) =>{
        setState({
            ...state,
            student_id: e.target.value
        })
    }

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

    const handleSummaryChange = (e) => {
        const titleVal = e.target.value;
        setState({
            ...state,
            title: titleVal,
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        
        
        const { selectedDueDate, project_id, category, title, chosen_project } = state;
        const student_id = chosen_project.student.id;
        let fnewDate = format(new Date(), 'yyyy-MM-dd')
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

        calendarStore.addData({
            title: title,
            start: fSelectedDueDate,
            end: fSelectedDueDate,
            event_type: category,
            project_id: project_id,
        });

        axiosAddTask(project_id,student_id,fnewDate, fSelectedDueDate, category, title);
        
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
                            <Grid item xs={1}><AssessmentIcon fontSize="small" style={{ float: 'right' }} /></Grid>
                            <Grid item xs={11}>
                                <div style={{ display: 'flex' }}>
                                    <Typography className={classes.secondaryHeading}>Project: </Typography>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="select-project"
                                        value={state.project_id}
                                        name="project"
                                        onChange={(e)=>handleProjectChange(e)}
                                    >
                                        <MenuItem key="0" value="0">Select Project</MenuItem>
                                        {projectList.filter(project =>  !isNull(project.student)).map(item => {
                                            return (
                                            <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                                            )
                                        })}
                                        
                                    </Select>
                                </div>
                            </Grid>
                            
                            {//The relationship between student and project is still 1-1 so dont need the selection for student yet!

                            /* <Grid item xs={1}><AssessmentIcon fontSize="small" style={{ float: 'right' }} /></Grid>
                            <Grid item xs={11}>
                                <div style={{ display: 'flex' }}>
                                    <Typography >Student: </Typography>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="select-student"
                                        value="0"
                                        name="student"
                                        onChange={(e)=>handleStudentChange(e)}
                                    >
                                        <MenuItem key="0" value="0">Select Student</MenuItem>
                                        {state.chosen_project.student.map(student => {      
                                            return (
                                                <MenuItem key={student.id} value={student.id}>{student.fname + student.lname}</MenuItem>
                                            )
                                        })} 
                                        
                                    </Select>
                                </div>
                            </Grid> */}


                            <Grid item xs={1}><ClassIcon fontSize="small" style={{ float: 'right' }} /></Grid>
                            <Grid item xs={11}>
                            
                                <div style={{ display: 'flex' }}>
                                    <Typography className={classes.secondaryHeading}>Task Type: </Typography>
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
                                    <Typography className={classes.secondaryHeading}>Due Date: </Typography>
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
                                    <div style={{ display: 'flex' }}>
                                        <Typography className={classes.secondaryHeading}>Task Title: </Typography>
                                        <TextField id="filled-multiline-static" name="title" multiline rows={4} variant="outlined" onChange={(e)=>handleSummaryChange(e)}/>
                                    </div>
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

export default StaffAddTaskForm;