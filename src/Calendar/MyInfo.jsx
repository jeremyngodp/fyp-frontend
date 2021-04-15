import {withStyles} from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import {Drawer, Dialog,Toolbar, Button, AppBar, List, Divider, IconButton, ListItemText, ListItem, 
    Typography, CssBaseline, DialogTitle, DialogContent, TextField} from '@material-ui/core';
import history from '../history';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../redux/login-store/actions/authActions';


const useStyles = (theme) => ({
    errorMsg: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        width: '20%',
        margin: '0 auto',
        marginTop: '10px',
        // alignItem: 'center'
    },
    title: {
        flexGrow: 1,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    headings: {
        fontSize: '30px',
        marginBottom: '10px'
    },
    subheadings: {
        fontSize: '17px',
        fontWeight: 400,
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
})

class MyInfoClass extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            openModal: false,
            openDrawer: false,
            currentpwd: "",
            password: "",
            cpassword: "",
        }
    }

    renderChangePwdModal = () => {
        const {classes} = this.props
        let errorMessage =' '
        if (this.state.error) {
            errorMessage = (
            // <p className={classes.errorMsg} >{this.props.error.message}</p>
            <p className={classes.errorMsg}>{this.state.error}</p>
            );
        }

        return (
            

            <Dialog fullwidth maxwidth="lg" open={this.state.openModal} onClose={this.handleClose}>
                <DialogTitle>
                    <Typography style={{fontSize:'20px', fontStyle: 'bold'}}>Change Password</Typography>
                </DialogTitle>
                <DialogContent>
                    {errorMessage}
                    <form className={classes.form} onSubmit={this.changePassword} method="POST">
                        <div>
                            <Typography>Current Password: </Typography>
                            <TextField autoComplete="current-password" type="password" name='currentpwd' onChange={this.handleChange}/>
                        </div>

                        <div>
                            <Typography>New Password: </Typography>
                            <TextField autoComplete="new-password" type="password" name='password' onChange={this.handleChange}/>
                        </div>

                        <div>
                            <Typography>Confirm New Password: </Typography>
                            <TextField autoComplete="new-password" type="password" name='cpassword' onChange={this.handleChange}/>    
                        </div>
                        
                        <Button onClick={this.changePassword}>Confirm</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }

    handleLogout = () => {
        const {calendarStore} = this.props;
        calendarStore.resetStore()
        this.props.logout();
    }

    openChangePwdModal =() => {
        this.setState({
            openModal: true
        })
    }

    handleClose = () => {
        this.setState ({
            openModal: false
        })
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            error: "",
            [e.target.name]: value
        })
    }

    handleDrawerClose = () => {
        this.setState({ openDrawer: false })
    }

    handleDrawerOpen = () => {
        this.setState({ openDrawer: true })
    }

    returnToCalendar = () =>{
        history.push('/staff/calendar');
    }

    goToAdminPage = () => {
        history.push('/admin');
    }

    changePassword = () => {
        const{currentpwd, password, cpassword} = this.state;
        const username = this.props.calendarStore.getUserData.username;
        axios.post("http://localhost:8080/fyp/api/user/authenticate", {
            username: username,
            password: currentpwd
        }).then(() => {
            if(cpassword === password) {
                axios.put("http://localhost:8080/fyp/api/user/changepwd/" + username, {
                    password: password
                }, {headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }})

                this.handleClose();
            }

            else {
                this.setState(
                    {error:'Confirm Password and New Password do not match!'}
                )
            }
        }).catch(error => {
            console.log(error)
            this.setState(
                {error:'Error occured! Your current password might be incorrect!'}
            )
        }
            
        )
    }

    renderStaffAppBar = () => {
        const { classes, calendarStore } = this.props;
        const {openDrawer} = this.state
        const is_admin = localStorage.getItem('is_admin');
        console.log(is_admin)
        return (
            <div className={classes.appbarroot}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, openDrawer && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
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
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={openDrawer}
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
                        <ListItem button>
                            <ListItemText onClick={() => {history.push("/staff/userinfo")}}>My Information</ListItemText>
                        </ListItem>

                        <ListItem button>
                            <ListItemText onClick={() =>{history.push("/staff/projectListings")}}>Project Listing</ListItemText>
                        </ListItem>
                       

                    </List>
                    <Divider />
                    <List>
                        <ListItem button key="Logout" onClick={() => this.handleLogout()}>
                            <ListItemText>Logout</ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        );
    }

    renderStudentProject() {
        const{calendarStore, classes} = this.props;
        const project = calendarStore.getProjectList[0];

        return (
            <div style={{float:'left', width:'75%'}}>
                <Typography className={classes.headings}>Project Information</Typography>
                {project == null ?
                'No Project assigned yet'
                :
                <List>
                    <ListItem>
                        <Typography className={classes.subheadings}>Project:</Typography> &nbsp;
                        <Typography>{project.title}</Typography>
                    </ListItem>

                    <ListItem>
                        <Typography className={classes.subheadings}>Description:</Typography> &nbsp;
                        <Typography>{project.description}</Typography>
                    </ListItem>

                    <ListItem>
                        <Typography className={classes.subheadings}>Supervisor:</Typography> &nbsp;
                        <Typography>{project.supervisor.lname} {project.supervisor.fname}</Typography>
                    </ListItem>

                    <ListItem>
                        <Typography className={classes.subheadings}>Supervisor Email:</Typography> &nbsp;
                        <Typography>{project.supervisor.email}</Typography>
                    </ListItem>
                </List>
                }
            </div>
        )
    }
    
    render() {
        const{calendarStore, classes} = this.props;
        const user = calendarStore.getUserData;
        
        
        return (
            <div>
                {user.is_staff? 
                this.renderStaffAppBar()
                :
                ""
                }
                <div style={{display:'flex', width:'100%'}}>
                    <div style={{float:'left', width:'20%', marginLeft: '20px'}}>
                    <Typography className={classes.headings}>Account Information</Typography>
                        <List>
                            <ListItem>
                                <Typography className={classes.subheadings}>Username:</Typography> &nbsp;
                                <Typography>{user.username}</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography className={classes.subheadings}>Fullname:</Typography> &nbsp;
                                <Typography>{user.fullname}</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography className={classes.subheadings}>Email:</Typography> &nbsp;
                                <Typography>{user.email}</Typography>
                            </ListItem>

                            <ListItem>
                                <Button onClick={() => this.openChangePwdModal()}>Change Password</Button>
                            </ListItem>
                        </List>
                    </div>

                    
                    
                    {user.is_staff? 
                    ""
                    :
                    this.renderStudentProject()    
                    }

                    {this.renderChangePwdModal()}
                </div>
            </div>
        )
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

const MyInfo = withStyles(useStyles) (MyInfoClass)
export default connect(mapStateToProps,mapDispatchToProps) (MyInfo);