import React from 'react';
import {Grid} from '@material-ui/core';
import {observer} from 'mobx-react';

import ReusabelCalendar from './ReusableCalendar.jsx';
import LeftSideColumn from './LeftSideColumn.jsx';

const dummyEventData =[{title: 'Meeting 1',
                        start: '2020-10-13',
                        end: '2020-10-13',
                        event_type: 'meeting',
                        studentID: 1},
                        

                        {title: 'Meeting 2',
                        start: '2020-10-09',
                        end: '2020-10-09',
                        event_type: 'meeting',
                        studentID: 3},

                        {title: 'Report 1',
                        start: '2020-10-14',
                        end: '2020-10-14',
                        event_type: 'meeting',
                        studentID: 2},
                    ]

const StaffPage = observer (
    class StaffPageClass extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                dummy: 'true'
                // add neccessary state for this component here
            }
        }

        UNSAFE_componentWillMount(){ //load data before mounting this component
            const {calendarStore} = this.props; 
            calendarStore.addUserType('Staff');

            if (calendarStore.getData.length === 0){
                // var staff_id = calendarStore.getUserData.id;
                // perform querying here to the backend to load data if there is no data
                // stored in calendarStore
                dummyEventData.map((dummyEvent) => calendarStore.addData(dummyEvent));    
            }
        }

        render() {
            const {calendarStore} = this.props;
            console.log('render Staff Page')
            return (
                <div className='MainPage'>
                    <Grid container>
                        <Grid item xs={1} md={1}>
                                <LeftSideColumn calendarStore={calendarStore} type={calendarStore.getUserType}/> 

                                <h3>This is {calendarStore.getUserType} Page Calendar</h3>
                        </Grid>
                        

                        <Grid item xs={11} md={11}>
                            <ReusabelCalendar calendarStore={calendarStore} type={calendarStore.getUserType}/>
                        </Grid>

                    </Grid>
                </div>
            )
        }
    }
)

export default StaffPage;