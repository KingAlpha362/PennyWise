export default function AuthForm({ initialMode = 'signin', onAuthSuccess, onBack }) {
  return <section className="min-h-screen bg-bg text-text flex items-center justify-center px-6 py-24">
    <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8">
      <button onClick={onBack} className="btn-secondary mb-8">Back to PennyWise</button>
      <h1 className="text-3xl font-bold">{initialMode === 'signin' ? 'Welcome to the demo' : 'Explore PennyWise'}</h1>
      <p className="text-text-muted mt-4 mb-6">Try the dashboard with fictional accounts and sample transactions. No account, email, password, or bank connection is needed.</p>
      <button onClick={onAuthSuccess} className="btn-primary w-full">Open demo dashboard</button>
      <p className="text-sm text-text-muted mt-5">Changes stay in this demo session and reset when you leave or reload. No payments or bank transfers are made.</p>
    </div>
  </section>;
}
