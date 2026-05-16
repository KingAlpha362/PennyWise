import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import ShapeGrid from './ui/ShapeGrid';

const chartData = [
  { month: 'Jan', value: 3200 },
  { month: 'Feb', value: 3800 },
  { month: 'Mar', value: 3600 },
  { month: 'Apr', value: 4900 },
  { month: 'May', value: 5200 },
  { month: 'Jun', value: 6100 },
  { month: 'Jul', value: 7400 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg border border-border p-3 rounded-lg shadow-lg">
        <p className="font-bold text-text">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardWidget() {
  return (
    <section className="relative px-6 md:px-14 pb-20 pt-10 overflow-hidden">
      {/* ShapeGrid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <ShapeGrid 
          speed={0.3} 
          squareSize={40}
          direction="diagonal"
          shape="square"
          hoverTrailAmount={5}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto glass-card rounded-2xl overflow-hidden border border-border shadow-sm hover:scale-[1.01] transition-all duration-300">
        {/* Dashboard content */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-bg-card min-h-[380px]">
          
          {/* Left sidebar */}
          <div className="lg:col-span-3 hidden lg:flex flex-col gap-3 border-r border-[rgba(255,255,255,0.06)] pr-4">
            {['Dashboard', 'Spending', 'Budget', 'Goals', 'Reports'].map((item, i) => (
              <div
                key={item}
                className={`reveal flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${i === 0 ? 'bg-text text-bg' : 'text-text-muted hover:bg-[rgba(255,255,255,0.06)]'} transition-all`}
              >
                <div className={`w-4 h-4 rounded-md ${i === 0 ? 'bg-bg/40' : 'bg-[rgba(255,255,255,0.12)]'}`} />
                <span className="font-semibold text-[0.85rem] tracking-wide">{item}</span>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="col-span-1 lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* KPI cards */}
            {[
              { label: 'Net Worth', value: '$48,240', change: '+12.3%', positive: true },
              { label: 'Monthly Spend', value: '$3,180', change: '-8.2%', positive: true },
              { label: 'Savings Rate', value: '34%', change: '+5.1%', positive: true },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="reveal bg-[rgba(255,255,255,0.04)] rounded-2xl p-5 border border-[rgba(255,255,255,0.06)] shadow-sm"
              >
                <div className="font-semibold text-[0.75rem] text-text-muted mb-3 tracking-wider uppercase">{kpi.label}</div>
                <div className="font-display font-black text-3xl text-text mb-2 tracking-tight">{kpi.value}</div>
                <div className={`font-semibold text-[0.8rem] ${kpi.positive ? 'text-accent' : 'text-red-400'}`}>{kpi.change}</div>
              </div>
            ))}

            {/* Chart */}
            <div
              className="reveal md:col-span-3 bg-[rgba(255,255,255,0.04)] rounded-2xl p-6 border border-[rgba(255,255,255,0.06)] shadow-sm"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="font-semibold text-[0.75rem] text-text-muted mb-2 tracking-wider uppercase">Wealth Growth</div>
                  <div className="font-display font-black text-4xl text-text tracking-tight">$7,400</div>
                </div>
                <div className="font-semibold text-[0.75rem] text-accent bg-[rgba(201,185,154,0.1)] px-4 py-2 rounded-full tracking-wider">+131% YTD</div>
              </div>
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="var(--accent)"
                      strokeWidth={3}
                      fill="url(#colorValue)"
                      dot={false}
                      activeDot={{ r: 5, fill: 'var(--bg)', stroke: 'var(--accent)', strokeWidth: 3 }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
