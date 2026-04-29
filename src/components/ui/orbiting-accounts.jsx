"use client"
import React, { useEffect, useState, memo } from 'react';
import { Landmark, CreditCard, TrendingUp, PiggyBank, Wallet, Bitcoin, ArrowRightLeft } from 'lucide-react';

const iconComponents = {
  bank: { component: () => <Landmark className="w-full h-full text-[#16A34A] dark:text-[#60d4aa]" />, color: '#16A34A' },
  card: { component: () => <CreditCard className="w-full h-full text-[#16A34A] dark:text-[#60d4aa]" />, color: '#16A34A' },
  investment: { component: () => <TrendingUp className="w-full h-full text-[#c9922a]" />, color: '#c9922a' },
  savings: { component: () => <PiggyBank className="w-full h-full text-[#16A34A] dark:text-[#60d4aa]" />, color: '#16A34A' },
  wallet: { component: () => <Wallet className="w-full h-full text-[#c9922a]" />, color: '#c9922a' },
  crypto: { component: () => <Bitcoin className="w-full h-full text-[#f7931a]" />, color: '#f7931a' }
};

const SkillIcon = memo(({ type }) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

const skillsConfig = [
  { id: 'bank', orbitRadius: 100, size: 40, speed: 1, iconType: 'bank', phaseShift: 0, label: 'Bank Account' },
  { id: 'card', orbitRadius: 100, size: 40, speed: 1, iconType: 'card', phaseShift: (2 * Math.PI) / 3, label: 'Credit Card' },
  { id: 'savings', orbitRadius: 100, size: 40, speed: 1, iconType: 'savings', phaseShift: (4 * Math.PI) / 3, label: 'Savings' },
  { id: 'investment', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'investment', phaseShift: 0, label: 'Investments' },
  { id: 'wallet', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'wallet', phaseShift: (2 * Math.PI) / 3, label: 'Digital Wallet' },
  { id: 'crypto', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'crypto', phaseShift: (4 * Math.PI) / 3, label: 'Crypto' },
];

const OrbitingSkill = memo(({ config, angle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2.5 bg-card border border-border backdrop-blur-md
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-text text-bg rounded text-xs font-semibold whitespace-nowrap pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

const GlowingOrbitPath = memo(({ radius, animationDelay = 0 }) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse opacity-40"
        style={{
          background: `radial-gradient(circle, transparent 30%, rgba(22, 163, 74, 0.05) 70%, rgba(22, 163, 74, 0.1) 100%)`,
          boxShadow: `0 0 40px rgba(22, 163, 74, 0.1), inset 0 0 40px rgba(22, 163, 74, 0.05)`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full border border-border"
        style={{
          boxShadow: `inset 0 0 20px rgba(22, 163, 74, 0.05)`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

export default function OrbitingAccounts() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs = [
    { radius: 100, delay: 0 },
    { radius: 180, delay: 1.5 }
  ];

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-10 relative">
      <div 
        className="relative w-[380px] h-[380px] md:w-[450px] md:h-[450px] flex items-center justify-center scale-75 sm:scale-100"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="w-20 h-20 bg-card border border-border rounded-full flex items-center justify-center z-10 relative shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-[#16A34A]/20 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-[#c9922a]/10 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <ArrowRightLeft className="w-8 h-8 text-[#16A34A] dark:text-[#60d4aa]" />
          </div>
        </div>

        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            animationDelay={config.delay}
          />
        ))}

        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </div>
  );
}
