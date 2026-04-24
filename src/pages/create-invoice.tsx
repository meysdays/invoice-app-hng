import { useState } from "react";
import { useInvoice } from "../context/invoice-context";
import { BackIcon } from "../assets/icons";
import InvoiceForm, {
  type CreateInvoiceFormData,
} from "../component/InvoiceForm";

interface CreateInvoicePageProps {
  onBack: () => void;
  editField?: CreateInvoiceFormData | null;
  title: string;
}

const defaultForm: CreateInvoiceFormData = {
  id: null,
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
  clientCity: "",
  clientPostalCode: "",
  clientCountry: "",
  status: null,
  grandTotal: 0,
};

type FormErrors = Partial<Record<keyof CreateInvoiceFormData, boolean>>;

const CreateInvoicePage = ({
  onBack,
  editField,
  title,
}: CreateInvoicePageProps) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<CreateInvoiceFormData>(
    editField || defaultForm,
  );
  const { addInvoice, updateInvoice } = useInvoice();

  const handleFormChange = (data: CreateInvoiceFormData) => {
    setFormData(data);
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { itemName: "", qty: "", price: "", total: "" }],
    }));
  };

  const getGrandTotal = () => {
    return formData.items.reduce((sum, item) => {
      const total = parseFloat(item.total);
      return sum + (isNaN(total) ? 0 : total);
    }, 0);
  };

  const validateAndAddInvoice = (status: "pending" | "draft") => {
    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "items") return;
      if (typeof value === "string" && !value.trim()) {
        newErrors[key as keyof CreateInvoiceFormData] = true;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const grandTotal = getGrandTotal();
    const invoiceWithStatus = { ...formData, status, grandTotal };

    if (!editField) {
      addInvoice(invoiceWithStatus);
      console.log("Invoice Data:", invoiceWithStatus);
    }else{
      updateInvoice(editField.id as number, invoiceWithStatus);
      console.log("Updated Invoice Data:", invoiceWithStatus);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndAddInvoice("pending");
    onBack();
  };

  const handleDiscard = () => {
    if (editField) {
      onBack();
    } else {
      setFormData(defaultForm);
      onBack();
    }
  }

  const handleSaveDraft = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    type status = "draft" | "pending" | "paid";
    const grandTotal = getGrandTotal();
    const invoiceWithStatus = {
      ...formData,
      status: "draft" as status,
      grandTotal,
    };
    addInvoice(invoiceWithStatus);
    console.log("Draft Data:", invoiceWithStatus);
  };

  return (
    <div className="flex-1 flex flex-col mx-6 overflow-scroll overflow-x-hidden">
      <button
        onClick={onBack}
        className="flex flex-row  items-center  gap-6 mt-8 cursor-pointer"
      >
        <BackIcon />
        <p className="font-bold text-center hover:text-secondary-hover">
          Go back
        </p>
      </button>

      <h3 className="mt-6.5 font-bold text-2xl">{title}</h3>

      <form onSubmit={handleSubmit}>
        <InvoiceForm
          error={errors}
          value={formData}
          onChange={handleFormChange}
        />

        <button
          type="button"
          className="w-full px-4 py-2 bg-secondary text-white rounded"
          onClick={handleAddItem}
        >
          Add New Item
        </button>

        <div className="flex justify-end gap-3 my-6 font-medium text-sm md:text-md py-4  shadow-2xl">
          <button
            type="button"
            className="px-5.5 py-3.5 rounded-4xl hover:bg-secondary cursor-pointer text-secondary-hover w-1/4 lg:w-1/8"
            onClick={handleDiscard}
          >
            {editField ? "Cancel" : "Discard"}
          </button>
          <button
            type="button"
            className={`rounded-4xl bg-gray-400 cursor-pointer text-white w-1/2  md:w-1/4 lg:w-1/6 ${editField ? "hidden" : ""}`}
            onClick={handleSaveDraft}
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="rounded-4xl bg-primary cursor-pointer text-white w-1/2 md:w-1/4 lg:w-1/6"
          >
            {editField ? "Save Changes" : "Save & Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoicePage;
