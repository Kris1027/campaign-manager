import type { Campaign } from '../../types';
import CampaignItem from './campaign-item';
import styles from './campaign-list.module.css';

interface CampaignListProps {
  campaigns: Campaign[];
}

function CampaignList({ campaigns }: CampaignListProps) {
  return (
    <section className={styles.list}>
      {campaigns.map((campaign) => (
        <CampaignItem key={campaign.id} campaign={campaign} />
      ))}
    </section>
  );
}

export default CampaignList;
