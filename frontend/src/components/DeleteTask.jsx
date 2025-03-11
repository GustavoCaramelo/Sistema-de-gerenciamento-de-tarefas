import React, { useState } from 'react';
import api from '../api'; // Substitui o axios pelo cliente `api`

const DeleteTask = ({ onTasksUpdated }) => {
  const [taskId, setTaskId] = useState('');

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${taskId}`);
      console.log('Tarefa excluída com sucesso');
      const response = await api.get('/tasks'); // Obtém a lista atualizada de tarefas
      onTasksUpdated(response.data); // Atualiza o estado no componente pai
      setTaskId(''); // Limpa o campo de entrada
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Excluir Tarefa</h2>
      <input
        type="text"
        placeholder="ID da Tarefa"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        onClick={handleDelete}
        className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-200 mt-4"
      >
        Excluir Tarefa
      </button>
    </div>
  );
};

export default DeleteTask;
