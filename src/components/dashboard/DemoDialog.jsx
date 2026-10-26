import { useEffect, useRef } from 'react';
export default function DemoDialog({ children, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () => [...dialog.querySelectorAll('button:not([disabled]), input, select, textarea, a[href], [tabindex="0"]')];
    (focusable()[0] || dialog).focus();
    const key = event => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const items = focusable(); const first = items[0]; const last = items.at(-1);
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    dialog.addEventListener('keydown', key);
    return () => { dialog.removeEventListener('keydown', key); document.body.style.overflow = bodyOverflow; if (previous?.isConnected) previous.focus(); };
  }, [onClose]);
  return <div className="pw-modal-overlay" onClick={onClose}><div ref={ref} role="dialog" aria-modal="true" aria-label="Edit sample data" tabIndex={-1}>{children}</div></div>;
}
