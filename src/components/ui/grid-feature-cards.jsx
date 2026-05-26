import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

function genRandomPattern(length = 5) {
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}

function GridPattern({ width, height, x, y, squares, className, ...props }) {
  const patternId = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay',
        'fill-[color-mix(in_srgb,var(--text)_6%,transparent)]',
        'stroke-[color-mix(in_srgb,var(--text)_18%,transparent)]',
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sqX, sqY], index) => (
            <rect
              key={index}
              strokeWidth="0"
              width={width + 1}
              height={height + 1}
              x={sqX * width}
              y={sqY * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

export function AnimatedContainer({ children, delay = 0, className }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 0 }
          : { opacity: 0, y: 20, filter: 'blur(4px)' }
      }
      whileInView={
        prefersReduced
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  const squares = genRandomPattern(5);

  return (
    <AnimatedContainer delay={delay} className="relative overflow-hidden p-7 flex flex-col gap-5 min-h-[196px]">
      <GridPattern width={20} height={20} x={-1} y={-1} squares={squares} />
      <div className="relative z-10 w-10 h-10 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center">
        <Icon size={19} className="text-[var(--accent)]" strokeWidth={1.5} aria-hidden />
      </div>
      <div className="relative z-10 flex flex-col gap-1.5">
        <h3 className="font-semibold text-[0.95rem] tracking-[-0.02em] text-text leading-snug">
          {title}
        </h3>
        <p className="text-[0.83rem] text-text-muted leading-[1.65]">
          {description}
        </p>
      </div>
    </AnimatedContainer>
  );
}
