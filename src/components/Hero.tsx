import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress for a buttery, heavy cinematic feel
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 45, mass: 1 });
  
  // Aggressive scroll transformations
  const mainScale = useTransform(smoothProgress, [0, 0.2], [1, 1.5]);
  const mainOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const mainY = useTransform(smoothProgress, [0, 0.2], [0, 300]);
  const blurValue = useTransform(smoothProgress, [0, 0.15], [0, 30]);
  const bgScale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);

  // Kinetic typography effect - shifts aggressively on scroll
  const x1 = useTransform(smoothProgress, [0, 1], [0, -2000]);
  const x2 = useTransform(smoothProgress, [0, 1], [0, 2000]);
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "80%"]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.1], [0.3, 0]);

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
      <div className="fixed top-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-8 z-0 pointer-events-none opacity-40 mix-blend-plus-lighter">
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
          filter: `blur(${blurValue.get()}px)`
        }}
        className="z-10 flex flex-col items-center mt-20 fixed"
      >
        <motion.div
          initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative"
        >
          <div className="absolute -inset-10 bg-white/5 blur-3xl rounded-full -z-10" />
          <h1 className="kinetic-text text-[clamp(4rem,9vw,9rem)] text-white tracking-[-0.04em] drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] leading-none mb-4">
            ИЛГИС УЗБЕКОВ
          </h1>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent my-6 opacity-50" />
          <h2 className="text-lg md:text-3xl font-mono tracking-[0.2em] text-white/90 uppercase drop-shadow-md">
            Архитектор Систем
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 max-w-2xl text-center px-4 relative"
        >
          <div className="tag mb-8 text-white bg-white/10 backdrop-blur-xl border-white/30 px-6 py-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] inline-flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_15px_#f97316] animate-pulse" />
            СИСТЕМА АКТИВНА // 2026
          </div>
          <p className="text-white/90 text-lg md:text-2xl leading-relaxed mx-auto font-light drop-shadow-lg max-w-xl">
            Создание высоконагруженных инструментов для бизнеса. Полная автоматизация процессов и интеграции ИИ.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
