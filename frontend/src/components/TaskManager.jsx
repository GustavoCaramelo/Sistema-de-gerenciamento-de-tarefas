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
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Gerenciamento de Tarefas</h1>
      <CreateTask onTasksUpdated={handleTasksUpdated} />
      <GetTasks tasks={tasks} onTasksUpdated={handleTasksUpdated} />
      <UpdateTask onTasksUpdated={handleTasksUpdated} />
      <DeleteTask onTasksUpdated={handleTasksUpdated} />
    </div>
  );
};

export default TaskManager;
