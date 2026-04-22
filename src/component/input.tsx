import { cn } from "../lib/utils";

interface InputFormProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}
const InputForm = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  type,
  className,
  disabled,
  error,
  errorMessage,
}: InputFormProps) => {
  return (
    <div className="flex flex-col">
      <label
        className={cn(
          `text-dark-secondary font-medium text-sm flex items-center justify-between gap-2`,
          error && "text-red-500",
        )}
        htmlFor={name}
      >
        {label}
        {error && (
          <span className="text-red-500 text-xs ml-1">
            {errorMessage || "can't be empty"}
          </span>
        )}
      </label>
      <input
        className={cn(
          "border text-black font-bold text-sm px-5 py-2.5 rounded-sm",
          error ? "border-red-500" : "border-secondary",
          className,
        )}
        type={type || "text"}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default InputForm;
