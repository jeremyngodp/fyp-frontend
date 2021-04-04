import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import ReusableNotesSubmission from '../ReusableTaskViewComponent/ReusableSubmissionComponent/ReusableNoteSubmission';
import moment from 'moment';

const useStyles = (theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(30),
      fontWeight: 'bold',
      padding: '5px 0px',
      marginTop:'20px',
      textAlign: 'center'
    },
    small: {
        fontSize: theme.typography.pxToRem(15),
        padding: '5px 0px',
        marginTop:'10px',
        textAlign: 'center'
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
      width: '90%',
      padding: '15px',
      marginTop: '15px',
    }
  })

class TaskSubmissionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            hourSpent: props.hourSpent
        }
    }

    cancelAddAttachment = () => {
        this.setState({
            selectedFile: null,
        })
    }

    addAttachment = event => {
        console.log(event.target.files)
        this.setState({
            selectedFile: event.target.files[0],
        })

        
    }

    uploadFile = () => {
        const {calendarStore} = this.props
        if (this.state.selectedFile != null){
            const data = new FormData()
            data.append('task_id', this.props.item.id)
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
                console.log(res.data)
                calendarStore.updateAttachedFile(this.props.id, res.data)
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
        const { id, calendarStore, onSubmitEditTask, handleTaskChange } = this.props;
        const { hourSpent } = this.state;
        
        if (hourSpent === "" ) {
            alert("Please fill in all fields");
        } else {
            axios.put("http://localhost:8080/fyp/api/task/" + id, {
                hourSpent: hourSpent,
                status: this.props.item.status
            },
            {
                headers: 
                    {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }); 
            
               
            this.uploadFile();
            
        }
        calendarStore.updateTask(id, hourSpent, this.props.item.status)
        onSubmitEditTask();
        handleTaskChange();
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        })
    }

    renderNoteSubmission = () => {
        const {hourSpent} = this.state;
        const {id} = this.props;
        console.log(id);
        return (
            <ReusableNotesSubmission
                id={id}
                type="CommonTask"
                onSubmitForm={this.onSubmitForm}
                handleChange={this.handleChange}
                cancel={this.cancelAddAttachment}
                addAttachment={this.addAttachment}
                buttonLabel="Submit Change"
                textfieldValue2={hourSpent}
                textfieldName2="hourSpent"
                noOfRows="7"
                selectedFile={this.state.selectedFile}
                attachedFile={this.props.attachedFile}
            />
        )
    }

    render() {
        const { classes, attachedFile } = this.props;
        return (
            <div style={{ width: '100%' }}>
                <Typography className={classes.heading}>{this.props.item.title}</Typography>
                <Typography className={classes.small}>Expected due date: {moment(this.props.item.start).format("Do MMM YYYY")}</Typography>
                {this.renderNoteSubmission()}
            </div>
        )
    }
}

TaskSubmissionPage = observer(TaskSubmissionPage);
export default withStyles(useStyles)(TaskSubmissionPage);
