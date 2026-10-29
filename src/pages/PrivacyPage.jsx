import InfoLayout from "./InfoLayout.jsx";

export default function PrivacyPage() {
  return (
    <InfoLayout title="Privacy Policy">
      <p>At Techbox, we respect your privacy. This policy outlines how we handle your data.</p>
      <h3>Information We Collect</h3>
      <p>When you place an order, we collect your name, phone number, delivery address, and optional email address to fulfill your order.</p>
      <h3>How We Use Your Data</h3>
      <p>Your information is used strictly for order processing, delivery, and customer support. We do not sell your data to third parties.</p>
      <h3>Payment Details</h3>
      <p>We do not store credit card numbers or sensitive banking credentials on our servers. Manual payment verifications are handled securely by our team.</p>
    </InfoLayout>
  );
}
