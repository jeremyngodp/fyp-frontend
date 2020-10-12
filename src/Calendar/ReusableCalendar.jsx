import React from 'react';
import { observer } from "mobx-react";
import StudentCalendar from "./StudentCalendar.jsx";
import StaffCalendar from "./StaffCalendar.jsx";
import { withRouter } from "react-router-dom";


const ReusableCalendar = observer(

    class ReusableCalendarClass extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                // add state here
                event: this.props.calendarStore.getData
            }
        }

        render() {
            const{calendarStore, type } = this.props;
            // const {getData} = calendarStore
            console.log('render Reusable Calendar')
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


export default withRouter(ReusableCalendar);

