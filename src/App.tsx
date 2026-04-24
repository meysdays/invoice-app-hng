import { useState } from "react";
import Mainlayout from "./layout/mainlayout";
import MainPage from "./pages/mainpage";
import FilterSection from "./component/filter";

type Page = "home" | "create" | "details";

export interface NavigationState {
  page: Page;
  id?: number;
}

const App = () => {
  const [navigation, setNavigation] = useState<NavigationState>({
    page: "home",
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const goToDetails = (id: number) => {
    setNavigation({
      page: "details",
      id,
    });
  };
  const goToCreate = () => {
    setNavigation({
      page: "create",
    });
  };

  const goBack = () => {
    setNavigation({
      page: "home",
    });
  };

  return (
    <div className="bg-dark-tertiary dark:bg-dark-tertiary-hover]">
      <Mainlayout>
        {navigation.page === "home" && <FilterSection onCreate={handleModal} />}
        <MainPage
          onDetails={goToDetails}
          onCreate={goToCreate}
          goBack={goBack}
          navigation={navigation}
          modal={isOpen}
          handleModal={handleModal}
        />
      </Mainlayout>
    </div>
  );
};

export default App;
