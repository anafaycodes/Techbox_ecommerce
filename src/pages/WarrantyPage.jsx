import InfoLayout from "./InfoLayout.jsx";

export default function WarrantyPage() {
  return (
    <InfoLayout title="Warranty Information">
      <p>Warranty terms depend on the specific condition of the phone (Box Packed vs. Used).</p>
      <h3>Box Packed Devices</h3>
      <p>These devices carry the official manufacturer warranty. Please refer to the manufacturer's official terms.</p>
      <h3>Used Devices</h3>
      <p>Specific warranty periods for used devices will be stated clearly on the product page or invoice at the time of purchase.</p>
    </InfoLayout>
  );
}
