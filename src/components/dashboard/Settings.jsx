import { useState } from 'react';

function Icon({ name, size = 16, stroke = 1.75, style = {} }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', style };
  switch (name) {
    case 'sun': return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
    case 'moon': return <svg {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>;
    case 'sparkles': return <svg {...props}><path d="M12 3v3M12 18v3M5 12H2M22 12h-3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="2.5"/></svg>;
    case 'bell': return <svg {...props}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case 'user': return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
    case 'globe': return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case 'crown': return <svg {...props}><path d="M3 18h18M5 18 2 8l5 4 5-7 5 7 5-4-3 10"/></svg>;
    case 'check': return <svg {...props}><path d="m5 12 5 5L20 7"/></svg>;
    case 'palette': return <svg {...props}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
    case 'shield': return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case 'sliders': return <svg {...props}><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>;
    default: return <svg {...props}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`pw-toggle ${checked ? 'pw-toggle-on' : ''}`}
    >
      <span className="pw-toggle-thumb"/>
    </button>
  );
}

function SettingsSection({ icon, title, children }) {
  return (
    <div className="pw-settings-section">
      <div className="pw-settings-section-head">
        <Icon name={icon} size={15} stroke={2}/>
        <span>{title}</span>
      </div>
      <div className="pw-settings-section-body">
        {children}
      </div>
    </div>
  );
}

function SettingsRow({ label, hint, children }) {
  return (
    <div className="pw-settings-row">
      <div style={{ flex: 1 }}>
        <div className="pw-settings-row-label">{label}</div>
        {hint && <div className="pw-settings-row-hint">{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function PillGroup({ options, value, onChange }) {
  return (
    <div className="pw-pill-group">
      {options.map(opt => (
        <button
          key={opt.value}
          className={`pw-pill-opt ${value === opt.value ? 'active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const ACCENT_OPTIONS = [
  { value: 'green',  label: 'Green',      color: '#16a34a' },
  { value: 'blue',   label: 'Blue',       color: '#3b82f6' },
  { value: 'purple', label: 'Purple',     color: '#8b5cf6' },
  { value: 'orange', label: 'Orange',     color: '#f97316' },
  { value: 'navy',   label: 'Indigo',     color: '#6366f1' },
];

export default function Settings({ theme, setTheme, accent = 'green', setAccent }) {
  const [density, setDensity] = useState(() => document.documentElement.getAttribute('data-density') || 'comfortable');
  const [currency, setCurrency] = useState('USD');
  const [startScreen, setStartScreen] = useState('overview');
  const [aiStyle, setAiStyle] = useState('detailed');
  const [aiName, setAiName] = useState('Penny');
  const [proactive, setProactive] = useState(true);
  const [notifs, setNotifs] = useState({
    budgetAlerts: true,
    goalMilestones: true,
    weeklySummary: false,
    overspending: true,
  });

  const currencies = [
    { value: 'USD', label: 'USD ($) — US Dollar' },
    { value: 'ZAR', label: 'ZAR (R) — South African Rand' },
    { value: 'GBP', label: 'GBP (£) — British Pound' },
    { value: 'EUR', label: 'EUR (€) — Euro' },
    { value: 'JPY', label: 'JPY (¥) — Japanese Yen' },
    { value: 'AUD', label: 'AUD (A$) — Australian Dollar' },
    { value: 'CAD', label: 'CAD (C$) — Canadian Dollar' },
  ];

  const screens = [
    { value: 'overview', label: 'Overview' },
    { value: 'transactions', label: 'Transactions' },
    { value: 'cashflow', label: 'Cashflow' },
    { value: 'budgets', label: 'Budgets' },
    { value: 'goals', label: 'Goals' },
    { value: 'insights', label: 'Insights' },
  ];

  return (
    <div className="pw-screen pw-fadein">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>System</div>
        <h1 style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Settings</h1>
      </div>

      <div className="pw-settings-grid">
        {/* Profile */}
        <SettingsSection icon="user" title="Profile">
          <div className="pw-settings-profile">
            <div className="pw-settings-avatar">SC</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Sam Chen</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-faint)', marginTop: 2 }}>sam.chen@acmecorp.com</div>
              <div className="pw-settings-plan-badge">
                <Icon name="crown" size={11} stroke={2}/>
                Pro Plan — Active
              </div>
            </div>
            <button className="pw-btn" style={{ marginLeft: 'auto', fontSize: 12 }}>Edit profile</button>
          </div>
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection icon="sun" title="Appearance">
          <SettingsRow label="Theme" hint="Switch between light and dark mode">
            <PillGroup
              options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
              value={theme}
              onChange={setTheme}
            />
          </SettingsRow>
          <SettingsRow label="Accent color" hint="Sets the highlight color used across the dashboard">
            <div className="pw-accent-swatches">
              {ACCENT_OPTIONS.map(a => (
                <button
                  key={a.value}
                  title={a.label}
                  className={`pw-accent-swatch ${accent === a.value ? 'active' : ''}`}
                  style={{ background: a.color }}
                  onClick={() => setAccent?.(a.value)}
                >
                  {accent === a.value && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </SettingsRow>
          <SettingsRow label="Density" hint="Controls spacing throughout the dashboard">
            <PillGroup
              options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]}
              value={density}
              onChange={(v) => {
                setDensity(v);
                document.documentElement.setAttribute('data-density', v);
              }}
            />
          </SettingsRow>
          <SettingsRow label="Start screen" hint="Which screen opens when you sign in">
            <select
              className="pw-settings-select"
              value={startScreen}
              onChange={e => setStartScreen(e.target.value)}
            >
              {screens.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </SettingsRow>
        </SettingsSection>

        {/* Currency & Region */}
        <SettingsSection icon="globe" title="Currency &amp; Region">
          <SettingsRow label="Display currency" hint="Affects how amounts are shown throughout the app">
            <select
              className="pw-settings-select"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              style={{ minWidth: 220 }}
            >
              {currencies.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </SettingsRow>
        </SettingsSection>

        {/* AI Preferences */}
        <SettingsSection icon="sparkles" title="AI Preferences">
          <SettingsRow label="Assistant name" hint="How Penny introduces herself">
            <input
              className="pw-settings-input"
              value={aiName}
              onChange={e => setAiName(e.target.value)}
              maxLength={20}
            />
          </SettingsRow>
          <SettingsRow label="Response style" hint="How detailed AI responses are">
            <PillGroup
              options={[{ value: 'brief', label: 'Brief' }, { value: 'detailed', label: 'Detailed' }]}
              value={aiStyle}
              onChange={setAiStyle}
            />
          </SettingsRow>
          <SettingsRow label="Proactive suggestions" hint="Penny surfaces insights without being asked">
            <Toggle checked={proactive} onChange={setProactive}/>
          </SettingsRow>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection icon="bell" title="Notifications">
          {[
            { key: 'budgetAlerts', label: 'Budget alerts', hint: 'Notify when a category nears its limit' },
            { key: 'goalMilestones', label: 'Goal milestones', hint: 'Celebrate when goals hit 25%, 50%, 75%' },
            { key: 'weeklySummary', label: 'Weekly summary', hint: 'Sunday digest of your week in review' },
            { key: 'overspending', label: 'Overspending warnings', hint: 'Alert when you exceed a budget' },
          ].map(n => (
            <SettingsRow key={n.key} label={n.label} hint={n.hint}>
              <Toggle
                checked={notifs[n.key]}
                onChange={v => setNotifs(prev => ({ ...prev, [n.key]: v }))}
              />
            </SettingsRow>
          ))}
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection icon="shield" title="Privacy &amp; Security">
          <SettingsRow label="Two-factor authentication" hint="Require 2FA for every sign-in">
            <Toggle checked={true} onChange={() => {}}/>
          </SettingsRow>
          <SettingsRow label="Data sharing" hint="Help improve PennyWise with anonymized usage data">
            <Toggle checked={false} onChange={() => {}}/>
          </SettingsRow>
          <SettingsRow label="Export your data" hint="Download a full copy of your financial data">
            <button className="pw-btn" style={{ fontSize: 12 }}>Export CSV</button>
          </SettingsRow>
        </SettingsSection>
      </div>
    </div>
  );
}
