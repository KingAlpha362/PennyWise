import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Penny AI found $340/month I was bleeding on forgotten subscriptions and duplicate services. That's $4,000 a year back in my pocket. I was floored.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    name: "Sarah Jenkins",
    role: "Freelance Designer",
  },
  {
    text: "I used to spend 3 hours on Sunday categorizing transactions in a spreadsheet. PennyWise does it in seconds, more accurately. I'll never go back.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
    name: "Marcus Chen",
    role: "Software Engineer",
  },
  {
    text: "Saved my $80k down payment 8 months ahead of schedule. The goal tracking and automated contributions made it feel automatic. Best $10/mo I spend.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    name: "Elena Rodriguez",
    role: "Marketing Director",
  },
  {
    text: "Running 3 businesses, I link 11 accounts and see everything in one place. Cash flow, net worth, upcoming bills — it's my financial command center.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    name: "David Kim",
    role: "Small Business Owner",
  },
  {
    text: "As a data analyst I'm picky about security. SOC 2 Type II, AES-256, read-only bank access — PennyWise is the only app I trusted with my real accounts.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    name: "Amanda Foster",
    role: "Data Analyst",
  },
  {
    text: "I asked Penny 'where's all my money going?' and it gave me a breakdown in plain English. $192/month on coffee and lunch. Needed to hear that.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    name: "James Wilson",
    role: "Product Manager",
  },
  {
    text: "Switched from YNAB and honestly? This is better. The AI does what YNAB made me do manually, and the UI is actually pleasant to look at.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    name: "Michael Chang",
    role: "UI/UX Designer",
  },
  {
    text: "Penny flagged that my discretionary spending jumped 40% in October before I'd even noticed. That kind of proactive alert is exactly what I needed.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    name: "Rachel Green",
    role: "Accountant",
  },
  {
    text: "Tried Mint, YNAB, Copilot, Monarch. Nothing stuck. PennyWise stuck because it thinks for you instead of making you think. 10/10, tell everyone.",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
    name: "Thomas Wright",
    role: "Consultant",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export default function Testimonials() {
  return (
    <section className="bg-[var(--bg-subtle)] py-20 relative overflow-hidden testimonials-section">
      <div className="container z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center"
        >
          <div className="flex justify-center">
            <div className="border border-border text-xs font-bold px-3 py-1 rounded-full text-text-muted bg-card">Testimonials</div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter mt-5 text-text">
            Loved by thousands.
          </h2>
          <p className="mt-5 text-text-muted max-w-md mx-auto">
            See how PennyWise is helping individuals and businesses build generational wealth effortlessly.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-14 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
