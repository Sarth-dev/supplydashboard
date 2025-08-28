"use client";
import React from "react";
import { Package, ShoppingCart, TrendingUp } from "lucide-react";

export default function KPICards({ products }) {
  if (!products || products.length === 0) {
    return <p className="text-gray-500">No products available</p>;
  }
  console.log("Products in KPICards:", products);


  // KPI calculations 
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalDemand = products.reduce((sum, p) => sum + (p.demand || 0), 0);
  const fulfilled = products.reduce(
    (sum, p) => sum + Math.min(p.stock || 0, p.demand || 0),
    0
  );
  const fillRate = totalDemand > 0 ? ((fulfilled / totalDemand) * 100).toFixed(1) : 0;

  const kpis = [
    {
      title: "Total Stock",
      value: totalStock,
      icon: <Package className="w-10 h-10 text-blue-500" />,
      color: "from-blue-50 to-blue-100",
    },
    {
      title: "Total Demand",
      value: totalDemand,
      icon: <ShoppingCart className="w-10 h-10 text-green-500" />,
      color: "from-green-50 to-green-100",
    },
    {
      title: "Fill Rate",
      value: `${fillRate}%`,
      icon: <TrendingUp className="w-10 h-10 text-purple-500" />,
      color: "from-purple-50 to-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {kpis.map((kpi, idx) => (
        <div
          key={idx}
          className={`rounded-2xl bg-gradient-to-br ${kpi.color} shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center text-center`}
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm mb-4">
            {kpi.icon}
          </div>
          <h3 className="text-lg font-medium text-gray-600">{kpi.title}</h3>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">
            {kpi.value}
          </p>
        </div>
      ))}
    </div>
  );
}
