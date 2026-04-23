import { TrashIcon } from "../assets/icons";
import InputForm from "../component/input";

export interface ItemData {
  itemName: string;
  qty: string;
  price: string;
  total: string;
}

type ItemError = Partial<Record<keyof ItemData, boolean>>;


interface ItemListProps {
  items: ItemData[];
  onChange: (index: number, item: ItemData) => void;
  errors?: ItemError[];
}

const ItemList = ({ items, onChange }: ItemListProps) => {
  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const updatedItem = { ...items[index], [name]: value };
    if (name === "qty" || name === "price") {
      const qty = name === "qty" ? value : items[index].qty;
      const price = name === "price" ? value : items[index].price;
      updatedItem.total = (Number(qty) * Number(price)).toString();
    }
    onChange(index, updatedItem);
  };

  return (
    <div className="my-8">
      <h4 className="text-secondary-hover font-bold mb-6">Item List</h4>
      {items.map((item, idx) => (
        <div key={item.itemName}>
          <div className="">
            <InputForm
              label="Item Name"
              name="itemName"
              value={item.itemName}
              onChange={(e) => handleItemChange(idx, e)}
            />
          </div>
          <div key={idx} className="flex w-full gap-3 mt-4.5">
            <div className="w-1/6">
              <InputForm
                label="Qty"
                name="qty"
                value={item.qty}
                onChange={(e) => handleItemChange(idx, e)}
              />
            </div>
            <div className="w-2/6">
              <InputForm
                label="Price"
                name="price"
                value={item.price}
                onChange={(e) => handleItemChange(idx, e)}
              />
            </div>
            <div className="w-2/6">
              <InputForm
                label="Total"
                name="total"
                value={item.total}
                onChange={() => {}}
                disabled={true}
                className="border-0 text-secondary-hover"
              />
            </div>

            <div className="flex flex-1 items-center justify-end pt-4">
                <TrashIcon/>
            </div>
          </div>
        </div>
      ))}
      {/* Add New Item button removed; now handled by parent */}
    </div>
  );
};

export default ItemList;
