import moment from 'moment';
import axios from 'axios';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import ReusableNotesSubmission from './ReusableSubmissionComponent/ReusableNoteSubmission'

const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: 'bold'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold',
        padding: '5px 0px',
    },
    bodyText: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        padding: '5px 0px',
    },
    paper: {
        width: '80%',
        padding: '15px',
        marginTop: '15px',
    }
})

class ReportSubmissionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            hourSpent: props.hourSpent
        }
    }

    renderReportCompletedPaper() {

    }

    onClickHandler = () => {
        const {selectedFile} = this.state
        if (selectedFile != null){
            const data = new FormData()
            data.append('task_id', this.props.id)
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

    onSubmitForm = (e) => {
        e.preventDefault();
        const { id, task_type, task_created, student_id, project_id, tutor_id, calendarStore } = this.props;
        console.log(id);
        const { hourSpent, thingsCompleted } = this.state;
        var status = this.state.selectedFile==null? "pending": "complete";
        
        const { updateWeeklyReportSubmission } = calendarStore;
        var submissionTime = moment();
        if (hourSpent === "" ) {
            alert("Please fill in all fields");
        } else {
            axios.put("http://localhost:8080/fyp/api/task/" + id, {
                task_type: task_type,
                hourSpent: hourSpent,
                status: status
            },
            {
                headers: 
                    {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }); 
            this.onClickHandler();
            //Update mobx store so that front-end view can be updated simultaneously
            // updateWeeklyReportSubmission(id, 'Completed', thingsCompleted, submissionTime, hoursSpent)
        }
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

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        })
    }

    renderReportPendingPaper = () => {
        const { classes } = this.props;
        const { hourSpent, thingsCompleted } = this.state;
        console.log(hourSpent);
        const userType = this.props.calendarStore.getUserType;
        if (userType === 'Student') {
            return (
                <ReusableNotesSubmission
                    type="Weekly Report"
                    onSubmitForm={this.onSubmitForm}
                    handleChange={this.handleChange}
                    addAttachment={this.addAttachment}
                    textfieldValue={thingsCompleted}
                    textfieldName="thingsCompleted"
                    buttonLabel="Submit"
                    textfieldValue2={hourSpent}
                    textfieldName2="hourSpent"
                    noOfRows="7"
                    selectedFile={this.state.selectedFile}
                />
            )
        } 
        // else {
        //     return (
        //         <Paper style={{ padding: '20px', marginTop: '15px' }}>
        //             <Typography className={classes.bodyText} style={{ fontStyle: 'italic' }}>Student has yet to submit notes</Typography>
        //         </Paper>
        //     )
        // }
    }
    
    renderSwitchPaper = (status) => {
        switch (status) {
            case "completed":
            case "late":
                return this.renderReportCompletedPaper();
            default:
                return this.renderReportPendingPaper();
        }
    }

    render() {
        const { classes, status } = this.props;
        return (
            <div style={{ width: '100%' }}>
                <Typography className={classes.heading}>Weekly Report Submission</Typography>
                {this.renderSwitchPaper(status)}
            </div>
        )
    }
}

ReportSubmissionPage = observer(ReportSubmissionPage);
export default withStyles(useStyles)(ReportSubmissionPage);