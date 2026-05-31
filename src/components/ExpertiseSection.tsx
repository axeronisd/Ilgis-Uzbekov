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

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [100, 0, 0, -50]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
      }}
      className={`bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-10 md:p-14 relative overflow-hidden group`}
    >
      {/* Decorative Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-60 transition-opacity duration-500 -z-10`} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-xl group-hover:bg-white/10 transition-colors duration-300">
           <item.icon className="w-8 h-8 text-white/90" strokeWidth={1.5} />
        </div>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">{item.title}</h3>
        <p className="text-white/80 font-medium leading-relaxed mt-auto text-xl bg-black/40 p-6 rounded-xl border border-white/5">
          {item.desc}
        </p>
      </div>
      
      {/* Corner Decorative Element */}
      <div className="absolute top-10 right-10 opacity-30 font-mono text-2xl text-white font-bold">
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
          <div className="text-sm md:text-base uppercase tracking-widest text-orange-500 mb-6 font-mono font-bold">Экспертиза</div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl leading-tight text-white">
            Освобождаю бизнес <br/>от рутины.
          </h2>
        </div>
        <p className="text-white/90 max-w-md text-xl md:text-2xl font-medium leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
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
