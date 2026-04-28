export default function Stats() {
  return (
    <section className="px-6 md:px-14 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="h-div mb-14"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="reveal">
            <div className="stat-n">12,000+</div>
            <div className="text-[0.78rem] text-text-muted mt-[5px]">Active users</div>
          </div>
          <div className="reveal reveal-d1">
            <div className="stat-n">$2.4B</div>
            <div className="text-[0.78rem] text-text-muted mt-[5px]">Tracked expenses</div>
          </div>
          <div className="reveal reveal-d2">
            <div className="stat-n">98%</div>
            <div className="text-[0.78rem] text-text-muted mt-[5px]">User satisfaction</div>
          </div>
          <div className="reveal reveal-d3">
            <div className="stat-n">4.9★</div>
            <div className="text-[0.78rem] text-text-muted mt-[5px]">App store rating</div>
          </div>
        </div>
        <div className="h-div mt-14"></div>
      </div>
    </section>
  );
}
