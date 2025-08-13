import CrudTable from "../components/CrudTable";
export default function Orders() {
  const cols = [
    { key:"orderId", label:"Order ID" },
    { key:"valueRs", label:"Value (₹)" },
    { key:"routeRef", label:"Route ID" },
    { key:"deliveryTimestamp", label:"Delivery Timestamp (ISO)" }
  ];
  return <CrudTable title="Orders" path="/orders" columns={cols}
    emptyRow={{ orderId:"", valueRs:"", routeRef:"", deliveryTimestamp:new Date().toISOString() }}
    transformOut={(d)=>({
      orderId:d.orderId, valueRs:+d.valueRs, routeRef:d.routeRef, deliveryTimestamp:new Date(d.deliveryTimestamp).toISOString()
    })}
  />;
}
