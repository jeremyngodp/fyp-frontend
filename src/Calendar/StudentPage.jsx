import React from 'react';
import {Grid, Button, Dialog} from '@material-ui/core';
import {observer} from 'mobx-react';
import axios from 'axios'

import LeftSideColumn from "./LeftSideColumn.jsx";
import ReusableCalendar from './ReusableCalendar.jsx';
import axiosGetTaskbyStudentID from '../AxiosCall/axiosGetTaskbyStudentID.js';

const StudentPage = observer (
    class StudentPageClass extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                // add neccessary state for this component here
            }
        }


        UNSAFE_componentWillMount(){ //load data before mounting this component
            const {calendarStore} = this.props;
            calendarStore.addUserType('Student');
            var studentUserId = calendarStore.getUserData.id
            console.log(studentUserId)
            
            if (calendarStore.getData.length === 0){
                // var student_id = calendarStore.getUserData.id;
                // perform AXIOS calling here to the backend to load data if there is no data
                // what about student that has not had any task?
                axiosGetTaskbyStudentID(studentUserId, calendarStore);    
            }

            // axios testing:
            // axios.get("http://localhost:8080/fyp/api/task/student/1")
            // .then(res => {
            //     res.data._embedded.taskList.map(indivRes =>{
            //         console.log(indivRes.title)
            //     })
            // });
            
            
        }

        render() {
            const {calendarStore} = this.props;
            console.log('render Student Page')
            return (
                <div className='MainPage'>
                    <Grid container>
                        <Grid item xs={1} md={1}>
                            <LeftSideColumn calendarStore={calendarStore} type="Student" calendarRef={this.calendarRef}/>

                            <h3>Welcome {calendarStore.getUserData.id} </h3>
                        </Grid>
                        

                        <Grid item xs={11} md={11}>
                            <ReusableCalendar calendarStore={calendarStore}  type="Student"/>
                        </Grid>

                    </Grid>
                </div>
            )
        }
    }
)

export default StudentPage;