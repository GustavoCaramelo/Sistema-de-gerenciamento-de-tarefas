import React, { useState, useEffect } from 'react';
import api from '../api'; // Substitua pelo seu cliente de API

const GetTasks = ({ onTasksUpdated }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Supondo que o token esteja salvo no localStorage
          },
        });
        setTasks(response.data);
        onTasksUpdated(response.data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTasks();
  }, [onTasksUpdated]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Suas Tarefas</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.shortId} className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
            <strong>{task.shortId} - {task.title}</strong>: {task.description} ({task.completed ? 'Concluído' : 'Pendente'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetTasks;
