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
    <div>
      <h2>Suas Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.shortId}>
            <strong>{task.shortId} - {task.title}</strong> - {task.description} ({task.completed ? 'Concluído' : 'Pendente'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetTasks;
