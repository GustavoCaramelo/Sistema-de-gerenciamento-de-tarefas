import React from 'react';
import GetTasks from './GetTasks';
import CreateTask from './CreateTask';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';

const TaskManager = () => {
  return (
    <div>
      <h1>Gerenciamento de Tarefas</h1>
      <CreateTask />
      <GetTasks />
      <UpdateTask />
      <DeleteTask />
    </div>
  );
};

export default TaskManager;
