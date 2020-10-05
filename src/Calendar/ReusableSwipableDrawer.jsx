import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import * as actions from '../../../login-store/actions/auth';
// import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
// import history from '../../../history'; 

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});


function ReusableSwipeableTemporaryDrawer({ calendarStore, type }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });
    const [currentPageEvent, setCurrentPageEvent] = React.useState('')
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const toggleDrawer = (side, open) => (event) => {
        setState({ ...state, [side]: open })
    }

    // const handleLogout = (e) => {
    //     logout()
    // }

    // const seeProjectListings = () => {
    //     history.push('/staff/projectlistings')
    // }

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            {
                type === 'Staff' ?
                    <React.Fragment>
                        <List>
                            <ListItem button key="projectlistings"  >
                                <ListItemText>Project Listings</ListItemText>
                            </ListItem>
                        </List>
                        <Divider />
                    </React.Fragment>
                    : ""
            }
            {
                type === 'Student' ?
                    <React.Fragment>
                        <List>
                            {['Weekly Report', 'Meetings', 'Submissions'].map((text, index) => (
                                <ListItem button key={text} >
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </React.Fragment>
                    : ''
            }
            <List>
                <ListItem button key="Logout" >
                    <ListItemText>Logout</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    // const onClickHandler = (text, index) => {
    //     const { changeDefaultState, addSelectedData, setDefaultNestedState } = calendarStore;
    //     var user_id = calendarStore.getUserData.id
    //     switch (text) {
    //         case "Weekly Report":
    //             changeDefaultState({ state: 'Weekly Report', index: 0 });
    //             history.push(`/${user_id}/content`);
    //             break;
    //         case "Meetings":
    //             changeDefaultState({ state: 'Meetings', index: 1 });
    //             history.push(`/${user_id}/content`);
    //             break;
    //         case "Final Report":
    //             changeDefaultState({ state: 'Final Report', index: 2 })
    //             setDefaultNestedState(2)
    //             history.push(`/${user_id}/content`)
    //             break;
    //         case "Interim Report":
    //             changeDefaultState({ state: 'Interim Report', index: 2 })
    //             setDefaultNestedState(1)
    //             history.push(`/${user_id}/content`)
    //             break;
    //         case "Strategy Plan":
    //             changeDefaultState({ state: 'Strategy Plan', index: 2 })
    //             setDefaultNestedState(0)
    //             history.push(`/${user_id}/content`)
    //             break;
    //         default:
    //             return "";
    //     }
    // }

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
// } connect(mapStateToProps, mapDispatchToProps)

export default ReusableSwipeableTemporaryDrawer