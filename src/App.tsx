import { useState, useEffect } from 'react';
import styles from './app.module.css';
import CampaignList from './components/campaigns/campaign-list';
import CampaignForm from './components/campaigns/campaign-form';
import Header from './components/header/header';
import Modal from './components/modal/modal';
import { initialSeller } from './data/mock-data';
import type { Campaign, Seller } from './types';

type ModalState =
  | { mode: 'create' }
  | { mode: 'edit'; campaign: Campaign }
  | null;

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
  const [modalState, setModalState] = useState<ModalState>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seller));
  }, [seller]);

  function handleAddCampaign(campaign: Campaign) {
    setSeller((prev) => ({
      campaigns: [...prev.campaigns, campaign],
      emeraldBalance: prev.emeraldBalance - campaign.campaignFund,
    }));
    setModalState(null);
  }

  function handleRemoveCampaign(id: string) {
    const campaign = seller.campaigns.find((c) => c.id === id);
    if (!campaign) return;
    setSeller((prev) => ({
      campaigns: prev.campaigns.filter((c) => c.id !== id),
      emeraldBalance: prev.emeraldBalance + campaign.campaignFund,
    }));
  }

  function handleEditCampaign(updated: Campaign) {
    if (modalState?.mode !== 'edit') return;
    const original = modalState.campaign;
    setSeller((prev) => ({
      campaigns: prev.campaigns.map((c) => (c.id === updated.id ? updated : c)),
      emeraldBalance:
        prev.emeraldBalance - (updated.campaignFund - original.campaignFund),
    }));
    setModalState(null);
  }

  return (
    <>
      <Header
        emeraldBalance={seller.emeraldBalance}
        onNewCampaign={() => setModalState({ mode: 'create' })}
      />
      <main className={styles.main}>
        <CampaignList
          campaigns={seller.campaigns}
          onEdit={(campaign) => setModalState({ mode: 'edit', campaign })}
          onRemove={handleRemoveCampaign}
        />
      </main>
      <Modal
        isOpen={modalState !== null}
        onClose={() => setModalState(null)}
        title={modalState?.mode === 'edit' ? 'Edit campaign' : 'New campaign'}
      >
        <CampaignForm
          emeraldBalance={seller.emeraldBalance}
          campaign={
            modalState?.mode === 'edit' ? modalState.campaign : undefined
          }
          onSubmit={
            modalState?.mode === 'edit' ? handleEditCampaign : handleAddCampaign
          }
          onCancel={() => setModalState(null)}
        />
      </Modal>
    </>
  );
}

export default App;
