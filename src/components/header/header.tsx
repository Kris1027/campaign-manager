import styles from './header.module.css';

interface HeaderProps {
  emeraldBalance: number;
}

function Header({ emeraldBalance }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1>Campaign Manager</h1>
        <span>Emerald Balance: {emeraldBalance}</span>
        <button>new campaign</button>
      </div>
    </header>
  );
}

export default Header;
