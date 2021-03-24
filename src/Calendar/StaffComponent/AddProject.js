import React, { useState } from 'react';
import { DialogTitle, DialogContent, makeStyles, Grid, Typography, Select, MenuItem, DialogActions, Button, TextField, Dialog } from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import axiosAddProject from '../../AxiosCall/axiosAddProject';
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

function AddProjectForm ({handleClose, calendarStore}){
    
    const classes = useStyles();
    const [state,setState] = useState({
        project_title: "",
        project_description: "",
        student_id: 0,
    })
    

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
        axiosAddProject(project_title, student_id, project_description, calendarStore);

        handleClose();
        
    }

    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit} method="POST">
                        <Grid container className={classes.root} spacing={1}>
                            <Grid item xs={1}><SubjectIcon fontSize="small" style={{ float: 'right' }} /></Grid> 
                            <Grid item xs={11}>
                                <div style={{ display: 'flex' }}>
                                    <Typography className={classes.secondaryHeading}>Title: </Typography>
                                    <TextField id="filled-multiline-static" name="title" rows={2} variant="outlined" onChange={(e)=>handleTitleChange(e)}/>
                                </div>
                            </Grid>

                            <Grid item xs={1}><SubjectIcon fontSize="small" style={{ float: 'right' }} /></Grid> 
                            <Grid item xs={11}>
                                <div style={{ display: 'flex' }}>
                                <Typography className={classes.secondaryHeading}>Description: </Typography>
                                <TextField id="filled-multiline-static" name="description" multiline rows={4} variant="outlined" onChange={(e)=>handleDescriptionChange(e)}/>
                                </div>
                            </Grid>

                        </Grid>
                 
                        <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" color="primary" autoFocus>
                                    Add Project
                                </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </div>
        </MuiPickersUtilsProvider>
    
    );
    
}

export default AddProjectForm;