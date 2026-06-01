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
         <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full pointer-events-none -z-10" />
         
         <h2 className="kinetic-text text-[clamp(2rem,10vw,6.5rem)] leading-[0.9] text-white tracking-[-0.05em] mb-8 md:mb-12 pb-4 drop-shadow-2xl">
           ПРОГРАММЫ ДОЛЖНЫ <br/> 
           РАБОТАТЬ САМИ ПО <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}>СЕБЕ</span>
         </h2>
         <p className="text-lg sm:text-xl md:text-3xl font-light text-white/60 tracking-wide max-w-4xl mx-auto leading-relaxed drop-shadow-md">
           Моя цель — избавить ваш бизнес от рутины. Я создаю автономные системы и ИИ-инструменты, которые берут на себя всю операционку, пока вы масштабируете прибыль.
         </p>
         
         <div className="mt-12 md:mt-16 inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 md:px-6 py-2.5 md:py-3 font-mono text-xs md:text-sm tracking-widest uppercase text-white/50 backdrop-blur-md shadow-xl">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316] animate-pulse" />
            Автоматизация 2026
         </div>
       </motion.div>
    </section>
  );
}
