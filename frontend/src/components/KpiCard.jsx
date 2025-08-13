export default function KpiCard({ title, value, suffix }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}{suffix || ""}</div>
    </div>
  );
}
