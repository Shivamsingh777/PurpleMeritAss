import { useState } from "react";
import { api } from "../api/client";

export default function Simulation() {
  const [form, setForm] = useState({ numDrivers: 2, routeStartHHMM: "09:00", maxHoursPerDriver: 8 });
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");

  const run = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const r = await api.post("/simulations/run", form);
      setRes(r.data);
    } catch (e) {
      setErr(e.response?.data?.error || "Failed");
    }
  };

  return (
    <div className="grid gap-4">
      <form onSubmit={run} className="bg-white rounded-2xl shadow p-4 grid md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm">Available Drivers</label>
          <input className="w-full border rounded p-2" type="number"
            value={form.numDrivers} onChange={e=>setForm({...form, numDrivers:+e.target.value})} required min={1} />
        </div>
        <div>
          <label className="text-sm">Route Start (HH:MM)</label>
          <input className="w-full border rounded p-2" value={form.routeStartHHMM}
            onChange={e=>setForm({...form, routeStartHHMM:e.target.value})} placeholder="09:00" required />
        </div>
        <div>
          <label className="text-sm">Max Hours/Driver</label>
          <input className="w-full border rounded p-2" type="number"
            value={form.maxHoursPerDriver} onChange={e=>setForm({...form, maxHoursPerDriver:+e.target.value})} required min={1} max={24}/>
        </div>
        <div className="flex items-end">
          <button className="w-full bg-green-600 text-white rounded p-2">Run Simulation</button>
        </div>
      </form>
      {err && <div className="text-red-600">{err}</div>}
      {res && (
        <div className="bg-white rounded-2xl shadow p-4 overflow-auto">
          <h3 className="font-semibold mb-2">KPIs</h3>
          <pre className="text-sm">{JSON.stringify(res.kpis, null, 2)}</pre>
          <h3 className="font-semibold mt-4 mb-2">Details</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Order</th><th>Driver</th><th>Route</th><th>On-time</th><th>Profit</th>
              </tr>
            </thead>
            <tbody>
            {res.details.filter(d=>d.assigned!==false).map((d,i)=>(
              <tr key={i} className="border-b">
                <td className="py-1">{d.orderId}</td>
                <td>{d.driverId?.slice(-6)}</td>
                <td>{d.routeId}</td>
                <td>{d.onTime ? "✅" : "❌"}</td>
                <td>₹{Math.round(d.profit)}</td>
              </tr>
            ))}
            </tbody>
          </table>
          {res.details.some(d=>d.assigned===false) && (
            <div className="mt-3 text-amber-700">
              Note: Some orders were not assigned due to capacity.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
