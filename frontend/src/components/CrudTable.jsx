import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function CrudTable({ title, path, columns, emptyRow, transformOut }) {
  const [rows, setRows] = useState([]);
  const [draft, setDraft] = useState(emptyRow);
  const [err, setErr] = useState("");

  const load = async () => {
    const r = await api.get(path);
    setRows(r.data);
  };
  useEffect(()=>{ load(); }, []);

  const create = async () => {
    setErr("");
    try {
      const payload = transformOut ? transformOut(draft) : draft;
      await api.post(path, payload);
      setDraft(emptyRow);
      load();
    } catch (e) { setErr(e.response?.data?.error || "Failed"); }
  };

  const update = async (id, updates) => {
    await api.patch(`${path}/${id}`, updates);
    load();
  };

  const remove = async (id) => {
    await api.delete(`${path}/${id}`);
    load();
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="font-semibold mb-3">{title}</h3>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            {columns.map(c=><th key={c.key} className="py-2">{c.label}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            {columns.map(c=>(
              <td key={c.key} className="py-1">
                <input className="border rounded p-1 w-full"
                  value={draft[c.key] ?? ""}
                  onChange={e=>setDraft({...draft, [c.key]: e.target.value})}/>
              </td>
            ))}
            <td><button className="px-3 py-1 bg-green-600 text-white rounded" onClick={create}>Add</button></td>
          </tr>
          {rows.map(r=>(
            <tr key={r._id} className="border-b">
              {columns.map(c=>(
                <td key={c.key} className="py-1">{String(r[c.key] ?? "")}</td>
              ))}
              <td className="space-x-2">
                <button className="px-2 py-1 border rounded" onClick={()=>update(r._id, r)}>Edit</button>
                <button className="px-2 py-1 border rounded" onClick={()=>remove(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
