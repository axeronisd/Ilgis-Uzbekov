import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

export default function ManifestoSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 50, mass: 1 });
  
  const y1 = useTransform(smoothProgress, [0, 1], [150, -350]);
  const y2 = useTransform(smoothProgress, [0, 1], [350, -150]);
  const opacity = useTransform(smoothProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const scale = useTransform(smoothProgress, [0.3, 0.5, 0.7], [0.95, 1, 0.95]);

  return (
    <section ref={ref} className="min-h-[150vh] flex items-center justify-center relative w-full overflow-hidden my-32">
       {/* Background vertical moving lines */}
       <motion.div style={{ y: y1 }} className="absolute left-[10%] md:left-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
       <motion.div style={{ y: y2 }} className="absolute right-[10%] md:right-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

       <motion.div style={{ opacity, scale }} className="max-w-5xl px-6 text-center z-10 relative">
         <h2 className="kinetic-text text-[clamp(2.5rem,7vw,6.5rem)] leading-none text-white tracking-tighter mb-12 drop-shadow-2xl">
           ПРОГРАММЫ ДОЛЖНЫ <br/> 
           РАБОТАТЬ САМИ ПО <span className="text-white/50 italic">СЕБЕ</span>
         </h2>
         <p className="text-xl md:text-3xl font-medium text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md bg-black/50 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
           Моя цель — избавить ваш бизнес от рутины. Я создаю автономные системы и ИИ-инструменты, которые берут на себя всю операционку, пока вы масштабируете прибыль.
         </p>
         
         <div className="mt-16 inline-flex items-center gap-4 bg-orange-500 border border-orange-400 rounded-full px-8 py-4 font-mono text-base font-bold tracking-widest uppercase text-black shadow-[0_0_30px_rgba(249,115,22,0.3)]">
            <span className="w-3 h-3 rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)] animate-pulse" />
            Автоматизация 2026
         </div>
       </motion.div>
    </section>
  );
}
