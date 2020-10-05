import React from 'react';
import { observer } from "mobx-react";
import StudentCalendar from "./StudentCalendar.jsx";
import StaffCalendar from "./StaffCalendar.jsx";


const ReusableCalendar = observer(

    class ReusableCalendarClass extends React.Component {
        constructor(props) {
            super(props)
            this.FullCalendarRef = StudentCalendar.calendarRef;
            this.state = {
                // add state here
                event: this.props.calendarStore.getData
            }
        }


        render() {
            const{dummyEvents, calendarStore, type } = this.props;
            // const {getData} = calendarStore
            
            return (
                
                <div>
                    {
                        type === "Student" ?
                            <StudentCalendar calendarStore={calendarStore} />
                            :
                            <StaffCalendar calendarStore={calendarStore} />
                    }
                </div>

            )
        }
        
    }
)


export default ReusableCalendar;

