import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import moment from 'moment';
// import axiosPut from '../AxiosCalling/axiosPut';
import axios from 'axios';
import ReusableNotesSubmission from './ReusableSubmissionComponent/ReusableNoteSubmission';
// import ReusableNotesCompleted from './ContentRouterReusableComponents/ReusableNotesCompleted';

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

class MeetingNotesSubmissionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        selectedFile: null,
        }
    }

//   renderMeetingNotesCompletedPaper = () => {
//     const { data } = this.props;
//     const { content, documents } = data;
//     return (
//       <ReusableNotesCompleted
//         type="Meeting Notes"
//         content={content}
//         documents={documents}
//         addAttachment={this.addAttachment}
//         upload={this.onClickHandler}
//         selectedFile={this.state.selectedFile}
//         cancel={this.cancelAddAttachment}
//       />
//     )
//   }

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

    onClickHandler = () => {
        
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const {calendarStore, data, handleTaskChange} =  this.props;
        const {updateAttachedFile} = calendarStore;
        const { selectedFile } = this.state;
        if (selectedFile == null) {
            return alert("Please fill in meeting notes");
        } else {
            const data = new FormData()
            data.append('task_id', this.props.data.id)

            data.append('file', this.state.selectedFile)
            var upload_date = moment(new Date()).format('YYYY-MM-DD')
            data.append('upload_date', upload_date)

            axios.post("http://localhost:8080/fyp/api/uploadFile", data, { 
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(res => { // then print response status
                console.log(res.statusText);
                updateAttachedFile(res.data.task_id, res.data)
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
        handleTaskChange();
    }

    handleChange = event => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }

    renderMeetingNotesNotCompletedPaper = () => {
        const { classes, attachedFile } = this.props;
        const userType = this.props.calendarStore.getUserType;
        if (userType === 'Student') {
        return (
            <ReusableNotesSubmission
                type="Meeting Notes"
                id={this.props.data.id}
                onSubmitForm={this.onSubmitForm}
                handleChange={this.handleChange}
                addAttachment={this.addAttachment}
                cancel={this.cancelAddAttachment}
                buttonLabel="Attach Notes"
                noOfRows="4"
                selectedFile={this.state.selectedFile}
                attachedFile={attachedFile}
            />
        )
        } else {
        return (
            <Paper style={{ padding: '20px', marginTop: '15px' }}>
            <Typography className={classes.bodyText} style={{ fontStyle: 'italic' }}>Student has yet to submit notes</Typography>
            </Paper>
        )
        }
    }

    renderSwitchPaper = () => {
        
        return this.renderMeetingNotesNotCompletedPaper();
        
    }

    render() {
        const { classes } = this.props;
        return (
        <div style={{ width: '100%' }}>
            <Typography className={classes.heading}>Meeting Notes:</Typography>
            {this.renderSwitchPaper()}
        </div>
        )
    }
}

MeetingNotesSubmissionPage = observer(MeetingNotesSubmissionPage)
export default withStyles(useStyles)(MeetingNotesSubmissionPage);

