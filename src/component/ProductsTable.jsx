import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";

export default function ProductsTable({ filters, onRowClick }) {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: filters,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const getStatus = (p) => {
    if (p.stock > p.demand) return "Healthy";
    if (p.stock === p.demand) return "Low";
    return "Critical";
  };

  return (
    <table className="w-full border-collapse text-center">
      <thead>
        <tr className="bg-gray-100">
          <th>Product</th>
          <th>SKU</th>
          <th>Warehouse</th>
          <th>Stock</th>
          <th>Demand</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.products.map((p) => {
          const status = getStatus(p);
          return (
            <tr
              key={p.id}
              onClick={() => onRowClick(p)}
              className={`cursor-pointer hover:bg-gray-50 ${
                status === "Critical" ? "bg-red-50" : ""
              }`}
            >
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.warehouse}</td>
              <td>{p.stock}</td>
              <td>{p.demand}</td>
              <td>
                <span
                  className={`font-semibold ${
                    status === "Healthy"
                      ? "text-green-600"
                      : status === "Low"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  ● {status}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
