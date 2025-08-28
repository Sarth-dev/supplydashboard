/* eslint-disable no-unused-vars */
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import FiltersBar from "./component/FiltersBar";
import KPICards from "./component/KPICards";
import { GET_PRODUCTS } from "./graphql/queries";
import LineChart from "./component/LineChart";
import ProductsTable from "./component/ProductsTable";
import Layout from "./component/Layout";
import { useState } from "react";
import ProductDrawer from "./component/ProductsDrawer";



export default function App() {
  const [range, setRange] = useState("7d");

  const [filters, setFilters] = useState({
    search: "",
    warehouse: "",
    status: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data, loading, error } = useQuery(GET_PRODUCTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  // all products fetch
  const products = data?.products || [];
  

  // apply filters
  const filteredProducts = products.filter((p) => {
    let ok = true;

    // search by name or SKU
    if (filters.search) {
      ok =
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.sku.toLowerCase().includes(filters.search.toLowerCase());
    }

    // warehouse filter
    if (ok && filters.warehouse) {
      ok = p.warehouse === filters.warehouse;
    }

    // status filter
    if (ok && filters.status) {
      ok = p.status === filters.status;
    }

    return ok;
  });

  return (
    <>
      <Layout>
        {(range) => <KPICards dateRange={range} products={data?.products || []} />}
      </Layout>

      <FiltersBar filters={filters} setFilters={setFilters} />
      <LineChart range={range} />
      <div className="relative">
        <ProductsTable
        filters={filters}
        onRowClick={(product) => setSelectedProduct(product)}
      />

        {/* Right-side drawer */}
        {selectedProduct && (
          <ProductDrawer
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </>
  );
}
