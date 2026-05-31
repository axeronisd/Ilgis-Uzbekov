import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useRef, MouseEvent, useState } from 'react';

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
  const threshold = step * 0.8;

  // Faster smoothing just for this card's inner transitions
  const scale = useTransform(progress, [center - threshold, center, center + threshold], [0.9, 1, 0.9]);
  const opacity = useTransform(progress, [center - threshold, center, center + threshold], [0.4, 1, 0.4]);
  const colorIntensity = useTransform(progress, [center - threshold, center, center + threshold], [1, 0, 1]); // 1 = grayscale, 0 = color

  return (
    <motion.div
      style={{ scale, opacity }}
      className="w-[90vw] md:w-[70vw] h-[75vh] shrink-0 relative overflow-hidden rounded-[2rem] border border-white/20 bg-black shadow-2xl flex flex-col"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={project.image} 
          alt={project.title}
          style={{ filter: useTransform(colorIntensity, c => `grayscale(${c * 100}%) brightness(${1 - (c * 0.4)})`) }}
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="p-8 md:p-16 relative z-10 h-full flex flex-col justify-end">
        <div className="absolute top-8 right-8 text-7xl md:text-9xl font-black text-white/10 font-mono pointer-events-none">
          0{index + 1}
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
          <div className="max-w-3xl">
            <div className="inline-block bg-orange-500 text-black font-bold tracking-widest uppercase text-xs px-4 py-2 mb-6 rounded-full">
              {project.year} // ПРОДАКШЕН
            </div>
            <h3 className="kinetic-text text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              {project.title}
            </h3>
            <p className="text-white text-xl md:text-2xl leading-relaxed font-medium md:mb-0 max-w-2xl bg-black/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-8 md:mt-0 max-w-[250px] justify-start md:justify-end">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-xs uppercase tracking-wider font-bold py-2 px-5 border border-white/30 rounded-full bg-black/80 text-white shadow-lg">
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
  // Light spring so horizontal scroll tracks well without jitter
  const smoothProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 100, mass: 0.5 });
  
  const totalItems = 6;
  const x = useTransform(smoothProgress, [0, 1], ["5vw", "-450vw"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050505] w-full" id="projects">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden w-full bg-[#050505]">
        <div className="absolute top-10 md:top-20 left-10 md:left-20 z-20">
           <div className="text-xs uppercase tracking-[0.3em] text-orange-500 font-bold mb-2 font-mono">Избранные Решения</div>
           <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2">Кейсы & Работы</h2>
        </div>

        <motion.div style={{ x }} className="flex gap-[5vw] px-[10vw] items-center pt-20 relative z-10 w-fit">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} totalItems={totalItems} progress={smoothProgress} />
          ))}
          
          <motion.div 
            style={{
               scale: useTransform(smoothProgress, [1 - 2/(totalItems-1), 1], [0.85, 1]),
               opacity: useTransform(smoothProgress, [1 - 2/(totalItems-1), 1], [0.3, 1])
            }}
            className="w-[90vw] md:w-[70vw] h-[75vh] shrink-0 flex items-center justify-center rounded-[2rem] border border-white/20 p-10 bg-[#0a0a0a]"
          >
            <div className="text-center text-white/70 text-2xl font-medium uppercase font-mono max-w-2xl border border-white/10 p-16 rounded-3xl bg-black">
              <div className="w-16 h-16 rounded-full border-2 border-orange-500 text-orange-500 flex items-center justify-center mb-8 mx-auto animate-pulse text-2xl">
                 !
              </div>
              Плюс десятки закрытых микросервисов, утилит и архитектурных решений под NDA.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
