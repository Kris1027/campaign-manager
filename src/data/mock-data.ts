import type { Campaign, Seller } from '../types';

export const towns: string[] = [
  'Warszawa',
  'Kraków',
  'Łódź',
  'Wrocław',
  'Poznań',
  'Gdańsk',
  'Szczecin',
  'Bydgoszcz',
  'Toruń',
  'Lublin',
  'Katowice',
  'Białystok',
  'Rzeszów',
  'Kielce',
  'Olsztyn',
  'Opole',
  'Zielona Góra',
  'Gorzów Wielkopolski',
];

export const keywordSuggestions: string[] = [
  'shoes',
  'electronics',
  'clothing',
  'furniture',
  'books',
  'sports',
  'toys',
  'beauty',
  'garden',
  'kitchen',
  'phones',
  'laptops',
  'watches',
  'jewelry',
  'bags',
  'outdoor',
  'fitness',
  'gaming',
  'music',
  'art',
];

export const initialCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Shoes Sale',
    keywords: ['shoes', 'sports'],
    bidAmount: 1.5,
    campaignFund: 500,
    status: 'on',
    town: 'Warszawa',
    radius: 25,
  },
  {
    id: '2',
    name: 'Tech Gadgets Promo',
    keywords: ['electronics', 'laptops', 'phones'],
    bidAmount: 3.0,
    campaignFund: 1200,
    status: 'on',
    town: 'Kraków',
    radius: 50,
  },
  {
    id: '3',
    name: 'Book Lovers Campaign',
    keywords: ['books', 'art'],
    bidAmount: 0.5,
    campaignFund: 300,
    status: 'off',
    town: 'Kielce',
    radius: 10,
  },
];

export const initialSeller: Seller = {
  campaigns: initialCampaigns,
  emeraldBalance: 10000,
};
