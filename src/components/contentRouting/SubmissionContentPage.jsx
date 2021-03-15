import React, { Component } from 'react';
import { Paper, Typography, Button, Grid, Box, Accordion, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core';
import { observer } from 'mobx-react';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ReusableNotesSubmission from "./ReusableSubmissionComponent/ReusableNoteSubmission"
import ReusableExpansionHeader from './ReusableCommentComponent/ReusableExpansionHeader';
import ReusableCommentBox from './ReusableCommentComponent/ReusableCommentBox'
import ReportSubmissionPage from './ReportSubmissionPage';

const useStyles = (theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    details: {
      float: 'center',
    },
    column: {
      flexBasis: '50%',
      padding: '0 30px',
    }
  })

const SubmissionContentPage = observer(
    class SubmissionContentPageClass extends Component {
        constructor(props) {
            super(props);
            this.state = {
                taskList : this.props.calendarStore.getData.filter(task => task.event_type === "submission")
            }
        }

        calculateWeekNo = (date) => {
            const semStart = this.props.calendarStore.semStart;
            var formattedDate = moment(date);
            var formattedSemStart = moment(semStart);
            let weekNumber = formattedDate.diff(formattedSemStart, 'days')/7 ;
            if (formattedSemStart < formattedDate) {
                if (weekNumber <= 14) {
                    switch (weekNumber) {
                        case 8: weekNumber = 'Recess Week'
                            break;
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14: weekNumber -= 1
                            break;
                        default: break;
                    }
                }
            }

            return Math.floor(weekNumber)
        }

        renderStatus = (attachedFile, task) => {
            const {classes} = this.props
            if (attachedFile == null) {
                return <Typography className={classes.secondaryHeading} style={{ textAlign: 'center' }}>Not Submitted</Typography>
            } else if (attachedFile.uploadDate > task.end) {
                return <Typography className={classes.secondaryHeading} style={{ textAlign: 'center' }}>Late</Typography>
            } else {
                return <Typography className={classes.secondaryHeading} style={{ textAlign: 'center' }}>Submitted</Typography>
            }

        }

        handleTaskChange = () => {
            const {calendarStore} = this.props;
            let newTasks = calendarStore.getData.filter(task => task.event_type === "submission");
            this.setState({
                taskList: newTasks
            });
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

        renderReportAccordion = () => {
            const { calendarStore, classes } = this.props;
            const { taskList } = this.state;
            var user_id = calendarStore.getUserData.id
            return (
                taskList
                    .slice().sort((a, b) => { //sort the dates so most recent date of submission is below
                    return new Date(a.start).getTime() - new Date(b.end).getTime()
                    })
                    .map((text, index) => {
                        return (
                            <Accordion id={text.Id} defaultExpanded style={{ overflow: 'hidden' }} className={classes.root} key={index}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Grid container spacing={4}>
                                        <Grid item xs={1} />
                                        <Grid item xs={2}>
                                            {/* Week nos. */}
                                            <Typography className={classes.secondaryHeading}>{this.calculateWeekNo(text.end)}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {/* Submission Title */}
                                            <Typography className={classes.secondaryHeading}>{text.title}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {/* Submission date -- need to format it to reflect date only */}
                                            {/* {text.event_type} */}
                                            <Typography className={classes.secondaryHeading}>{moment(text.end).format("DD/MM/YYYY")}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {text.attachedFile == null ? 
                                            <Typography className={classes.secondaryHeading}>
                                                Pending
                                            </Typography>
                                            :
                                            <Typography className={classes.secondaryHeading}>
                                                {moment(text.attachedFile.uploadDate).format("DD/MM/YYYY")}
                                            </Typography>
                                            }
                                        </Grid>
                                        <Grid item xs={2}>
                                            {
                                            this.renderStatus(text.attachedFile, text) 
                                            // 
                                            }
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <Divider />
                                <AccordionDetails className={classes.details} style={{ paddingBottom: '40px' }}>
                                    <div className={classes.column}>
                                        <ReportSubmissionPage task={text} calendarStore={calendarStore} handleTaskChange={this.handleTaskChange}/>
                                    </div>
                                    <div className={classes.column}> 
                                    {/* TODO: insert user id dynamically. */}
                                        <ReusableCommentBox comments={text.comments} calendarStore={calendarStore} task_id={text.Id} user_id={user_id} />
                                    </div> 
                                </AccordionDetails>
                                
                            </Accordion>
                            // </div>
                        )
                    }
                )
            )
          }

        renderHeader = () => {
            return (
                <ReusableExpansionHeader
                    week_no='Week No.'
                    title1='Submission Title'
                    title2='Deadline'
                    title3='Submitted Date'
                    title4='Submission Status'
                />
            )
        }
        
        render() {
            return (
                <div style={{ width: '100%' }}>
                    <div>
                        <Paper>
                            <Paper style={{ position: "sticky", top: '4.5rem', height: '50px', zIndex: '2' }}>
                            {this.renderHeader()}
                            </Paper>
                            {this.renderReportAccordion()}
                            
                        </Paper>
                    </div>
                    <Paper>
                    </Paper>
                </div>
            )
        }
    }

)

export default withStyles(useStyles) (SubmissionContentPage);