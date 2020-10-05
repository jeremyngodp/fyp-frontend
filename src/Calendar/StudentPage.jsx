import React from 'react';
import {Grid, Button, Dialog} from '@material-ui/core';
import {observer} from 'mobx-react';

import LeftSideColumn from "./LeftSideColumn.jsx";
import ReusableCalendar from './ReusableCalendar.jsx';

var dummyEventData = [{title: "meeting", start: "2020-10-07", end: "2020-10-07" }, 
                      {title: "meeting", start: "2020-10-06", end: "2020-10-06" },
                      {title: "submission", start: "2020-10-08", end: "2020-10-08"},
                      {title: "report", start: "2020-10-08", end: "2020-10-08"}, 
                     ]


const StudentPage = observer (
    class StudentPageClass extends React.Component {
        constructor(props) {
            super(props)
            this.calendarRef =  ReusableCalendar.FullCalendarRef
            this.state = {
                // add neccessary state for this component here
            }
        }

        componentDidMount(){ //load data before mounting this component
            const {calendarStore} = this.props; 
            if (calendarStore.getData.length === 0){
                var student_id = calendarStore.getUserData.id;
                // perform AXIOS calling here to the backend to load data if there is no data
                calendarStore.addUserType('Student');
                dummyEventData.map((dummyEvent) => calendarStore.addData(dummyEvent));    
            }
            
        }

        render() {
            const {calendarStore} = this.props;
            
            return (
                <div className='MainPage'>
                    <Grid container>
                        <Grid item xs={1} md={1}>
                                <LeftSideColumn calendarStore={calendarStore} type={calendarStore.getUserType} calendarRef={this.calendarRef}/>

                                <h3>This is {calendarStore.getUserType} Page Calendar</h3>
                        </Grid>
                        

                        <Grid item xs={11} md={11}>
                            <ReusableCalendar calendarStore={calendarStore}  type={calendarStore.getUserType}/>
                        </Grid>

                    </Grid>
                </div>
            )
        }
    }
)

export default StudentPage;