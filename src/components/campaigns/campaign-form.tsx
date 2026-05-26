import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createCampaignSchema,
  type CampaignFormData,
} from '../../schemas/campaign';
import { towns, keywordSuggestions } from '../../data/mock-data';
import type { Campaign } from '../../types';
import Button from '../ui/button';
import FormField from '../ui/form-field';
import styles from './campaign-form.module.css';

interface CampaignFormProps {
  emeraldBalance: number;
  campaign?: Campaign;
  onSubmit: (campaign: Campaign) => void;
  onCancel: () => void;
}

function CampaignForm({
  emeraldBalance,
  campaign,
  onSubmit,
  onCancel,
}: CampaignFormProps) {
  const availableBalance = emeraldBalance + (campaign?.campaignFund ?? 0);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(createCampaignSchema(availableBalance)),
    defaultValues: campaign
      ? {
          name: campaign.name,
          keywords: campaign.keywords,
          bidAmount: campaign.bidAmount,
          campaignFund: campaign.campaignFund,
          status: campaign.status,
          town: campaign.town,
          radius: campaign.radius,
        }
      : { status: 'on', keywords: [] },
  });

  function handleValidSubmit(data: CampaignFormData) {
    onSubmit({ ...data, id: campaign?.id ?? crypto.randomUUID() });
  }

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} className={styles.form}>
      <FormField
        label='Campaign name'
        htmlFor='name'
        error={errors.name?.message}
      >
        <input id='name' type='text' {...register('name')} />
      </FormField>

      <div className={styles.row}>
        <FormField label='Status' htmlFor='status'>
          <select id='status' {...register('status')}>
            <option value='on'>On</option>
            <option value='off'>Off</option>
          </select>
        </FormField>

        <FormField label='Town' htmlFor='town' error={errors.town?.message}>
          <select id='town' {...register('town')}>
            <option value=''>Select town</option>
            {towns.map((town) => (
              <option key={town} value={town}>
                {town}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className={styles.row}>
        <FormField
          label='Bid amount'
          htmlFor='bidAmount'
          error={errors.bidAmount?.message}
        >
          <input
            id='bidAmount'
            type='number'
            step='0.01'
            min='0'
            {...register('bidAmount', { valueAsNumber: true })}
          />
        </FormField>

        <FormField
          label='Campaign fund'
          htmlFor='campaignFund'
          hint={`(available: ${availableBalance})`}
          error={errors.campaignFund?.message}
        >
          <input
            id='campaignFund'
            type='number'
            step='0.01'
            min='0'
            {...register('campaignFund', { valueAsNumber: true })}
          />
        </FormField>

        <FormField
          label='Radius (km)'
          htmlFor='radius'
          error={errors.radius?.message}
        >
          <input
            id='radius'
            type='number'
            min='1'
            {...register('radius', { valueAsNumber: true })}
          />
        </FormField>
      </div>

      <FormField label='Keywords' error={errors.keywords?.message}>
        <Controller
          name='keywords'
          control={control}
          render={({ field }) => (
            <div className={styles.keywords}>
              {keywordSuggestions.map((keyword) => (
                <label key={keyword} className={styles.keywordOption}>
                  <input
                    type='checkbox'
                    checked={field.value.includes(keyword)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...field.value, keyword]);
                      } else {
                        field.onChange(
                          field.value.filter((k) => k !== keyword)
                        );
                      }
                    }}
                  />
                  {keyword}
                </label>
              ))}
            </div>
          )}
        />
      </FormField>

      <div className={styles.actions}>
        <Button type='button' variant='secondary' onClick={onCancel}>
          Cancel
        </Button>
        <Button type='submit'>
          {campaign ? 'Save changes' : 'Create campaign'}
        </Button>
      </div>
    </form>
  );
}

export default CampaignForm;
