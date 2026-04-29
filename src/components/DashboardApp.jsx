import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Grid, List, TrendingUp, TrendingDown, PieChart as PieIcon, Wallet, Target, Bot, MessageSquare, 
  Plus, Trash2, Sun, Moon, LogOut, Sparkles, ShieldCheck, Building2, Landmark, Handshake, Settings 
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
    <div className="flex h-screen w-full bg-bg text-text transition-colors font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col relative z-20">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <span className="text-xl font-extrabold text-[#16A34A]">Penny<span className="text-[#c9922a]">Wise</span></span>
        </div>
        
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          <div>
            <p className="text-xs font-bold text-text-muted tracking-wider uppercase mb-2">Main</p>
            <div className="space-y-1">
              <button 
                onClick={() => setCurrentView('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentView === 'overview' ? 'bg-border text-[#16A34A]' : 'text-text-muted hover:bg-border/50 hover:text-[#16A34A]'}`}
              >
                <Grid size={18} /> Overview
              </button>
              <button 
                onClick={() => setCurrentView('transactions')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentView === 'transactions' ? 'bg-border text-[#16A34A]' : 'text-text-muted hover:bg-border/50 hover:text-[#16A34A]'}`}
              >
                <List size={18} /> Transactions
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-text-muted tracking-wider uppercase mb-2">Money</p>
            <div className="space-y-1">
              <button 
                onClick={() => setCurrentView('income')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentView === 'income' ? 'bg-border text-[#16A34A]' : 'text-text-muted hover:bg-border/50 hover:text-[#16A34A]'}`}
              >
                <TrendingUp size={18} /> Income
              </button>
              <button 
                onClick={() => setCurrentView('expenses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentView === 'expenses' ? 'bg-border text-[#16A34A]' : 'text-text-muted hover:bg-border/50 hover:text-[#16A34A]'}`}
              >
                <TrendingDown size={18} /> Expenses
              </button>
              <button 
                onClick={() => setCurrentView('budgets')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentView === 'budgets' ? 'bg-border text-[#16A34A]' : 'text-text-muted hover:bg-border/50 hover:text-[#16A34A]'}`}
              >
                <PieIcon size={18} /> Budgets
              </button>
              <button 
                onClick={() => setCurrentView('savings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentView === 'savings' ? 'bg-border text-[#16A34A]' : 'text-text-muted hover:bg-border/50 hover:text-[#16A34A]'}`}
              >
                <Wallet size={18} /> Savings
              </button>
              <button 
                onClick={() => setCurrentView('goals')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentView === 'goals' ? 'bg-border text-[#16A34A]' : 'text-text-muted hover:bg-border/50 hover:text-[#16A34A]'}`}
              >
                <Target size={18} /> Goals
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-text-muted tracking-wider uppercase mb-2">Intelligence</p>
            <div className="space-y-1">
              <button 
                onClick={() => setCurrentView('ai')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentView === 'ai' ? 'bg-border text-[#16A34A]' : 'text-text-muted hover:bg-border/50 hover:text-[#16A34A]'}`}
              >
                <Bot size={18} /> AI Analysis
              </button>
              <button 
                onClick={() => setCurrentView('chat')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentView === 'chat' ? 'bg-border text-[#16A34A]' : 'text-text-muted hover:bg-border/50 hover:text-[#16A34A]'}`}
              >
                <MessageSquare size={18} /> Chatbot
              </button>
              <button 
                onClick={() => setCurrentView('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentView === 'settings' ? 'bg-border text-[#16A34A]' : 'text-text-muted hover:bg-border/50 hover:text-[#16A34A]'}`}
              >
                <Settings size={18} /> Settings
              </button>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-border border border-border-card flex items-center justify-center font-bold text-[#c9922a]">JD</div>
            <div>
              <h4 className="text-sm font-bold">James D.</h4>
              <p className="text-xs text-text-muted">Pro Plan</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="flex-1 p-2 bg-bg hover:bg-border text-text-muted hover:text-text border border-border rounded-lg transition-all font-bold text-xs flex justify-center items-center gap-2 cursor-pointer shadow-sm"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />} Theme
            </button>
            <button 
              onClick={onSignOut}
              className="p-2 bg-red-900/10 hover:bg-red-900/20 text-red-500 rounded-lg transition-all text-xs flex justify-center items-center cursor-pointer shadow-sm"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        
        {/* Header */}
        <header className="bg-bg border-b border-border px-8 py-4 flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-lg font-extrabold capitalize text-text">{currentView}</h1>
            <p className="text-xs text-text-muted font-bold">Optimizing your allocations intelligently.</p>
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
              className="flex items-center gap-2 px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold rounded-xl shadow-md hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Plus size={16} /> Add {currentView === 'overview' || currentView === 'transactions' ? 'Entry' : currentView.slice(0, -1)}
            </button>
          )}
        </header>

        {/* View Components */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10">

          {/* OVERVIEW */}
          {currentView === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Total Income</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-green-500">R {totalIncome.toLocaleString()}</h3>
                </div>
                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Total Expenses</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-red-500">R {totalExpenses.toLocaleString()}</h3>
                </div>
                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Net Surplus</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-[#c9922a]">R {(totalIncome - totalExpenses).toLocaleString()}</h3>
                </div>
                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Total Savings</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-green-500">R {totalSavings.toLocaleString()}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <h4 className="text-sm font-bold text-text-muted mb-4">Cash Flow Trends (6mo)</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={cashFlowData}>
                        <CartesianGrid stroke={isDark ? "#1e2b20" : "#e5e7eb"} strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke={isDark ? "#6a8a72" : "#9ca3af"} />
                        <YAxis stroke={isDark ? "#6a8a72" : "#9ca3af"} />
                        <Tooltip contentStyle={{ backgroundColor: isDark ? '#0d120f' : '#ffffff', borderColor: isDark ? '#1e2b20' : '#e5e7eb' }} />
                        <Bar dataKey="Income" fill="#16A34A" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Expenses" fill="#d85a30" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm">
                  <h4 className="text-sm font-bold text-text-muted mb-4">Expenses by Category</h4>
                  <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categorySpend} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                          {categorySpend.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: isDark ? '#0d120f' : '#ffffff', borderColor: isDark ? '#1e2b20' : '#e5e7eb' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TRANSACTIONS */}
          {currentView === 'transactions' && (
            <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm space-y-6">
              <div className="flex flex-wrap gap-2">
                {['all', 'income', 'food', 'housing', 'transport', 'lifestyle', 'subscriptions'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setTxnFilter(cat)}
                    className={`px-3 py-1.5 text-xs rounded-xl border font-bold transition-all capitalize cursor-pointer ${txnFilter === cat ? 'bg-[#16A34A] text-white border-[#16A34A]' : 'bg-bg text-text-muted border-border hover:text-text'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto border border-border rounded-xl bg-bg">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-bg text-text-muted text-xs uppercase tracking-wider">
                      <th className="p-4 border-b border-border">Date</th>
                      <th className="p-4 border-b border-border">Merchant</th>
                      <th className="p-4 border-b border-border">Category</th>
                      <th className="p-4 border-b border-border">Method</th>
                      <th className="p-4 border-b border-border text-right">Amount</th>
                      <th className="p-4 border-b border-border"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredTxns.map(t => (
                      <tr key={t.id} className="hover:bg-border/30 transition-colors text-text">
                        <td className="p-4 border-b border-border text-text-muted">{t.date}</td>
                        <td className="p-4 border-b border-border font-bold">{t.merchant}</td>
                        <td className="p-4 border-b border-border">
                          <span className={`px-2 py-0.5 text-xs rounded-md font-bold ${t.amount > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                            {t.cat}
                          </span>
                        </td>
                        <td className="p-4 border-b border-border text-text-muted">{t.method}</td>
                        <td className={`p-4 border-b border-border text-right font-extrabold ${t.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {t.amount > 0 ? '+' : ''}R {t.amount.toLocaleString()}
                        </td>
                        <td className="p-4 border-b border-border">
                          <button onClick={() => deleteTxn(t.id)} className="text-text-muted hover:text-red-500 transition-all cursor-pointer">
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
            <div className="bg-bg border border-border p-6 rounded-2xl shadow-sm space-y-6">
              <h4 className="text-sm font-bold flex items-center gap-2"><Sparkles className="text-[#c9922a]" size={18} /> AI Intelligence Recommendations</h4>
              <div className="p-4 bg-bg border-l-4 border-l-red-500 rounded-r-xl space-y-1 border-y border-r border-border shadow-sm">
                <p className="text-sm font-extrabold">High Spending Alert</p>
                <p className="text-xs text-text-muted">Lifestyle parameters are increasing at rates that delay emergency funds deployment vectors.</p>
              </div>
            </div>
          )}

          {/* CHATBOT */}
          {currentView === 'chat' && (
            <div className="h-[calc(100vh-240px)] bg-bg border border-border p-6 rounded-2xl flex flex-col shadow-sm">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-card rounded-xl border border-border shadow-inner">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-[#16A34A] text-white rounded-tr-none' : 'bg-bg border border-border text-text rounded-tl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                  placeholder="Type a query for machine allocation engines..."
                  className="flex-1 px-4 py-3 bg-bg border border-border focus:border-[#16A34A] outline-none text-sm rounded-xl transition-all placeholder-text-muted/50 font-medium"
                />
                <button 
                  onClick={sendChat}
                  className="px-6 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                >
                  Send
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-card border border-border p-6 rounded-2xl w-96 max-h-[80vh] overflow-y-auto shadow-2xl">
            <h3 className="text-md font-extrabold mb-4 text-text">Secure Ledger Entry</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-text-muted block mb-1">Entry Type</label>
                <select 
                  value={formType} 
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full p-3 bg-bg border border-border text-text font-bold text-sm rounded-xl outline-none focus:border-[#16A34A] cursor-pointer"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                  <option value="budget">Budget</option>
                  <option value="saving">Savings Account</option>
                  <option value="goal">Savings Goal</option>
                </select>
              </div>

              {/* DYNAMIC FORMS */}
              {(formType === 'expense' || formType === 'income') && (
                <>
                  <div>
                    <label className="text-xs font-bold text-text-muted block mb-1">Name/Merchant</label>
                    <input 
                      type="text" 
                      value={formMerchant} 
                      onChange={(e) => setFormMerchant(e.target.value)}
                      placeholder="Description"
                      className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-text-muted block mb-1">Amount (R)</label>
                      <input 
                        type="number" 
                        value={formAmount} 
                        onChange={(e) => setFormAmount(e.target.value)}
                        placeholder="0"
                        className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-muted block mb-1">Date</label>
                      <input 
                        type="date" 
                        value={formDate} 
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A]"
                      />
                    </div>
                  </div>
                  {formType === 'expense' && (
                    <div className="grid grid-cols-2 gap-2">
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
                        <label className="text-xs font-bold text-text-muted block mb-1">Method</label>
                        <input 
                          type="text" 
                          value={formMethod} 
                          onChange={(e) => setFormMethod(e.target.value)}
                          placeholder="Debit/EFT"
                          className="w-full p-3 bg-bg border border-border text-text font-medium text-sm rounded-xl outline-none focus:border-[#16A34A] placeholder-text-muted/50"
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
