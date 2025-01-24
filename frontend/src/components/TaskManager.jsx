import React, { useState, useEffect } from 'react';
import GetTasks from './GetTasks';
import CreateTask from './CreateTask';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';
import api from '../api'; // Substitui o axios pelo cliente `api`

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data); // Inicializa com as tarefas do backend
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    fetchTasks();
  }, []); // Executa apenas uma vez, ao montar o componente

  const handleTasksUpdated = (updatedTasks) => {
    setTasks(updatedTasks); // Atualiza o estado global das tarefas
  };

  return (
    <div>
      <h1>Gerenciamento de Tarefas</h1>
      <CreateTask onTasksUpdated={handleTasksUpdated} />
      <GetTasks tasks={tasks} onTasksUpdated={handleTasksUpdated} />
      <UpdateTask tasks={tasks} onTasksUpdated={handleTasksUpdated} />
      <DeleteTask tasks={tasks} onTasksUpdated={handleTasksUpdated} />
    </div>
  );
};

export default TaskManager;
