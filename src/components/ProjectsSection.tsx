import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'motion/react';
import { useRef, MouseEvent } from 'react';

const projects = [
  {
    title: 'MicroFunnel',
    description: 'Автономные ИИ-агенты и цифровые сотрудники в Telegram. Полная автоматизация рутины и сложных бизнес-процессов с использованием LLM.',
    year: '2026',
    tags: ['Python', 'AI/LLM', 'Telegram API'],
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'TakEsep',
    description: 'POS-система с детальной аналитикой и управлением под ключ. Облачная ERP для современного бизнеса.',
    year: '2026',
    tags: ['Flutter', 'Next.js', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'MobiCredit',
    description: 'Бухгалтерия и управление рассрочками без участия банков. Удобный контроль потоков, задолженностей и скоринга.',
    year: '2025',
    tags: ['React', 'TypeScript', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'AkJol',
    description: 'Платформа доставки последней мили от магазинов до двери клиента. Умная маршрутизация и гео-трекинг.',
    year: '2025',
    tags: ['Dart', 'Postgres', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'BilimAI',
    description: 'Система обучения нового поколения. ИИ-ассистент учителя для персонализации образования и автоматизации проверки.',
    year: '2026',
    tags: ['AI/LLM', 'React', 'Python'],
    image: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=1000'
  }
];

function ProjectCard({ project, index, totalItems, progress }: { project: any, index: number, totalItems: number, progress: any }) {
  const step = 1 / (totalItems - 1);
  const center = index * step;

  // Visual responses to scroll position (active state)
  const scale = useTransform(progress, [center - step, center, center + step], [0.85, 1, 0.85]);
  const opacity = useTransform(progress, [center - step, center, center + step], [0.3, 1, 0.3]);
  const grayscaleRaw = useTransform(progress, [center - step, center, center + step], [1, 0, 1]);
  const filter = useMotionTemplate`grayscale(${grayscaleRaw})`;
  const imageScale = useTransform(progress, [center - step, center, center + step], [1.2, 1, 1.2]);

  // Mouse hover spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{ scale, opacity }}
      onMouseMove={handleMouseMove}
      className="w-[85vw] md:w-[60vw] h-[75vh] shrink-0 glass-card relative overflow-hidden group border border-white/10 rounded-[2rem] shadow-2xl cursor-pointer"
    >
      {/* Mouse spotlight glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100 mix-blend-screen z-20"
        style={{
          background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(255,100,50,0.15), transparent 40%)`,
        }}
      />

      {/* Background Image with intense Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black flex items-center justify-center">
        <motion.img 
          style={{ scale: imageScale, filter }}
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover object-center absolute mix-blend-screen opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/20 z-10" />
      </div>

      <div className="p-8 md:p-14 relative z-10 h-full flex flex-col justify-end pointer-events-none">
        <div className="absolute top-0 right-0 p-8 text-[120px] md:text-[200px] font-black leading-none text-white/[0.04] font-mono">
          0{index + 1}
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
          <div className="max-w-2xl">
            <div className="tag mb-6 text-white/90 bg-white/10 backdrop-blur-md border-white/30 tracking-widest px-4 py-1.5 shadow-xl">{project.year} // ПРОД</div>
            <h3 className="kinetic-text text-5xl md:text-8xl tracking-[-0.05em] mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">{project.title}</h3>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light md:mb-0 max-w-xl backdrop-blur-md bg-[#050505]/60 p-6 rounded-2xl border border-white/10 shadow-xl mix-blend-plus-lighter">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 max-w-[200px]">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-[10px] uppercase tracking-widest py-2 px-4 border border-white/20 rounded-full bg-[#050505]/80 backdrop-blur-xl text-white/90 shadow-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 45, mass: 1 });
  
  const totalItems = 6;
  const x = useTransform(smoothProgress, [0, 1], ["5vw", "-470vw"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050505] w-full" id="projects">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden w-full">
        <div className="absolute top-10 md:top-20 left-10 md:left-20 z-20 pointer-events-none">
           <div className="text-[10px] uppercase tracking-[0.3em] text-orange-400 mb-2 font-mono">Избранные Решения</div>
           <div className="h-px w-12 bg-orange-400/50 mt-4 mb-4" />
           <h2 className="text-4xl md:text-6xl font-light tracking-tight opacity-90 drop-shadow-lg">Кейсы & Работы</h2>
        </div>

        <motion.div style={{ x }} className="flex gap-[10vw] px-[10vw] items-center pt-20 relative z-10 w-fit">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} totalItems={totalItems} progress={smoothProgress} />
          ))}
          
          <motion.div 
            style={{
               scale: useTransform(smoothProgress, [1 - 2/(totalItems-1), 1], [0.85, 1]),
               opacity: useTransform(smoothProgress, [1 - 2/(totalItems-1), 1], [0.3, 1])
            }}
            className="w-[85vw] md:w-[60vw] h-[75vh] shrink-0 flex items-center justify-center glass-card rounded-[2rem] border border-white/10 p-10 bg-gradient-to-br from-[#0a0a0a] to-[#010101]"
          >
            <div className="text-center text-white/50 tracking-widest text-lg uppercase font-mono border border-white/5 bg-white/5 p-10 rounded-2xl shadow-xl backdrop-blur-md">
              <div className="w-10 h-10 rounded-full border border-orange-500/30 text-orange-500 flex items-center justify-center mb-6 mx-auto animate-pulse">
                 i
              </div>
              + Десятки микросервисов<br/>и скрытых утилит под NDA
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
