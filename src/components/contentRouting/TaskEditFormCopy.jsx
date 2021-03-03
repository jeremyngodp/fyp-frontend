import React from 'react';
import { DialogTitle, DialogContent, makeStyles, Grid, Typography, Select, MenuItem, DialogActions, Button, TextField, Dialog } from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/AttachFile';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import moment from 'moment';
import RenderDocumentPreview from './RenderDocumentPreview';
import ReusableNoteComplete from './ReusableSubmissionComponent/ReusableNoteComplete';
import ReusableNoteSubmission from './ReusableSubmissionComponent/ReusableNoteSubmission';


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

class TaskEditFormCopy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hourSpent: props.item.hour,
            selectedFile: null,
            fileNumber: '0'
        }
        this.checkAttached(props.item.id);
        // this.addAttachment.bind(this);
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

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        })
    }

    render() {
        const {item, classes, handleClose} = this.props;
        const {fileNumber} = this.state
        var {hourSpent} = this.state;
        return (
            
                <div>
                    <Typography>{item.title}</Typography>
                        
                            {/* <Grid item xs={11}>
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
                            </Grid> */}

                            {fileNumber >= 1  ?
                                <ReusableNoteComplete 
                                    type="Weekly Report"
                                    hourSpent={hourSpent}
                                    id={item.id}
                                    // content={content}
                                    // documents={documents}
                                    addAttachment={this.addAttachment}
                                    upload={this.onClickHandler}
                                    selectedFile={this.state.selectedFile}
                                    cancel={this.cancelAddAttachment}
                                />
                                :
                                <ReusableNoteSubmission 
                                    type="Weekly Report"
                                    onSubmitForm={this.onSubmit}
                                    handleChange={this.handleChange}
                                    addAttachment={this.addAttachment}
                                    // textfieldValue={thingsCompleted}
                                    // textfieldName="thingsCompleted"
                                    buttonLabel="Confirm Change"
                                    textfieldValue2={hourSpent}
                                    textfieldName2="hourSpent"
                                    noOfRows="7"
                                    selectedFile={this.state.selectedFile}
                                />
                            }

                           

                            {/* <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Close
                                </Button>
                                <Button type="submit" variant="contained" color="primary" autoFocus>
                                    Confirm Change
                                </Button>
                            </DialogActions> */}
                        
                    
                </div>
            
        )
    } 
}

export default withStyles(useStyles)(TaskEditFormCopy);