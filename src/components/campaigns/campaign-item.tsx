import type { Campaign } from '../../types';
import styles from './campaign-item.module.css';

interface CampaignItemProps {
  campaign: Campaign;
}

function CampaignItem({ campaign }: CampaignItemProps) {
  const { name, keywords, bidAmount, campaignFund, status, town, radius } =
    campaign;

  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.fields}>
        <div className={styles.field}>
          <span className={styles.label}>Keywords</span>
          <span className={styles.value}>{keywords.join(', ')}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Bid Amount</span>
          <span className={styles.value}>${bidAmount.toFixed(2)}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Campaign Fund</span>
          <span className={styles.value}>${campaignFund.toFixed(2)}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Status</span>
          <span
            className={`${styles.badge} ${status === 'on' ? styles.badgeOn : styles.badgeOff}`}
          >
            {status}
          </span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Town</span>
          <span className={styles.value}>{town}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Radius</span>
          <span className={styles.value}>{radius} km</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button>Edit</button>
        <button>Remove</button>
      </div>
    </div>
  );
}

export default CampaignItem;
