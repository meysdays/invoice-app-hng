import { EmailIcon } from "../assets/icons";
import { useInvoice } from "../context/invoice-context";
import CreateInvoicePage from "./create-invoice";

interface HomePageProps {
  onDetails: (id: number) => void;
  modal: boolean;
  handleModal: () => void;
}

const HomePage = ({ modal, handleModal, onDetails }: HomePageProps) => {
  const { invoices } = useInvoice();

  console.log("All invoices", invoices);

  return (
    <>
      {invoices.length > 0 ? (
        <div className="">
          {invoices.map((item) => (
            <div
              key={item.id}
              onClick={() => onDetails(item.id  as number)}
              className="flex justify-between bg-white w-11/12 mx-auto mb-5.5 px-4 py-5 transition-colors rounded-xl border border-white hover:border-primary cursor-pointer"
            >
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg">
                  <span className="text-secondary-hover font-bold">#</span>
                  {item.id}
                </h3>
                <div className="flex flex-col gap-2">
                  <p className="text-secondary-hover">Due {item.invoiceDate}</p>
                  <p className="font-bold text-md">£ {item.grandTotal}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-4">
                <p className="text-secondary-hover font-medium">
                  {item.clientName}
                </p>

                <div
                  className={`flex items-center py-3 px-4 gap-2.5 rounded-xl
                    ${item.status === "pending" ? "bg-yellow-200" : ""}
                    ${item.status === "draft" ? "bg-gray-300" : ""}
                    ${item.status === "paid" ? "bg-green-200" : ""}
                  `}
                >
                  <div
                    className={`h-3 w-3 rounded-4xl
                      ${item.status === "pending" ? "bg-yellow-400" : ""}
                      ${item.status === "draft" ? "bg-gray-500" : ""}
                      ${item.status === "paid" ? "bg-green-400" : ""}
                    `}
                  />
                  <p
                    className={`capitalize font-bold
                      ${item.status === "pending" ? "text-yellow-700" : ""}
                      ${item.status === "draft" ? "text-gray-700" : ""}
                      ${item.status === "paid" ? "text-green-700" : ""}
                    `}
                  >
                    {item.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-row justify-center items-center ">
          <div className="w-9/20 md:w-4/16 flex flex-col ">
            <div className="flex items-center justify-center">
              <EmailIcon />
            </div>

            <div className="flex flex-col mt-12">
              <h2 className="font-bold text-2xl mb-4 text-center">
                There is nothing here
              </h2>

              <p className="font-medium text-sm text-secondary-hover text-center">
                Create an invoice by clicking the New button and get started
              </p>
            </div>
          </div>
        </div>
      )}

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
            <CreateInvoicePage title="New Invoice" onBack={handleModal} />
          </div>

          <div className="hidden md:block flex-1 bg-black/60 " />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default HomePage;
