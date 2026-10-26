import { motion, useReducedMotion } from 'framer-motion';
export function TimelineContent({ children, animationNum, customVariants, className, as = 'div', timelineRef, ...props }) {
  void timelineRef;
  const reducedMotion = useReducedMotion();
  const Component = typeof as === 'string' ? motion[as] : as;
  return <Component initial={false} whileInView={reducedMotion ? undefined : 'visible'} viewport={{ once: true, margin: '-100px' }} variants={reducedMotion ? undefined : customVariants} custom={animationNum} className={className} {...props}>{children}</Component>;
}
