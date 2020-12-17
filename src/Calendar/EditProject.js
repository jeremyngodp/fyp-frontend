import React, { useState } from 'react';
import { DialogTitle, DialogContent, makeStyles, Grid, Typography, Select, MenuItem, DialogActions, Button, TextField, Dialog } from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import axiosUpdateProject from '../AxiosCall/axiosUpdateProject';
import axiosGetAllStudent from '../AxiosCall/axiosGetAllStudent';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

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

function EditProjectForm ({handleClose, calendarStore, project_id}){
    const project = calendarStore.getProjectList.find(project => project.id  === project_id);
    const studentList = calendarStore.getStudentList;
    
    const classes = useStyles();
    const [state,setState] = useState({
        project_title: project.title,
        project_description: project.description,
        student_id: project.student.id,
    })

    console.log(state.student_id);
    
    const handleStudentChange = (e) =>{
        setState({
            ...state,
            student_id: e.target.value
        })
    }

    const handleDescriptionChange = (e) => {
        setState ({
            ...state,
            project_description: e.target.value, 
        })
    }

    const handleTitleChange = (e) => {
        setState ({
            ...state,
            project_title: e.target.value, 
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const {project_title, project_description, student_id} = state;
        const {updateProject} = calendarStore;
        var student = studentList.find(student => student.id == student_id);
        axiosUpdateProject(project_id, project_title, student_id, project_description, calendarStore, student);
        
        handleClose();
        
    }

    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
                <DialogTitle>Edit Project</DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit} method="POST">
                        <Grid container className={classes.root} spacing={1}>
                            <Grid item xs={1}><SubjectIcon fontSize="small" style={{ float: 'right' }} /></Grid> 
                            <Grid item xs={11}>
                                <div style={{ display: 'flex' }}>
                                    <Typography className={classes.secondaryHeading}>Title: </Typography>
                                    <TextField 
                                        id="filled-multiline-static" 
                                        name="title" 
                                        rows={2} 
                                        variant="outlined" 
                                        value={state.project_title}
                                        onChange={(e)=>handleTitleChange(e)}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={1}><SubjectIcon fontSize="small" style={{ float: 'right' }} /></Grid> 
                            <Grid item xs={11}>
                                <div style={{ display: 'flex' }}>
                                <Typography className={classes.secondaryHeading}>Description: </Typography>
                                <TextField 
                                    id="filled-multiline-static" 
                                    name="description" 
                                    multiline rows={4} 
                                    variant="outlined" 
                                    value={state.project_description}
                                    onChange={(e)=>handleDescriptionChange(e)}/>
                                </div>
                            </Grid>

                            <Grid item xs={1}><SubjectIcon fontSize="small" style={{ float: 'right' }} /></Grid> 
                            <Grid item xs={11}>
                                <div style={{ display: 'flex' }}>
                                <Typography className={classes.secondaryHeading}>Student: </Typography>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="select-category"
                                    name="student"
                                    value={state.student_id}
                                    onChange={(e)=>handleStudentChange(e)}>
                                        <MenuItem value={state.student_id}>Assign A Student</MenuItem>
                                    {
                                        studentList.map(student => 
                                        <MenuItem key={student.id} value={student.id}>{student.lname} {student.fname}</MenuItem>
                                        )
                                    }
                                    
                                </Select>
                                </div>
                            </Grid>

                        </Grid>
                 
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" autoFocus>
                                Save Change
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </div>
        </MuiPickersUtilsProvider>
    
    );
    
}

export default EditProjectForm;