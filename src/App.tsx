import styles from './app.module.css';
import CampaignList from './components/campaigns/campaign-list';
import Header from './components/header/header';
import { initialSeller } from './data/mock-data';

function App() {
  return (
    <>
      <Header emeraldBalance={initialSeller.emeraldBalance} />
      <main className={styles.main}>
        <CampaignList campaigns={initialSeller.campaigns} />
      </main>
    </>
  );
}

export default App;
