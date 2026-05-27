import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useSeller } from './use-seller';
import type { Campaign } from '../types';

const STORAGE_KEY = 'campaign-manager';

const newCampaign: Campaign = {
  id: '99',
  name: 'Test Campaign',
  keywords: ['test'],
  bidAmount: 1.0,
  campaignFund: 200,
  status: 'on',
  town: 'Warszawa',
  radius: 10,
};

describe('useSeller', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads initial seller from mock data when localStorage is empty', () => {
    const { result } = renderHook(() => useSeller());
    expect(result.current.campaigns).toHaveLength(3);
    expect(result.current.emeraldBalance).toBe(10000);
  });

  it('loads seller from localStorage when data exists', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ campaigns: [], emeraldBalance: 5000 })
    );
    const { result } = renderHook(() => useSeller());
    expect(result.current.campaigns).toHaveLength(0);
    expect(result.current.emeraldBalance).toBe(5000);
  });

  it('addCampaign adds the campaign and deducts its fund from balance', () => {
    const { result } = renderHook(() => useSeller());
    act(() => {
      result.current.addCampaign(newCampaign);
    });
    expect(result.current.campaigns).toHaveLength(4);
    expect(result.current.campaigns.find((c) => c.id === '99')).toBeDefined();
    expect(result.current.emeraldBalance).toBe(9800);
  });

  it('removeCampaign removes the campaign and refunds its fund to balance', () => {
    const { result } = renderHook(() => useSeller());
    act(() => {
      result.current.removeCampaign('1');
    });
    expect(result.current.campaigns).toHaveLength(2);
    expect(result.current.campaigns.find((c) => c.id === '1')).toBeUndefined();
    expect(result.current.emeraldBalance).toBe(10500);
  });

  it('editCampaign updates the campaign and adjusts balance by the fund difference', () => {
    const { result } = renderHook(() => useSeller());
    const updated = { ...result.current.campaigns[0], campaignFund: 700 };
    act(() => {
      result.current.editCampaign(updated);
    });
    expect(result.current.campaigns[0].campaignFund).toBe(700);
    expect(result.current.emeraldBalance).toBe(9800);
  });
});
