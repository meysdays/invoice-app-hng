import type { NavigationState } from "../App";
import InvoiceDetails from "./details-invoice";
import HomePage from "./home";

interface MainPageProps {
  onDetails: (id: number) => void;
  onCreate: () => void;
  goBack: () => void;
  navigation: NavigationState;
  modal:boolean;
  handleModal: () => void;
}

const MainPage = ({ onDetails, goBack, navigation, modal, handleModal }: MainPageProps) => {
  return (
    <div className="flex-1 flex flex-col ">
      {navigation.page === "home" && <HomePage modal={modal} onDetails={onDetails} handleModal={handleModal} />}
      {navigation.page === "details" && <InvoiceDetails modal={modal} handleModal={handleModal} onBack={goBack} id={navigation.id} />}
    </div>
  );
};

export default MainPage;
