import React from 'react';
import {Grid, Button, Dialog} from '@material-ui/core';
import {observer} from 'mobx-react';

import LeftSideColumn from "./LeftSideColumn.jsx";
import ReusableCalendar from './ReusableCalendar.jsx';


const StudentPage = observer (
    class StudentPageClass extends React.Component {
        constructor(props) {
            super(props)
            this.calendarRef =  ReusableCalendar.FullCalendarRef
            this.state = {
                // add neccessary state for this component here
            }
        }

        componentWillMount(){ //load data before mounting this component
            const {calendarStore} = this.props;
            calendarStore.addUserType('Student'); 
            // if (calendarStore.getData.length === 0){
            //     var student_id = calendarStore.getUserData.id;
            //     // perform AXIOS calling here to the backend to load data if there is no data
                
            //     dummyEventData.map((dummyEvent) => calendarStore.addData(dummyEvent));    
            // }
            
        }

        render() {
            const {calendarStore} = this.props;
            console.log('renderStudentPage')
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