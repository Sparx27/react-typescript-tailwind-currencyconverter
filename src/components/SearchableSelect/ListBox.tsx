import { useEffect, useState } from 'react';
import { CurrencyOption } from '../../types/currency_types';

interface ListBoxProps {
  list: CurrencyOption[];
  setPrevValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  //boxId: string;
}

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
const ListBox = ({ list, inputValue, setPrevValue }: ListBoxProps) => {
  const [optsToShow, setOptsToShow] = useState<CurrencyOption[]>(list);

  useEffect(() => {
    setOptsToShow(list.filter(o => {
      const str = o[0] + ' ' + o[1];
      return str.toLowerCase().includes(inputValue.toLowerCase());
    }));
  }, [inputValue, list]);

  function handleClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>): void {
    const element = e.target as HTMLLIElement;
    setPrevValue(element.innerText);
  }

  return (
    <ul
      className='fixed z-20 h-screen w-full top-0 left-0 overflow-y-scroll py-2 bg-white shadow-a md:absolute md:max-h-[200px] md:top-full md:mt-2 md:rounded-md'>
      {
        optsToShow.map(o => {
          const str = o[0] + ' ' + o[1];
          return <li
            key={`opt-${o[0]}`}
            className='px-3 py-2 font-semibold hover:bg-blue-100'
            onMouseDown={handleClick}
          >
            {str}
          </li>;
        })
      }
    </ul>
  );
};

export default ListBox;