import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'
import { observer } from 'mobx-react';

const StaffCalendar = observer(
    class StaffCalendarClass extends React.Component {

        constructor(props){
            super(props);
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
            // use function find all task by staff_id by D
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
            console.log('Staff Calendar Updated!')
            const {calendarStore} = this.props;
            if(calendarStore.getData.length > 0){
                const events = calendarStore.getData;
                let calendarAPI = this.calendarRef.current.getApi();
                calendarAPI.addEvent(events[events.length-1]);
            }
        }

        render() {
            const {calendarStore} = this.props;
            var events =  calendarStore.getData;
            console.log('render Staff Calendar')

            return (
                <React.Fragment>
                    <FullCalendar
                        ref = {this.calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin]} 
                        initialView='dayGridMonth'
                        fixedWeekCount = {false}
                        hiddenDays = {[0,6]}
                        selectable ='true'
                        headerToolbar = {this.state.headerToolbar}
                        events = {events}
                        weekNumbers = {true}
                        weekNumberContent={this.calculateWeekNo}
                    />
                    <div>
                        <p>There are {calendarStore.getData.length} events </p>
                        <ul>
                        {calendarStore.getData.map((e, idx) => (
                            <li key={idx}>
                                {e.title} - {e.start.toString()} - Student {e.studentID}
                            </li>
                        ))}
                        </ul>
                    </div>
                </React.Fragment>
            )
        }
    }
)

export default StaffCalendar;