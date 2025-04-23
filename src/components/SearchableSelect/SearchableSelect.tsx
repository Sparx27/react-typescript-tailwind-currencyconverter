import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { CurrencyOption } from '../../types/currency_types';
import ListBox from './ListBox';
import { CurrencySearchableSelectRef } from '../../types/components_types';

interface SearchableSelectProps {
  list: CurrencyOption[];
  startValue: string;
  amount?: string;
  setParsedAmount?: (value: string, code: string) => void;
  //updateCurrencyList: React.Dispatch<React.SetStateAction<CurrencyOption[]>>;
}

const SearchableSelect = forwardRef<CurrencySearchableSelectRef, SearchableSelectProps>((props, ref) => {
  const { list, startValue, setParsedAmount, amount } = props;
  const [currenciesList, setCurrenciesList] = useState<CurrencyOption[]>(list);
  const [value, setValue] = useState<string>(startValue);
  const [prevValue, setPrevValue] = useState<string>(startValue);
  const [showOpts, setShowOpts] = useState<boolean>(false);

  useEffect(() => {
    setCurrenciesList(list);
  }, [list]);

  useEffect(() => {
    setValue(prevValue);
  }, [prevValue]);

  // e: React.FocusEvent<HTMLInputElement>
  function setPrevFirst(): void {
    if (value !== '') {
      const prevCode = value.substring(0, 3);
      const index = currenciesList.findIndex((values) => values[0] === prevCode);

      if (index !== -1) {
        const updatedList = [currenciesList[index], ...currenciesList.filter((_, i) => i !== index)];
        setCurrenciesList(updatedList);
      }
    }
    setValue('');
  }

  useImperativeHandle(
    ref,
    () => ({
      getSelectedCode: (): string => value.substring(0, 3)
    }),
    [value]
  );

  return (
    <>
      <input
        type='text'
        placeholder='Search currency'
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setShowOpts(true);
        }}
        onFocus={() => {
          setPrevFirst();
          setShowOpts(true);
        }}
        onBlur={() => {
          setValue(prevValue);
          setShowOpts(false);
          if (setParsedAmount && amount) {
            setParsedAmount(amount, prevValue.substring(0, 3));
          }
        }}
      />
      {
        showOpts &&
        <ListBox
          inputValue={value}
          list={currenciesList}
          setPrevValue={setPrevValue} />
      }
    </>
  );
});

export default SearchableSelect;