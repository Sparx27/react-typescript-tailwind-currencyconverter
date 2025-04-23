import { CurrencyOption } from '../types/currency_types';

export const getFullCurrencyValue = (currency: CurrencyOption): string => currency[0] + ' ' + currency[1];

export const parseNumberToCurrency = (value: number, currencyCode: string): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  });
  return formatter.format(value);
};

export const parseNumberToShow = (value: number): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8
  });
};

export const parseNumberToShowMax2Decimals = (value: number): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
