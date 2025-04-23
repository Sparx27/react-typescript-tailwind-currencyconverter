export interface CurrencySearchableSelectRef {
  getSelectedCode: () => string;
}

export interface ButtonRef {
  setLoading: (value: boolean) => void;
}