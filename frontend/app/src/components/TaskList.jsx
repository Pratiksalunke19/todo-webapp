import React, { useState } from "react";
import "../styles/Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'

function TaskList({tasks,setTask}){

    const handleDelete = (id) =>{
        axios.delete(`http://localhost:8000/api/tasks/${id}/`)
            .then(()=>{
                setTask(tasks.filter(task=> task.id !== id));
            })
            .catch(error=> console.error("Error deleting task: ",error))
    }

    const [editTaskId, setEditTaskId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("")
    const [editedDescription, setEditedDescription] = useState("")

    const handleEdit = (task) => {
        setEditTaskId(task.id);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
    };

    const handleUpdate = (id) => {
        axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`,{
            title : editedTitle,
            description : editedDescription,
            completed : false,
        })
        .then(response =>{
            setTask(tasks.map(task => (task.id === id ? response.data : task)));
            setEditTaskId(null);
        })
        .catch(error => console.error("Error updating task:", error));
    }

    return (
        <div className="task-list">
            {tasks && tasks.length > 0 ? (
                <ul>
                    {tasks.map((item) => (
                        <li key={item.id}>
                            {editTaskId === item.id ? (
                                <div>
                                    <input 
                                        type="text" 
                                        value={editedTitle} 
                                        onChange={(e) => setEditedTitle(e.target.value)} 
                                    />
                                    <textarea 
                                        value={editedDescription} 
                                        onChange={(e) => setEditedDescription(e.target.value)} 
                                    />
                                    <button onClick={() => handleUpdate(item.id)}>Save</button>
                                    <button onClick={() => setEditTaskId(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <strong>Task: </strong>{item.title}<br />
                                    <strong>Description: </strong>{item.description}<br />
                                    <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
                                    <button onClick={() => handleEdit(item)} className="update-button">Edit</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks added yet!</p>
            )}
        </div>
    );
}

export default TaskList;