import React from 'react';
import {Grid} from '@material-ui/core';
import {observer} from 'mobx-react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'
import ReusableCalendar from '../ReusableCalendar.jsx';
import LeftSideColumn from '../LeftSideColumn.jsx';
import axiosGetAllStudent from '../../AxiosCall/axiosGetAllStudent'
import axiosGetProjectListByStaffId from '../../AxiosCall/axiosGetProjectByStaffId.js';

const StaffPage = observer (
    class StaffPageClass extends React.Component {
        constructor(props) {
            super(props)
            this.calendarRef = React.createRef();
            this.state = {
                headerToolbar : {
                    start: 'title',
                    center: '', 
                    end: 'today dayGridMonth prev next',
                    
                },
                // add neccessary state for this component here
            }
        }

        UNSAFE_componentWillMount(){ //load data before mounting this component
            const {calendarStore} = this.props; 
            calendarStore.addUserType('Staff');
            
            console.log(projectList);
            if (!calendarStore.getLoadState) {
                axiosGetAllStudent(calendarStore)
                axiosGetProjectListByStaffId(calendarStore.getUserData.id,calendarStore)
                var projectList = JSON.parse(localStorage.getItem("projects"));
                projectList.map( project => {
                    calendarStore.addProjectList({
                        id: project.id,
                        title: project.name,
                        student: project.student,
                        tasks: project.taskList,
                        description: project.description,
                        staff: project.supervisor,
                    });

                    project.taskList.map( task => {
                        calendarStore.addData( {
                            id: task.id,
                            title: task.title,
                            attachedFile: task.attachedFile,
                            event_type: task.task_type,
                            start: task.deadline,
                            end: task.deadline,
                            deadline: task.deadline,
                            project_id : project.id,
                            hour: task.hourSpent,
                            comments: task.comments,
                            student_id: task.student_id,
                            status: task.status
                        })
                    });
                })
                
                calendarStore.setLoadState(true)
            }
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
            const eventList = calendarStore.getData
            console.log('render Staff Page')
            return (
                <div className='MainPage'>
                    <Grid container>
                        <Grid item xs={1} md={1}>
                                <LeftSideColumn calendarStore={calendarStore} calendarRef={this.calendarRef} type="Staff"/> 

                                {/* <h3>This is {calendarStore.getUserType} Page Calendar</h3> */}
                        </Grid>
                        

                        <Grid item xs={11} md={11}>
                            <React.Fragment>
                                <FullCalendar
                                    ref = {this.calendarRef}
                                    plugins={[dayGridPlugin, interactionPlugin]} 
                                    initialView='dayGridMonth'
                                    fixedWeekCount = {false}
                                    hiddenDays = {[0,6]}
                                    selectable ='true'
                                    headerToolbar = {this.state.headerToolbar}
                                    events = {eventList}
                                    weekNumbers = {true}
                                    weekNumberContent={this.calculateWeekNo}
                                />
                                
                            </React.Fragment>
                        </Grid>

                    </Grid>
                </div>
            )
        }
    }
)

export default StaffPage;