export default function BrowserChrome({ url = 'pennywise.app/dashboard' }) {
  return (
    <div className="flex items-center gap-3 px-4 py-[9px] bg-[#E9ECF1] dark:bg-[#1c1c1c] border-b border-black/10 dark:border-white/[0.07] shrink-0">
      <div className="flex gap-[6px] shrink-0">
        <span className="w-[11px] h-[11px] rounded-full" style={{ background: '#FF5F56' }} />
        <span className="w-[11px] h-[11px] rounded-full" style={{ background: '#FFBD2E' }} />
        <span className="w-[11px] h-[11px] rounded-full" style={{ background: '#27C93F' }} />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="text-[11px] leading-none px-4 py-[5px] rounded-full bg-black/10 dark:bg-white/[0.08] text-neutral-600 dark:text-neutral-400 font-mono tracking-tight select-none">
          {url}
        </div>
      </div>
      <div className="w-[35px] shrink-0" />
    </div>
  );
}
