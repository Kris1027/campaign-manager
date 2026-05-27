import { useState } from 'react';
import { FiDollarSign, FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { Campaign } from '../../types';
import Button from '../ui/button';
import ConfirmDialog from '../ui/confirm-dialog';
import styles from './campaign-item.module.css';

interface CampaignItemProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onRemove: (id: string) => void;
}

function CampaignItem({ campaign, onEdit, onRemove }: CampaignItemProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
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
          <span className={styles.value}>
            <FiDollarSign aria-hidden='true' />
            {bidAmount.toFixed(2)}
          </span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Campaign Fund</span>
          <span className={styles.value}>
            <FiDollarSign aria-hidden='true' />
            {campaignFund.toFixed(2)}
          </span>
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
        <Button variant='secondary' onClick={() => onEdit(campaign)}>
          <FiEdit2 aria-hidden='true' /> Edit
        </Button>
        <Button variant='danger' onClick={() => setIsConfirmOpen(true)}>
          <FiTrash2 aria-hidden='true' /> Remove
        </Button>
      </div>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title='Remove campaign'
        message={`Are you sure you want to remove "${name}"? This action cannot be undone.`}
        onConfirm={() => {
          onRemove(campaign.id);
          setIsConfirmOpen(false);
        }}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}

export default CampaignItem;
