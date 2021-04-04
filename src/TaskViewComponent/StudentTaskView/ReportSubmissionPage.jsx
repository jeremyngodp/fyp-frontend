import moment from 'moment';
import axios from 'axios';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import ReusableNotesSubmission from '../ReusableTaskViewComponent/ReusableSubmissionComponent/ReusableNoteSubmission';
import ReusableNotesCompleted from '../ReusableTaskViewComponent/ReusableSubmissionComponent/ReusableNoteComplete';

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
        }
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

    renderReportCompletedPaper() {
        const {id} = this.props;
        console.log(id);
        const fileURL = "http://localhost:8080/fyp/api/downloadFile/task/" + id;
        return (
            <div style={{marginTop: '10px'}}>
                <GetAppIcon style={{float: 'left'}}/>
                <a style={{marginRight: '5px'}} href={fileURL} download>Download attachment</a>
            </div>
        )
    }

    renderWeeklyReportCompletedPaper = () => {
        const {hourSpent, id} = this.props;
        return (
          <ReusableNotesCompleted
            type="Weekly Report"
            hourSpent={hourSpent}
            id={id}
            // content={content}
            // documents={documents}
            addAttachment={this.addAttachment}
            upload={this.onClickHandler}
            selectedFile={this.state.selectedFile}
            cancel={this.cancelAddAttachment}
          />
        )
    }

    onClickHandler = (e) => {
        e.preventDefault();
        console.log('onCLickHandler ran')
        const {selectedFile} = this.state
        const { calendarStore} = this.props
        if (selectedFile != null){
            console.log("file attached!")
            const data = new FormData()
            data.append('task_id', this.props.task.id)
            data.append('file', this.state.selectedFile)
            var upload_date = moment(new Date()).format('YYYY-MM-DD')
            data.append('upload_date', upload_date)
            axios.post("http://localhost:8080/fyp/api/uploadFile", data, { // receive two parameter endpoint url ,form data
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            })
            .then(res => { // then print response status
                console.log(res.statusText);
                calendarStore.updateAttachedFile(this.props.task.id, res.data)
            })
            .catch((error) => {
                console.log(error.response);
                console.log(upload_date);
            })
        
            //reset the state
            this.setState({
                selectedFile: null,
            })

            this.props.handleTaskChange();
        }

        else {
            console.log("no file attached!");
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
        const { task, classes } = this.props;
        const userType = this.props.calendarStore.getUserType;
        if (userType === 'Student') {
            return (
                <ReusableNotesSubmission
                    id={task.id}
                    type="Submission"
                    onSubmitForm={this.onClickHandler}
                    handleChange={this.handleChange}
                    cancel={this.cancelAddAttachment}
                    addAttachment={this.addAttachment}
                    buttonLabel="Submit Document"
                    noOfRows="7"
                    selectedFile={this.state.selectedFile}
                    attachedFile={task.attachedFile}
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
    
    renderSwitchPaper = () => {
        return this.renderReportPendingPaper();
    }

    render() {
        const {classes} = this.props;
        return (
            <div style={{ width: '100%' }}>
                <Typography className={classes.heading}>Report Submission</Typography>
                {this.renderSwitchPaper()}
            </div>
        )
    }
}

ReportSubmissionPage = observer(ReportSubmissionPage);
export default withStyles(useStyles)(ReportSubmissionPage);