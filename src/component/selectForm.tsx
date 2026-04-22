import React from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFormProps {
  label: string;
  name: string;
  value: string;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectForm = ({
  label,
  name,
  value,
  options,
  onChange,
}: SelectFormProps) => {
  return (
    <div className="flex flex-col">
      <label
        className="text-dark-secondary font-medium text-sm"
        htmlFor={name}
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-secondary text-black font-bold text-sm px-5 py-2.5 rounded-sm"
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;