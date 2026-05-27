import { useState, useEffect } from 'react';
import { initialSeller } from '../data/mock-data';
import type { Campaign, Seller } from '../types';

const STORAGE_KEY = 'campaign-manager';

function loadSeller(): Seller {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Seller) : initialSeller;
  } catch {
    return initialSeller;
  }
}

export function useSeller() {
  const [seller, setSeller] = useState<Seller>(loadSeller);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seller));
  }, [seller]);

  function addCampaign(campaign: Campaign) {
    setSeller((prev) => ({
      campaigns: [...prev.campaigns, campaign],
      emeraldBalance: prev.emeraldBalance - campaign.campaignFund,
    }));
  }

  function removeCampaign(id: string) {
    setSeller((prev) => {
      const campaign = prev.campaigns.find((c) => c.id === id);
      if (!campaign) return prev;
      return {
        campaigns: prev.campaigns.filter((c) => c.id !== id),
        emeraldBalance: prev.emeraldBalance + campaign.campaignFund,
      };
    });
  }

  function editCampaign(updated: Campaign) {
    setSeller((prev) => {
      const original = prev.campaigns.find((c) => c.id === updated.id);
      if (!original) return prev;
      return {
        campaigns: prev.campaigns.map((c) =>
          c.id === updated.id ? updated : c
        ),
        emeraldBalance:
          prev.emeraldBalance - (updated.campaignFund - original.campaignFund),
      };
    });
  }

  return {
    campaigns: seller.campaigns,
    emeraldBalance: seller.emeraldBalance,
    addCampaign,
    removeCampaign,
    editCampaign,
  };
}
