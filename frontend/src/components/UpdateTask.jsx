import React, { useState } from 'react';
import api from '../api'; // Substitui o axios pelo cliente `api`

const UpdateTask = ({ onTasksUpdated }) => {
  const [taskId, setTaskId] = useState('');
  const [formData, setFormData] = useState({ title: '', description: '', completed: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Cria um objeto com apenas os campos preenchidos
      const payload = {};
      if (formData.title.trim()) payload.title = formData.title.trim();
      if (formData.description.trim()) payload.description = formData.description.trim();
      payload.completed = formData.completed; // Sempre enviar `completed`

      await api.put(`/tasks/${taskId}`, payload); // Envia apenas os campos preenchidos
      console.log('Tarefa atualizada com sucesso');
      const response = await api.get('/tasks'); // Obtém a lista atualizada de tarefas
      onTasksUpdated(response.data); // Atualiza o estado no componente pai
      setTaskId(''); // Limpa o campo de ID
      setFormData({ title: '', description: '', completed: false }); // Reseta o formulário
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Editar Tarefa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="ID da Tarefa"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, completed: e.target.checked }))
            }
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <span>Concluído</span>
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Atualizar Tarefa
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
