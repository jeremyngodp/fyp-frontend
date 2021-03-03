import React from 'react';
import {Grid} from '@material-ui/core';
import {observer} from 'mobx-react';

import ReusableCalendar from './ReusableCalendar.jsx';
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
            console.log(projectList);
            if (calendarStore.getData.length == 0) {
                projectList.map( project => {
                    calendarStore.addProjectList({
                        id: project.id,
                        title: project.name,
                        student: project.student,
                        tasks: project.taskList,
                        description: project.description
                    });

                    project.taskList.map( task => {
                        calendarStore.addData( {
                            id: task.id,
                            title: task.title,
                            attachedFile: task.attachedFile,
                            event_types: task.task_type,
                            start: task.deadline,
                            end: task.deadline,
                            project_id : project.id,
                            hour: task.hourSpent,
                            comments: task.comments,
                            student_id: task.student_id
                        })
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
                            <ReusableCalendar calendarStore={calendarStore} type="Staff"/>
                        </Grid>

                    </Grid>
                </div>
            )
        }
    }
)

export default StaffPage;