import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

export default function ManifestoSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 60, mass: 1 });
  
  const opacity = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.5, 1, 1, 0.5]);
  const rotateX = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [45, 0, 0, -45]);
  const yOffset = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [250, 0, 0, -250]);
  const zOffset = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [-500, 0, 0, -500]);
  const textZ = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [-100, 100, 100, -100]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative w-full overflow-hidden my-20 py-20" style={{ transformPerspective: 2000 }}>
       <div className="absolute inset-0 bg-[#050505]" />

       <motion.div 
         style={{ 
           opacity, 
           scale, 
           rotateX,
           y: yOffset,
           z: zOffset,
           transformStyle: "preserve-3d"
         }} 
         className="max-w-5xl px-6 text-center z-10 relative will-change-transform"
       >
         <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_60%)] rounded-full pointer-events-none -z-10" />
         
         <motion.h2 
           style={{ z: textZ }}
           className="kinetic-text text-[clamp(2rem,10vw,6.5rem)] leading-[0.9] text-white tracking-[-0.05em] mb-8 md:mb-12 pb-4 drop-shadow-2xl translate-z-10"
         >
           ПРОГРАММЫ ДОЛЖНЫ <br/> 
           РАБОТАТЬ САМИ ПО <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}>СЕБЕ</span>
         </motion.h2>
         <motion.p style={{ z: useTransform(smoothProgress, [0, 0.4, 0.6, 1], [-50, 50, 50, -50]) }} className="text-lg sm:text-xl md:text-3xl font-light text-white/60 tracking-wide max-w-4xl mx-auto leading-relaxed drop-shadow-md">
           Моя цель — избавить ваш бизнес от рутины. Я создаю автономные системы и ИИ-инструменты, которые берут на себя всю операционку, пока вы масштабируете прибыль.
         </motion.p>
         
         <motion.div style={{ z: useTransform(smoothProgress, [0, 0.4, 0.6, 1], [-20, 80, 80, -20]) }} className="mt-12 md:mt-16 inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 md:px-6 py-2.5 md:py-3 font-mono text-xs md:text-sm tracking-widest uppercase text-white/50 backdrop-blur-md shadow-xl">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316] animate-pulse" />
            Автоматизация 2026
         </motion.div>
       </motion.div>
    </section>
  );
}
