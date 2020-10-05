import React from 'react';
import {Grid} from '@material-ui/core';
import {observer} from 'mobx-react';

import ReusabelCalendar from './ReusableCalendar.jsx';
import LeftSideColumn from './LeftSideColumn.jsx';

class StaffPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dummy: 'true'
            // add neccessary state for this component here
        }
    }

    componentDidMount(){ //load data before mounting this component
        const {calendarStore} = this.props; 
        if (calendarStore.getData.length === 0){
            var staff_id = calendarStore.getUserData.id;
            // perform querying here to the backend to load data if there is no data
            // stored in calendarStore
            calendarStore.addUserType('Staff');
        }
    }

    render() {
        const {calendarStore} = this.props;

        return (
            <div className='MainPage'>
                <Grid container>
                    <Grid item xs={1} md={1}>
                            <LeftSideColumn calendarStore={calendarStore} type={calendarStore.getUserType}/> 

                            <h3>This is {calendarStore.getUserType} Page Calendar</h3>
                    </Grid>
                    

                    <Grid item xs={11} md={11}>
                        <ReusabelCalendar calendarStore={calendarStore} type="Staff"/>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default observer(StaffPage);