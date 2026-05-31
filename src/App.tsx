import { motion, useScroll, useSpring } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import StackSection from './components/StackSection';
import TerminalView from './components/TerminalView';
import ManifestoSection from './components/ManifestoSection';
import ProjectsSection from './components/ProjectsSection';
import ExpertiseSection from './components/ExpertiseSection';
import MetricsTicker from './components/MetricsTicker';
import FloatingPhrases from './components/FloatingPhrases';

export default function App() {
  // Global scroll progress indicator for heavy physics feel
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/30 selection:text-white overflow-hidden font-sans relative">
      <div className="bg-glow absolute inset-0 pointer-events-none z-0 fixed" />
      <div className="bg-grid absolute inset-0 pointer-events-none z-0 fixed opacity-20" />
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden fixed">
        <div className="w-full h-[50px] bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20 animate-scanline" />
      </div>
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.4)] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />
      
      <nav className="fixed top-0 left-0 right-0 w-full max-w-6xl mx-auto px-6 py-6 z-40 flex justify-between items-center bg-transparent pointer-events-auto mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter cursor-pointer hover:scale-105 transition-transform" data-interactive="true">УЗБЕКОВ<span className="text-white/40">_</span></div>
        <div className="hidden sm:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-medium bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full">
          <a href="#expertise" data-interactive="true" className="opacity-60 hover:opacity-100 hover:text-white transition-all transform hover:-translate-y-0.5">Экспертиза</a>
          <a href="#projects" data-interactive="true" className="opacity-60 hover:opacity-100 hover:text-white transition-all transform hover:-translate-y-0.5">Работы</a>
          <a href="#stack" data-interactive="true" className="opacity-60 hover:opacity-100 hover:text-white transition-all transform hover:-translate-y-0.5">Стек</a>
        </div>
      </nav>

      <main className="flex flex-col items-center relative z-10 w-full">
        <Hero />
        <FloatingPhrases text="АВТОНОМНЫЕ АГЕНТЫ" direction={1} speed={1.5} />
        <ExpertiseSection />
        <FloatingPhrases text="СИСТЕМНАЯ АРХИТЕКТУРА" direction={-1} speed={1.2} />
        <ManifestoSection />
        <ProjectsSection />
        <FloatingPhrases text="ЦИФРОВЫЕ ИНСТРУМЕНТЫ" direction={1} speed={1.5} />
        <MetricsTicker />
        <StackSection />
        <FloatingPhrases text="ИНЖЕНЕРНЫЙ МАЙНДСЕТ" direction={-1} speed={2} />
        <TerminalView />
      </main>
      
      {/* Footer */}
      <footer className="py-32 mt-20 w-full flex flex-col items-center justify-center text-center text-white/40 text-sm border-t border-white/5 space-y-6 relative z-10 bg-gradient-to-t from-black/80 to-transparent">
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md mb-4 animate-[spin_10s_linear_infinite]">
            <div className="w-2 h-2 rounded-full bg-white/50" />
        </div>
        <p className="font-mono opacity-50">&gt; SYSTEM.HALT()</p>
        <p className="uppercase tracking-[0.2em] text-[10px]">Илгис Узбеков // 2026 // Архитектура и Разработка</p>
      </footer>
    </div>
  );
}
