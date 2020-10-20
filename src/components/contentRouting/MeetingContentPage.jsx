import React from 'react';
import {observer} from 'mobx-react';
import { Paper, Grid, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Divider, Button,  } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles';

import ReusableExpansionHeader from './ReusableCommentComponent/ReusableExpansionHeader'
import moment from 'moment'



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
                    title1='Meeting Date'
                    title2='Meeting Notes'
                    title3='Attachments?'
                />
            )
        }

        renderMeetingsAccordion = () => {
            const { calendarStore, classes } = this.props;
            const { getData } = calendarStore;
        
            return (
                getData
                    .filter(indivData => indivData.event_type === "meeting")
                    .slice()
                    .map((text, index) => {
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
                                        {/* <Grid item xs={2}>  */}
                                            {/* Meeting Notes: whether it's available or not */}
                                            {/* {text.event_type} */}
                                            {/* <Typography >{text.status === "Completed" ? "Available" : "Not available"}</Typography> */}
                                        {/* </Grid> */}
                                        
                                    </Grid>
                                </AccordionSummary>
                                <Divider/>
                                <AccordionDetails className={classes.details} style={{paddingBottom: '40px'}}>
                                    
                                    {/* <div className={classes.column}>
                                        <MeetingNotesSubmissionPage data={text}  calendarStore={calendarStore}/>
                                    </div>
                                    <div className={classes.column}>
                                        <MeetingNotesAttachmentPage documents={text.documents} Id={text.Id}/>
                                    </div> */}
                                    <p>Details</p>
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


// .sort((a,b) => { //sort the dates so most recent date of submission is below
//     return new Date(a.start).getTime() - new Date(b.end).getTime()
//    })


// <Grid item xs={2}>
//                                         {/* Are there any attachments?  */}
//                                             {text.documents.length === 0 ? 
//                                             <Typography  style={{fontStyle: 'italic'}}>No attachments</Typography> 
//                                             : <Typography >{text.documents.length} attachment(s)</Typography>
//                                             } 
//                                         </Grid>