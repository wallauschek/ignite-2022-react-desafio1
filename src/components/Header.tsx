import styles from './Header.module.css'

import todoListLogo from '../assets/todolist-logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={todoListLogo} alt="LOgotipo do Ignite" />
    </header>
  )
}