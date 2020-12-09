import React from 'react';
import {Grid} from '@material-ui/core';
import {observer} from 'mobx-react';

import ReusabelCalendar from './ReusableCalendar.jsx';
import LeftSideColumn from './LeftSideColumn.jsx';
import axiosGetProjectListByStaffId from '../AxiosCall/axiosGetProjectByStaffId.js';

const StaffPage = observer (
    class StaffPageClass extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                // add neccessary state for this component here
            }
        }

        UNSAFE_componentWillMount(){ //load data before mounting this component
            const {calendarStore} = this.props; 
            calendarStore.addUserType('Staff');
            var projectList = JSON.parse(localStorage.getItem("projects"));
            
            if (calendarStore.getData.length == 0) {
                projectList.map( project => {
                    calendarStore.addProjectList({
                        id: project.id,
                        title: project.name,
                        student: project.student,
                        tasks: project.taskList,
                        description: project.description
                    });
                })
            }
            
        }

        render() {
            const {calendarStore} = this.props;
            console.log('render Staff Page')
            return (
                <div className='MainPage'>
                    <Grid container>
                        <Grid item xs={1} md={1}>
                                <LeftSideColumn calendarStore={calendarStore} type="Staff"/> 

                                {/* <h3>This is {calendarStore.getUserType} Page Calendar</h3> */}
                        </Grid>
                        

                        <Grid item xs={11} md={11}>
                            <ReusabelCalendar calendarStore={calendarStore} type="Staff"/>
                        </Grid>

                    </Grid>
                </div>
            )
        }
    }
)

export default StaffPage;