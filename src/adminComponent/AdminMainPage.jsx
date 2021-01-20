import React, {Component} from 'react';
import AdminProjectView from './AdminProjectView';
import AdminSetAdmin from './AdminSetAdmin';
import AdminSetSemester from './AdminSetSemester';
import AdminToolBar from './AdminToolBar';
import { Paper, Popover, Button, Typography, Divider, Grid } from '@material-ui/core';

class AdminMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPanel: "project"
        }
    }

    decideView = () => {
        switch(this.state.currentPanel) {
            case 'setSem':
                return <AdminSetSemester />;
                
            case 'setAdmin':
                return <AdminSetAdmin />;
                
            default: 
                return <AdminProjectView calendarStore={this.props.calendarStore} />;
                
        }
    }

    handleClick = (e) => {
        console.log(e.currentTarget.value);
        this.setState({
            currentPanel :  e.currentTarget.value
        })
    }

    
    render() {

        return (
            <div>
                <AdminToolBar handleClick={this.handleClick}/>
                {this.decideView()}
            </div>
        )
    }
}

export default AdminMainPage;