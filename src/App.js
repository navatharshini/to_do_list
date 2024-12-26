import logo from './logo.svg';
import './App.css';
import { useState }from 'react';
import { useEffect,useRef } from 'react';


function App() {
  const [to_do_list,setTo_do_list]=useState([]);
  const [currentTask,setCurrentTask]=useState("");
  const inputTask=useRef("");

  const addTask = () => {
    if (currentTask.trim()) { // Make sure the task is not empty
      setTo_do_list([...to_do_list, { taskDescription: currentTask, completed: false }]);
      inputTask.current.value = "";  // Clear the input field
      setCurrentTask("");  // Reset the currentTask state
    }
  };
  

  useEffect(() => {
    console.log("Updated to_do_list:", to_do_list);
  }, [to_do_list]);

  const Delete=(task_to_delete)=>{
    setTo_do_list(to_do_list.filter((task)=>task.taskDescription!==task_to_delete
    ));

  };

  
  // const CompletTask=(taskToComplete)=>{
  //   setTo_do_list(
  //     to_do_list.map((task)=>{
  //       return task.taskDescription ==taskToComplete?(taskDescription:taskToComplete,completed:true)
  //     :(taskDescription:taskToComplete,completed:true)
      
  //     })
  //   );

  // }

  const CompletTask = (taskToComplete) => {
    setTo_do_list(
      to_do_list.map((task) => {
        return task.taskDescription === taskToComplete
          ? { ...task, completed: true } // Update the completed flag for the matched task
          : task; // Return the task as is for others
      })
    );
  };
  

 
  

  return (
    <div className="App">
    <h1> Todo List</h1>
     <input 
     ref={inputTask}
     type='text' 
     placeholder='Task ..'
     onKeyDown={(event) => {
      if (event.key === "Enter") { // Check if Enter key is pressed
        addTask(); // Call the addTask function
      }
    }}

     onChange={(event)=> {setCurrentTask(event.target.value)}}

      />
   
     <button onClick={addTask}>
      Add Task
     </button>
     <hr/>

     <ul>
      {
        to_do_list.map( (value,key) => (
          <div id="tasks">
 <li key={key}>{value.taskDescription}</li>
 <button onClick={()=>{CompletTask(value.taskDescription)}}>Completed</button>
 <button onClick={()=>{Delete(value.taskDescription)}}>X</button>

 {value.completed?(<h1>Completed</h1>):(<h1>Not Completed yet</h1>)}

          </div>
)
 )
}
    </ul>
     
    </div>
  );
}

export default App;
