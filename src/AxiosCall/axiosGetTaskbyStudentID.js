import axios from 'axios';

export default function axiosGetTaskbyStudentID(student_id, calendarStore){
    const BASEURL = "http://localhost:8080/fyp/api"
    axios.get('${BASEURL}/task/student/' + student_id)
        .then(res => {
            res.data.map(indivRes => {
                var startdate  = new Date(indivRes.created_date)
                var enddate = new Date(indivRes.deadline)

                calendarStore.addData ({
                    Id: indivRes.id,
                    title: indivRes.description,
                    event_type: indivRes.task_type,
                    start: startdate,
                    end: enddate,
                    project_id: indivRes.project_id,
                    tutor_id: indivRes.supervisor_id,
                    student_id: student_id
                })
            })
        })
}