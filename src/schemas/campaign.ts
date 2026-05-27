import { z } from 'zod';
import { towns, keywordSuggestions } from '../data/mock-data';

const baseCampaignSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  keywords: z
    .array(z.enum(keywordSuggestions))
    .min(1, 'Select at least one keyword'),
  bidAmount: z.number({ error: 'Required' }).positive('Must be greater than 0'),
  campaignFund: z
    .number({ error: 'Required' })
    .positive('Must be greater than 0'),
  status: z.enum(['on', 'off']),
  town: z.enum(towns, { error: 'Select a town' }),
  radius: z
    .number({ error: 'Required' })
    .int('Must be a whole number')
    .positive('Must be greater than 0'),
});

export function createCampaignSchema(availableBalance: number) {
  return baseCampaignSchema.refine(
    (data) => data.campaignFund <= availableBalance,
    {
      message: `Exceeds available balance (${availableBalance})`,
      path: ['campaignFund'],
    }
  );
}

export type CampaignFormData = z.infer<typeof baseCampaignSchema>;
