import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import TimerIcon from '@material-ui/icons/Timer';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { connect } from 'react-redux';
import * as actions from '../../redux/login-store/actions/authActions';
import {Paper, Dialog,Toolbar, Button, AppBar, List, ListItemText, ListItem, Accordion, AccordionSummary, AccordionDetails, Typography, CssBaseline, DialogTitle, DialogContent} from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp';
import history from '../../history';
import moment from 'moment'
import ReusableCommentBox from '../ReusableTaskViewComponent/ReusableCommentComponent/ReusableCommentBox';
import EditProjecButton from '../buttons/EditProjectButton';
import { observer } from 'mobx-react';
import RenderDocumentPreview from "../ReusableTaskViewComponent/RenderDocumentPreview"
import axiosGetAllStudent from '../../AxiosCall/axiosGetAllStudent'
import axiosGetProjectListByStaffId from '../../AxiosCall/axiosGetProjectByStaffId';



const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    
    innerAccordion: {
        width:'90%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
        fontStyle: 'bold',
    },

    dialogSecondaryHeading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
        fontStyle: 'bold',
    },

    description: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        align: theme.typography.center,
        fontStyle: 'italic',
    },

    icon: {
        margin: theme.spacing(4)
    },

    taskTypeHeading: {
        fontSize:'17px', 
        textAlign:'center'
    },

    taskList: {
        backgroundColor: 'gainsboro'
    },

    nested: {
        paddingLeft: theme.spacing(4),
    },
    appbarroot: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    column: {
        flexBasis: '50%',
        padding: '0 30px',
    },
    details: {
        float: 'center',
    },
    flex: {
        display: 'flex',
    },
    taskPaper: {
        marginBottom:'10px',
    }

})

class ProjectListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            projects : props.calendarStore.getProjectList.filter(project => project.staff.id === props.calendarStore.getUserData.id),
            currentItem: '',
        }
    }
    
    handleClickStudent = () => {
        this.setState({
             open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    onSubmitEditProject = () => {
        const {calendarStore} = this.props
        this.setState({
            projects: calendarStore.getProjectList.filter(project => project.staff.id === calendarStore.getUserData.id)
        })
    }

    UNSAFE_componentWillMount() {
        
        const {calendarStore} = this.props;
        console.log(calendarStore.getLoadState)
        if(!calendarStore.getLoadState) {
            axiosGetAllStudent(calendarStore);
            axiosGetProjectListByStaffId(calendarStore.getUserData.id,calendarStore);
            var projectList = JSON.parse(localStorage.getItem('projects'))
            projectList.map( project => {
                calendarStore.addProjectList({
                    id: project.id,
                    title: project.name,
                    student: project.student,
                    description: project.description,
                    staff: project.supervisor,
                    tasks: project.taskList,
                });

                project.taskList.map( task => {
                    calendarStore.addData( {
                        id: task.id,
                        title: task.title,
                        attachedFile: task.attachedFile,
                        event_type: task.task_type,
                        start: task.deadline,
                        end: task.deadline,
                        deadline: task.deadline,
                        project_id : project.id,
                        hour: task.hourSpent,
                        comments: task.comments,
                        student_id: task.student_id,
                        status: task.status
                    })
                });
            })

            calendarStore.setLoadState(true);
        }
    }

    componentDidUpdate() {
        console.log("Project listing updated");
        const {calendarStore} = this.props;
    }

    handleLogout = () => {
        const {calendarStore} = this.props;
        calendarStore.resetStore()
        this.props.logout();
    }

    // handleClickUser = (e, index) => {
    //     //This onclick sends to the student's content page
    //     const value = index;
    //     this.props.setParam(value, null);
    //     history.push(`/${value}/content`);
    // }

    returnToCalendar = () =>{
        history.push('/staff/calendar');
    }

    goToAdminPage = () => {
        history.push('/admin');
    }

    renderAppBar = () => {
        const { classes, calendarStore } = this.props;
        const is_admin = localStorage.getItem('is_admin');
        console.log(is_admin)
        return (
            <div className={classes.appbarroot}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Welcome, {calendarStore.getUserData.username}
                        </Typography>

                        <Button
                            type="submit"
                            style={{ color: 'white' }}
                            onClick={() => this.returnToCalendar()}
                        >
                            Return to Staff Calendar
                        </Button>

                        {is_admin === "true" ? 
                            <Button
                            type="submit"
                            style={{ color: 'white' }}
                            onClick={() => this.goToAdminPage()}
                            >
                                Admin Site
                            </Button>
                            :
                            ""
                        }

                        <Button
                            type="submit"
                            style={{ color: 'white' }}
                            onClick={() => this.handleLogout()}
                        >
                            Logout
                        </Button>

                        
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    handleClose() {
        this.setState({
            open: false,
            currentItem:''
        })
    }

    handleTaskClick = (task) => {
        this.setState({
            currentItem: task,
            open: true,
        })
    }

    renderTaskModal = () => {
        const {calendarStore, classes} = this.props
        const {currentItem,open} = this.state
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                fullWidth
                maxWidth='md'
                backgroundColor ="white"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle className={classes.heading}>{currentItem.title}</DialogTitle>
                    <DialogContent >
                    <List> 
                        <ListItem>
                            <InsertDriveFileIcon/> &nbsp;&nbsp;
                            <Typography className={classes.dialogSecondaryHeading}>Attachment: </Typography> &nbsp;
                            {currentItem.attachedFile != null?
                            <div style={{width: '90%', margin: 'auto'}}>
                                <RenderDocumentPreview  id={currentItem.id} name={currentItem.attachedFile.fileName}/>
                            </div>
                            :
                            'No Attachment'
                            }
                        </ListItem>

                    {currentItem.event_type ==='common'?
                    <div>
                        <ListItem>
                            <TimerIcon/> &nbsp;&nbsp;
                            <Typography className={classes.dialogSecondaryHeading}>Hour Spent:</Typography> &nbsp;
                            <Typography>{currentItem.hour}</Typography>
                        </ListItem>

                        <ListItem>
                            <TrendingUpIcon/> &nbsp;&nbsp;
                            <Typography className={classes.dialogSecondaryHeading}>Status:</Typography> &nbsp;
                            <Typography>{currentItem.status}</Typography>
                        </ListItem>
                    </div>
                    :
                    ''
                    }

                    <div style={{width: '90%', margin: 'auto', marginBottom: '30px'}}>
                        <ReusableCommentBox
                            comments={currentItem.comments} 
                            calendarStore={calendarStore} 
                            task_id={currentItem.id} 
                            user_id={calendarStore.getUserData.id}
                        />
                    </div>
                    </List>
                    </DialogContent>
            </Dialog>
        )
    }

    renderStudentTaskPaper= (project) => {
        const{calendarStore,classes} = this.props;
        const eventList = calendarStore.getData.filter(task => task.project_id === project.id);
        const meetings = eventList.filter(task => task.event_type === 'meeting');
        const submissions = eventList.filter(task => task.event_type === 'submission');
        const commons = eventList.filter(task => task.event_type === 'common');  
        return (
            <div style={{display:'flex', width:'100%'}}>
                <div style ={{float:'left', width: '30%', marginRight:'20px'}}>

                    <Typography className={classes.taskTypeHeading}>Meetings</Typography>
                    <List >
                    {meetings.map(task =>
                        <ListItem button divider onClick={() => this.handleTaskClick(task)}>
                            <Typography>{task.title}</Typography>&nbsp;- &nbsp;
                            <Typography style={{fontStyle: 'italic'}}>{moment(task.deadline).format('Do MMM YYYY')}</Typography>
                        </ListItem> 
                    )}
                    </List>
                </div>
                <div style ={{float:'left', width: '30%', marginRight:'20px'}}>
                    <Typography className={classes.taskTypeHeading}>Tasks</Typography>
                    <List>
                    {commons.map(task =>
                        <ListItem button divider onClick={() => this.handleTaskClick(task)}>
                            <Typography>{task.title}</Typography> &nbsp;- &nbsp; 
                            <Typography style={{fontStyle: 'italic'}}>{moment(task.deadline).format('Do MMM YYYY')}</Typography>
                        </ListItem> 
                    )}
                    </List>
                </div> 
                <div style ={{float:'left', width: '30%', marginRight:'20px'}}>
                    <Typography className={classes.taskTypeHeading}>Submissions</Typography>
                    <List>
                    {submissions.map(task =>
                        <ListItem button divider onClick={() =>this.handleTaskClick(task)}>
                            <Typography>{task.title}</Typography>&nbsp;- &nbsp;
                            <Typography style={{fontStyle: 'italic'}}>{moment(task.deadline).format('Do MMM YYYY')}</Typography>
                        </ListItem> 
                    )}
                    </List>
                </div>  
                {this.renderTaskModal(this.state.currentItem)}
            </div>
        )
    }

    renderStudentTaskPanel= (project) => {
        const{calendarStore,classes} = this.props;
        const eventList = calendarStore.getData.filter(task => task.project_id === project.id) 
        return (
            <div className={classes.innerAccordion}>
                {eventList === null ?
                <Typography >No Task has been added for this Project</Typography>
                :
                eventList.map(task =>
                    <Accordion key={task.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                                <Typography>{task.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List className={classes.root}>
                                <ListItem>
                                    <ListItemText>
                                        <Typography>Date: {task.deadline}</Typography>
                                    </ListItemText>
                                </ListItem>
                                {task.event_type === "common" ?
                                <div className={classes.flex}>
                                    <div className={classes.column}>
                                        <Typography>Attachment: </Typography>
                                        {task.attachedFile != null?
                                        <div>
                                            
                                            <GetAppIcon style={{float: 'left'}}/>
                                            <RenderDocumentPreview  id={task.id} name={task.attachedFile.fileName}/>
                                            {/* <Typography><a href={"http://localhost:8080/fyp/api/downloadFile/task/" + task.id}>{task.attachedFile.fileName}</a></Typography> */}
                                        </div>
                                        :
                                        <div><Typography>The Task has no Attachment</Typography></div>
                                        }
                                        <ListItem>
                                            <ListItemText>
                                                <Typography>Hour Spent: {task.hourSpent}</Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </div>
                                    
                                    <div className={classes.column}>
                                        <ReusableCommentBox  comments={task.comments} calendarStore={calendarStore} task_id={task.id} user_id={calendarStore.getUserData.id}/>
                                    </div>
                                    
                                </div>
                                :
                                ""
                                }
                            </List>
                        </AccordionDetails>

                    </Accordion>
                )
                }
            </div>
        );
    }

    renderProjectPanels = (projects) => {
        // const handleClick = (e, index) => {

        // };
        const { classes, calendarStore} = this.props;
        const {open} = this.state;
        
        return (
            <div className={classes.root}>

                {projects.map((item, key) =>
                    <Accordion key={item.id} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{item.title}</Typography>
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{display:'flex', width:'100%'}}>
                                <div style ={{float:'left', width: '30%', marginRight:'20px'}}>
                                    <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        className={classes.root}
                                    >
                                        <ListItem>
                                            <Typography className={classes.description}>{item.description}</Typography>
                                        </ListItem>

                                        <ListItem>
                                            <AssignmentIndIcon />&nbsp;
                                            <Typography style={{fontSize:'18px'}}>Assigned Student:</Typography>&nbsp;&nbsp;&nbsp;
                                        { item.student === null ?
                                            <Typography className={classes.heading}>No student has been assigned to this project</Typography>
                                            :
                                            <ListItemText primary={ item.student.fname + ' ' + item.student.lname} secondary={item.student.email} />
                                        }
                                        </ListItem>

                                        <ListItem>
                                            <EditProjecButton calendarStore={calendarStore} project_id={item.id} onSubmitEditProject={this.onSubmitEditProject}/>
                                        </ListItem>

                                    </List>
                                </div>
                                <div style ={{float:'left', width: '75%'}}>
                                        
                                        
                                    <Typography style={{ marginBottom: '20px', fontSize:'30px'}}>Events and Tasks</Typography>
                                    
                                    {item.tasks.length === 0 ?
                                    <Typography >No Task has been added for this Project</Typography>
                                    :
                                    this.renderStudentTaskPaper(item)}
                                    
                                    
                                </div>    
                            
                            </div>
                        </AccordionDetails>
                    </Accordion>
                )}
            </div>
        )
    }

    renderNoProjectAvailable = () => {
        const { classes } = this.props;
        return (
            <div>
                No projects available
            </div>
        )
    }


    render() {
        const { classes, calendarStore} = this.props;
        const {projects} =  this.state;

        if (projects.length != 0) {
            return (
                <div>
                    {this.renderAppBar()}
                    {this.renderProjectPanels(projects)}
                </div>
            );
        } else {
            return (
                <div>
                    {this.renderAppBar()}
                    {this.renderNoProjectAvailable()}
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token,
        user: state.user,
        // projects: state.projects,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

const ProjectListingPage = observer(withStyles(useStyles)(ProjectListing));

export default connect(mapStateToProps,mapDispatchToProps) (ProjectListingPage);