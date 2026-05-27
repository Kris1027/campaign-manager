import { z } from 'zod';
import { towns, keywordSuggestions } from '../data/mock-data';

const townEnum = towns as [string, ...string[]];
const keywordEnum = keywordSuggestions as [string, ...string[]];

const baseCampaignSchema = z.object({
  name: z
    .string()
    .min(1, 'Campaign name is required')
    .max(100, 'Campaign name must be 100 characters or less'),
  keywords: z
    .array(z.enum(keywordEnum))
    .min(1, 'Please select at least one keyword'),
  bidAmount: z
    .number({ error: 'Please enter a bid amount' })
    .min(0.01, 'Bid amount must be at least $0.01'),
  campaignFund: z
    .number({ error: 'Please enter a campaign fund amount' })
    .min(0.01, 'Campaign fund must be at least $0.01'),
  status: z.enum(['on', 'off']),
  town: z.enum(townEnum, { error: 'Please select a town' }),
  radius: z
    .number({ error: 'Please enter a radius' })
    .int('Radius must be a whole number')
    .min(1, 'Radius must be at least 1 km')
    .max(500, 'Radius cannot exceed 500 km'),
});

export function createCampaignSchema(availableBalance: number) {
  return baseCampaignSchema.refine(
    (data) => data.campaignFund <= availableBalance,
    {
      message: `Amount exceeds your available balance of $${availableBalance.toFixed(2)}`,
      path: ['campaignFund'],
    }
  );
}

export type CampaignFormData = z.infer<typeof baseCampaignSchema>;
