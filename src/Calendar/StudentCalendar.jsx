import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BasicCalendar from './BasicFullCalendar';
import { observer } from 'mobx-react';



var dummyEventData = [{title: "meeting", start: "2020-10-07", end: "2020-10-07" }, 
                      {title: "report", start: "2020-10-06", end: "2020-10-06" },
                      {title: "submission", start: "2020-10-08", end: "2020-10-08" } 
                     ]

const StudentCalendar = observer(

    class StudentCalendarClass extends React.Component {
        
        constructor(props){
            super()
            this.calendarRef = React.createRef();
            this.state = {
                redirectAddTask: false,
                headerToolbar : {
                    start: 'title',
                    center: '', 
                    end: 'today dayGridMonth prev next',
                    
                },

                currentEvents: props.calendarStore.getData,
            }
        }


        handleDateClick = (arg) => { // bind with an arrow function
            var date = arg.dateStr //capture date
            
        }

        // componentWillMount() {
        //     const {calendarStore} = this.props
        //     let eventsArr = calendarStore.getData
        //     if(eventsArr.length > 4) {
        //         let calendarAPI = this.calendarRef.current.getApi();
        //         calendarAPI.addEvent(eventsArr[eventsArr.length-1])
        //     }
        // }

        render() {
            const {calendarStore} = this.props;
            var events = calendarStore.getData;
            if(events.length > 4) {
                let calendarAPI = this.calendarRef.current.getApi();
                calendarAPI.addEvent(events[events.length-1])
            }
            return (
                <React.Fragment>
                    <FullCalendar 
                        ref = {this.calendarRef}
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        hiddenDays={[0,6]}
                        selectable ='true'
                        fixedWeekCount = {false}
                        events = {events}
                        headerToolbar = {this.state.headerToolbar}
                        
                        // add prop here to customise view
                    />

                    <div>
                        <p>There are {calendarStore.getData.length} events </p>
                        <ul>
                        {calendarStore.getData.map((e, idx) => (
                            <li key={idx}>
                                {e.title} - {e.start.toString()}
                            </li>
                        ))}
                        </ul>
                    </div>

                </React.Fragment>
            )
        }
    }
)

export default StudentCalendar;