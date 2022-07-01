import { Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TodoListProps {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskProps {
  todo: TodoListProps;
  handleChangeProps: (id: string) => void;
  onDeleteComment: (todo: TodoListProps) => void;
}


export function Task({todo, handleChangeProps, onDeleteComment} : TaskProps) {
  function deleteTodoProps(todo: TodoListProps) {
    onDeleteComment(todo);
  }
  return (
    <li className={styles.list}>
      <div className={todo.completed ? styles.itemConcluido : styles.item}>
      <div className={styles.round}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={todo.completed}
          readOnly
        />
        <label onClick={()=>handleChangeProps(todo.id)} />
      </div>
      <span  className={todo.completed ? styles.tarefaConcluida : ''}>
        {todo.task}
      </span>
      <button type="button" onClick={() => deleteTodoProps(todo)}>
        <Trash />
      </button>
      </div>
    </li>
  )
}