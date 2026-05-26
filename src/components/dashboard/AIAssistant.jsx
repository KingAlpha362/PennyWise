import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateResponse } from './aiEngine.js';

/* ============================================================
   AUTO-RESIZE TEXTAREA
   ============================================================ */
function useAutoResizeTextarea({ minHeight, maxHeight }) {
  const textareaRef = useRef(null);
  const adjustHeight = useCallback((reset) => {
    const ta = textareaRef.current;
    if (!ta) return;
    if (reset) { ta.style.height = `${minHeight}px`; return; }
    ta.style.height = `${minHeight}px`;
    ta.style.height = `${Math.max(minHeight, Math.min(ta.scrollHeight, maxHeight ?? Infinity))}px`;
  }, [minHeight, maxHeight]);

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

/* ============================================================
   ICONS
   ============================================================ */
function Icon({ name, size = 16, stroke = 1.75, style = {} }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', style };
  switch (name) {
    case 'send':       return <svg {...p}><path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z"/></svg>;
    case 'sparkles':   return <svg {...p}><path d="M12 3v3M12 18v3M5 12H2M22 12h-3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="2.5"/></svg>;
    case 'pie':        return <svg {...p}><path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/></svg>;
    case 'flag':       return <svg {...p}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>;
    case 'repeat':     return <svg {...p}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>;
    case 'trending':   return <svg {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
    case 'x':         return <svg {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case 'paperclip': return <svg {...p}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
    case 'command':   return <svg {...p}><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3-3z"/></svg>;
    case 'copy':      return <svg {...p}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
    case 'check':     return <svg {...p}><polyline points="20 6 9 17 4 12"/></svg>;
    default:          return <svg {...p}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

/* ============================================================
   CONSTANTS
   ============================================================ */
const COMMANDS = [
  { icon: 'sparkles', label: 'Summarize',       query: 'Summarize my finances',                      desc: 'Full financial snapshot' },
  { icon: 'pie',      label: 'Spending',         query: 'What am I overspending on?',                 desc: 'Budget breakdown' },
  { icon: 'flag',     label: 'Goals',            query: 'How are my goals tracking?',                 desc: 'Progress & pace' },
  { icon: 'repeat',   label: 'Subscriptions',    query: 'Show my subscriptions and recurring bills',  desc: 'Monthly recurring' },
  { icon: 'trending', label: 'Cash Flow',        query: 'What is my income and cash flow?',           desc: 'Income vs expenses' },
];

const QUICK_CARDS = [
  { icon: 'sparkles', label: 'Monthly Overview',    sub: 'Your financial snapshot',  query: 'Summarize my finances' },
  { icon: 'flag',     label: 'Goal Check',           sub: 'Progress & pace',          query: 'How are my goals tracking?' },
  { icon: 'pie',      label: 'Spending Deep Dive',   sub: 'Where money went',         query: 'What am I overspending on?' },
  { icon: 'repeat',   label: 'Review Subscriptions', sub: 'All recurring bills',      query: 'Show my subscriptions and recurring bills' },
];

/* ============================================================
   TYPING DOTS
   ============================================================ */
function TypingDots() {
  return (
    <div className="pw-ai-dots">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="pw-ai-dot"
          initial={{ opacity: 0.3, scale: 0.85 }}
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.85, 1.1, 0.85] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   TYPING MESSAGE
   ============================================================ */
function TypingMessage({ text, onDone }) {
  const [displayed, setDisplayed] = useState('');
  const words = useRef(text.split(' '));
  const idx = useRef(0);

  useEffect(() => {
    const iv = setInterval(() => {
      if (idx.current >= words.current.length) { clearInterval(iv); onDone?.(); return; }
      const word = words.current[idx.current];
      setDisplayed(prev => prev + (prev ? ' ' : '') + word);
      idx.current++;
    }, 28);
    return () => clearInterval(iv);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span>{displayed}<span className="pw-ai-cursor">▋</span></span>;
}

/* ============================================================
   RENDER MARKDOWN
   ============================================================ */
function renderMarkdown(text) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={j}>{part.slice(2, -2)}</strong>;
      return part;
    });
    return <span key={i}>{parts}{i < arr.length - 1 && <br/>}</span>;
  });
}

/* ============================================================
   MESSAGE BUBBLE
   ============================================================ */
function MessageBubble({ msg, isLast, onTypingDone }) {
  const isUser = msg.role === 'user';
  const [done, setDone] = useState(isUser || !isLast);
  const [copied, setCopied] = useState(false);

  const handleDone = () => { setDone(true); onTypingDone?.(); };
  const handleCopy = () => {
    navigator.clipboard.writeText(msg.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      className={`pw-ai-msg ${isUser ? 'pw-ai-msg-user' : 'pw-ai-msg-ai'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {!isUser && (
        <div className="pw-ai-avatar">
          <Icon name="sparkles" size={13} stroke={2}/>
        </div>
      )}
      <div className="pw-ai-bubble-wrap">
        <div className={`pw-ai-bubble ${isUser ? 'pw-ai-bubble-user' : 'pw-ai-bubble-ai'}`}>
          {!isUser && isLast && !done
            ? <TypingMessage key={msg.text} text={msg.text} onDone={handleDone}/>
            : renderMarkdown(msg.text)}
        </div>
        {!isUser && done && (
          <button className="pw-ai-copy-btn" onClick={handleCopy} title="Copy response">
            <Icon
              name={copied ? 'check' : 'copy'}
              size={12} stroke={2}
              style={{ color: copied ? 'var(--pos)' : 'var(--text-faint)' }}
            />
          </button>
        )}
      </div>
      <span className="pw-ai-time">{msg.time}</span>
    </motion.div>
  );
}

/* ============================================================
   AI ASSISTANT SCREEN
   ============================================================ */
export default function AIAssistant({ data }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [showCmdPalette, setShowCmdPalette] = useState(false);
  const [activeCmd, setActiveCmd] = useState(-1);
  const [inputFocused, setInputFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bottomRef = useRef(null);
  const cmdPaletteRef = useRef(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 52, maxHeight: 180 });

  const now = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const sendMessage = (textArg) => {
    const t = (textArg ?? input).trim();
    if (!t || isTyping) return;
    setMessages(prev => [...prev, { role: 'user', text: t, time: now() }]);
    setInput('');
    adjustHeight(true);
    setIsTyping(true);
    setTimeout(() => {
      const response = generateResponse(t, data);
      setMessages(prev => [...prev, { role: 'ai', text: response, time: now() }]);
    }, 600);
  };

  const handleTypingDone = () => setIsTyping(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Command palette: show when input starts with "/"
  useEffect(() => {
    if (input.startsWith('/') && !input.includes(' ')) {
      setShowCmdPalette(true);
      const q = input.slice(1).toLowerCase();
      const match = q ? COMMANDS.findIndex(c => c.label.toLowerCase().startsWith(q)) : -1;
      setActiveCmd(match);
    } else {
      setShowCmdPalette(false);
    }
  }, [input]);

  // Mouse tracking for glow effect
  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  // Close palette on outside click
  useEffect(() => {
    const h = (e) => {
      const cmdBtn = document.querySelector('[data-cmdpalette]');
      if (cmdPaletteRef.current && !cmdPaletteRef.current.contains(e.target) && !cmdBtn?.contains(e.target)) {
        setShowCmdPalette(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleKeyDown = (e) => {
    if (showCmdPalette) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveCmd(p => p < COMMANDS.length - 1 ? p + 1 : 0); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveCmd(p => p > 0 ? p - 1 : COMMANDS.length - 1); }
      else if ((e.key === 'Tab' || e.key === 'Enter') && activeCmd >= 0) { e.preventDefault(); selectCommand(activeCmd); }
      else if (e.key === 'Escape') { e.preventDefault(); setShowCmdPalette(false); }
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) sendMessage();
    }
  };

  const selectCommand = (idx) => {
    setInput(COMMANDS[idx].query);
    setShowCmdPalette(false);
    textareaRef.current?.focus();
  };

  const MOCK_FILES = ['receipt_nov.pdf', 'bank_statement.pdf', 'tax_form_2024.pdf', 'invoice.png'];
  const handleAttach = () => setAttachments(prev => [...prev, MOCK_FILES[prev.length % MOCK_FILES.length]]);

  const isEmpty = messages.length === 0;

  return (
    <div className="pw-screen pw-fadein pw-ai-screen" style={{ position: 'relative' }}>

      {/* Mouse-tracking glow */}
      <AnimatePresence>
        {inputFocused && (
          <motion.div
            className="pw-ai-glow"
            animate={{ x: mousePos.x - 250, y: mousePos.y - 250 }}
            transition={{ type: 'spring', damping: 30, stiffness: 120, mass: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div className="pw-ai-header">
        <div className="pw-ai-header-info">
          <div className="pw-ai-header-avatar">
            <Icon name="sparkles" size={16} stroke={2}/>
          </div>
          <div>
            <div className="pw-ai-header-name">Penny</div>
            <div className="pw-ai-header-sub">
              <motion.span
                className="pw-ai-status-dot"
                animate={{ boxShadow: ['0 0 0 0px rgba(34,197,94,0.5)', '0 0 0 4px rgba(34,197,94,0)', '0 0 0 0px rgba(34,197,94,0.5)'] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              Your financial AI
            </div>
          </div>
        </div>
        {!isEmpty && (
          <button
            className="pw-btn pw-btn-ghost"
            style={{ padding: '4px 10px', fontSize: 12 }}
            onClick={() => { setMessages([]); setAttachments([]); }}
          >
            Clear chat
          </button>
        )}
      </div>

      {/* ── Messages ── */}
      <div className="pw-ai-messages">
        {isEmpty ? (
          <motion.div
            className="pw-ai-empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <motion.div
              className="pw-ai-empty-icon"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon name="sparkles" size={28} stroke={1.5}/>
            </motion.div>
            <div className="pw-ai-empty-title">Ask Penny anything</div>
            <div className="pw-ai-empty-sub">
              AI with access to your accounts, budgets, goals, and transactions.
            </div>
            <div className="pw-ai-quick-grid">
              {QUICK_CARDS.map((c, i) => (
                <motion.button
                  key={c.label}
                  className="pw-ai-quick-card"
                  onClick={() => sendMessage(c.query)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="pw-ai-quick-icon">
                    <Icon name={c.icon} size={14} stroke={2}/>
                  </div>
                  <div>
                    <div className="pw-ai-quick-label">{c.label}</div>
                    <div className="pw-ai-quick-sub">{c.sub}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          messages.map((msg, i) => (
            <MessageBubble
              key={i}
              msg={msg}
              isLast={i === messages.length - 1}
              onTypingDone={i === messages.length - 1 ? handleTypingDone : undefined}
            />
          ))
        )}
        <div ref={bottomRef}/>
      </div>

      {/* ── Suggested chips (only when conversation started) ── */}
      {!isEmpty && (
        <div className="pw-ai-prompts">
          {['Summarize my finances', 'What do I overspend on?', 'Can I save more?', 'Show my goals'].map(p => (
            <button key={p} className="pw-ai-chip" onClick={() => sendMessage(p)} disabled={isTyping}>{p}</button>
          ))}
        </div>
      )}

      {/* ── Attachments ── */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            className="pw-ai-attach-row"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {attachments.map((file, i) => (
              <motion.div
                key={i}
                className="pw-ai-attach-chip"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
              >
                <Icon name="paperclip" size={11} stroke={2}/>
                <span>{file}</span>
                <button onClick={() => setAttachments(prev => prev.filter((_, j) => j !== i))}>
                  <Icon name="x" size={10} stroke={2.5}/>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input bar ── */}
      <div className="pw-ai-input-outer">

        {/* Command palette */}
        <AnimatePresence>
          {showCmdPalette && (
            <motion.div
              ref={cmdPaletteRef}
              className="pw-ai-cmd-palette"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
            >
              <div className="pw-ai-cmd-header">Commands</div>
              {COMMANDS.map((cmd, i) => (
                <div
                  key={cmd.label}
                  className={`pw-ai-cmd-item${activeCmd === i ? ' active' : ''}`}
                  onMouseDown={(e) => { e.preventDefault(); selectCommand(i); }}
                >
                  <div className="pw-ai-cmd-icon">
                    <Icon name={cmd.icon} size={13} stroke={1.75}/>
                  </div>
                  <div className="pw-ai-cmd-label">{cmd.label}</div>
                  <div className="pw-ai-cmd-desc">{cmd.desc}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input wrap */}
        <div className={`pw-ai-input-wrap${inputFocused ? ' focused' : ''}`}>
          <textarea
            ref={textareaRef}
            className="pw-ai-textarea"
            value={input}
            onChange={e => { setInput(e.target.value); adjustHeight(); }}
            onKeyDown={handleKeyDown}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Ask Penny about your finances… (type / for commands)"
            disabled={isTyping}
          />
          <div className="pw-ai-input-actions">
            <div className="pw-ai-input-left">
              <button
                className="pw-icon-btn"
                onClick={handleAttach}
                title="Attach file"
                type="button"
              >
                <Icon name="paperclip" size={14} stroke={1.75}/>
              </button>
              <button
                className={`pw-icon-btn${showCmdPalette ? ' active' : ''}`}
                data-cmdpalette
                onClick={e => { e.stopPropagation(); setShowCmdPalette(p => !p); }}
                title="Commands (/)"
                type="button"
              >
                <Icon name="command" size={14} stroke={1.75}/>
              </button>
            </div>
            <motion.button
              className="pw-ai-send"
              type="button"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              whileHover={input.trim() && !isTyping ? { scale: 1.06 } : {}}
              whileTap={input.trim() && !isTyping ? { scale: 0.93 } : {}}
            >
              <Icon name="send" size={14} stroke={2}/>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Thinking indicator ── */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            className="pw-ai-thinking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pw-ai-thinking-avatar">
              <Icon name="sparkles" size={11} stroke={2}/>
            </div>
            <span className="pw-ai-thinking-label">Penny is thinking</span>
            <TypingDots/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
