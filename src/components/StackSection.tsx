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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 50 });

  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -30]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);
  
  // Parallax for inner content
  const iconZ = useTransform(smoothProgress, [0, 0.5, 1], [0, 50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        rotateX, 
        scale, 
        opacity, 
        y, 
        transformPerspective: 1000,
        transformStyle: "preserve-3d" 
      }}
      className="bg-black border border-white/20 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center gap-6 group shadow-2xl"
    >
      <motion.div 
        className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-orange-500 transition-colors duration-300 shadow-xl"
        style={{ z: iconZ }}
      >
        <tech.icon className="w-10 h-10 text-white group-hover:text-black transition-colors" />
      </motion.div>
      <motion.div style={{ z: iconZ }} className="mt-2 text-center">
        <h4 className="font-mono text-xl md:text-2xl font-bold tracking-wider mb-3 text-white">{tech.name}</h4>
        <p className="text-sm font-medium uppercase tracking-widest text-white/70">{tech.description}</p>
      </motion.div>
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
        {techStack.map((tech, i) => (
          <StackCard key={tech.name} tech={tech} index={i} />
        ))}
        
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="col-span-2 md:col-span-3 bg-[#0a0a0a] border border-white/20 p-8 mt-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-center cursor-pointer group shadow-2xl rounded-[2rem]"
            data-interactive="true"
        >
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <Infinity className="text-white w-8 h-8 group-hover:text-black transition-colors" strokeWidth={2} />
          </div>
          <div className="text-sm md:text-base font-bold tracking-widest uppercase text-white/80 group-hover:text-white transition-opacity mt-4 sm:mt-0 font-mono">
              Инженерный майндсет — адаптируюсь под любой инструмент и инфраструктуру
          </div>
        </motion.div>
      </div>
    </section>
  );
}
