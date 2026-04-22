import Header from "../component/header";

const Mainlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-dark-tertiary ">
      <div className="z-50">
        <Header />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
};

export default Mainlayout;
