import axios from 'axios'


export default function axiosPostComment (task_id, user_id, content, created_date) {
    const token = localStorage.getItem('token')
    axios.post('http://localhost:8080/fyp/api/comment/addByComment', 
        {
            task_id: task_id,
            user_id: user_id,
            content: content,
            created_date: created_date,
        },
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    ).then(response => { 
        console.log(response);
        return response.data.id;});
}