export default function SecurityIntegrations() {
  return <section className="bg-bg px-6 py-16"><div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-text">Know what you are exploring</h2>
    <div className="grid sm:grid-cols-3 gap-6 mt-8 text-text-muted">
      <div><h3 className="text-text font-semibold">Sample data</h3><p>Accounts, balances, and transactions are fictional.</p></div>
      <div><h3 className="text-text font-semibold">No bank connection</h3><p>This demo does not connect to banks or move money.</p></div>
      <div><h3 className="text-text font-semibold">Session only</h3><p>Edits reset when you leave or reload the dashboard.</p></div>
    </div>
  </div></section>;
}
