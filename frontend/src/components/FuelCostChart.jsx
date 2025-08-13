import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function FuelCostChart({ items }) {
  // items: [{routeId, fuelCost}]
  return (
    <div className="bg-white rounded-2xl shadow p-4 h-72">
      <h3 className="font-semibold mb-2">Fuel Cost Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={items}>
          <XAxis dataKey="routeId" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="fuelCost" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
