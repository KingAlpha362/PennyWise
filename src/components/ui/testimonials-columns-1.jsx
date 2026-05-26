"use client";
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export const TestimonialsColumn = (props) => {
  const yProgress = useMotionValue(0);
  const y = useTransform(yProgress, [0, 100], ["0%", "-50%"]);
  const animRef = useRef(null);
  const duration = props.duration || 10;

  useEffect(() => {
    animRef.current = animate(yProgress, [0, 100], {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => animRef.current?.stop();
  }, [duration]);

  return (
    <div
      className={props.className}
      onMouseEnter={() => animRef.current?.pause()}
      onMouseLeave={() => animRef.current?.play()}
    >
      <motion.div
        style={{ y }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-6 sm:p-10 rounded-3xl border border-border bg-card shadow-sm max-w-full sm:max-w-xs w-full testimonial-card"
                key={i}
              >
                <div className="text-sm font-medium text-text">{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="text-sm font-bold tracking-tight text-text leading-5">{name}</div>
                    <div className="text-xs leading-5 text-text-muted tracking-tight">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
