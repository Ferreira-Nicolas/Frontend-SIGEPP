
import { Outlet } from 'react-router';
import styles from './styles.module.css';

export function MainContent() {
  return (
    <main className={styles.content}>
      {/* O Outlet injeta aqui o componente da rota ativa */}
      <Outlet />
    </main>
  );
}
