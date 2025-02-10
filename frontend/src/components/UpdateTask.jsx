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
    <div>
      <h2>Editar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID da Tarefa"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
        />
        <label>
          Concluído:
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, completed: e.target.checked }))
            }
          />
        </label>
        <button type="submit">Atualizar Tarefa</button>
      </form>
    </div>
  );
};

export default UpdateTask;
