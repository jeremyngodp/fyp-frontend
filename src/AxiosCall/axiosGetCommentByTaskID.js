import axios from 'axios'


export default function axiosGetCommentByTaskID (task_id) {
    //maybe need to add store to keep all comment?

    axios.get("http://localhost:8080/fyp/api/comment/task?task_id=" + task_id); // add promise to place data into store
}