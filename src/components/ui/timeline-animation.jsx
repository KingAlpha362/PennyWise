import { motion } from "framer-motion";
import React from "react";

export const TimelineContent = ({
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  as: Component = motion.div,
  ...props
}) => {
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={customVariants}
      custom={animationNum}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};
