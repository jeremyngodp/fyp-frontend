import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { observer } from 'mobx-react';
import moment from 'moment'

const StudentCalendar = observer(
    class StudentCalendarClass extends React.Component {
        
        constructor(props){
            super(props)
            this.calendarRef = React.createRef();
            this.state = {
                headerToolbar : {
                    start: 'title',
                    center: '', 
                    end: 'today dayGridMonth prev next',
                    
                },
            }
        }

        handleDateClick = (arg) => { // bind with an arrow function
            var date = arg.dateStr //capture date
            
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
        
        componentDidUpdate() {
            console.log('Component Updated!')
            const {calendarStore} = this.props;
            if(calendarStore.getData.length > 0){
                const events = calendarStore.getData;
                let calendarAPI = this.calendarRef.current.getApi();
                calendarAPI.addEvent(events[events.length-1]);
            }
        }

        render() {
            const {calendarStore} = this.props;
            const eventList = calendarStore.getData;
            console.log('render Student Calendar')
            console.log(eventList);
            
            return (    
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
            )
        }
    }
)

export default StudentCalendar;