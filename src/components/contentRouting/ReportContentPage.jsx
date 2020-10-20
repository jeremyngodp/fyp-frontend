import React, { Component } from 'react';
import { Paper, Typography, Button, Grid, Box, Accordion, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core';
import { observer } from 'mobx-react';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

import ReusableExpansionHeader from './ReusableCommentComponent/ReusableExpansionHeader';
import ReusableCommentBox from './ReusableCommentComponent/ReusableCommentBox'

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

const ReportContentPage = observer(
    class ReportContentPageClass extends Component {
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

        renderReportAccordion = () => {
            const { calendarStore, classes } = this.props;
            const { getData } = calendarStore;
            var user_data_id = calendarStore.getUserData.id
            return (
                getData
                    .filter(indivData => indivData.event_type === "report")
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
                                        {/* Report Title */}
                                        <Typography className={classes.secondaryHeading}>{text.title}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        {/* Submission date -- need to format it to reflect date only */}
                                        {/* {text.event_type} */}
                                        <Typography className={classes.secondaryHeading}>{moment(text.end).format("DD/MM/YYYY")}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        {/* Submitted date */}
                                        <Typography className={classes.secondaryHeading}>
                                        {/* {text.submission_date === null ? "Not submitted yet" : "Submitted on " + moment(text.submission_date).format("DD/MM/YYYY")} */} Not Submitted
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        {/* No. of hours */}
                                        <Typography className={classes.secondaryHeading} style={{ textAlign: 'center' }}>{text.hours_spent}</Typography>
                                    </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails className={classes.details} style={{ paddingBottom: '40px' }}>
                                    {/* <div className={classes.column}>
                                    <WeeklyReportSubmissionPage calendarStore={calendarStore} documents={text.documents} task_type={text.event_type} task_created={text.end} student_id={text.student_id} tutor_id={text.tutor_id} project_id={text.project_id} Id={text.Id} hours_spent={text.hours_spent} content={text.content} status={text.status} />
                                    </div> */}
                                    <div className={classes.column}>
                                    {/* Inside comment box, the user_id should be your own, not the student's. Because prof & student can both type in */}
                                    <ReusableCommentBox comments={text.comments} calendarStore={calendarStore} task_id={text.Id} user_id={1} />
                                    </div> 
                                </AccordionDetails>
                                <Divider />
                            </Accordion>
                            // </div>
                        )
                    }
                )
            )
            // )
        }

        renderHeader = () => {
            return (
                <ReusableExpansionHeader
                    week_no='Week No.'
                    title1='Title'
                    title2='Deadline'
                    title3='Submitted Date'
                    title4='No. of hours'
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

export default withStyles(useStyles) (ReportContentPage);