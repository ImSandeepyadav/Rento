'use client';

import Select from 'react-select';
import useCountries from '@/app/hooks/useCountries';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[],
  region: string;
  value: string
}

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div className="text-xl">{option.flag}</div>
            <div className="text-neutral-800">
              {option.label}
              <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2 border-neutral-300 rounded-lg bg-white hover:border-neutral-400 focus-within:border-neutral-600',
          input: () => 'text-lg text-neutral-800',
          option: () => 'text-neutral-800 text-lg p-2 hover:bg-neutral-100 cursor-pointer transition',
          menu: () => 'mt-2 border border-neutral-200 bg-white rounded-lg shadow-lg overflow-hidden',
          menuList: () => 'py-2 max-h-60',
          placeholder: () => 'text-neutral-500',
          singleValue: () => 'text-neutral-800',
          valueContainer: () => 'gap-2',
          indicatorSeparator: () => 'bg-neutral-300',
          dropdownIndicator: () => 'text-neutral-500 hover:text-neutral-800 transition',
          clearIndicator: () => 'text-neutral-500 hover:text-neutral-800 transition'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 8,
          colors: {
            ...theme.colors,
            neutral0: 'white',    // Background color
            neutral5: '#f9fafb',  // Hover background
            neutral10: '#f3f4f6', // Selected background
            neutral20: '#e5e7eb', // Border color
            neutral30: '#d1d5db', // Hover border color
            neutral40: '#9ca3af', // Placeholder text
            neutral50: '#6b7280', // Label text
            neutral60: '#4b5563', // Selected text
            neutral70: '#374151', // Active text
            neutral80: '#1f2937', // Normal text
            neutral90: '#111827', // Strong text
            primary: '#2563eb',   // Primary color (for focus, selected states)
            primary25: '#eff6ff', // Hover highlight
            primary50: '#dbeafe', // Selected highlight
            primary75: '#bfdbfe'  // Active highlight
          }
        })}
      />
    </div>
  );
}

export default CountrySelect;