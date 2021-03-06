import React from 'react';
import {observer} from 'mobx-react';
import { Paper, Grid, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Divider, Button,  } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment'
import ReusableExpansionHeader from '../ReusableTaskViewComponent/ReusableCommentComponent/ReusableExpansionHeader'
import MeetingNotesSubmissionPage from "./MeetingNoteSubmission"
import ReusableCommentBox from '../ReusableTaskViewComponent/ReusableCommentComponent/ReusableCommentBox'

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

const MeetingContentPage = observer(
    class MeetingContentPageClass extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                taskList : this.props.calendarStore.getData.filter(task => task.event_type === "meeting")
            }

        }

        handleTaskChange = () => {
            const {calendarStore} = this.props;
            let newTasks = calendarStore.getData.filter(task => task.event_type === "meeting");
            this.setState({
                taskList: newTasks
            });
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
        

        renderHeader = () => {
            return(
                <ReusableExpansionHeader 
                    week_no='Week No.'
                    title1 ='Event'
                    title2 ='Meeting Date'
                    title3 ='Meeting Notes'
                    
                />
            )
        }

        renderMeetingsAccordion = () => {
            const {classes, calendarStore} = this.props
            const {taskList} = this.state;
            const user_id = calendarStore.getUserData.id
            
            return (
                taskList
                    .map((text, index) => {
                        console.log(index);
                        if(text.attachedFile != null){
                            console.log(text.attachedFile.fileName);
                        }
                        
                        return(
                            <Accordion  defaultExpanded style={{overflow: 'hidden'}}  key={index} className={classes.root}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Grid container spacing={4} style={{display: 'flex'}}>
                                        <Grid item xs={1} />
                                        <Grid item xs={2}>
                                            <Typography  className={classes.secondaryHeading}>{this.calculateWeekNo(text.end)}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                        {/* Meeting Date */}
                                            <Typography className={classes.secondaryHeading}>
                                                {text.title}
                                            </Typography>
                                            {/* <Typography className={classes.secondaryHeading}>
                                                {moment(text.start).format('HH:mmA')}
                                                &nbsp;-&nbsp;
                                                {moment(text.end).format('HH:mmA')}
                                            </Typography> */}
                                        </Grid>
                                        <Grid item xs={2}>
                                        {/* Meeting Date */}
                                            <Typography className={classes.secondaryHeading}>
                                                {moment(text.start).format("dddd, MMMM DD")}
                                            </Typography>
                                            {/* <Typography className={classes.secondaryHeading}>
                                                {moment(text.start).format('HH:mmA')}
                                                &nbsp;-&nbsp;
                                                {moment(text.end).format('HH:mmA')}
                                            </Typography> */}
                                        </Grid>
                                        <Grid item xs={2}>  
                                            {/* Meeting Notes: whether it's available or not */}
                                            
                                            <Typography className={classes.secondaryHeading}>{text.attachedFile === null ? "Not Available" : "Available"}</Typography>
                                        </Grid>
                                        
                                    </Grid>
                                </AccordionSummary>
                                <Divider/>
                                <AccordionDetails className={classes.details} style={{paddingBottom: '40px'}}>
                                    
                                    <div className={classes.column}>
                                        <MeetingNotesSubmissionPage 
                                            data={text}  
                                            calendarStore={calendarStore}
                                            attachedFile = {text.attachedFile}
                                            handleTaskChange = {this.handleTaskChange}
                                        />
                                    </div>
                                    <div className={classes.column}> 
                                    {/* TODO: insert user id dynamically. */}
                                        <ReusableCommentBox comments={text.comments} calendarStore={calendarStore} task_id={text.Id} user_id={user_id} />
                                    </div>
                                    
                                </AccordionDetails>
                                
                            </Accordion>
                        )  
                    })
            )
        }


        render () {
            return (
                <div style={{width: '100%'}}>
                    {/* <Button onClick={this.jumpToId}>Jump to view</Button> */}
                    <div>
                        <Paper>
                            <Paper style={{position: "sticky", top: '4.5rem', height: '50px', zIndex: '2'}}>
                                {this.renderHeader()} 
                            </Paper> 

                            
                            {this.renderMeetingsAccordion()}
                        
                        </Paper>
                        {/* <Button onClick={this.jumpToId}>Jump to an ID of: 26</Button> */}
                    </div>
                    <Paper>
                    </Paper>
                </div>
            );
        }
    }
)

export default withStyles(useStyles) (MeetingContentPage);
