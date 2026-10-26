import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X, Sun, Moon } from 'lucide-react';
export function Header({onGetStarted,onSignIn,theme,onToggleTheme}) {
  const [open,setOpen] = useState(false);
  const toggleRef = useRef(null);
  useEffect(()=>{
    if(!open)return;
    const previous = document.body.style.overflow;
    document.body.style.overflow='hidden';
    const close = e=>{if(e.key==='Escape'){setOpen(false);toggleRef.current?.focus();}};
    const media=window.matchMedia('(min-width: 1024px)');
    const resize=()=>{if(media.matches)setOpen(false);};
    window.addEventListener('keydown',close);media.addEventListener('change',resize);
    return ()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',close);media.removeEventListener('change',resize);};
  },[open]);
  const links=[['The product','#features'],['Why PennyWise','#benefits'],['Pricing','#pricing']];
  const begin=()=>{setOpen(false);onGetStarted();};
  return <header className="ed-header"><div className="ed-header-inner ed-shell"><a className="ed-wordmark" aria-label="PennyWise home" href="#home" onClick={()=>setOpen(false)}>PennyWise<span aria-hidden="true">.</span></a><nav className="ed-desktop-nav" aria-label="Main navigation">{links.map(([name,href])=><a key={href} href={href}>{name}</a>)}</nav><div className="ed-header-actions"><button className="ed-theme-toggle" onClick={onToggleTheme} aria-label="Toggle landing theme">{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><button className="ed-signin" onClick={onSignIn}>Sign In</button><button className="ed-button ed-button-primary ed-header-demo" onClick={onGetStarted}>Explore demo <ArrowUpRight size={15} aria-hidden="true"/></button><button ref={toggleRef} className="ed-menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="landing-menu" onClick={()=>setOpen(v=>!v)}>{open?<X size={23}/>:<Menu size={23}/>}</button></div></div><div id="landing-menu" className="ed-mobile-menu" hidden={!open} inert={!open}><nav className="ed-shell" aria-label="Mobile navigation">{links.map(([name,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{name}</a>)}<button onClick={()=>{setOpen(false);onSignIn();}}>Sign In</button><button className="ed-button ed-button-primary" onClick={begin}>Explore demo <ArrowUpRight size={17} aria-hidden="true"/></button></nav></div></header>;
}
