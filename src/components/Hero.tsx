import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress for a buttery, heavy cinematic feel
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 45, mass: 1 });
  
  // Aggressive scroll transformations
  const mainScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);
  const mainOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const mainY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Kinetic typography effect - shifts aggressively on scroll
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -1500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.1], [0.3, 0]);

  return (
    <section className="relative min-h-[120vh] w-full flex flex-col items-center justify-center overflow-hidden">

      {/* Subtle background graphics tightly bound to scroll */}
      <motion.div 
        style={{ 
          y: bgY,
          scale: bgScale
        }}
        className="absolute inset-0 z-0 opacity-40 object-cover pointer-events-none"
      >
        <motion.div style={{ opacity: glowOpacity }} className="absolute top-[0%] left-[10%] w-[40vw] h-[40vw] bg-orange-500/20 rounded-full blur-[150px] mix-blend-screen" />
        <motion.div style={{ opacity: glowOpacity }} className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-500/20 rounded-full blur-[150px] mix-blend-screen" />
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000" 
          alt="Circuit abstract" 
          className="w-full h-full object-cover mix-blend-overlay grayscale opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      {/* Background Kinetic Typography (Atmospheric) */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-8 z-0 pointer-events-none opacity-40 mix-blend-plus-lighter">
         <motion.div style={{ x: x1 }} className="whitespace-nowrap flex justify-center">
            <div className="kinetic-text text-[clamp(6rem,12vw,10rem)] text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
              АВТОМАТИЗАЦИЯ РОБОТИЗАЦИЯ ИИ-АГЕНТЫ АНАЛИТИКА 
            </div>
         </motion.div>
         
         <motion.div style={{ x: x2 }} className="whitespace-nowrap flex justify-center">
            <div className="kinetic-text text-[clamp(6rem,12vw,10rem)] text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
              АРХИТЕКТУРА ИНТЕГРАЦИИ МИКРОСЕРВИСЫ POS-СИСТЕМЫ
            </div>
         </motion.div>
      </div>

      {/* Main Content pinned and scaling out on scroll */}
      <motion.div 
        style={{
          scale: mainScale,
          opacity: mainOpacity,
          y: mainY,
        }}
        className="z-10 flex flex-col items-center relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative"
        >
          <div className="absolute -inset-10 bg-white/5 blur-3xl rounded-full -z-10" />
          <h1 className="kinetic-text text-[clamp(4.5rem,10vw,10rem)] text-white tracking-tighter leading-none mb-6">
            ИЛГИС УЗБЕКОВ
          </h1>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent my-6 opacity-50" />
          <h2 className="text-xl md:text-4xl font-mono tracking-widest text-white/90 uppercase text-orange-500">
            Архитектор Систем
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 max-w-3xl text-center px-4 relative"
        >
          <div className="tag mb-10 text-white bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full flex items-center justify-center gap-4 mx-auto w-fit">
            <span className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_15px_#f97316] animate-pulse" />
            <span className="font-mono uppercase tracking-[0.2em] font-bold text-sm">Система Активна // 2026</span>
          </div>
          <p className="text-white text-xl md:text-3xl leading-snug mx-auto font-medium max-w-2xl opacity-90">
            Высоконагруженные инструменты для бизнеса. Абсолютная автоматизация и интеграция ИИ.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
