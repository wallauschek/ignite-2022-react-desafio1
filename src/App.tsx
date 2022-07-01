import React, { ChangeEvent, FormEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css'
import { Header } from './components/Header'
import { Task } from './components/Task'

import './global.css'
import imgNoTasks from './assets/no-tasks.svg'

interface TodoListProps {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: uuidv4(),
      task: 'Tarefa 1',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      task: 'Tarefa 2',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ] as TodoListProps[])
  const [newTaskText, setNewTaskText] = useState('')

  function handleChange (id: string) {
    setTodoList(todoList.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    }))
  };

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    if(newTaskText.trim() !== '') {
      setTodoList([...todoList, {
        id: uuidv4(),
        task: newTaskText,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
      setNewTaskText('');
    }
  }

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function deleteTask(taskToDelete: TodoListProps) {
    setTodoList(todoList.filter(task => task.id !== taskToDelete.id));
  }

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <form onSubmit={handleCreateNewTask}>
          <input type="text" value={newTaskText} onChange={handleNewTaskTextChange} placeholder='Adicione uma nova tarefa' />
          <button type='submit'>Criar <PlusCircle size={18} /></button>
        </form>

        <div className={styles.todoList}>
          <header>
            <div className={styles.tarefasCriadas}>
              Tarefas criadas
              <span>
                {todoList.length}
              </span>
            </div>
            <div className={styles.tarefasConcluidas}>
              Concluídas
              <span>
              {todoList.filter(todo => todo.completed).length} de {todoList.length}
              </span>
            </div>
          </header>
          {todoList.length > 0 ? (
          <ul>
            {todoList.map(todo => {
              return ( <Task key={todo.id} todo={todo} handleChangeProps={handleChange}  onDeleteComment={deleteTask} /> )
            }
            )}
          </ul>
          ):(
            <div className={styles.noTasks}>
              <img src={imgNoTasks} alt='No tasks' /> <br />
              <strong>Você ainda não tem tarefas cadastradas</strong> <br />
              Crie tarefas e organize seus itens a fazer
            </div>
          )}
        </div>
         
      </div>
    </div>
  )
}

export default App
