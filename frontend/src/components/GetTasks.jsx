import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Erro ao buscar tarefas:', error));
  }, []);

  return (
    <div>
      <h2>Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetTasks;