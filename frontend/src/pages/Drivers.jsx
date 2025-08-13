import CrudTable from "../components/CrudTable";
export default function Drivers() {
  const cols = [
    { key:"name", label:"Name" },
    { key:"currentShiftMinutes", label:"Current Shift (min)" },
    { key:"last7DaysMinutes", label:"Last 7 Days (array)" }
  ];
  return <CrudTable title="Drivers" path="/drivers" columns={cols}
    emptyRow={{ name:"", currentShiftMinutes:"0", last7DaysMinutes:"300,420,480,360,300,300,300" }}
    transformOut={(d)=>({
      name:d.name,
      currentShiftMinutes:+d.currentShiftMinutes,
      last7DaysMinutes:String(d.last7DaysMinutes).split(",").map(x=>+x.trim())
    })}
  />;
}
