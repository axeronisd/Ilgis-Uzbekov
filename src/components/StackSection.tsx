import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Terminal, Database, Server, Globe, Braces, Smartphone, Infinity } from 'lucide-react';
import { useRef } from 'react';

const techStack = [
  { name: 'Flutter & Dart', icon: Smartphone, description: 'Кроссплатформа' },
  { name: 'Python', icon: Terminal, description: 'ИИ & Скрипты' },
  { name: 'React & Next.js', icon: Globe, description: 'Мощные UI' },
  { name: 'TypeScript', icon: Braces, description: 'Надежная логика' },
  { name: 'PostgreSQL', icon: Database, description: 'Архитектура данных' },
  { name: 'Firebase', icon: Server, description: 'BaaS & Realtime' },
];

function StackCard({ tech, index }: { tech: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="glass-card glow-border p-6 flex flex-col items-center justify-center text-center gap-4 group shadow-xl relative overflow-hidden h-full border border-white/5 hover:border-white/20 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="w-14 h-14 rounded-full bg-[#0a0a0a] flex items-center justify-center border border-white/10 shadow-inner group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:border-white/30 transition-all duration-500 relative z-10 group-hover:-translate-y-2">
        <tech.icon className="w-6 h-6 text-white/40 group-hover:text-white transition-colors duration-500" />
      </div>
      <div className="mt-2 text-center relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
        <h4 className="font-mono text-sm tracking-widest mb-2 opacity-80 text-white">{tech.name}</h4>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors">{tech.description}</p>
      </div>
    </motion.div>
  );
}

export default function StackSection() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto relative z-10 w-full" id="stack">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-orange-400 mb-2 font-mono">Технологический Стек</div>
        <div className="h-px w-12 bg-orange-400/50 mt-4 mb-4" />
        <h2 className="text-3xl md:text-5xl font-light tracking-tight opacity-90">Арсенал инженера</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ perspective: "1000px" }}>
        {techStack.map((tech, i) => (
          <StackCard key={tech.name} tech={tech} index={i} />
        ))}
        
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="col-span-2 md:col-span-3 glass-card glow-border p-6 mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center cursor-pointer group shadow-2xl"
            data-interactive="true"
        >
          <div className="w-[40px] h-[40px] bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Infinity className="text-white/60 w-5 h-5 group-hover:text-white transition-colors" />
          </div>
          <div className="text-[10px] tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity mt-2 sm:mt-0 font-mono">
              Инженерный майндсет — адаптируюсь под любой инструмент и инфраструктуру
          </div>
        </motion.div>
      </div>
    </section>
  );
}
