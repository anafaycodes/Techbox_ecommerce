import InfoLayout from "./InfoLayout.jsx";

export default function DeliveryPage() {
  return (
    <InfoLayout title="Delivery Information">
      <h3>Local Delivery (Karachi)</h3>
      <p>We offer local city delivery handled directly by Techbox. Please confirm the exact delivery fee and timing with our team at the time of order confirmation.</p>
      
      <h3>Out of City Shipping</h3>
      <p>For customers outside Karachi, shipping is planned through Leopards Courier. Exact charges and delivery timelines will be provided upon order confirmation.</p>

      <h3>Payment Verification</h3>
      <p>Please note that for Bank Transfer and Easypaisa, orders are only dispatched after manual payment verification by our team.</p>
    </InfoLayout>
  );
}
