import { useState, useEffect } from 'react';
import styles from './app.module.css';
import CampaignList from './components/campaigns/campaign-list';
import CampaignForm from './components/campaigns/campaign-form';
import Header from './components/header/header';
import Modal from './components/modal/modal';
import { initialSeller } from './data/mock-data';
import type { Campaign, Seller } from './types';

const STORAGE_KEY = 'campaign-manager';

function loadSeller(): Seller {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Seller) : initialSeller;
  } catch {
    return initialSeller;
  }
}

function App() {
  const [seller, setSeller] = useState<Seller>(loadSeller);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seller));
  }, [seller]);

  function handleAddCampaign(campaign: Campaign) {
    setSeller((prev) => ({
      campaigns: [...prev.campaigns, campaign],
      emeraldBalance: prev.emeraldBalance - campaign.campaignFund,
    }));
    setIsModalOpen(false);
  }

  return (
    <>
      <Header
        emeraldBalance={seller.emeraldBalance}
        onNewCampaign={() => setIsModalOpen(true)}
      />
      <main className={styles.main}>
        <CampaignList campaigns={seller.campaigns} />
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='New campaign'
      >
        <CampaignForm
          emeraldBalance={seller.emeraldBalance}
          onSubmit={handleAddCampaign}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default App;
