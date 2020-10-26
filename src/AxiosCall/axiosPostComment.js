import axios from 'axios'


export default function axiosPostComment (task_id, user_id, content, created_date) {
    axios.post('http://localhost:8080/fyp/api/comment/addByComment', 
        {
            task_id: task_id,
            user_id: user_id,
            content: content,
            created_date: created_date,
        }
    ).then(response => { 
        console.log(response);
        return response.data.id;});
}