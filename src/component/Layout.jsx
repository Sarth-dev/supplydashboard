"use client";
import { useState } from "react";

export default function Layout({ children }) {
  const [range, setRange] = useState("7d");

  return (
    <div className="bg-gray-50 ">
      {/* Top Bar */}
      <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">SupplySight Dashboard</h1>

        {/* Date Range Chips */}
        <div className="flex gap-2">
          {["7d", "14d", "30d"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                range === r
                  ? "bg-white text-blue-600"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Pass selected range to children */}
        {typeof children === "function" ? children(range) : children}
      </main>
    </div>
  );
}
