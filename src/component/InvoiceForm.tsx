import InputForm from "../component/input";
import SelectForm from "../component/selectForm";
import ItemList, { type ItemData } from "../component/ItemList";
import { useState } from "react";

type FormErrors = Partial<
  Record<keyof CreateInvoiceFormData, boolean>
>;
type ItemError = Partial<Record<keyof ItemData, boolean>>;


interface InvoiceFormProps {
  value: CreateInvoiceFormData;
  onChange: (data: CreateInvoiceFormData) => void;
  error: FormErrors;
}

export interface CreateInvoiceFormData {
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  invoiceDate: string;
  projectDescription: string;
  items: ItemData[];
}



const options = [
  { label: "Lagos", value: "lagos" },
  { label: "Abuja", value: "abuja" },
  { label: "Port Harcourt", value: "ph" },
  { label: "Enugu", value: "enugu" },
];

const InvoiceForm = ({ value, onChange, error }: InvoiceFormProps) => {

    const [itemErrors, setItemErrors] = useState<ItemError[]>(
        value.items.map(() => ({})),
      );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value: val } = e.target;
    onChange({
      ...value,
      [name]: val,
    });

    // setErrors((prev) => ({
    //   ...prev,
    //   [name]: false,
    // }));
  };

  const clearItemError = (
  index: number,
  field: keyof ItemData
) => {
  setItemErrors((prev) => {
    const updated = [...prev];

    updated[index] = {
      ...updated[index],
      [field]: false,
    };

    return updated;
  });
};

  const handleItemChange = (index: number, item: ItemData) => {
    const items = [...value.items];
    items[index] = item;
    onChange({ ...value, items: items });
  };

  return (
    <div className="py-6">
      <div className="my-5.5">
        <p className="font-medium text-primary mb-5.5">Bill From</p>
        <InputForm
          label="Street Address"
          name="streetAddress"
          value={value.streetAddress}
          onChange={handleChange}
          error={error.streetAddress}
        />
        <div className="flex flex-row justify-between my-4.5">
          <InputForm
            label="City"
            name="city"
            value={value.city}
            onChange={handleChange}
            error={error.city}
          />
          <InputForm
            label="Post Code"
            name="postalCode"
            value={value.postalCode}
            onChange={handleChange}
            error={error.postalCode}
          />
        </div>
        <InputForm
          label="Country"
          name="country"
          value={value.country}
          onChange={handleChange}
          error={error.country}
        />
      </div>
      <div className="my-5.5">
        <p className="font-medium text-primary mb-5.5">Bill To</p>
        <div className="flex flex-col gap-2.5">
          <InputForm
            label="Client's Name"
            name="clientName"
            value={value.clientName}
            onChange={handleChange}
            error={error.clientName}
          />
          <InputForm
            label="Client's Email"
            type="email"
            name="clientEmail"
            value={value.clientEmail}
            onChange={handleChange}
            error={error.clientEmail}
          />
          <InputForm
            label="Street Address"
            name="clientStreetAddress"
            value={value.clientStreetAddress}
            onChange={handleChange}
            error={error.clientStreetAddress}
          />
        </div>
        <div className="flex flex-row justify-between my-4.5">
          <InputForm
            label="City"
            name="city"
            value={value.city}
            onChange={handleChange}
            error={error.city}
          />
          <InputForm
            label="Post Code"
            name="postalCode"
            value={value.postalCode}
            onChange={handleChange}
            error={error.postalCode}
          />
        </div>
        <InputForm
          label="Country"
          name="country"
          value={value.country}
          onChange={handleChange}
          error={error.country}
        />
      </div>
      <div className="flex flex-col gap-4">
        <InputForm
          label="Invoice Date"
          name="invoiceDate"
          type="date"
          value={value.invoiceDate}
          onChange={handleChange}
          error={error.invoiceDate}
        />
        <InputForm
          label="Country"
          name="country"
          value={value.country}
          onChange={handleChange}
          error={error.country}
        />
        <SelectForm
          label="Payment Terms"
          name="paymentTerms"
          value={value.paymentTerms}
          options={options}
          onChange={handleChange}
        />
        <InputForm
          label="Project Description"
          name="projectDescription"
          value={value.projectDescription}
          onChange={handleChange}
          error={error.projectDescription}
        />
      </div>
      <ItemList items={value.items} onChange={handleItemChange} errors={itemErrors} />
    </div>
  );
};

export default InvoiceForm;
