import React, { useEffect } from 'react';
import api from '../api'; // Substitui o axios pelo cliente `api`

const GetTasks = ({ tasks, onTasksUpdated }) => {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks'); // Obtém as tarefas do backend
        onTasksUpdated(response.data); // Atualiza o estado global
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    fetchTasks();
  }, [onTasksUpdated]); // Atualiza apenas quando a prop `onTasksUpdated` mudar

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task._id} - {task.title}</strong> - {task.description} ({task.completed ? 'Concluído' : 'Pendente'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetTasks;
