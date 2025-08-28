import { useMutation } from "@apollo/client/react";
import { UPDATE_DEMAND, TRANSFER_STOCK } from "../graphql/mutation";
import { useState } from "react";

export default function ProductDrawer({ product, onClose }) {
  const [updateDemand] = useMutation(UPDATE_DEMAND);
  const [transferStock] = useMutation(TRANSFER_STOCK);

  const [demand, setDemand] = useState(product?.demand);
  const [transferQty, setTransferQty] = useState(0);
  const [toWarehouse, setToWarehouse] = useState("");

  if (!product) return null;

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-xl p-6">
      <button className="mb-4 text-red-500" onClick={onClose}>Close</button>
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p>SKU: {product.sku}</p>
      <p>Warehouse: {product.warehouse}</p>
      <p>Stock: {product.stock}</p>
      <p>Demand: {product.demand}</p>

      <div className="mt-4">
        <h3 className="font-bold">Update Demand</h3>
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={demand}
          onChange={(e) => setDemand(Number(e.target.value))}
        />
        <button
          className="mt-2 bg-blue-600 text-white p-2 rounded"
          onClick={() => updateDemand({ variables: { id: product.id, demand } })}
        >
          Update
        </button>
      </div>

      <div className="mt-6">
        <h3 className="font-bold">Transfer Stock</h3>
        <input
          type="text"
          placeholder="To Warehouse"
          className="border p-2 rounded w-full mb-2"
          value={toWarehouse}
          onChange={(e) => setToWarehouse(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 rounded w-full"
          value={transferQty}
          onChange={(e) => setTransferQty(Number(e.target.value))}
        />
        <button
          className="mt-2 bg-green-600 text-white p-2 rounded"
          onClick={() =>
            transferStock({ variables: { id: product.id, from: product.warehouse, to: toWarehouse, qty: transferQty } })
          }
        >
          Transfer
        </button>
      </div>
    </div>
  );
}
