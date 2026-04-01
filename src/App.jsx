import { useState } from 'react';
import './App.css'




function CreateTaskItem({task, setTasks}) {
  return (
    <li>
      <div className='task-item'>
        <p>{task.task}</p>
        <div className="take-up-space"/>
        <p>({task.status})</p>
        <button
          onClick={() => {setTasks(prev => {
            return prev.map((curr_task) => {
              if (curr_task.id === task.id)
                return {
                  ...curr_task,
                  status: (curr_task.status == 'ongoing') ? ('completed' ) : ('ongoing')
                };
              return curr_task;
            });
          })}}
        >Toggle</button>
        <button
          onClick={() => {setTasks(prev => {
            return prev.map((old_task) => {
              if (old_task.id !== task.id) return old_task;
            }).filter(Boolean);
          })}}
        >Remove</button>
      </div>
    </li>
  )
}

export default function App () {

  const [ tasks, setTasks ] = useState([
    { id: 0, task: 'react assignment 3', status: 'completed' },
  ])

  return (
    <>
      <h2>To Do APP</h2>
      <button
        onClick={() => {
          const name = prompt("Enter task name:");
          if (!name) return;
          setTasks((prev) => {
            return [
              ...prev,
              {id: Date.now(), task: name, status: 'ongoing'}
            ];
          }
        )}}
      >Create New Task</button>


      {
        tasks.length > 0 ? (
          <ul className='tasks'>
            {tasks.map((task) => (
              <CreateTaskItem
                key={task.id}
                task={task}
                setTasks={setTasks}
              />
            ))}
          </ul>
        ) : (
          <p>No tasks yet, Create One!</p>
        )
      }

    </>
  );
}