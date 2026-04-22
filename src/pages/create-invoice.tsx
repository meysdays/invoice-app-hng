import { useState } from "react";
import { useInvoice } from "../context/invoice-context";
import { BackIcon } from "../assets/icons";
import InvoiceForm, {
  type CreateInvoiceFormData,
} from "../component/InvoiceForm";

interface CreateInvoicePageProps {
  onBack: () => void;
}

const defaultForm: CreateInvoiceFormData = {
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
  paymentTerms: "",
  clientName: "",
  clientEmail: "",
  clientStreetAddress: "",
  invoiceDate: "",
  projectDescription: "",
  items: [{ itemName: "", qty: "", price: "", total: "" }],
};

type FormErrors = Partial<Record<keyof CreateInvoiceFormData, boolean>>;

const CreateInvoicePage = ({ onBack }: CreateInvoicePageProps) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<CreateInvoiceFormData>(defaultForm);
  const { addInvoice } = useInvoice();

  const handleFormChange = (data: CreateInvoiceFormData) => {
    setFormData(data);
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { itemName: "", qty: "", price: "", total: "" }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "items") return;
      if (typeof value === "string" && !value.trim()) {
        newErrors[key as keyof CreateInvoiceFormData] = true;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    addInvoice(formData);
    // Optionally reset form or show success message here
    console.log("Invoice Data:", formData);    
  };

  const handleSaveDraft = () => {
    // Save as draft logic here
    console.log("Draft Data:", formData);
  };

  return (
    <div className="flex-1 flex flex-col mx-6 overflow-scroll overflow-x-hidden">
      <button
        onClick={onBack}
        className="flex flex-row  items-center  gap-6 mt-8"
      >
        <BackIcon />
        <p className="font-bold text-center">Go back</p>
      </button>

      <h3 className="mt-6.5 font-bold text-2xl">New Invoice</h3>

      <form onSubmit={handleSubmit}>
        <InvoiceForm error={errors} value={formData} onChange={handleFormChange} />
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-secondary text-white rounded"
            onClick={handleAddItem}
          >
            Add New Item
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={handleSaveDraft}
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Save Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoicePage;
