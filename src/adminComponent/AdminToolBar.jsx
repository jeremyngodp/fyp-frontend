import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux';
import * as actions from '../redux/login-store/actions/authActions';
import { Paper, Popover, Button, Typography, Divider, Grid, Tabs, Tab } from '@material-ui/core';
import history from '../history'

const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
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

class AdminToolBar extends Component {
    constructor(props) {
        super(props)
    }

    handleLogout = () => {
        const {calendarStore} = this.props
        calendarStore.resetStore()
        this.props.logout();
    }

    goToStaffPage =() => {
        history.push('/staff');
    }
    
    renderAppBar = () => {
        const {handleClick} = this.props;
        const { classes } = this.props;
        return (
            <div className={classes.appbarroot}>
                <AppBar position="static">
                    <Toolbar>
                        <Button
                            type="submit"
                            style={{ color: 'white' }}
                            onClick={handleClick}
                            value="project"
                        >
                            Projects 
                        </Button>

                        <Button
                            type="submit"
                            style={{ color: 'white' }}
                            value="setAdmin"
                            onClick={handleClick}
                        >
                            Set Admin
                        </Button>

                        <Button
                            style={{ color: 'white' }}
                            onClick={handleClick}
                            value="setSem"
                        >
                            Set Semester
                        </Button>

                        <Button
                            style={{ color: 'white' }}
                            onClick={handleClick}
                            value="userMgt"
                        >
                            User Management
                        </Button>

                        <Button
                            style={{ color: 'white' }}
                            onClick={()=> this.goToStaffPage()}
                            value="setSem"
                        >
                            Staff Calendar
                        </Button>

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

    render() {
        return (
            <div>
                {this.renderAppBar()}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(null,mapDispatchToProps)(withStyles(useStyles)(AdminToolBar))