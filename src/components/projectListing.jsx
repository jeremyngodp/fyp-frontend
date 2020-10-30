import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// import { connect } from 'react-redux';
// import * as actions from '../login-store/actions/auth';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import history from '../history';

const useStyles = (theme) => ({
    root: {
        width: '100%',
    },  
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },

    description: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        align: theme.typography.center
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
})

class ProjectListing extends Component {
    constructor(props) {
        super(props);
    }

    // handleLogout = () => {
    //     this.props.logout();
    // }

    // handleClickUser = (e, index) => {
    //     //This onclick sends to the student's content page
    //     const value = index;
    //     this.props.setParam(value, null);
    //     history.push(`/${value}/content`);
    // }

    returnToCalendar = () =>{
        history.push('/staff/calendar');
    }

    renderAppBar = () => {
        const { classes } = this.props;
        return (
            <div className={classes.appbarroot}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Hi, UserName
                        </Typography>

                        <Button
                            type="submit"
                            style={{ color: 'white' }}
                            onClick={() => this.returnToCalendar()}
                        >
                            Return to Staff Calendar
                        </Button>

                        <Button
                            type="submit"
                            style={{ color: 'white' }}
                            // onClick={() => this.handleLogout()}
                        >
                            Logout
                        </Button>

                        
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    renderProjectPanels = () => {
        // const handleClick = (e, index) => {

        // };
        const { classes } = this.props;
        return (
            <div className={classes.root}>

                {this.props.projects.map((item, key) =>
                    <Accordion key={item.id} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{item.name}</Typography>
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                className={classes.root}
                            >
                                <ListItem>
                                    <Typography className={classes.heading}>{item.description}</Typography>
                                </ListItem>
                                {/* {item.student.map((item, key) =>
                                    <ListItem button key={item.id}
                                        // onClick={(event) => this.handleClickUser(event, item.id)}
                                    >
                                        <ListItemText primary={item.fname + item.lname} />
                                        <Typography className={classes.heading}>{item.email}</Typography>
                                    </ListItem>
                                )} */}
                                <ListItem button key={item.student.id}
                                        // onClick={(event) => this.handleClickUser(event, item.id)}
                                    >
                                        <AssignmentIndIcon className={classes.icon}/>
                                        <ListItemText primary={ item.student.fname + ' ' + item.student.lname} secondary={item.student.email} />
                                </ListItem>
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
        const { classes } = this.props;

        if (this.props.projects != null) {
            return (
                <div>
                    {this.renderAppBar()}
                    {this.renderProjectPanels()}
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

// const mapStateToProps = (state) => {
//     return {
//         loading: state.loading,
//         error: state.error,
//         token: state.token,
//         user: state.user,
//         projects: state.projects,
//         paramQuery: state.paramQuery
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         setParam: (student_id, project_id) => dispatch(actions.addTasklistParams(student_id, project_id)),
//         logout: () => dispatch(actions.logout())
//     }
// }

const ProjectListingForm = withStyles(useStyles)(ProjectListing);

export default (ProjectListingForm);