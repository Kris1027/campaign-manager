import { FiDollarSign, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { FaGem } from 'react-icons/fa';
import Button from '../ui/button';
import styles from './header.module.css';

interface HeaderProps {
  emeraldBalance: number;
  onNewCampaign: () => void;
}

function Header({ emeraldBalance, onNewCampaign }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          <FiShoppingBag aria-hidden='true' /> Campaign Manager
        </h1>
        <span className={styles.balance} aria-live='polite' aria-atomic='true'>
          <FaGem aria-hidden='true' className={styles.emeraldIcon} /> Emerald
          Balance: <FiDollarSign aria-hidden='true' />
          {emeraldBalance}
        </span>
        <Button onClick={onNewCampaign}>
          <FiPlus aria-hidden='true' /> New campaign
        </Button>
      </div>
    </header>
  );
}

export default Header;
