import { EmailIcon } from "../assets/icons";
import { useInvoice } from "../context/invoice-context";
import CreateInvoicePage from "./create-invoice";

interface HomePageProps {
  onDetails?: (id: number) => void;
  modal: boolean;
  handleModal: () => void;
}

const HomePage = ({  modal, handleModal }: HomePageProps) => {
  const { invoices } = useInvoice();

  console.log("All invoices", invoices);

  return (
    <>
      <div className="flex-1 flex justify-center items-center ">
        <div className="w-9/20 md:w-4/16 flex flex-col ">
          <div className="flex items-center justify-center">
            <EmailIcon />
          </div>

          <div className="flex flex-col mt-12">
            <h2 className="font-bold text-2xl mb-4 text-center">There is nothing here</h2>

            <p className="font-medium text-sm text-secondary-hover text-center">
              Create an invoice by clicking the New button and get started
            </p>
          </div>
        </div>

        <div
          className={`fixed top-17 inset-x-0 bottom-0 z-50 transition-opacity duration-300  ${
            modal ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex w-full h-full ">
            <div
              className={`w-full md:w-[70%] bg-white h-full rounded-r-2xl rounded-br-2xl overflow-hidden transform transition-transform duration-300 flex flex-col justify-between ${
                modal ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <CreateInvoicePage onBack={handleModal} />
            </div>

            <div className="hidden md:block flex-1 bg-black/60 " />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
