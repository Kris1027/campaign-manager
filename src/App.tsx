import { useState } from 'react';
import styles from './app.module.css';
import CampaignList from './components/campaigns/campaign-list';
import CampaignForm from './components/campaigns/campaign-form';
import Header from './components/header/header';
import Modal from './components/ui/modal';
import { useSeller } from './hooks/use-seller';
import type { Campaign } from './types';

type ModalState =
  | { mode: 'create' }
  | { mode: 'edit'; campaign: Campaign }
  | null;

function App() {
  const {
    campaigns,
    emeraldBalance,
    addCampaign,
    removeCampaign,
    editCampaign,
  } = useSeller();
  const [modalState, setModalState] = useState<ModalState>(null);

  function handleAddCampaign(campaign: Campaign) {
    addCampaign(campaign);
    setModalState(null);
  }

  function handleEditCampaign(updated: Campaign) {
    editCampaign(updated);
    setModalState(null);
  }

  return (
    <>
      <Header
        emeraldBalance={emeraldBalance}
        onNewCampaign={() => setModalState({ mode: 'create' })}
      />
      <main className={styles.main}>
        <CampaignList
          campaigns={campaigns}
          onEdit={(campaign) => setModalState({ mode: 'edit', campaign })}
          onRemove={removeCampaign}
          onNewCampaign={() => setModalState({ mode: 'create' })}
        />
      </main>
      <Modal
        isOpen={modalState !== null}
        onClose={() => setModalState(null)}
        title={modalState?.mode === 'edit' ? 'Edit campaign' : 'New campaign'}
      >
        <CampaignForm
          emeraldBalance={emeraldBalance}
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
