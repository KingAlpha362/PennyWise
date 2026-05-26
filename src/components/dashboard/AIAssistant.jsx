import { useState, useEffect, useRef } from 'react';
import { generateResponse } from './aiEngine.js';

/* ============================================================
   ICON (minimal inline)
   ============================================================ */
function Icon({ name, size = 16, stroke = 1.75, className = '', style = {} }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', className, style };
  switch (name) {
    case 'send': return <svg {...props}><path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z"/></svg>;
    case 'sparkles': return <svg {...props}><path d="M12 3v3M12 18v3M5 12H2M22 12h-3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="2.5"/></svg>;
    case 'chevron-right': return <svg {...props}><path d="m9 6 6 6-6 6"/></svg>;
    case 'x': return <svg {...props}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    default: return <svg {...props}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

/* ============================================================
   CONSTANTS
   ============================================================ */
const STARTER_PROMPTS = [
  'Summarize my finances',
  'What do I overspend on?',
  'How are my goals tracking?',
  'Can I save more this month?',
  'Show me my subscriptions',
];

/* ============================================================
   TYPING MESSAGE — remount via key when text changes
   ============================================================ */
function TypingMessage({ text, onDone }) {
  const [displayed, setDisplayed] = useState('');
  const words = useRef(text.split(' '));
  const idx = useRef(0);

  useEffect(() => {
    const iv = setInterval(() => {
      if (idx.current >= words.current.length) {
        clearInterval(iv);
        onDone?.();
        return;
      }
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
   MESSAGE BUBBLE
   ============================================================ */
function renderMarkdown(text) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return <span key={i}>{parts}{i < arr.length - 1 && <br/>}</span>;
  });
}

function MessageBubble({ msg, isLast, onTypingDone }) {
  const isUser = msg.role === 'user';
  const [done, setDone] = useState(isUser || !isLast);

  const handleDone = () => {
    setDone(true);
    onTypingDone?.();
  };

  return (
    <div className={`pw-ai-msg ${isUser ? 'pw-ai-msg-user' : 'pw-ai-msg-ai'}`}>
      {!isUser && (
        <div className="pw-ai-avatar">
          <Icon name="sparkles" size={13} stroke={2}/>
        </div>
      )}
      <div className={`pw-ai-bubble ${isUser ? 'pw-ai-bubble-user' : 'pw-ai-bubble-ai'}`}>
        {!isUser && isLast && !done ? (
          <TypingMessage key={msg.text} text={msg.text} onDone={handleDone}/>
        ) : (
          renderMarkdown(msg.text)
        )}
      </div>
      <span className="pw-ai-time">{msg.time}</span>
    </div>
  );
}

/* ============================================================
   AI ASSISTANT SCREEN
   ============================================================ */
export default function AIAssistant({ data }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  const now = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const sendMessage = (text) => {
    if (!text.trim() || isTyping) return;
    const userMsg = { role: 'user', text: text.trim(), time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text, data);
      setMessages(prev => [...prev, { role: 'ai', text: response, time: now() }]);
    }, 600);
  };

  const handleTypingDone = () => setIsTyping(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isEmpty = messages.length === 0;

  return (
    <div className="pw-screen pw-fadein pw-ai-screen">
      {/* Header */}
      <div className="pw-ai-header">
        <div className="pw-ai-header-info">
          <div className="pw-ai-header-avatar">
            <Icon name="sparkles" size={16} stroke={2}/>
          </div>
          <div>
            <div className="pw-ai-header-name">Penny</div>
            <div className="pw-ai-header-sub">
              <span className="pw-ai-status-dot"/>
              Your financial AI
            </div>
          </div>
        </div>
        {!isEmpty && (
          <button className="pw-btn pw-btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}
            onClick={() => setMessages([])}>
            Clear chat
          </button>
        )}
      </div>

      {/* Messages area */}
      <div className="pw-ai-messages">
        {isEmpty ? (
          <div className="pw-ai-empty">
            <div className="pw-ai-empty-icon">
              <Icon name="sparkles" size={28} stroke={1.5}/>
            </div>
            <div className="pw-ai-empty-title">Ask Penny anything</div>
            <div className="pw-ai-empty-sub">Your AI financial assistant has access to your accounts, budgets, and goals.</div>
          </div>
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

      {/* Suggested prompts */}
      <div className="pw-ai-prompts">
        {STARTER_PROMPTS.map((p) => (
          <button key={p} className="pw-ai-chip" onClick={() => sendMessage(p)} disabled={isTyping}>
            {p}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="pw-ai-input-bar">
        <input
          className="pw-ai-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
          placeholder="Ask Penny about your finances…"
          disabled={isTyping}
        />
        <button
          className="pw-ai-send"
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
        >
          <Icon name="send" size={15} stroke={2}/>
        </button>
      </div>
    </div>
  );
}
