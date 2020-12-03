import axios from 'axios';

//axios post creates a new task
/**
 * For axiosPost, if "weekly report", taskCreatedDate === taskDueDate
 * Else if "meetings", taskCreatedDate = start timing of meeting and end timing
 */
export default function axiosAddTaskStudent(project_id, student_id, taskCreatedDate, taskDueDate, taskType, title) {
    const token = localStorage.getItem("token");
    if(token) {
        axios.post('http://localhost:8080/fyp/api/task/add', {
            project_id: project_id,
            title: title,
            deadline: taskDueDate,  
            created_date: taskCreatedDate,
            task_type: taskType,
            student_id: student_id,
            
            // status: taskStatus, -> add later
        }, 
        {
            headers: {
                'Authorization': 'Bearer ${token}'
            }
        }).then(response => {
            console.log(response);
        }).catch((error) => {
                console.log("Not Successfull")
                console.log(error.response);
                console.log(error.request);
            })
    }
}

