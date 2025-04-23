import { useState } from 'react';

const options = [
  ['USD', 'United States Dollar'],
  ['EUR', 'Euro'],
  ['JPY', 'Japanese Yen'],
  ['GBP', 'British Pound']
];

export default function SearchableSelect() {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  console.log(selected);

  const filtered = options.filter(([, label]) =>
    label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="dropdown-list"
        aria-owns="dropdown-list"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)} // permite seleccionar antes de cerrar
        placeholder="Select currency"
      />
      {isOpen && (
        <ul id="dropdown-list" role="listbox" className="absolute z-10 bg-white border w-full">
          {filtered.map(([code, label]) => (
            <li
              key={code}
              role="option"
              onMouseDown={() => {
                setSearch(label);
                setSelected(code);
                setIsOpen(false);
              }}
              className="cursor-pointer px-2 py-1 hover:bg-gray-100"
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}