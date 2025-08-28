"use client";
import { useQuery } from "@apollo/client";
import { GET_WAREHOUSES } from "../graphql/queries";
import { useState, useMemo } from "react";

export default function FiltersBar({ filters, setFilters }) {
  const { data } = useQuery(GET_WAREHOUSES);
  const [warehouseQuery, setWarehouseQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredWarehouses = useMemo(() => {
    if (!data?.warehouses) return [];
    return data.warehouses.filter((w) =>
      w.name.toLowerCase().includes(warehouseQuery.toLowerCase())
    );
  }, [data?.warehouses, warehouseQuery]);

  return (
    <div className="flex flex-wrap justify-end items-start gap-2 my-2 w-full relative">
      <input
        type="text"
        placeholder="Search by Name, SKU, or ID..."
        className="border p-2 rounded w-64"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <div className="relative w-48">
        <input
          type="text"
          placeholder="Select Warehouse..."
          className="border p-2 rounded w-full"
          value={
            filters.warehouse
              ? data?.warehouses.find((w) => w.code === filters.warehouse)?.name
              : warehouseQuery
          }
          onChange={(e) => {
            setWarehouseQuery(e.target.value);
            setDropdownOpen(true);
          }}
          onFocus={() => setDropdownOpen(true)}
        />
        {dropdownOpen && (
          <ul className="absolute z-50 mt-1 w-full max-h-60 overflow-auto border rounded bg-white shadow-lg">
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFilters({ ...filters, warehouse: "" });
                setWarehouseQuery("");
                setDropdownOpen(false);
              }}
            >
              All Warehouses
            </li>
            {filteredWarehouses.map((w) => (
              <li
                key={w.code}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setFilters({ ...filters, warehouse: w.code });
                  setWarehouseQuery("");
                  setDropdownOpen(false);
                }}
              >
                {w.code}
              </li>
            ))}
          </ul>
        )}
      </div>

      <select
        className="border p-2 rounded"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All</option>
        <option value="Healthy">Healthy</option>
        <option value="Low">Low</option>
        <option value="Critical">Critical</option>
      </select>
    </div>
  );
}
