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
      meetingNotes: "",
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
    const data = new FormData()
    data.append('task_id', this.props.data.id)


    data.append('attach_document', this.state.selectedFile)
    var upload_date = moment(new Date()).format('YYYY-MM-DD HH:mm')
    data.append('uploaded_date', upload_date)

    axios.post("http://127.0.0.1:8000/api/document/", data, { // receive two parameter endpoint url ,form data 
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

  onSubmitForm = (e) => {
    e.preventDefault();
    const { data, calendarStore } = this.props;
    const { Id, event_type, start } = data;
    const { updateWeeklyReportSubmission } = calendarStore;
    const { meetingNotes } = this.state;
    var submissionTime = moment();
    if (meetingNotes === "") {
      return alert("Please fill in meeting notes");
    } else {
    //   axiosPut(Id, event_type, start, submissionTime, data.project_id, data.student_id, data.tutor_id, "Completed", meetingNotes, 0)
      this.onClickHandler();
    }
    //Update mobx store so that front-end view can be updated simultaneously
    // updateWeeklyReportSubmission(Id, 'Completed', meetingNotes, submissionTime, 0)

    //Submits the attachment to backend here:
    // const formData = new FormData()
    // formData.append('task_id', this.props.data.id)


    // formData.append('file', this.state.selectedFile)
    // var upload_date = moment(new Date()).format('YYYY-MM-DD HH:mm')
    // formData.append('uploaded_date', upload_date)

    // axios.post("http://localhost:8080/fyp/api/uploadFile/", formData, { // receive two parameter endpoint url ,form data 
    // })
    //   .then(res => { // then print response status
    //     console.log(res.statusText);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //     console.log(upload_date);
    //   })
  }

  handleChange = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  renderMeetingNotesNotCompletedPaper = () => {
    const { classes } = this.props;
    const { meetingNotes } = this.state;
    const userType = this.props.calendarStore.getUserType;
    if (userType === 'Student') {
      return (
        <ReusableNotesSubmission
          type="Meeting Notes"
          onSubmitForm={this.onSubmitForm}
          handleChange={this.handleChange}
          addAttachment={this.addAttachment}
          textfieldValue={meetingNotes}
          textfieldName="meetingNotes"
          buttonLabel="Submit Notes"
          onClickHandler={this.onClickHandler}
          noOfRows="4"
          selectedFile={this.state.selectedFile}
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
    const { data } = this.props;
    switch (data.status) {
      case "Completed":
        return this.renderMeetingNotesCompletedPaper();
      default:
        return this.renderMeetingNotesNotCompletedPaper();
    }
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

