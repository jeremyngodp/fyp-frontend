import React from 'react';
import {Grid, Button, Dialog} from '@material-ui/core';
import {observer} from 'mobx-react';
import axios from 'axios'
import moment from 'moment'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import LeftSideColumn from "../LeftSideColumn.jsx";
import ReusableCalendar from '../ReusableCalendar.jsx';
import axiosGetProjectListByStudentId from '../../AxiosCall/axiosGetProjectByStudentId.js';


const StudentPage = observer (
    class StudentPageClass extends React.Component {
        constructor(props) {
            super(props)
            this.calendarRef = React.createRef();
            this.state = {
                // add neccessary state for this component here
                headerToolbar : {
                    start: 'title',
                    center: '', 
                    end: 'today dayGridMonth prev next',
                    
                },
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
                axiosGetProjectListByStudentId(calendarStore.getUserData.id, calendarStore)
                var projectList = JSON.parse(localStorage.getItem("projects"));
                console.log(projectList)
                // console.log(typeof(projectList))
                // console.log(Array.isArray(projectList))
                projectList.map(project => {
                    calendarStore.addProjectList({
                        id: project.id,
                        title: project.name,
                        student: project.student,
                        supervisor: project.supervisor,
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
                            deadline: task.deadline,
                            end: task.deadline,
                            project_id : project.id,
                            hour: task.hourSpent,
                            comments: task.comments,
                            student_id: task.student_id,
                            status: task.status,

                        })
                    })
                })

                calendarStore.setLoadState(true);
            }

            // axios testing:
            // axios.get("http://localhost:8080/fyp/api/task/student/1")
            // .then(res => {
            //     res.data._embedded.taskList.map(indivRes =>{
            //         console.log(indivRes.title)
            //     })
            // });
            
            
        }

        calculateWeekNo = (date) => {
            const semStart = this.props.calendarStore.semStart;
            var formattedDate = moment(date.date);
            var formattedSemStart = moment(semStart);
            let weekNumber = Math.floor(formattedDate.diff(formattedSemStart, 'days')/7) +1 ;
            if (weekNumber >= 1 && weekNumber <=14) {
                if (weekNumber >= 0 && weekNumber <=7) {
                    return 'Sem 1 - Week ' + weekNumber;    
                }
                else if (weekNumber  === 8) {
                    return 'Recess Week';
                }
                
                else if ( weekNumber >= 9 || weekNumber <= 14 ) {
                    return 'Sem 1 - Week ' + (weekNumber -= 1)
                }
            }

            else {
                return 'Non-Academic Week';
            }
            
        }


        render() {
            const {calendarStore} = this.props;
            const eventList = calendarStore.getData;
            console.log('render Student Page')
            return (
                <div className='MainPage'>
                    <Grid container>
                        <Grid item xs={1} md={1}>
                            <LeftSideColumn calendarStore={calendarStore} type="Student" calendarRef={this.calendarRef}/>
                        </Grid>
                        

                        <Grid item xs={11} md={11}>
                            <React.Fragment>
                                <FullCalendar 
                                    ref = {this.calendarRef}
                                    plugins={[ dayGridPlugin, interactionPlugin ]}
                                    initialView="dayGridMonth"
                                    hiddenDays={[0,6]}
                                    selectable ='true'
                                    fixedWeekCount = {false}
                                    events = {eventList}
                                    headerToolbar = {this.state.headerToolbar}
                                    weekNumbers = {true}
                                    weekNumberContent = {this.calculateWeekNo}
                                />
                                
                            </React.Fragment>
                        </Grid>

                    </Grid>
                </div>
            )
        }
    }
)

export default StudentPage;