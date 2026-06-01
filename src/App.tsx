import { motion, useScroll, useSpring } from 'motion/react';
import { Cpu, Rocket, Code2 } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import StackSection from './components/StackSection';
import TerminalView from './components/TerminalView';
import ManifestoSection from './components/ManifestoSection';
import ProjectsSection from './components/ProjectsSection';
import ExpertiseSection from './components/ExpertiseSection';
import MetricsTicker from './components/MetricsTicker';

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
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden fixed">
        <div className="w-full h-[50px] bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30 animate-scanline" />
      </div>
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.4)] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />
      
      <nav className="fixed top-0 left-0 right-0 w-full max-w-6xl mx-auto px-6 py-6 z-40 flex justify-center items-center bg-transparent pointer-events-auto mix-blend-difference hidden sm:flex">
        <div className="hidden sm:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-medium bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full">
          <a href="#expertise" data-interactive="true" className="opacity-60 hover:opacity-100 hover:text-white transition-all transform hover:-translate-y-0.5">Экспертиза</a>
          <a href="#projects" data-interactive="true" className="opacity-60 hover:opacity-100 hover:text-white transition-all transform hover:-translate-y-0.5">Работы</a>
          <a href="#stack" data-interactive="true" className="opacity-60 hover:opacity-100 hover:text-white transition-all transform hover:-translate-y-0.5">Стек</a>
        </div>
      </nav>

      {/* Mobile HUD (Bottom Navigation) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        className="fixed bottom-6 left-4 right-4 z-50 sm:hidden pointer-events-auto"
      >
        <div className="bg-[#050505]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-2 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          <a href="#expertise" className="flex-1 flex flex-col items-center justify-center p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-2xl transition-all">
             <Cpu className="w-5 h-5 mb-1" />
             <span className="text-[9px] uppercase tracking-widest font-mono">Опыт</span>
          </a>
          <a href="#projects" className="flex-1 flex flex-col items-center justify-center p-3 text-white/90 hover:bg-white/10 rounded-2xl transition-all relative">
             <div className="absolute inset-0 bg-orange-500/10 rounded-2xl blur-md" />
             <Rocket className="w-5 h-5 mb-1 text-orange-400" />
             <span className="text-[9px] uppercase tracking-widest font-mono text-orange-400 font-bold">Прод</span>
          </a>
          <a href="#stack" className="flex-1 flex flex-col items-center justify-center p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-2xl transition-all">
             <Code2 className="w-5 h-5 mb-1" />
             <span className="text-[9px] uppercase tracking-widest font-mono">Стек</span>
          </a>
        </div>
      </motion.div>

      <main className="flex flex-col items-center relative z-10 w-full">
        <Hero />
        <ExpertiseSection />
        <ManifestoSection />
        <ProjectsSection />
        <MetricsTicker />
        <StackSection />
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
