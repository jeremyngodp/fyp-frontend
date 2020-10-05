import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

class StaffCalendar extends React.Component {
    handleDateClick = (arg) => { // bind with an arrow function
        var date = arg.dateStr //capture date
        // use function find all task by staff_id by D
    }

    render() {
        return (
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]} 
                initialView='dayGridMonth'
                fixedWeekCount = {false}
                hiddenDays = {[0,6]}
                selectable ='true'
                dateClick = {this.handleDateClick}
                
            />
        )
    }
}

export default StaffCalendar;