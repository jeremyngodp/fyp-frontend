import React from 'react';
import {Grid, Button, Dialog} from '@material-ui/core';
import {observer} from 'mobx-react';
import axios from 'axios'

import LeftSideColumn from "../LeftSideColumn.jsx";
import ReusableCalendar from '../ReusableCalendar.jsx';


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
            // const projectList = JSON.parse(localStorage.getItem("projects"));
            // projectList.map(project => {
            //     calendarStore.addProjectList({
            //         id: project.id,
            //         title: project.name,
            //         student: project.student,
            //         tasks: project.taskList,
            //         description: project.description
            //     });
            // })
            var studentUserId = calendarStore.getUserData.id
            console.log(studentUserId)
            
            // if (calendarStore.getData.length === 0){
            //     // var student_id = calendarStore.getUserData.id;
            //     // perform AXIOS calling here to the backend to load data if there is no data
            //     // what about student that has not had any task?
            //     axiosGetTaskbyStudentID(studentUserId, calendarStore);    
            // }

            if(!calendarStore.getLoadState) {
                const projectList = JSON.parse(localStorage.getItem("projects"));
                projectList.map(project => {
                    calendarStore.addProjectList({
                        id: project.id,
                        title: project.name,
                        student: project.student,
                        tasks: project.taskList,
                        description: project.description
                    });

                    project.taskList.map(task => {
                        calendarStore.addData( {
                            id: task.id,
                            title: task.title,
                            attachedFile: task.attachedFile,
                            event_type: task.task_type,
                            start: task.deadline,
                            end: task.deadline,
                            project_id : project.id,
                            hour: task.hourSpent,
                            comments: task.comments,
                            student_id: task.student_id,
                            status: task.status,

                        })
                    })
                })

                calendarStore.setLoadState();
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