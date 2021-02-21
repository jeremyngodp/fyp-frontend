import React from 'react';
import { DialogTitle, DialogContent, makeStyles, Grid, Typography, Select, MenuItem, DialogActions, Button, TextField, Dialog } from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/AttachFile';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import moment from 'moment';
import RenderDocumentPreview from './RenderDocumentPreview';


const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        width: 'auto'
    },
    formControl: {
        minWidth: 200,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        padding: '5px 5px',
    }
});

class TaskEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hourSpent: props.item.hour,
            selectedFile: null,
            fileNumber: '0'
        }
        this.checkAttached(props.item.id);
    }

    handleHourChange = (e) => {
        this.setState({
            hourSpent: e.target.value,
        })
    }

    cancelAddAttachment = () => {
        this.setState({
            selectedFile: null,
        })
    }

    addAttachment = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    downloadFile = (id) => {
        id.preventDefault();

        const token = localStorage.getItem('token');
        console.log(id);
        // axios.get("http://localhost:8080/fyp/api/downloadFile/task/" + task_id, 
        // {headers:
        //     {'Authorization': 'Bearer ' + token}
        // });
    }

    checkAttached = (task_id) => {
        console.log("checking...")
        var fileAttached = 1
        axios.get("http://localhost:8080/fyp/api/checkFileAttachedCount/task/" + task_id, {headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem("token")
        }}).then(res => {
                this.setState({
                    fileNumber: res.data
                })
            }
        ).catch(err => {
            console.log(err)
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("clicked");
        const { item, calendarStore, handleClose, onSubmitEditTask } = this.props;
        const { hourSpent} = this.state;

        if (hourSpent === "" ) {
            alert("Please fill in all fields");
        } else {
            axios.put("http://localhost:8080/fyp/api/task/" + item.id, {
                hourSpent: hourSpent,
                status: item.status
            },
            {
                headers: 
                    {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }); 
            this.fileUpload();
            
            //Update mobx store so that front-end view can be updated simultaneously
            // updateWeeklyReportSubmission(id, 'Completed', thingsCompleted, submissionTime, hoursSpent)
        }
        calendarStore.updateTask(item.id, hourSpent, item.status)
        onSubmitEditTask();
        handleClose();
    }

    fileUpload = () => {
        const {selectedFile} = this.state
        
        if (selectedFile != null){
            const data = new FormData()
            data.append('task_id', this.props.item.id)
            data.append('file', this.state.selectedFile)
            var upload_date = moment(new Date()).format('YYYY-MM-DD')
            data.append('upload_date', upload_date)
            axios.post("http://localhost:8080/fyp/api/uploadFile", data, { // receive two parameter endpoint url ,form data
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            })
            .then(res => { // then print response status
                console.log(res.statusText);
            })
            .catch((error) => {
                console.log(error.response);
                console.log(upload_date);
            })
        
            //reset the state
            this.setState({
            selectedFile: null,
            })
        }
    }

    render() {
        const {item, classes, handleClose} = this.props;
        const {fileNumber} = this.state
        var {hourSpent} = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div>
                    <DialogTitle>{item.title}</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.onSubmit} method="POST">
                            <Grid item xs={11}>
                                <div style={{ display: 'flex' }}>
                                    <Typography className={classes.secondaryHeading}>Hour Spent: </Typography>
                                    <TextField 
                                        id="filled-multiline-static" 
                                        name="hour" 
                                        rows={2} 
                                        variant="outlined" 
                                        value={hourSpent}
                                        onChange={(e)=> this.handleHourChange(e)}
                                    />
                                </div>
                            </Grid>

                            {fileNumber >= 1  ?
                                <RenderDocumentPreview item_id={item.id}/>
                                :
                                <div>
                                    <Grid item xs={1}><SubjectIcon fontSize="small" style={{ float: 'right' }} /></Grid> 
                                    <Grid item xs={12} md={8} lg={8}>
                                        <input
                                            type="file"
                                            onChange={this.addAttachment}
                                            id="contained-button-file"
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button color="primary" component="span" >
                                                Browse Files
                                            </Button>
                                        </label>
                                    </Grid>
                                </div>
                            }

                           

                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" color="primary" autoFocus>
                                    Confirm Change
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </div>
            </MuiPickersUtilsProvider>
        )
    } 
}

export default withStyles(useStyles)(TaskEditForm);