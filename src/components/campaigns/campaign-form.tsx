import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createCampaignSchema,
  type CampaignFormData,
} from '../../schemas/campaign';
import { towns, keywordSuggestions } from '../../data/mock-data';
import type { Campaign } from '../../types';
import { FiCheck, FiDollarSign, FiPlus, FiX } from 'react-icons/fi';
import Button from '../ui/button';
import Dropdown from '../ui/dropdown';
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
        className={styles.fullWidth}
      >
        <input
          id='name'
          type='text'
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
      </FormField>

      <FormField label='Status' htmlFor='status'>
        <Controller
          name='status'
          control={control}
          render={({ field }) => (
            <Dropdown
              id='status'
              options={[
                { value: 'on', label: 'On' },
                { value: 'off', label: 'Off' },
              ]}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>

      <FormField label='Town' htmlFor='town' error={errors.town?.message}>
        <Controller
          name='town'
          control={control}
          render={({ field }) => (
            <Dropdown
              id='town'
              options={towns.map((t) => ({ value: t, label: t }))}
              value={field.value}
              onChange={field.onChange}
              placeholder='Select town'
              aria-invalid={!!errors.town}
              aria-describedby={errors.town ? 'town-error' : undefined}
            />
          )}
        />
      </FormField>

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
          aria-invalid={!!errors.bidAmount}
          aria-describedby={errors.bidAmount ? 'bidAmount-error' : undefined}
          {...register('bidAmount', { valueAsNumber: true })}
        />
      </FormField>

      <FormField
        label='Campaign fund'
        htmlFor='campaignFund'
        hint={
          <>
            (available: <FiDollarSign aria-hidden='true' />
            {availableBalance})
          </>
        }
        error={errors.campaignFund?.message}
      >
        <input
          id='campaignFund'
          type='number'
          step='0.01'
          min='0'
          aria-invalid={!!errors.campaignFund}
          aria-describedby={
            errors.campaignFund ? 'campaignFund-error' : undefined
          }
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
          aria-invalid={!!errors.radius}
          aria-describedby={errors.radius ? 'radius-error' : undefined}
          {...register('radius', { valueAsNumber: true })}
        />
      </FormField>

      <FormField
        label='Keywords'
        error={errors.keywords?.message}
        className={styles.fullWidth}
        group
      >
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

      <div className={`${styles.actions} ${styles.fullWidth}`}>
        <Button type='button' variant='secondary' onClick={onCancel}>
          <FiX aria-hidden='true' /> Cancel
        </Button>
        <Button type='submit'>
          {campaign ? (
            <>
              <FiCheck aria-hidden='true' /> Save changes
            </>
          ) : (
            <>
              <FiPlus aria-hidden='true' /> Create campaign
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default CampaignForm;
