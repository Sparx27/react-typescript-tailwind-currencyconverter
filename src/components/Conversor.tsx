import { useEffect, useRef, useState } from 'react';
import { CurrencyOption } from '../types/currency_types';
import { currencyOptions } from '../services/currencyOptions';
import SearchableSelect from './SearchableSelect/SearchableSelect';
import { ButtonRef, CurrencySearchableSelectRef } from '../types/components_types';
import { getPairConversion } from '../services/exchange';
import { parseNumberToCurrency } from '../utils/currencyUtils';
import { ApiPairConversionResponse } from '../types/apiResponse_types';
import Result from './Result';
import Button from './Button';

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
const Conversor = () => {
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [amount, setAmount] = useState<string>('1');
  const [parsedAmount, setParsedAmount] = useState<string>(parseNumberToCurrency(1, 'USD'));
  const [amountFocused, setAmountFocused] = useState<boolean>(false);
  const [conversionData, setConversionData] = useState<ApiPairConversionResponse | null>(null);
  const fromCode = useRef<CurrencySearchableSelectRef>(null);
  const toCode = useRef<CurrencySearchableSelectRef>(null);
  const btnRef = useRef<ButtonRef>(null);

  useEffect(() => {
    setCurrencies(currencyOptions);
  }, []);

  async function handleConvertClick(): Promise<void> {
    if (
      (fromCode.current?.getSelectedCode() && toCode.current?.getSelectedCode() && Number(amount) > 0) &&
      (fromCode.current.getSelectedCode() !== toCode.current.getSelectedCode())
    ) {
      btnRef.current?.setLoading(true);
      try {
        const res = await getPairConversion(fromCode.current.getSelectedCode(), toCode.current.getSelectedCode(), amount);
        res.amount = amount;
        setConversionData(res);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        btnRef.current?.setLoading(false);
      }
    }
  }

  function parseAmount(value: string, code?: string): void {
    const parsed = code
      ? parseNumberToCurrency(Number(value), code)
      : parseNumberToCurrency(Number(value), fromCode.current?.getSelectedCode() || 'USD');
    setParsedAmount(parsed);
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const numberPart = e.target.value
      .replace(/[^0-9\.]/g, '')
      .replace(/^([^.]*\.)|\./g, '$1')
      .replace(/^(\d+\.?\d{0,2}).*$/, '$1');

    setAmount(numberPart);
    parseAmount(numberPart);
  }

  function handleAmountBlur(e: React.FocusEvent<HTMLInputElement>): void {
    parseAmount(e.target.value);
    setAmountFocused(false);
  }

  return (
    <section className="w-full max-w-[1290px] bg-white z-10 shadow-xl rounded-2xl px-4 py-8 md:px-8 md:py-16">
      <fieldset className='w-full lg:flex lg:gap-2 mb-5'>
        <label className="label-input amount-input" >
          <p>Amount</p>
          <input
            className='input-number'
            type="text"
            value={amountFocused ? amount : parsedAmount}
            onFocus={() => setAmountFocused(true)}
            onChange={handleAmountChange}
            onBlur={handleAmountBlur}
          />
        </label>
        <label className="label-input">
          <p>From</p>
          <SearchableSelect
            ref={fromCode}
            startValue='USD United States Dollar'
            list={currencies}
            amount={amount}
            setParsedAmount={parseAmount} />
        </label>
        <label className="label-input">
          <p>To</p>
          <SearchableSelect
            ref={toCode}
            startValue='UYU Uruguayan Peso'
            list={currencies} />
        </label>
      </fieldset>
      <div id="results" className='flex flex-col md:flex-row w-full md:items-end'>
        {
          conversionData && <Result data={conversionData} />
        }
        <Button ref={btnRef} text='Convert' handleClick={handleConvertClick} />
      </div>
    </section>
  );
};

export default Conversor;