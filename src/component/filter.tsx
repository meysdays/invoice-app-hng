import { DownIcon, PlusIcon } from "../assets/icons"

interface FilterSectionProps {
  onCreate: () => void;
}

const FilterSection = ({onCreate}:FilterSectionProps) => {
  return (
    <section className=" w-11/12 mx-auto my-8">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h3 className="font-bold text-2xl">Invoices</h3>
            <p className="font-medium text-sm text-secondary-hover">
              No invoices
            </p>
          </div>

          <div className="flex flex-row gap-4.5">
            <button className="flex flex-row items-center gap-2">
              <p className="font-bold text-sm">Filter</p>
              <DownIcon />
            </button>

            <button onClick={onCreate} className="bg-primary flex flex-row items-center gap-1 rounded-3xl w-22.5">
              <div className="h-8 w-8 bg-white rounded-4xl flex items-center justify-center m-1.5">
                <PlusIcon />
              </div>
              <p className="font-bold text-white text-sm ">New</p>
            </button>
          </div>
        </div>
      </section>
  )
}

export default FilterSection