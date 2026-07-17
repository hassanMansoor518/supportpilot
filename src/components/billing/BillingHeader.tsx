export default function BillingHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-100 mb-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Billing</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your subscription, payment methods, usage, and invoices.
        </p>
      </div>
    </div>
  );
}
