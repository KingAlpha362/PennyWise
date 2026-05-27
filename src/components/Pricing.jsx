"use client";
import { useRef, useState  } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    description: "Great for individuals getting started with personal finance.",
    price: 0,
    yearlyPrice: 0,
    buttonText: "Try Free for 7 Days",
    buttonVariant: "outline",
    includes: [
      "Free features:",
      "Up to 2 connected accounts",
      "Basic budget tracking",
      "Standard encryption",
      "Community support",
    ],
  },
  {
    name: "Pro",
    description: "Full AI-powered intelligence. Average user saves $1,872/yr — 18× what Pro costs.",
    price: 10,
    yearlyPrice: 100,
    buttonText: "Start 7-day free trial",
    buttonVariant: "default",
    popular: true,
    includes: [
      "Everything in Starter, plus:",
      "Unlimited connected accounts",
      "Penny AI financial assistant",
      "Smart budget & goal tracking",
      "Subscription detection & alerts",
      "Priority 24/7 support",
      "SOC 2 + GDPR certified",
    ],
  },
];

const PricingSwitch = ({ onSwitch }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-bg border border-border p-1 shadow-sm">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
            selected === "0" ? "text-white" : "text-text-muted",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border border-[#15803D] bg-[#16A34A] shadow-sm"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-20">Monthly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
            selected === "1" ? "text-white" : "text-text-muted",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border border-[#15803D] bg-[#16A34A] shadow-sm"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-20 flex items-center gap-2">Yearly</span>
        </button>
      </div>
    </div>
  );
};

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef(null);

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value) => setIsYearly(parseInt(value) === 1);

  return (
    <div
      className="relative bg-[var(--bg-subtle)] overflow-x-hidden py-24"
      ref={pricingRef}
      id="pricing"
    >
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] pointer-events-none"
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:70px_80px] pointer-events-none opacity-50"></div>
        <Sparkles
          density={800}
          direction="bottom"
          speed={0.5}
          color="#16A34A"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>

      <article className="text-center mb-12 max-w-3xl mx-auto space-y-4 relative z-20 px-4">
        <div className="flex justify-center mb-4">
          <div className="border border-border text-xs font-bold px-3 py-1 rounded-full text-text-muted bg-card">Pricing</div>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            A plan that works for you
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-text-muted max-w-lg mx-auto"
        >
          Simple, transparent pricing. Users save an average of $156/month — Pro pays for itself in days.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="pt-6"
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      <div className="grid md:grid-cols-2 max-w-4xl gap-6 py-6 mx-auto px-4 relative z-20">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={cn(
                "relative text-text border-border h-full flex flex-col transition-all duration-300 pricing-card",
                plan.popular
                  ? "pricing-card--pro bg-card shadow-2xl shadow-[#16A34A]/10 md:scale-[1.02] z-20 border-[#16A34A]/30"
                  : "bg-bg z-10"
              )}
            >
              <CardHeader className="text-left flex-none">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-extrabold">{plan.name}</h3>
                </div>
                <div className="flex items-baseline py-4">
                  <span className="text-5xl font-extrabold text-text">
                    $
                    <NumberFlow
                      format={{ currency: "USD" }}
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-5xl font-extrabold"
                    />
                  </span>
                  <span className="text-text-muted ml-2 font-medium">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                <p className="text-sm text-text-muted font-medium min-h-[40px]">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0 flex-1 flex flex-col">
                <button
                  className={cn(
                    "w-full mb-8 text-center active:scale-95 cursor-pointer shadow-sm",
                    plan.popular
                      ? "btn-primary"
                      : "btn-secondary"
                  )}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-4 pt-4 border-t border-border flex-1">
                  <h4 className="font-bold text-sm text-text">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-3">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="mt-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm text-text-muted font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
