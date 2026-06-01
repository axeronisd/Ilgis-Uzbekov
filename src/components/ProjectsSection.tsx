import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

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

function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 45, mass: 1 });
  
  // Dramatic cinematic entrance and exit
  const scaleProgress = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.7, 1, 1, 0.7]);
  const opacityProgress = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const yOffset = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [250, 0, 0, -250]);
  const zOffset = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [-500, 0, 0, -500]);
  const rotateX = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [30, 0, 0, -20]);
  
  // Intense parallax on the internal elements
  const imageScale = useTransform(smoothProgress, [0, 1], [1.3, 1]);
  const imageY = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);
  const textTranslateY = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);
  const textTranslateZ = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [-100, 100, 100, -100]);
  
  // Transition from grayscale to color exactly when coming into clear view
  const imageFilter = useTransform(smoothProgress, [0.35, 0.55], ["grayscale(100%)", "grayscale(0%)"]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
        y: yOffset,
        z: zOffset,
        rotateX,
        transformPerspective: 2000,
        transformStyle: "preserve-3d"
      }}
      className="glass-card mb-24 md:mb-40 w-full relative overflow-hidden group rounded-[2rem] shadow-2xl will-change-transform"
    >
      {/* Background Image with intense Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-50 flex items-center justify-center bg-black" style={{ transform: "translateZ(-1px)" }}>
        <motion.img 
          style={{ y: imageY, scale: imageScale, filter: imageFilter }}
          src={project.image} 
          alt={project.title}
          className="w-[120%] h-[160%] object-cover object-center absolute top-[-30%] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/20 z-10" />
      </div>

      <motion.div style={{ z: textTranslateZ, y: textTranslateY, transformStyle: "preserve-3d" }} className="p-6 sm:p-10 md:p-16 relative z-10 min-h-[400px] md:min-h-[500px] flex flex-col justify-end">
        <motion.div style={{ z: useTransform(smoothProgress, [0, 1], [0, 200]) }} className="absolute top-0 right-0 p-4 md:p-8 text-[80px] md:text-[200px] font-black leading-none text-white/[0.04] pointer-events-none font-mono tracking-tighter">
          0{index + 1}
        </motion.div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
          <div className="max-w-2xl" style={{ transformStyle: "preserve-3d" }}>
            <motion.div style={{ z: useTransform(smoothProgress, [0, 1], [0, 80]) }} className="tag mb-6 md:mb-8 text-white/90 bg-white/10 backdrop-blur-md border-white/30 tracking-widest px-3 md:px-4 py-1 md:py-1.5 shadow-xl text-[10px] md:text-xs">{project.year} // ПРОД</motion.div>
            <motion.h3 style={{ z: useTransform(smoothProgress, [0, 1], [0, 120]) }} className="kinetic-text text-4xl sm:text-5xl md:text-8xl tracking-[-0.05em] mb-4 md:mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">{project.title}</motion.h3>
            <motion.p style={{ z: useTransform(smoothProgress, [0, 1], [0, 60]) }} className="text-white/90 text-sm sm:text-base md:text-xl leading-relaxed font-light mb-6 md:mb-0 max-w-xl backdrop-blur-md bg-[#050505]/60 p-4 md:p-6 rounded-2xl border border-white/10 shadow-xl mix-blend-plus-lighter">
              {project.description}
            </motion.p>
          </div>
          
          <motion.div style={{ z: useTransform(smoothProgress, [0, 1], [0, 90]) }} className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-0 max-w-full md:max-w-[200px]">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-[9px] md:text-[10px] uppercase tracking-widest py-1.5 md:py-2 px-3 md:px-5 border border-white/20 rounded-full bg-[#050505]/80 backdrop-blur-xl text-white/90 shadow-lg">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto relative z-10 w-full flex flex-col items-center" id="projects">
      <motion.div 
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-32 flex flex-col items-center text-center"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-orange-400 mb-2 font-mono">Избранные Решения</div>
        <div className="h-px w-12 bg-orange-400/50 mt-4 mb-4" />
        <h2 className="text-4xl md:text-6xl font-light tracking-tight opacity-90 drop-shadow-lg">Бизнес-инструменты</h2>
      </motion.div>

      <div className="w-full">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-12 text-white/50 tracking-widest text-xs uppercase font-mono bg-white/5 py-6 px-4 rounded-xl border border-white/10 backdrop-blur-md shadow-lg"
        >
          + Десятки микросервисов и закрытых утилит под NDA
        </motion.div>
      </div>
    </section>
  );
}
