import InputForm from "../component/input";
import SelectForm from "../component/selectForm";
import ItemList, { type ItemData } from "../component/ItemList";

type FormErrors = Partial<Record<keyof CreateInvoiceFormData, boolean>>;
// type ItemError = Partial<Record<keyof ItemData, boolean>>;

interface InvoiceFormProps {
  value: CreateInvoiceFormData;
  onChange: (data: CreateInvoiceFormData) => void;
  error: FormErrors;
}

// type status = "draft" | "pending" | "paid";

export interface CreateInvoiceFormData {
  id: number | null;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientPostalCode: string;
  clientCountry: string;
  invoiceDate: string;
  projectDescription: string;
  items: ItemData[];
  status: "draft" | "pending" | "paid" | null;
  grandTotal: number;
}

const options = [
  { label: "Lagos", value: "lagos" },
  { label: "Abuja", value: "abuja" },
  { label: "Port Harcourt", value: "ph" },
  { label: "Enugu", value: "enugu" },
];

const InvoiceForm = ({ value, onChange, error }: InvoiceFormProps) => {

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value: val } = e.target;
    onChange({
      ...value,
      [name]: val,
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
        <div className="flex flex-wrap gap-2 my-4.5">
          <div className="w-[48%] md:flex-1">
            <InputForm
              label="City"
              name="city"
              value={value.city}
              onChange={handleChange}
              error={error.city}
            />
          </div>

          <div className="w-[48%] md:flex-1">
            <InputForm
              label="Post Code"
              name="postalCode"
              value={value.postalCode}
              onChange={handleChange}
              error={error.postalCode}
            />
          </div>

          <div className="flex-1 md:w-[48%]">
            <InputForm
              label="Country"
              name="country"
              value={value.country}
              onChange={handleChange}
              error={error.country}
            />
          </div>
        </div>
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
        <div className="flex flex-wrap gap-2 my-4.5">
          <div className="w-[48%] md:flex-1">
            <InputForm
              label="City"
              name="clientCity"
              value={value.clientCity}
              onChange={handleChange}
              error={error.clientCity}
            />
          </div>

          <div className="w-[48%] md:flex-1">
            <InputForm
              label="Post Code"
              name="clientPostalCode"
              value={value.clientPostalCode}
              onChange={handleChange}
              error={error.clientPostalCode}
            />
          </div>
          <div className="flex-1 md:w-[48%]">
            <InputForm
              label="Country"
              name="clientCountry"
              value={value.clientCountry}
              onChange={handleChange}
              error={error.clientCountry}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-3">
          <div className="w-full md:w-1/2">
            <InputForm
              label="Invoice Date"
              name="invoiceDate"
              type="date"
              value={value.invoiceDate}
              onChange={handleChange}
              error={error.invoiceDate}
            />
          </div>

          <div className="w-full md:w-1/2">
            <SelectForm
              label="Payment Terms"
              name="paymentTerms"
              value={value.paymentTerms}
              options={options}
              onChange={handleChange}
            />
          </div>
        </div>

        <InputForm
          label="Project Description"
          name="projectDescription"
          value={value.projectDescription}
          onChange={handleChange}
          error={error.projectDescription}
        />
      </div>
      <ItemList items={value.items} onChange={handleItemChange} />
    </div>
  );
};

export default InvoiceForm;
