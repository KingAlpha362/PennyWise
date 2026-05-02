import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Grid, List, TrendingUp, TrendingDown, PieChart as PieIcon, Wallet, Target, Bot, MessageSquare, 
  Plus, Trash2, Sun, Moon, LogOut, Sparkles, ShieldCheck, Building2, Landmark, Handshake, Settings,
  Search, ChevronRight, BarChart3 as BarChartIcon 
} from 'lucide-react';

export default function DashboardApp({ onSignOut }) {
  const [currentView, setCurrentView] = useState('overview');
  const [isDark, setIsDark] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Settings state
  const [currency, setCurrency] = useState('ZAR');
  const [notifs, setNotifs] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  
  // Form states for modals
  const [formType, setFormType] = useState('expense'); 
  const [formMerchant, setFormMerchant] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formCat, setFormCat] = useState('food');
  const [formMethod, setFormMethod] = useState('Debit');
  const [formBudgetLimit, setFormBudgetLimit] = useState('');
  const [formSavingName, setFormSavingName] = useState('');
  const [formSavingBal, setFormSavingBal] = useState('');
  const [formSavingRate, setFormSavingRate] = useState('');
  const [formSavingNote, setFormSavingNote] = useState('');
  const [formGoalName, setFormGoalName] = useState('');
  const [formGoalTarget, setFormGoalTarget] = useState('');
  const [formGoalSaved, setFormGoalSaved] = useState('');
  const [formGoalDeadline, setFormGoalDeadline] = useState('');
  const [formGoalMonthly, setFormGoalMonthly] = useState('');

  // AI Chat states
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Hello James! Your secure operational ledger is synchronized. How can I assist your targets today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [txnFilter, setTxnFilter] = useState('all');

  // Core Data State
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2026-04-29', merchant: 'Woolworths Food', cat: 'food', method: 'Debit', amount: -842 },
    { id: 2, date: '2026-04-28', merchant: 'Salary — Tech Corp', cat: 'income', method: 'EFT', amount: 15200 },
    { id: 3, date: '2026-04-27', merchant: 'Vida e Caffè', cat: 'food', method: 'Tap', amount: -68 },
    { id: 4, date: '2026-04-26', merchant: 'Uber', cat: 'transport', method: 'App', amount: -124 },
    { id: 5, date: '2026-04-25', merchant: 'Netflix', cat: 'subscriptions', method: 'Debit order', amount: -199 },
    { id: 6, date: '2026-04-24', merchant: 'Checkers Sixty60', cat: 'food', method: 'App', amount: -310 },
    { id: 7, date: '2026-04-23', merchant: 'Freelance — Design', cat: 'income', method: 'EFT', amount: 2800 },
    { id: 8, date: '2026-04-22', merchant: 'Bolt ride', cat: 'transport', method: 'App', amount: -89 },
    { id: 9, date: '2026-04-21', merchant: 'Woodstock Rent', cat: 'housing', method: 'EFT', amount: -6200 },
    { id: 10, date: '2026-04-20', merchant: 'Spotify', cat: 'subscriptions', method: 'Debit order', amount: -99 },
    { id: 11, date: '2026-04-18', merchant: 'Vida e Caffè', cat: 'food', method: 'Tap', amount: -62 },
    { id: 12, date: '2026-04-17', merchant: 'Dis-Chem', cat: 'lifestyle', method: 'Debit', amount: -245 },
    { id: 13, date: '2026-04-15', merchant: 'Mr Price Sport', cat: 'lifestyle', method: 'Card', amount: -680 },
    { id: 14, date: '2026-04-12', merchant: 'Spar', cat: 'food', method: 'Tap', amount: -156 },
    { id: 15, date: '2026-04-01', merchant: 'Capitec dividends', cat: 'income', method: 'Credit', amount: 500 },
  ]);

  const [budgets, setBudgets] = useState([
    { id: 1, cat: 'Housing', limit: 6500, color: '#5aabee' },
    { id: 2, cat: 'Food', limit: 2800, color: '#16A34A' },
    { id: 3, cat: 'Transport', limit: 1500, color: '#c9922a' },
    { id: 4, cat: 'Lifestyle', limit: 3000, color: '#d85a30' },
    { id: 5, cat: 'Subscriptions', limit: 400, color: '#e8a020' },
  ]);

  const [savings, setSavings] = useState([
    { id: 1, name: 'Capitec Flexi Save', balance: 28400, rate: '7.25%', note: 'Instant access' },
    { id: 2, name: 'FNB Fixed Deposit', balance: 15000, rate: '9.1%', note: 'Matures Jun 2026' },
    { id: 3, name: 'Tax-Free Account', balance: 4800, rate: 'Varies', note: 'R31,200 annual limit left' },
  ]);

  const [goals, setGoals] = useState([
    { id: 1, name: 'House deposit', target: 150000, saved: 57000, deadline: 'Dec 2027', monthly: 3200 },
    { id: 2, name: 'Emergency fund', target: 12000, saved: 8400, deadline: 'Oct 2026', monthly: 600 },
    { id: 3, name: 'Europe trip', target: 10000, saved: 5400, deadline: 'Mar 2027', monthly: 900 },
    { id: 4, name: 'New laptop', target: 13000, saved: 1000, deadline: 'Aug 2026', monthly: 500 },
  ]);

  // Sync dark mode on mount & toggle
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  // Helper calculations
  const totalIncome = useMemo(() => 
    transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0)
  , [transactions]);

  const totalExpenses = useMemo(() => 
    Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0))
  , [transactions]);

  const totalSavings = useMemo(() => 
    savings.reduce((acc, s) => acc + s.balance, 0)
  , [savings]);

  const categorySpend = useMemo(() => {
    const map = {};
    transactions.filter(t => t.amount < 0).forEach(t => {
      map[t.cat] = (map[t.cat] || 0) + Math.abs(t.amount);
    });
    return Object.entries(map).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));
  }, [transactions]);

  const cashFlowData = [
    { name: 'Nov', Income: 16200, Expenses: 14200 },
    { name: 'Dec', Income: 17800, Expenses: 16800 },
    { name: 'Jan', Income: 15900, Expenses: 13900 },
    { name: 'Feb', Income: 16500, Expenses: 15100 },
    { name: 'Mar', Income: 18200, Expenses: 15900 },
    { name: 'Apr', Income: totalIncome, Expenses: totalExpenses }
  ];

  const incomeTrendData = [
    { name: 'Nov', Income: 16200 },
    { name: 'Dec', Income: 17800 },
    { name: 'Jan', Income: 15900 },
    { name: 'Feb', Income: 16500 },
    { name: 'Mar', Income: 18200 },
    { name: 'Apr', Income: totalIncome }
  ];

  const savingsTrendData = [
    { name: 'Nov', Savings: totalSavings - 18000 },
    { name: 'Dec', Savings: totalSavings - 14400 },
    { name: 'Jan', Savings: totalSavings - 10800 },
    { name: 'Feb', Savings: totalSavings - 7200 },
    { name: 'Mar', Savings: totalSavings - 3600 },
    { name: 'Apr', Savings: totalSavings }
  ];

  // Actions
  const deleteTxn = (id) => setTransactions(prev => prev.filter(t => t.id !== id));
  const deleteBudget = (id) => setBudgets(prev => prev.filter(b => b.id !== id));
  const deleteSaving = (id) => setSavings(prev => prev.filter(s => s.id !== id));
  const deleteGoal = (id) => setGoals(prev => prev.filter(g => g.id !== id));

  const handleAddEntry = () => {
    const id = Date.now();
    if (formType === 'expense') {
      setTransactions(prev => [
        { 
          id, 
          date: formDate, 
          merchant: formMerchant || 'Unnamed Expense', 
          cat: formCat, 
          method: formMethod, 
          amount: -Math.abs(parseFloat(formAmount) || 0) 
        },
        ...prev
      ]);
    } else if (formType === 'income') {
      setTransactions(prev => [
        { 
          id, 
          date: formDate, 
          merchant: formMerchant || 'Unnamed Income', 
          cat: 'income', 
          method: formMethod, 
          amount: Math.abs(parseFloat(formAmount) || 0) 
        },
        ...prev
      ]);
    } else if (formType === 'budget') {
      setBudgets(prev => [
        ...prev, 
        { id, cat: formCat.charAt(0).toUpperCase() + formCat.slice(1), limit: parseFloat(formBudgetLimit) || 0, color: '#16A34A' }
      ]);
    } else if (formType === 'saving') {
      setSavings(prev => [
        ...prev, 
        { id, name: formSavingName || 'New Account', balance: parseFloat(formSavingBal) || 0, rate: formSavingRate || '0%', note: formSavingNote }
      ]);
    } else if (formType === 'goal') {
      setGoals(prev => [
        ...prev, 
        { 
          id, 
          name: formGoalName || 'New Goal', 
          target: parseFloat(formGoalTarget) || 0, 
          saved: parseFloat(formGoalSaved) || 0, 
          deadline: formGoalDeadline || 'Dec 2026', 
          monthly: parseFloat(formGoalMonthly) || 0 
        }
      ]);
    }
    
    setIsModalOpen(false);
    setFormMerchant('');
    setFormAmount('');
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      const low = userMsg.toLowerCase();
      let reply = 'Operational surplus mapped at R' + (totalIncome - totalExpenses).toLocaleString() + '.';
      if (low.includes('food')) reply = 'Aggregate Food spending calculated at R' + Math.abs(transactions.filter(t => t.cat === 'food').reduce((a, t) => a + t.amount, 0)).toLocaleString() + '.';
      else if (low.includes('goal')) reply = 'Tracked goals: ' + goals.map(g => `${g.name} (${Math.round(g.saved/g.target*100)}%)`).join(', ') + '.';
      
      setChatMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 500);
  };

  const filteredTxns = useMemo(() => {
    if (txnFilter === 'all') return transactions;
    if (txnFilter === 'income') return transactions.filter(t => t.amount > 0);
    return transactions.filter(t => t.cat === txnFilter);
  }, [transactions, txnFilter]);

  const pieColors = ['#16A34A', '#5aabee', '#c9922a', '#d85a30', '#e8a020'];

  return (
    <div className="flex h-screen w-full bg-bg text-text transition-colors font-sans overflow-hidden relative">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Sidebar */}
      <aside className="w-64 bg-bg dark:bg-[#0d1017] border-r border-border flex flex-col relative z-20 transition-all duration-500">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
            <TrendingUp size={18} className="text-bg dark:text-[#0d1017]" strokeWidth={3} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-text">PennyWise</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pt-4">
          {[
            { id: 'overview', icon: Grid, label: 'Dashboard' },
            { id: 'transactions', icon: List, label: 'Transactions' },
            { id: 'accounts', icon: Landmark, label: 'Accounts' },
            { id: 'investments', icon: TrendingUp, label: 'Investments' },
            { id: 'invoicing', icon: Building2, label: 'Invoicing' },
            { id: 'budgets', icon: PieIcon, label: 'Budgets' },
            { id: 'reports', icon: BarChartIcon, label: 'Reports' },
            { id: 'subscriptions', icon: List, label: 'Subscriptions' },
            { id: 'cashflow', icon: TrendingUp, label: 'Cash Flow' },
            { id: 'debt', icon: Wallet, label: 'Debt' },
            { id: 'goals', icon: Target, label: 'Goals' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 group ${currentView === item.id ? 'bg-accent/15 text-accent' : 'text-text-muted hover:text-text hover:bg-border/30'}`}
            >
              <item.icon size={18} className={currentView === item.id ? 'text-accent' : 'group-hover:text-text'} />
              {item.label}
              {currentView === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="px-4 py-6 mt-auto border-t border-border">
          <button 
            onClick={() => setCurrentView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${currentView === 'settings' ? 'bg-accent/15 text-accent' : 'text-text-muted hover:text-text hover:bg-border/30'}`}
          >
            <Settings size={18} /> Settings
          </button>
          
          <div className="mt-4 p-4 rounded-2xl bg-bg-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold text-bg text-xs shadow-md">JD</div>
              <div className="overflow-hidden">
                <p className="text-xs font-extrabold text-text truncate">James Doe</p>
                <p className="text-[10px] text-text-muted font-bold">Standard Tier</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="flex-1 p-2.5 bg-bg hover:bg-border text-text-muted hover:text-text rounded-xl transition-all border border-border flex justify-center items-center shadow-sm"
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <button 
                onClick={onSignOut}
                className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/10 flex justify-center items-center shadow-sm"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10 bg-bg/30 backdrop-blur-[2px]">
        
        {/* Header */}
        <header className="px-10 py-6 flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight capitalize text-text font-display">
              {currentView === 'overview' ? 'Operational Snapshot' : currentView}
            </h1>
            <p className="text-sm text-text-muted font-medium mt-1">Real-time financial telemetry synchronized.</p>
          </div>
          {['overview', 'transactions', 'income', 'expenses', 'budgets', 'savings', 'goals'].includes(currentView) && (
            <button 
              onClick={() => {
                if (currentView === 'overview' || currentView === 'transactions') setFormType('expense');
                else if (currentView === 'income') setFormType('income');
                else if (currentView === 'expenses') setFormType('expense');
                else if (currentView === 'budgets') setFormType('budget');
                else if (currentView === 'savings') setFormType('saving');
                else if (currentView === 'goals') setFormType('goal');
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-text text-bg dark:bg-white dark:text-black font-extrabold rounded-2xl shadow-xl hover:scale-[1.05] active:scale-95 transition-all cursor-pointer text-sm"
            >
              <Plus size={18} strokeWidth={3} /> {currentView === 'overview' || currentView === 'transactions' ? 'New Entry' : `Add ${currentView.slice(0, -1)}`}
            </button>
          )}
        </header>

        {/* View Components */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10">

          {/* OVERVIEW */}
          {currentView === 'overview' && (
            <div className="animate-fadeUp space-y-8">
              {/* Dashboard Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-text tracking-tight flex items-center gap-2">
                    Good evening, Jane 👋
                  </h2>
                  <p className="text-sm text-text-muted font-medium mt-1">Here is your financial overview for today.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative hidden md:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="bg-bg-card border border-border pl-11 pr-6 py-3 rounded-2xl text-sm font-medium outline-none focus:border-accent transition-all w-64"
                    />
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-bg px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-accent/20 transition-all active:scale-95 whitespace-nowrap"
                  >
                    <Plus size={18} strokeWidth={3} /> New Transaction
                  </button>
                </div>
              </div>

              {/* AI Insights Banner */}
              <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/20 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
                <div className="relative z-10">
                  <h4 className="text-lg font-extrabold text-accent">Unlock AI Insights</h4>
                  <p className="text-sm text-text-muted font-medium mt-1">Get personalized financial advice and summaries.</p>
                </div>
                <button 
                  onClick={() => setCurrentView('ai')}
                  className="relative z-10 bg-accent text-bg px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group/btn"
                >
                  Explore AI Features <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Top Row: 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Net Surplus', value: totalIncome - totalExpenses, color: 'text-accent', icon: TrendingUp },
                  { label: 'Total Inflow', value: totalIncome, color: 'text-blue-500', icon: TrendingUp },
                  { label: 'Total Outflow', value: totalExpenses, color: 'text-red-500', icon: TrendingDown },
                ].map((stat, i) => (
                  <div key={i} className="bg-bg-card dark:bg-[#10141a] border border-border p-8 rounded-3xl relative overflow-hidden group shadow-xl transition-colors duration-500">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] text-text-muted font-extrabold uppercase tracking-[0.2em]">{stat.label}</p>
                      <stat.icon size={16} className={stat.color} />
                    </div>
                    <h3 className={`text-4xl font-extrabold font-display ${stat.color}`}>
                      R {stat.value.toLocaleString()}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Bottom Row: 2 Cards (Wide and Narrow) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-bg-card dark:bg-[#10141a] border border-border p-8 rounded-3xl shadow-xl transition-colors duration-500">
                  <div className="flex justify-between items-center mb-8">
                    <h4 className="text-lg font-extrabold tracking-tight font-display text-text">Cash Flow Dynamics</h4>
                    <div className="flex gap-2">
                      {['7D', '30D', '90D'].map(p => (
                        <button key={p} className={`text-[10px] font-extrabold px-3 py-1 rounded-lg border border-border transition-all ${p === '30D' ? 'bg-text text-bg border-text' : 'text-text-muted hover:text-text hover:bg-border/30'}`}>{p}</button>
                      ))}
                    </div>
                  </div>
                  <div className="h-[340px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={cashFlowData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--text-muted)' }} 
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--text-muted)' }} 
                        />
                        <Tooltip 
                          cursor={{ fill: 'var(--border-grid)' }}
                          contentStyle={{ 
                            backgroundColor: 'var(--bg)', 
                            border: '1px solid var(--border)', 
                            borderRadius: '12px', 
                            fontSize: '12px',
                            fontWeight: 700,
                            color: 'var(--text)'
                          }} 
                        />
                        <Bar dataKey="Income" fill="#16A34A" radius={[4, 4, 0, 0]} barSize={32} />
                        <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={32} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-bg-card dark:bg-[#10141a] border border-border p-8 rounded-3xl shadow-xl flex flex-col transition-colors duration-500">
                  <h4 className="text-lg font-extrabold tracking-tight mb-8 font-display text-text">Segment Allocation</h4>
                  <div className="flex-1 min-h-[300px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={categorySpend} 
                          dataKey="value" 
                          nameKey="name" 
                          cx="50%" cy="50%" 
                          innerRadius={70}
                          outerRadius={100} 
                          paddingAngle={5}
                          stroke="none"
                        >
                          {categorySpend.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--bg)', 
                            border: '1px solid var(--border)', 
                            borderRadius: '12px', 
                            fontSize: '12px',
                            fontWeight: 700,
                            color: 'var(--text)'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4 mt-6">
                    {categorySpend.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                          <span className="text-xs font-bold text-text-muted">{item.name}</span>
                        </div>
                        <span className="text-xs font-extrabold text-text">R {item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TRANSACTIONS */}
          {currentView === 'transactions' && (
            <div className="animate-fadeUp space-y-6">
              <div className="flex flex-wrap gap-3">
                {['all', 'income', 'food', 'housing', 'transport', 'lifestyle', 'subscriptions'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setTxnFilter(cat)}
                    className={`px-4 py-2 text-[10px] rounded-xl border font-extrabold transition-all capitalize tracking-widest cursor-pointer ${txnFilter === cat ? 'bg-text text-bg border-text' : 'bg-bg/50 text-text-muted border-border hover:border-text hover:text-text'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="glass-card rounded-[2.5rem] overflow-hidden border border-border">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-accent/5 text-text-muted text-[10px] uppercase tracking-[0.2em] font-extrabold">
                      <th className="p-6">Date</th>
                      <th className="p-6">Merchant / Source</th>
                      <th className="p-6">Category</th>
                      <th className="p-6">Protocol</th>
                      <th className="p-6 text-right">Amount</th>
                      <th className="p-6"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredTxns.map(t => (
                      <tr key={t.id} className="hover:bg-accent/5 transition-colors border-t border-border group">
                        <td className="p-6 text-text-muted font-bold text-xs">{t.date}</td>
                        <td className="p-6">
                          <div className="flex flex-col">
                            <span className="font-extrabold text-text">{t.merchant}</span>
                            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Ref: PW-{t.id}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 text-[10px] rounded-full font-extrabold uppercase tracking-widest ${t.amount > 0 ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-500'}`}>
                            {t.cat}
                          </span>
                        </td>
                        <td className="p-6 text-text-muted font-bold text-xs">{t.method}</td>
                        <td className={`p-6 text-right font-display text-xl font-extrabold ${t.amount > 0 ? 'text-accent' : 'text-text'}`}>
                          {t.amount > 0 ? '+' : ''}R {t.amount.toLocaleString()}
                        </td>
                        <td className="p-6 text-right">
                          <button onClick={() => deleteTxn(t.id)} className="p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* INCOME */}
          {currentView === 'income' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Monthly Income</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-green-500">R {totalIncome.toLocaleString()}</h3>
                </div>
                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Projected Annual</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-green-500">R {(totalIncome * 12).toLocaleString()}</h3>
                </div>
                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Surplus Margin</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-[#c9922a]">R {(totalIncome - totalExpenses).toLocaleString()}</h3>
                </div>
              </div>
              <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                <h4 className="text-sm font-bold text-text-muted mb-4">Income Allocation Overview</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={incomeTrendData}>
                      <CartesianGrid stroke={isDark ? "#1e2b20" : "#e5e7eb"} />
                      <XAxis dataKey="name" stroke={isDark ? "#6a8a72" : "#9ca3af"} />
                      <YAxis stroke={isDark ? "#6a8a72" : "#9ca3af"} />
                      <Tooltip contentStyle={{ backgroundColor: isDark ? '#0d120f' : '#ffffff', borderColor: isDark ? '#1e2b20' : '#e5e7eb' }} />
                      <Line type="monotone" dataKey="Income" stroke="#16A34A" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* EXPENSES */}
          {currentView === 'expenses' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Total Spent</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-red-500">R {totalExpenses.toLocaleString()}</h3>
                </div>
                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Total Actions</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-[#c9922a]">{transactions.filter(t => t.amount < 0).length}</h3>
                </div>
                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Max Segment Limit</p>
                  <h3 className="text-3xl font-extrabold mt-2">R {Math.max(...budgets.map(b => b.limit), 0).toLocaleString()}</h3>
                </div>
              </div>
            </>
          )}

          {/* BUDGETS */}
          {currentView === 'budgets' && (
            <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm space-y-6">
              <h4 className="text-sm font-bold text-text-muted">Active Budget Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgets.map(b => {
                  const spent = Math.abs(transactions.filter(t => t.cat.toLowerCase() === b.cat.toLowerCase()).reduce((a, t) => a + t.amount, 0));
                  const pct = Math.min(Math.round(spent / b.limit * 100), 100);
                  const over = spent > b.limit;
                  return (
                    <div key={b.id} className="p-4 bg-bg border border-border rounded-xl shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm">{b.cat}</span>
                        <button onClick={() => deleteBudget(b.id)} className="text-text-muted hover:text-red-500 cursor-pointer">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex justify-between text-xs text-text-muted mb-1">
                        <span>Spent: R {spent.toLocaleString()}</span>
                        <span>Limit: R {b.limit.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                        <div className={`h-full rounded-full ${over ? 'bg-red-500' : pct > 80 ? 'bg-[#c9922a]' : 'bg-[#16A34A]'}`} style={{ width: `${pct}%` }}></div>
                      </div>
                      <p className={`text-xs font-extrabold mt-2 text-right ${over ? 'text-red-500' : 'text-text-muted'}`}>{pct}% consumed</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SAVINGS */}
          {currentView === 'savings' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savings.map(s => (
                <div key={s.id} className="p-4 bg-bg border border-border rounded-2xl shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold">{s.name}</span>
                    <button onClick={() => deleteSaving(s.id)} className="text-text-muted hover:text-red-500 cursor-pointer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <h3 className="text-2xl font-extrabold mt-2 text-green-500">R {s.balance.toLocaleString()}</h3>
                  <p className="text-xs text-text-muted mt-1 font-medium">{s.rate} Base Yield</p>
                </div>
              ))}
            </div>
          )}

          {/* GOALS */}
          {currentView === 'goals' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map(g => {
                const pct = Math.min(Math.round(g.saved / g.target * 100), 100);
                return (
                  <div key={g.id} className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-md font-extrabold">{g.name}</span>
                        <button onClick={() => deleteGoal(g.id)} className="text-text-muted hover:text-red-500 cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between text-xs text-text-muted mb-1">
                        <span>Saved: R {g.saved.toLocaleString()}</span>
                        <span>Target: R {g.target.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div className="h-full rounded-full bg-[#16A34A]" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center border-t border-border pt-3">
                      <span className="text-xs text-[#c9922a] font-bold">+R {g.monthly}/mo contribution</span>
                      <span className="text-sm font-extrabold text-green-500">{pct}% done</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* AI ANALYSIS */}
          {currentView === 'ai' && (
            <div className="animate-fadeUp space-y-8 max-w-4xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-500/10 rounded-xl">
                  <Sparkles className="text-amber-500" size={24} />
                </div>
                <h2 className="text-2xl font-extrabold font-display">Intelligence Recommendations</h2>
              </div>
              
              <div className="grid gap-4">
                {[
                  { title: 'High Spending Alert', desc: 'Lifestyle parameters are increasing at rates that delay emergency funds deployment.', color: 'border-l-red-500', icon: TrendingUp },
                  { title: 'Optimization Opportunity', desc: 'Capitec Flexi Save yield is currently 0.5% below market lead. Reallocation advised.', color: 'border-l-accent', icon: Sparkles },
                  { title: 'Budget Threshold', desc: 'Food allocation is at 92% of monthly capacity with 6 days remaining.', color: 'border-l-amber-500', icon: PieIcon }
                ].map((item, i) => (
                  <div key={i} className={`glass-card p-6 border-l-4 ${item.color} rounded-r-[2rem] flex items-center gap-6 group hover:translate-x-1 transition-all`}>
                    <div className="p-3 bg-bg border border-border rounded-xl">
                      <item.icon size={20} className="text-text-muted opacity-50" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-text">{item.title}</p>
                      <p className="text-xs text-text-muted font-medium mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHATBOT */}
          {currentView === 'chat' && (
            <div className="animate-fadeUp h-[calc(100vh-280px)] flex flex-col max-w-5xl">
              <div className="flex-1 overflow-y-auto space-y-6 mb-6 p-8 glass-card rounded-[3rem] custom-scrollbar">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                    <div className={`max-w-[80%] p-5 rounded-[2rem] text-sm font-bold leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-text text-bg dark:bg-white dark:text-black rounded-tr-none' : 'bg-bg border border-border text-text rounded-tl-none'}`}>
                      {m.text}
                      <span className="block text-[8px] mt-2 opacity-30 uppercase tracking-widest">{m.role === 'user' ? 'Authorized Input' : 'Nexus Response'}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 bg-bg border border-border p-2 rounded-[2.5rem] shadow-xl">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                  placeholder="Query the machine allocation engines..."
                  className="flex-1 px-6 py-4 bg-transparent outline-none text-sm font-bold placeholder-text-muted/30"
                />
                <button 
                  onClick={sendChat}
                  className="px-8 bg-accent hover:bg-accent/90 text-white font-extrabold rounded-full shadow-lg shadow-accent/20 transition-all active:scale-95 flex items-center justify-center cursor-pointer text-xs uppercase tracking-widest"
                >
                  Send Query
                </button>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {currentView === 'settings' && (
            <div className="bg-bg border border-border p-8 rounded-2xl shadow-sm max-w-2xl space-y-8">
              <div>
                <h4 className="text-md font-bold mb-1 flex items-center gap-2">
                  <Settings className="text-[#c9922a]" size={20} /> Account Preferences
                </h4>
                <p className="text-xs text-text-muted font-bold">Manage global allocations and user parameters safely.</p>
              </div>

              <div className="space-y-6 border-t border-border pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-bold text-text block">Default Currency</span>
                    <span className="text-xs text-text-muted font-medium">Used for predictive cross-ledger mappings.</span>
                  </div>
                  <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    className="p-2 bg-bg border border-border text-sm font-bold rounded-xl outline-none text-text focus:border-[#16A34A] cursor-pointer"
                  >
                    <option value="ZAR">ZAR (R)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-bold text-text block">Smart Notifications</span>
                    <span className="text-xs text-text-muted font-medium">Receive machine threshold limits alerts.</span>
                  </div>
                  <button 
                    onClick={() => setNotifs(!notifs)}
                    className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${notifs ? 'bg-[#16A34A]' : 'bg-border'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${notifs ? 'left-6.5' : 'left-0.5'}`} />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-bold text-text block">Two-Factor Cryptography</span>
                    <span className="text-xs text-text-muted font-medium">Enforce secure ledger authorization tokens.</span>
                  </div>
                  <button 
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${twoFactor ? 'bg-[#16A34A]' : 'bg-border'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${twoFactor ? 'left-6.5' : 'left-0.5'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Universal Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn p-4">
          <div className="bg-card border border-border p-8 rounded-[2.5rem] w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <h3 className="text-2xl font-extrabold mb-6 text-text font-display tracking-tight">Secure Ledger Entry</h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-extrabold text-text-muted block mb-2 uppercase tracking-widest">Entry Classification</label>
                <select 
                  value={formType} 
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full p-4 bg-bg border border-border text-text font-extrabold text-sm rounded-2xl outline-none focus:border-accent ring-accent/10 focus:ring-4 transition-all cursor-pointer appearance-none"
                >
                  <option value="expense">Outflow (Expense)</option>
                  <option value="income">Inflow (Income)</option>
                  <option value="budget">Budget Parameter</option>
                  <option value="saving">Vault Allocation</option>
                  <option value="goal">Target Objective</option>
                </select>
              </div>

              <div className="h-div opacity-50" />

              {/* DYNAMIC FORMS */}
              {(formType === 'expense' || formType === 'income') && (
                <>
                  <div>
                    <label className="text-[10px] font-extrabold text-text-muted block mb-2 uppercase tracking-widest">Description / Source</label>
                    <input 
                      type="text" 
                      value={formMerchant} 
                      onChange={(e) => setFormMerchant(e.target.value)}
                      placeholder="e.g. Woolworths / Tech Corp"
                      className="w-full p-4 bg-bg border border-border text-text font-bold text-sm rounded-2xl outline-none focus:border-accent ring-accent/10 focus:ring-4 transition-all placeholder:opacity-30"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-extrabold text-text-muted block mb-2 uppercase tracking-widest">Quantity (R)</label>
                      <input 
                        type="number" 
                        value={formAmount} 
                        onChange={(e) => setFormAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full p-4 bg-bg border border-border text-text font-bold text-sm rounded-2xl outline-none focus:border-accent ring-accent/10 focus:ring-4 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-extrabold text-text-muted block mb-2 uppercase tracking-widest">Timestamp</label>
                      <input 
                        type="date" 
                        value={formDate} 
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full p-4 bg-bg border border-border text-text font-bold text-sm rounded-2xl outline-none focus:border-accent ring-accent/10 focus:ring-4 transition-all"
                      />
                    </div>
                  </div>
                  {formType === 'expense' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-extrabold text-text-muted block mb-2 uppercase tracking-widest">Category</label>
                        <select 
                          value={formCat} 
                          onChange={(e) => setFormCat(e.target.value)}
                          className="w-full p-4 bg-bg border border-border text-text font-bold text-sm rounded-2xl outline-none focus:border-accent ring-accent/10 focus:ring-4 transition-all cursor-pointer"
                        >
                          <option value="food">Food</option>
                          <option value="housing">Housing</option>
                          <option value="transport">Transport</option>
                          <option value="lifestyle">Lifestyle</option>
                          <option value="subscriptions">Subscriptions</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold text-text-muted block mb-2 uppercase tracking-widest">Protocol</label>
                        <input 
                          type="text" 
                          value={formMethod} 
                          onChange={(e) => setFormMethod(e.target.value)}
                          placeholder="Debit/EFT"
                          className="w-full p-4 bg-bg border border-border text-text font-bold text-sm rounded-2xl outline-none focus:border-accent ring-accent/10 focus:ring-4 transition-all"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {formType === 'budget' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-text-muted block mb-1">Category</label>
                    <select 
                      value={formCat} 
                      onChange={(e) => setFormCat(e.target.value)}
                      className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] cursor-pointer"
                    >
                      <option value="food">Food</option>
                      <option value="housing">Housing</option>
                      <option value="transport">Transport</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="subscriptions">Subscriptions</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-text-muted block mb-1">Monthly Limit (R)</label>
                    <input 
                      type="number" 
                      value={formBudgetLimit} 
                      onChange={(e) => setFormBudgetLimit(e.target.value)}
                      placeholder="0"
                      className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                    />
                  </div>
                </>
              )}

              {formType === 'saving' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-text-muted block mb-1">Account Name</label>
                    <input 
                      type="text" 
                      value={formSavingName} 
                      onChange={(e) => setFormSavingName(e.target.value)}
                      placeholder="e.g. Flexi Save"
                      className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-text-muted block mb-1">Balance (R)</label>
                      <input 
                        type="number" 
                        value={formSavingBal} 
                        onChange={(e) => setFormSavingBal(e.target.value)}
                        placeholder="0"
                        className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-muted block mb-1">Interest Rate</label>
                      <input 
                        type="text" 
                        value={formSavingRate} 
                        onChange={(e) => setFormSavingRate(e.target.value)}
                        placeholder="7.5%"
                        className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-text-muted block mb-1">Notes</label>
                    <input 
                      type="text" 
                      value={formSavingNote} 
                      onChange={(e) => setFormSavingNote(e.target.value)}
                      placeholder="Access timeline"
                      className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                    />
                  </div>
                </>
              )}

              {formType === 'goal' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-text-muted block mb-1">Goal Target</label>
                    <input 
                      type="text" 
                      value={formGoalName} 
                      onChange={(e) => setFormGoalName(e.target.value)}
                      placeholder="Description"
                      className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-text-muted block mb-1">Target (R)</label>
                      <input 
                        type="number" 
                        value={formGoalTarget} 
                        onChange={(e) => setFormGoalTarget(e.target.value)}
                        placeholder="0"
                        className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-muted block mb-1">Saved (R)</label>
                      <input 
                        type="number" 
                        value={formGoalSaved} 
                        onChange={(e) => setFormGoalSaved(e.target.value)}
                        placeholder="0"
                        className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-text-muted block mb-1">Deadline</label>
                      <input 
                        type="text" 
                        value={formGoalDeadline} 
                        onChange={(e) => setFormGoalDeadline(e.target.value)}
                        placeholder="Dec 2026"
                        className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-muted block mb-1">Contribution</label>
                      <input 
                        type="number" 
                        value={formGoalMonthly} 
                        onChange={(e) => setFormGoalMonthly(e.target.value)}
                        placeholder="0"
                        className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 bg-bg hover:bg-border text-text-muted hover:text-text rounded-xl transition-all font-bold border border-border cursor-pointer shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddEntry}
                className="flex-1 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold rounded-xl transition-all active:scale-95 cursor-pointer shadow-md"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
