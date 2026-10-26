export default function Footer() {
  return <footer id="contact" className="border-t border-border bg-[var(--bg-subtle)] px-6 py-12 text-text">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-8">
      <div className="max-w-sm"><a href="#home" className="text-xl font-bold">PennyWise</a><p className="text-sm text-text-muted mt-3">A personal finance product demonstration. All financial data shown is fictional.</p></div>
      <nav aria-label="Footer" className="flex flex-wrap items-start gap-6 text-sm">
        <a href="#features">Features</a><a href="#benefits">Benefits</a><a href="#pricing">Pricing</a><a href="#faq">Demo questions</a>
        <a href="https://github.com/KingAlpha362/PennyWise">Source &amp; feedback</a>
      </nav>
    </div>
    <p className="max-w-6xl mx-auto mt-8 text-sm text-text-muted">© {new Date().getFullYear()} PennyWise. Demo only; no account or subscription is created.</p>
  </footer>;
}
