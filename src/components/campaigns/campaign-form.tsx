import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createCampaignSchema,
  type CampaignFormData,
} from '../../schemas/campaign';
import { towns, keywordSuggestions } from '../../data/mock-data';
import type { Campaign } from '../../types';
import Button from '../ui/button/button';
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
      <div className={styles.field}>
        <label htmlFor='name'>Campaign name</label>
        <input id='name' type='text' {...register('name')} />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor='status'>Status</label>
          <select id='status' {...register('status')}>
            <option value='on'>On</option>
            <option value='off'>Off</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor='town'>Town</label>
          <select id='town' {...register('town')}>
            <option value=''>Select town</option>
            {towns.map((town) => (
              <option key={town} value={town}>
                {town}
              </option>
            ))}
          </select>
          {errors.town && (
            <span className={styles.error}>{errors.town.message}</span>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor='bidAmount'>Bid amount</label>
          <input
            id='bidAmount'
            type='number'
            step='0.01'
            min='0'
            {...register('bidAmount', { valueAsNumber: true })}
          />
          {errors.bidAmount && (
            <span className={styles.error}>{errors.bidAmount.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor='campaignFund'>
            Campaign fund
            <span className={styles.hint}>
              {' '}
              (available: {availableBalance})
            </span>
          </label>
          <input
            id='campaignFund'
            type='number'
            step='0.01'
            min='0'
            {...register('campaignFund', { valueAsNumber: true })}
          />
          {errors.campaignFund && (
            <span className={styles.error}>{errors.campaignFund.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor='radius'>Radius (km)</label>
          <input
            id='radius'
            type='number'
            min='1'
            {...register('radius', { valueAsNumber: true })}
          />
          {errors.radius && (
            <span className={styles.error}>{errors.radius.message}</span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label>Keywords</label>
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
        {errors.keywords && (
          <span className={styles.error}>{errors.keywords.message}</span>
        )}
      </div>

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
