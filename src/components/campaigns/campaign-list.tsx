import type { Campaign } from '../../types';
import CampaignItem from './campaign-item';
import styles from './campaign-list.module.css';

interface CampaignListProps {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
}

function CampaignList({ campaigns, onEdit }: CampaignListProps) {
  return (
    <section className={styles.list}>
      {campaigns.map((campaign) => (
        <CampaignItem key={campaign.id} campaign={campaign} onEdit={onEdit} />
      ))}
    </section>
  );
}

export default CampaignList;
