import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Bot, LineChart, Code2, Cpu } from 'lucide-react';
import { useRef } from 'react';

const expertises = [
  {
    icon: Bot,
    title: 'AI Агенты & LLM',
    desc: 'Создаю цифровых сотрудников, которые ведут переписку, анализируют данные и принимают автономные решения 24/7.',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    icon: LineChart,
    title: 'CRM / ERP / Учет',
    desc: 'Проектирую сложные финансовые, складские и POS системы. Полный контроль потоков без участия посредников.',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Cpu,
    title: 'Автоматизация',
    desc: 'Бесшовная интеграция всего со всем. Боты, вебхуки, парсеры и скрипты для тотального уничтожения рутины.',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    icon: Code2,
    title: 'Продукт с Нуля',
    desc: 'От идеи и архитектуры до первого миллиона запросов в секунду. Фулстек решения на современных технологичных стеках.',
    color: 'from-neutral-500/20 to-zinc-500/20',
  }
];

function ExpertiseCard({ item, i }: { item: any; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 50 });
  const opacity = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [150, 0, 0, -100]);
  const scale = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0.8, 1, 1, 0.9]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [i % 2 === 0 ? 15 : -15, 0, i % 2 === 0 ? -15 : 15]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        y: y,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d"
      }}
      className={`glass-card p-6 sm:p-10 md:p-14 relative overflow-hidden group border border-white/10 rounded-[2rem] shadow-2xl`}
    >
      {/* Scroll driven persistent glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl -z-10`} />
      
      <div className="relative z-10 flex flex-col h-full transform-gpu" style={{ transform: "translateZ(30px)" }}>
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 md:mb-8 shadow-xl group-hover:scale-110 group-hover:bg-white/10 group-hover:rotate-6 transition-all duration-500 ease-out">
           <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white/90 group-hover:text-white transition-colors" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight mb-4 md:mb-6 text-white drop-shadow-md group-hover:translate-x-2 transition-transform duration-500">{item.title}</h3>
        <p className="text-white/80 leading-relaxed font-light mt-auto text-sm sm:text-base md:text-lg backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/5 group-hover:border-white/20 transition-colors duration-500 shadow-xl">
          {item.desc}
        </p>
      </div>
      
      {/* Corner Decorative Element */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-40 font-mono text-base md:text-lg text-white">
         {String(i + 1).padStart(2, '0')}
      </div>
    </motion.div>
  );
}

export default function ExpertiseSection() {
  return (
    <section className="py-32 px-6 max-w-6xl mx-auto relative z-10 w-full" id="expertise">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-orange-400 mb-6 font-mono font-bold">Экспертиза</div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tight max-w-2xl leading-tight opacity-90 drop-shadow-lg">
            Освобождаю бизнес <br/>от рутины.
          </h2>
        </div>
        <p className="text-white/60 max-w-md text-lg md:text-xl font-light leading-relaxed">
          Проектирую системы с абсолютной автономностью. Бизнес работает сам, вы — масштабируете прибыль.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: "2000px" }}>
        {expertises.map((item, i) => (
          <ExpertiseCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}
