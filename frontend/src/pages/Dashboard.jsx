import { useEffect, useState } from "react";
import { api } from "../api/client";
import KpiCard from "../components/KpiCard";
import OnTimeLateChart from "../components/OnTimeLateChart";
import FuelCostChart from "../components/FuelCostChart";

export default function Dashboard() {
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    (async ()=>{
      const res = await api.get("/simulations/history");
      setLatest(res.data?.[0] || null);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!latest) return <div className="text-gray-600">No simulations yet. Run one from the Simulation page.</div>;

  const { kpis, details } = latest;
  const fuelByRoute = (details || []).reduce((acc, d) => {
    if (!d.assigned) return acc;
    acc[d.routeId] = (acc[d.routeId] || 0) + d.fuelCost;
    return acc;
  }, {});
  const fuelItems = Object.entries(fuelByRoute).map(([routeId, fuelCost])=>({ routeId, fuelCost: Math.round(fuelCost) }));

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Total Profit" value={`₹${kpis.totalProfit}`} />
        <KpiCard title="Efficiency" value={kpis.efficiencyScore} suffix="%" />
        <KpiCard title="Deliveries" value={kpis.totalDeliveries} />
        <KpiCard title="On-time" value={kpis.onTime} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <OnTimeLateChart onTime={kpis.onTime} late={kpis.late} />
        <FuelCostChart items={fuelItems} />
      </div>
    </div>
  );
}
