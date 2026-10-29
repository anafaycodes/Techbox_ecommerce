import { motion, useReducedMotion } from "framer-motion";

export default function ScrollReveal({ children, delay = 0, y = 20, as = "div" }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  if (reduced) return <MotionTag>{children}</MotionTag>;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
