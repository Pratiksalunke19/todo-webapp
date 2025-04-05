import React,{useState} from "react"
import "../styles/Home.css"
import "../components/TaskList"

function Home({addTask}){
    const[task,setTask] = useState("")
    const[description, setDescription] = useState("")

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        if(task.trim() && description.trim()){
            addTask(task,description)
            setTask("")
            setDescription("")
        }
    }

    return(
        <div className="home-page-container">
            <div className="heading-container">
                <h1>To Do List</h1>
            </div>
            <form onSubmit={handleFormSubmit} >
                <div className="input-box">
                    <div className="task-name">
                        <input type="text" name="input" value={task} placeholder="Enter task"
                        onChange={(e)=> setTask(e.target.value)}/>
                    </div>
                    <div className="task-description">
                        <textarea rows={5} cols={35} name="description" value={description} placeholder="Enter description"
                        onChange={(e)=> setDescription(e.target.value)}></textarea>
                    </div>
                    <input type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default Home