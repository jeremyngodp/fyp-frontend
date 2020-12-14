import axios from 'axios';

export default function axiosGetTaskbyStudentID(student_id, calendarStore){
    const URL_string = 'http://localhost:8080/fyp/api/task/student/' + student_id
    const token = localStorage.getItem('token');
    console.log(token);
    console.log(typeof(student_id));
    console.log(URL_string);
    axios.get(URL_string, {headers: {
        'Authorization': 'Bearer ' + token  
    }})
        .then(res => {
            if (res.data._embedded != null){
                res.data._embedded.taskList.map(indivRes => {
                    calendarStore.addData ({
                        id: indivRes.id,
                        title: indivRes.title,
                        event_type: indivRes.task_type,
                        start: indivRes.deadline,
                        end: indivRes.deadline,
                        project_id: indivRes.project_id,
                        comments: indivRes.comments,
                        student_id: student_id
                    })
                })
            }
        })
}