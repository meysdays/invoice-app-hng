import { useEffect } from "react";
import { useInvoice } from "../context/invoice-context";
import { BackIcon } from "../assets/icons";
import CreateInvoicePage from "./create-invoice";

interface InvoiceDetailsProps {
  id: number | undefined;
  onBack: () => void;
  modal: boolean;
  handleModal: () => void;
}

const InvoiceDetails = ({
  onBack,
  id,
  modal,
  handleModal,
}: InvoiceDetailsProps) => {
  const { invoices, removeInvoice, updateInvoice } = useInvoice();

  const viewData = invoices.find((inv) => inv.id === id);

  const handleDelete = (id: number) => {
    removeInvoice(id);
    onBack();
  };

  const handleStatus = (status: "pending" | "paid") => {
    if (!viewData) return;
    const updatedInvoice = { ...viewData, status };
    updateInvoice(viewData.id as number, updatedInvoice);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modal]);

  if (!viewData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mx-6">
        <button
          onClick={onBack}
          className="flex flex-row  items-center  gap-6 mt-8 cursor-pointer"
        >
          <BackIcon />
          <p className="font-bold text-center hover:text-secondary-hover">
            Go back
          </p>
        </button>
        <div className=" px-3 py-4 mb-16 mt-8 ">
          <div className="flex items-center justify-between bg-white mx-auto mb-2.5 px-4 py-6 rounded-xl border border-white">
            <div className="flex flex-row justify-between items-center w-full md:w-3/12">
              <p className="font-medium text-secondary-hover">Status</p>
              <div
                className={`flex items-center py-3 px-4 gap-2.5 rounded-xl
                    ${viewData.status === "pending" ? "bg-yellow-200" : ""}
                    ${viewData.status === "draft" ? "bg-gray-300" : ""}
                    ${viewData.status === "paid" ? "bg-green-200" : ""}
                  `}
              >
                <div
                  className={`h-3 w-3 rounded-4xl
                      ${viewData.status === "pending" ? "bg-yellow-400" : ""}
                      ${viewData.status === "draft" ? "bg-gray-500" : ""}
                      ${viewData.status === "paid" ? "bg-green-400" : ""}
                    `}
                />
                <p
                  className={`capitalize font-bold
                      ${viewData.status === "pending" ? "text-yellow-700" : ""}
                      ${viewData.status === "draft" ? "text-gray-700" : ""}
                      ${viewData.status === "paid" ? "text-green-700" : ""}
                    `}
                >
                  {viewData.status}
                </p>
              </div>
            </div>

            <div className="hidden md:flex justify-center gap-6 font-medium text-md ">
              <button
                type="button"
                className="px-5.5 py-3.5 rounded-4xl hover:bg-gray-400 cursor-pointer text-primary "
                onClick={handleModal}
              >
                Edit
              </button>
              <button
                type="button"
                className="px-5.5 py-3.5 rounded-4xl bg-tertiary cursor-pointer text-white "
                onClick={() => handleDelete(id as number)}
              >
                Delete
              </button>
              <button
                type="submit"
                className="px-5.5 py-3.5  rounded-4xl bg-primary cursor-pointer text-white"
                onClick={() => handleStatus("paid")}
              >
                Mark as Paid
              </button>
            </div>
          </div>

          <div className="py-3 px-4 bg-white rounded-xl">
            <div className="flex flex-col">
              <h3 className="font-bold text-lg">
                <span className="text-secondary-hover font-bold">#</span>
                {viewData.id}
              </h3>
              <p className="text-secondary-hover">
                {viewData.projectDescription}
              </p>
            </div>

            <div className="flex flex-col text-secondary-hover mt-4">
              <p>{viewData.streetAddress}</p>
              <p>{viewData.city}</p>
              <p>{viewData.postalCode}</p>
              <p>{viewData.country}</p>
            </div>

            <div className="flex flex-row justify-between mt-4 flex-wrap gap-4 my-4.5">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-medium text-secondary-hover mb-2.5">
                    Invoice Date
                  </p>
                  <p className="font-bold">{viewData.invoiceDate}</p>
                </div>

                <div>
                  <p className="font-medium text-secondary-hover mb-2.5">
                    Payment Due
                  </p>
                  <p className="font-bold">{viewData.invoiceDate}</p>
                </div>
              </div>

              <div>
                <p className="font-medium text-secondary-hover mb-2">Bill To</p>

                <div>
                  <p className="font-bold">{viewData.clientName}</p>
                  <p className="font-medium text-secondary-hover text-sm">
                    {viewData.clientStreetAddress}
                  </p>
                  <p className="font-medium text-secondary-hover text-sm">
                    {viewData.clientCity}
                  </p>
                  <p className="font-medium text-secondary-hover text-sm">
                    {viewData.clientPostalCode}
                  </p>
                  <p className="font-medium text-secondary-hover text-sm">
                    {viewData.clientCountry}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col ">
                <p className="font-medium text-secondary-hover">Sent to</p>
                <p className="font-bold">{viewData.clientEmail}</p>
              </div>
            </div>

            <div className="px-3.5 py-4 flex flex-col gap-2 mt-6 ">
              {viewData.items.map((item) => (
                <div className="bg-[#F9FAFE] flex  flex-col gap-1 px-4">
                  <p className="font-bold">{item.itemName}</p>
                  <div className="flex flex-row justify-between">
                    <p className="font-bold text-secondary-hover">
                      {item.qty} x £ {item.price}
                    </p>
                    <p className="font-bold">£ {item.total}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex justify-between  bg-[#373B53]  rounded-b-2xl">
                <div className="w-11/12 mx-auto flex items-center justify-between text-white py-7.5">
                  <p className="font-medium tracking-wider">Grand Total</p>
                  <p className="font-bold text-4xl">£ {viewData.grandTotal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-5 shadow-2xl fixed md:hidden bottom-0 left-0 w-full">
        <div className="flex justify-center gap-6 font-medium text-md ">
          <button
            type="button"
            className="px-5.5 py-3.5 rounded-4xl hover:bg-gray-400 cursor-pointer text-primary "
            onClick={handleModal}
          >
            Edit
          </button>
          <button
            type="button"
            className="px-5.5 py-3.5 rounded-4xl bg-tertiary cursor-pointer text-white "
            onClick={() => handleDelete(id as number)}
          >
            Delete
          </button>
          <button
            type="submit"
            disabled={viewData.status === "paid" || viewData.status === "draft"}
            className="px-5.5 py-3.5  rounded-4xl bg-primary cursor-pointer text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => handleStatus("paid")}
          >
            Mark as Paid
          </button>
        </div>
      </div>

      <div
        className={`fixed top-17 lg:top-0 lg:left-17 inset-x-0 bottom-0 z-50 transition-opacity duration-300  ${
          modal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex w-full h-full ">
          <div
            className={`w-full md:w-[75%] bg-dark-tertiary h-full rounded-r-2xl rounded-br-2xl overflow-hidden transform transition-transform duration-300 flex flex-col justify-between ${
              modal ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <CreateInvoicePage
              title={`Edit  #${viewData.id}`}
              editField={viewData}
              onBack={handleModal}
            />
          </div>

          <div className="hidden md:block flex-1 bg-black/60 " />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
