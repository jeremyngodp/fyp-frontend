import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import * as actions from '../redux/login-store/actions/authActions';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import history from '../history'; 

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});


function ReusableSwipeableTemporaryDrawer({ calendarStore, logout, type }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });
    const [currentPageEvent, setCurrentPageEvent] = React.useState('')
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const toggleDrawer = (side, open) => (event) => {
        setState({ ...state, [side]: open })
    }

    const handleLogout = (e) => {
        calendarStore.resetStore()
        logout();
    }


    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem button key="myInfo" onClick={()=> onClickHandler('My Information',3)} >
                    <ListItemText>My Information</ListItemText>
                </ListItem>
            
                {
                    type === 'Staff' ?
                        <React.Fragment>
                                <ListItem button key="projectlistings" onClick={()=> onClickHandler('ProjectListing', 4)} >
                                    <ListItemText>Project Listings</ListItemText>
                                </ListItem>
                            <Divider />
                        </React.Fragment>
                        : ""
                }
                {
                    type === 'Student' ?
                        <React.Fragment>
                                {['Tasks', 'Meetings', 'Submissions'].map((text, index) => (
                                    <ListItem button key={text} onClick={() => onClickHandler(text,index)}>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            <Divider />
                        </React.Fragment>
                        : ''
                }
            
                <ListItem button key="Logout" onClick={()=> handleLogout()} >
                    <ListItemText>Logout</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    const onClickHandler = (text, index) => {
        const {changeDefaultState} = calendarStore;
        var username = calendarStore.getUserData.username;
        switch (text) {
            case "ProjectListing":
                changeDefaultState({ state: 'ProjectListing', index: 4 });
                history.push(`/staff/projectListings`);
                break;
            case 'My Information':
                changeDefaultState({ state: 'My Information', index: 3 });
                if (type==='Student'){
                    history.push(`/${username}/content`);
                }
                if (type==='Staff'){
                    history.push(`/staff/userinfo`);
                }
                console.log('Clicked on MyInfo')
                break;
            case "Submissions":
                changeDefaultState({ state: 'Submissions', index: 2 });
                history.push(`/${username}/content`);
                console.log('Clicked on Submissions')
                break;
            case "Meetings":
                changeDefaultState({ state: 'Meetings', index: 1 });
                history.push(`/${username}/content`);
                console.log('Clicked on Meetings')
                break;
            case "Tasks":
                changeDefaultState({ state: 'Tasks', index: 0 })
                history.push(`/${username}/content`)
                console.log('Clicked on Reports')
                break;
            default:
                return "";
        }
    }

    return (
        <div style={{ float: 'center', textAlign: 'center', lineHeight: '74px' }}>
            <IconButton onClick={toggleDrawer('left', true)}><MenuIcon /></IconButton>
            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token,
        user: state.user,
        // projects: state.projects,
        // paramQuery: state.paramQuery
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // setParam: (student_id, project_id) => dispatch(actions.addTasklistParams(student_id, project_id)),
        logout: () => dispatch(actions.logout())
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (ReusableSwipeableTemporaryDrawer)