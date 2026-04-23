import Header from "../component/header";
import SideHeader from "../component/side-header";

const HEADER_HEIGHT = "4.25rem"; // 68px (h-17 in Tailwind = 4.25rem)

const Mainlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
        <SideHeader />
      <div className="flex flex-col min-h-screen w-full lg:w-9/12 mx-auto">
        <Header />
        <div
          className="flex flex-col flex-1 min-w-0"
          style={{ paddingTop: HEADER_HEIGHT }}
        >
          <main className="flex-1 flex flex-col overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Mainlayout;
