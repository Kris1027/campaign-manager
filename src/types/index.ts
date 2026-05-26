export interface Campaign {
  id: string;
  name: string;
  keywords: string[];
  bidAmount: number;
  campaignFund: number;
  status: 'on' | 'off';
  town: string;
  radius: number;
}

export interface Seller {
  campaigns: Campaign[];
  emeraldBalance: number;
}
