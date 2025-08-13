import CrudTable from "../components/CrudTable";
export default function RoutesPage() {
  const cols = [
    { key:"routeId", label:"Route ID" },
    { key:"distanceKm", label:"Distance (km)" },
    { key:"trafficLevel", label:"Traffic (Low/Medium/High)" },
    { key:"baseTimeMin", label:"Base Time (min)" }
  ];
  return <CrudTable title="Routes" path="/routes" columns={cols}
    emptyRow={{ routeId:"", distanceKm:"", trafficLevel:"Low", baseTimeMin:"" }}
    transformOut={(d)=>({
      routeId:d.routeId, distanceKm:+d.distanceKm, trafficLevel:d.trafficLevel, baseTimeMin:+d.baseTimeMin
    })}
  />;
}
