import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "PennyWise revolutionized how I manage my personal finances. The AI insights caught subscriptions I forgot I had.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    name: "Sarah Jenkins",
    role: "Freelance Designer",
  },
  {
    text: "The budget auto-categorization is magic. It saves me hours every month compared to my old spreadsheets.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
    name: "Marcus Chen",
    role: "Software Engineer",
  },
  {
    text: "I finally reached my savings goal for a down payment thanks to the predictive allocation routines.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    name: "Elena Rodriguez",
    role: "Marketing Director",
  },
  {
    text: "The cross-account balance mapping is incredible. Seeing my entire net worth in one dashboard is a game-changer.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    name: "David Kim",
    role: "Small Business Owner",
  },
  {
    text: "SOC 2 compliance and 256-bit encryption give me the peace of mind I need to link all my financial accounts.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    name: "Amanda Foster",
    role: "Data Analyst",
  },
  {
    text: "The chatbot interface for querying my own financial data feels like living in the future.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    name: "James Wilson",
    role: "Product Manager",
  },
  {
    text: "PennyWise's dark mode UI is simply stunning. It's the only financial app I actually enjoy opening.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    name: "Michael Chang",
    role: "UI/UX Designer",
  },
  {
    text: "The smart notifications alerted me when my lifestyle creep was getting out of hand. Truly helpful.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    name: "Rachel Green",
    role: "Accountant",
  },
  {
    text: "I've tried every budgeting app out there, and PennyWise is the only one that stuck. Highly recommended.",
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
    <section className="bg-bg py-20 relative overflow-hidden">
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
