import { useQuery } from "@apollo/client/react";
import { GET_KPIS } from "../graphql/queries";
import {
  LineChart as ReLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LineChart({ range = "7d" }) {
  const { data, loading, error } = useQuery(GET_KPIS, { variables: { range } });

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const chartData = data?.kpis || [];
  console.log("KPI Query Result:", data);


  if (!chartData.length) return <p>No KPI data available</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow my-4">
      <h2 className="mb-2 font-bold">Stock vs Demand Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ReLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="stock" stroke="#3b82f6" />
          <Line type="monotone" dataKey="demand" stroke="#ef4444" />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}
