import type { Campaign } from '../../types';
import CampaignItem from './campaign-item';
import Button from '../ui/button';
import styles from './campaign-list.module.css';

interface CampaignListProps {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onRemove: (id: string) => void;
  onNewCampaign: () => void;
}

function CampaignList({
  campaigns,
  onEdit,
  onRemove,
  onNewCampaign,
}: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No campaigns yet</p>
        <p className={styles.emptySubtext}>
          Create your first campaign to get started
        </p>
        <Button onClick={onNewCampaign}>New Campaign</Button>
      </div>
    );
  }

  return (
    <section className={styles.list}>
      {campaigns.map((campaign) => (
        <CampaignItem
          key={campaign.id}
          campaign={campaign}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </section>
  );
}

export default CampaignList;
