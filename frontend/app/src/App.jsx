import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import TaskList from './components/TaskList'
import axios from "axios"
import { useEffect } from 'react'

function App() {
  const [tasks,setTask] = useState([])


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tasks/")  // Fetch tasks from Django
        .then(response => setTask(response.data))
        .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = (task, description) => {
    axios.post("http://127.0.0.1:8000/api/tasks/", {
        title: task,
        description: description,
        completed: false,
    })
    .then(response => setTask([...tasks, response.data]))
    .catch(error => console.error("Error adding task:", error));
  };

  return (
    <div>
      <Home addTask={addTask}/>
      <TaskList tasks={tasks} setTask={setTask}/>
    </div>
  )
}

export default App
