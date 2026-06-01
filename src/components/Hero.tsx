import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress for a buttery, heavy cinematic feel
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 45, mass: 1 });
  
  // Aggressive scroll transformations with depth
  const mainScale = useTransform(smoothProgress, [0, 0.15], [1, 1.8]);
  const mainOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const mainY = useTransform(smoothProgress, [0, 0.15], [0, 300]);
  const mainZ = useTransform(smoothProgress, [0, 0.15], [0, 500]);
  const mainRotateX = useTransform(smoothProgress, [0, 0.15], [0, 45]);
  const bgScale = useTransform(smoothProgress, [0, 0.5], [1, 1.3]);

  // Kinetic typography effect - shifts aggressively on scroll
  const x1 = useTransform(smoothProgress, [0, 1], [0, -1500]);
  const x2 = useTransform(smoothProgress, [0, 1], [0, 1500]);
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.1], [0.3, 0]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.15], [0.4, 0]);

  return (
    <section className="relative min-h-[120vh] w-full flex flex-col items-center justify-center overflow-hidden" style={{ transformPerspective: 1000 }}>

      {/* Subtle background graphics tightly bound to scroll */}
      <motion.div 
        style={{ 
          y: bgY,
          scale: bgScale
        }}
        className="absolute inset-0 z-0 opacity-40 object-cover pointer-events-none will-change-transform"
      >
        <motion.div style={{ opacity: glowOpacity }} className="absolute top-[0%] left-[10%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(249,115,22,0.1)_0%,transparent_70%)] rounded-full mix-blend-screen" />
        <motion.div style={{ opacity: glowOpacity }} className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)] rounded-full mix-blend-screen" />
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000" 
          alt="Circuit abstract" 
          className="w-full h-full object-cover mix-blend-overlay grayscale opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      {/* Background Kinetic Typography (Atmospheric) */}
      <motion.div style={{ opacity: bgOpacity, transformStyle: "preserve-3d" }} className="fixed top-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-4 md:gap-8 z-0 pointer-events-none mix-blend-plus-lighter">
         <motion.div style={{ x: x1, z: useTransform(smoothProgress, [0, 1], [-200, 200]) }} className="whitespace-nowrap flex justify-center">
            <div className="kinetic-text text-[clamp(4rem,15vw,10rem)] text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
              АВТОМАТИЗАЦИЯ РОБОТИЗАЦИЯ ИИ-АГЕНТЫ АНАЛИТИКА 
            </div>
         </motion.div>
         
         <motion.div style={{ x: x2, z: useTransform(smoothProgress, [0, 1], [-100, 300]) }} className="whitespace-nowrap flex justify-center">
            <div className="kinetic-text text-[clamp(4rem,15vw,10rem)] text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
              АРХИТЕКТУРА ИНТЕГРАЦИИ МИКРОСЕРВИСЫ POS-СИСТЕМЫ
            </div>
         </motion.div>
      </motion.div>

      {/* Main Content pinned and scaling out on scroll */}
      <motion.div 
        style={{
          scale: mainScale,
          opacity: mainOpacity,
          y: mainY,
          z: mainZ,
          rotateX: mainRotateX,
          transformStyle: "preserve-3d"
        }}
        className="z-10 flex flex-col items-center mt-20 fixed w-full px-4 will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 50, z: -200 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute -inset-10 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] rounded-full -z-10" />
          <h1 className="leading-[0.9] mb-4 md:mb-6 flex flex-col items-center justify-center relative">
            <span className="text-[clamp(4.5rem,18vw,12rem)] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/10 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">ILGIS</span>
            <span className="text-[clamp(4.5rem,18vw,12rem)] font-black tracking-tighter text-transparent -mt-[5%] opacity-30 mix-blend-plus-lighter" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>UZBEKOV</span>
          </h1>
          <div className="h-[1px] w-1/3 mx-auto bg-gradient-to-r from-transparent via-white/40 to-transparent my-6 md:my-8" />
          <h2 className="text-sm sm:text-lg md:text-3xl font-mono tracking-[0.2em] sm:tracking-[0.3em] text-white/90 uppercase drop-shadow-md">
            Архитектор Систем
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-16 max-w-2xl text-center px-4 relative"
        >
          <div className="tag mb-6 md:mb-8 text-white bg-white/10 backdrop-blur-xl border-white/30 px-4 md:px-6 py-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] inline-flex items-center gap-3 text-xs md:text-sm">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-500 shadow-[0_0_15px_#f97316] animate-pulse" />
            СИСТЕМА АКТИВНА // 2026
          </div>
          <p className="text-white/90 text-base sm:text-lg md:text-2xl leading-relaxed mx-auto font-light drop-shadow-lg max-w-xl">
            Создание высоконагруженных инструментов для бизнеса. Полная автоматизация процессов и интеграции ИИ.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
