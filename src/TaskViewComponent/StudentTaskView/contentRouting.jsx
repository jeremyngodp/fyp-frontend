import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import {
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider, IconButton, ListItem, ListItemText, Box, Button, Collapse
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import * as actions from '../../redux/login-store/actions/authActions';

import MeetingContentPage from './MeetingContentPage';
import TaskBoardPage from './TaskBoardPage';
import SubmissionContentPage from './SubmissionContentPage';
import { connect } from 'react-redux';
import axiosGetProjectListByStudentId from '../../AxiosCall/axiosGetProjectByStudentId';
import MyInfo from '../../Calendar/MyInfo';


const useStyles = (theme) => ({
    root: {
        display: 'flex',
    },
    appbarroot: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // backgroundColor: '#2A2C5D',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    },
    appBarShift: {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        // width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        // width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    selected: {
        "&.Mui-selected": {
            backgroundColor: "rgba(128, 128, 128, 0.2)",
            width: "100%",
            float: "left",
        }
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
})

const ContentRouting = observer(
    class ContentRouting extends Component {
        constructor(props) {
            super(props);
            let {index, state} = props.calendarStore.getDefaultState
            this.state = {
                open: false,
                currentPageEvent: state,
                selectedIndex: index,
                events: props.calendarStore.getData,
                totalHour: 0
            }
        }

        UNSAFE_componentWillMount() {
            const {calendarStore} = this.props;
            
            if(!calendarStore.getLoadState) {
                console.log("load not true")
                axiosGetProjectListByStudentId(calendarStore.getUserData.id, calendarStore)
                var projectList = JSON.parse(localStorage.getItem('projects'))
                projectList.map( project => {
                    calendarStore.addProjectList({
                        id: project.id,
                        title: project.name,
                        student: project.student,
                        supervisor: project.supervisor,
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

        handleDrawerOpen = () => {
            this.setState({ open: true })
        }

        handleLogout = () => {
            const {calendarStore} = this.props;
            calendarStore.resetStore()
            this.props.logout();
        }

        handleDrawerClose = () => {
            this.setState({ open: false })
        }

        renderSwitchCase = (param) => {
            const { calendarStore } = this.props;
            switch (param) {
                case 'My Information':
                    return <MyInfo calendarStore={calendarStore}/>
                case 'Meetings':
                    return <MeetingContentPage calendarStore={calendarStore}  events={this.state}/>
                case 'Tasks':
                    return <TaskBoardPage calendarStore={calendarStore} onSubmitEditTask={this.onSubmitEditTask} user_id={calendarStore.getUserData.id} events={this.state}/>
                case 'Submissions':
                    return <SubmissionContentPage calendarStore={calendarStore} events={this.state}/>
                default:
                    return "No drawer found";
            }
        }

        onClickHandler = (text, index) => {
            this.setState({
                currentPageEvent: text,
                selectedIndex: index,
                open: false,
            })
        }

        onSubmitEditTask = () => {
            this.setState({
                events: this.props.calendarStore.getData
            })
        }

        render() {
            const {calendarStore, classes, history} = this.props;
            const {open, currentPageEvent, selectedIndex} = this.state;
            var events = calendarStore.getData;
            var hour = 0;
            events.map(task => {
                hour += Number(task.hour);
            });

            

            return (    
                <div>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <div style={{ width: "100%" }}>
                                <div style={{ float: 'left', width: '50%' }}>
                                    <div style={{ float: 'left' }}>
                                        <Typography variant="h5" noWrap>
                                            <Box fontWeight="fontWeightBold">
                                                {currentPageEvent}
                                            </Box>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="subtitle1" noWrap style={{ paddingTop: '4px', paddingLeft: '2%' }}>
                                            You have spent {hour} hour on the project
                                        </Typography>
                                    </div>
                                </div>

                                <div style={{ float: 'right', width: '50%' }}>
                                    <div style={{ float: 'right' }}>
                                        {calendarStore.userType === 'Student' ?
                                            <Button onClick={() => history.push('/student')} style={{ color: 'white' }}>Return to main Student calendar</Button>
                                            :
                                            <Button onClick={() => history.push('/staff')} style={{ color: 'white' }}>Return to main Staff calendar</Button>
                                        }
                                        {/* <Button onClick={() => this.props.history.push('/student/calendar')} style={{ color: 'white' }}>Return to main calendar</Button> */}
                                    </div>
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar> 
                    <Drawer
                         className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader} >
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                        
                            {[ 'My Information', 'Tasks','Meetings', 'Submissions'].map((text, index) => (
                                <ListItem
                                    selected={selectedIndex === index}
                                    button key={text}
                                    onClick={() => this.onClickHandler(text, index)}
                                    classes={{
                                        selected: classes.selected
                                    }}
                                >
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}

                        </List>
                        <Divider />
                        <List>
                            <ListItem button key="Logout" onClick={() => this.handleLogout()}>
                                <ListItemText>Logout</ListItemText>
                            </ListItem>
                        </List>
                    </Drawer>

                    <main
                         className={clsx(classes.content, {
                             [classes.contentShift]: open,
                         })}
                    >
                        <div className={classes.drawerHeader} />
                        {this.renderSwitchCase(currentPageEvent)}
                    </main>
                    
                </div>
            )

           
        }

    }
)
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}
export default connect(null, mapDispatchToProps)( withStyles(useStyles)(ContentRouting));
