import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function OnTimeLateChart({ onTime, late }) {
  const data = [
    { name: "On-time", value: onTime },
    { name: "Late", value: late }
  ];
  return (
    <div className="bg-white rounded-2xl shadow p-4 h-72">
      <h3 className="font-semibold mb-2">On-time vs Late</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie dataKey="value" data={data} outerRadius={90} label />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
