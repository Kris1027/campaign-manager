import Button from '../ui/button/button';
import styles from './header.module.css';

interface HeaderProps {
  emeraldBalance: number;
  onNewCampaign: () => void;
}

function Header({ emeraldBalance, onNewCampaign }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1>Campaign Manager</h1>
        <span>Emerald Balance: ${emeraldBalance}</span>
        <Button onClick={onNewCampaign}>New campaign</Button>
      </div>
    </header>
  );
}

export default Header;
