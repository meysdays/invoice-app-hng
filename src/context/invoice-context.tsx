import React, { createContext, useContext, useEffect, useState } from "react";
import { type CreateInvoiceFormData } from "../component/InvoiceForm";

interface InvoiceContextType {
  invoices: CreateInvoiceFormData[];
  addInvoice: (invoice: CreateInvoiceFormData) => void;
  updateInvoice: (index: number, invoice: CreateInvoiceFormData) => void;
  removeInvoice: (index: number) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "invoices";

const InvoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoices, setInvoices] = useState<CreateInvoiceFormData[]>([]);

  useEffect(() => {
    const loadInvoices =  () => {
      try {
        const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          setInvoices(JSON.parse(stored));
          console.log(stored);
          
        }
      } catch (error) {
        console.error("Failed to load invoices", error);
      }
    };
    loadInvoices();
  }, []);

  // useEffect(() => {
  //   window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(invoices));
  //   console.log("here");
    
  // }, [invoices]);

   const persistInvoices =  (invoices: CreateInvoiceFormData[]) => {
    try {
       window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(invoices));
    } catch (e) {
      console.error("Failed to save invoices", e);
    }
  };

  const addInvoice = (invoice: CreateInvoiceFormData) => {
    const invoiceAdded = {...invoice};
    const updatedInvoice = [...invoices, invoiceAdded];
    setInvoices(updatedInvoice);
    persistInvoices(updatedInvoice);
  };

  const updateInvoice = (id: number, invoice: CreateInvoiceFormData) => {
    setInvoices((prev) => prev.map((inv, i) => (i === id ? invoice : inv)));
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(invoices));
  };

  const removeInvoice = (id: number) => {
    setInvoices((prev) => prev.filter((_, i) => i !== id));
  };

  return (
    <InvoiceContext.Provider
      value={{ invoices, addInvoice, updateInvoice, removeInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
export default InvoiceProvider;

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
};
