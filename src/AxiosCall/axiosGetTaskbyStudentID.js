import { FormatIndentIncreaseSharp } from '@material-ui/icons';
import axios from 'axios';

export default function axiosGetTaskbyStudentID(student_id, calendarStore){
    const BASEURL = "http://localhost:8080/fyp/api"
    axios.get(BASEURL+'/task/student/' + student_id)
        .then(res => {
            res.data._embedded.taskList.map(indivRes => {
                calendarStore.addData ({
                    Id: indivRes.id,
                    title: indivRes.title,
                    event_type: indivRes.task_type,
                    start: indivRes.deadline,
                    end: indivRes.deadline,
                    project_id: indivRes.project_id,
                    comments: indivRes.comments,
                    student_id: student_id
                })
            })
        })
}