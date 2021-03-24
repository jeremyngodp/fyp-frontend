import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { connect } from 'react-redux';
import * as actions from '../../redux/login-store/actions/authActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import history from '../../history';
import ReusableCommentBox from '../ReusableTaskViewComponent/ReusableCommentComponent/ReusableCommentBox';
import EditProjecButton from '../buttons/EditProjectButton';
import { observer } from 'mobx-react';
import RenderDocumentPreview from "../ReusableTaskViewComponent/RenderDocumentPreview"


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

    description: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        align: theme.typography.center,
        fontStyle: 'italic',
    },

    icon: {
        margin: theme.spacing(4)
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
    }
})

class ProjectListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            projects : props.calendarStore.getProjectList,
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
        this.setState({
            projects: this.props.calendarStore.getProjectList
        })
    }

    UNSAFE_componentWillMount() {
        const {calendarStore} = this.props;
        if(!calendarStore.getLoadState) {
            var projectList = JSON.parse(localStorage.getItem('projects'))
            projectList.map( project => {
                calendarStore.addProjectList({
                    id: project.id,
                    title: project.name,
                    student: project.student,
                    tasks: project.taskList,
                    description: project.description
                });

                project.taskList.map( task => {
                    calendarStore.addData( {
                        id: task.id,
                        title: task.title,
                        attachedFile: task.attachedFile,
                        event_type: task.task_type,
                        start: task.deadline,
                        end: task.deadline,
                        project_id : project.id,
                        hour: task.hourSpent,
                        comments: task.comments,
                        student_id: task.student_id
                    })
                });
            })

            calendarStore.setLoadState();
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

                        {is_admin === 'true' ? 
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

    renderStudentTaskPanel= (project) => {
        const{calendarStore,classes} = this.props;
        return (
            <div className={classes.innerAccordion}>
                {project.tasks == null ?
                <Typography >No Task has been added for this Project</Typography>
                :
                project.tasks.map(task =>
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
                                {task.task_type === "common" ?
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
                            
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                className={classes.root}
                            >
                                <ListItem>
                                    <Typography className={classes.description}>{item.description}</Typography>
                                </ListItem>
                                {/* {item.student.map((item, key) =>
                                    <ListItem button key={item.id}
                                        // onClick={(event) => this.handleClickUser(event, item.id)}
                                    >
                                        <ListItemText primary={item.fname + item.lname} />
                                        <Typography className={classes.heading}>{item.email}</Typography>
                                    </ListItem>
                                )} */}

                                <ListItem>
                                    <EditProjecButton calendarStore={calendarStore} project_id={item.id} onSubmitEditProject={this.onSubmitEditProject}/>
                                </ListItem>
                                { item.student === null ?
                                <ListItem>
                                    <Typography className={classes.heading}>No student has been assigned to this project</Typography>
                                </ListItem>
                                :
                                <div>
                                    <ListItem key={item.student.id}>
                                        <AssignmentIndIcon className={classes.icon}/>
                                        <ListItemText primary={ item.student.fname + ' ' + item.student.lname} secondary={item.student.email} />
                                    </ListItem>
                                    {/* <Dialog
                                        open={open}
                                        onClose={this.handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <StudentDialogContent project={item} handleClose={this.handleClose}/>

                                    </Dialog> */}
                                    <ListItem>
                                        <ListItemText>
                                            <Typography className={classes.heading}>Tasks</Typography>
                                        </ListItemText>
                                        {item.tasks.length === 0 ?
                                        <Typography className={classes.description}>No Task has been added for this Project</Typography>
                                        :
                                        this.renderStudentTaskPanel(item)}
                                    </ListItem>
                                </div>
                                }
                            </List>
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

        if (projects != null) {
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