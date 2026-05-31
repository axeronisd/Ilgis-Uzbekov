import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function FloatingPhrases({ direction = 1, text, speed = 1 }: { direction?: 1 | -1, text: string, speed?: number }) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { damping: 40, stiffness: 60 });
  
  const from = direction === 1 ? -50 : 50;
  const to = direction === 1 ? 50 : -50;
  
  const x = useTransform(smooth, [0, 1], [`${from * speed}vw`, `${to * speed}vw`]);

  return (
    <div className="w-full overflow-hidden whitespace-nowrap pointer-events-none py-10 opacity-[0.03] flex select-none mix-blend-screen my-4">
      <motion.div style={{ x }} className="inline-block text-[10vw] font-black uppercase tracking-tighter text-white font-mono min-w-max">
         {text} • {text} • {text} • {text} • {text} • {text} • {text} • {text}
      </motion.div>
    </div>
  );
}
