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
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-card p-6 sm:p-10 md:p-14 relative overflow-hidden group rounded-[2rem] shadow-2xl border border-white/5 hover:border-white/20 transition-all duration-500`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-all duration-700 -z-10`} />
      
      <div className="relative z-10 flex flex-col h-full transform-gpu transition-transform duration-500 group-hover:-translate-y-2">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 md:mb-8 shadow-xl group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 ease-out relative">
           <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white/60 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
        </div>
        
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight mb-4 md:mb-6 text-white/90 group-hover:text-white transition-colors duration-500">{item.title}</h3>
        
        <p className="text-white/50 leading-relaxed font-light mt-auto text-sm sm:text-base md:text-lg transition-colors duration-500 group-hover:text-white/80">
          {item.desc}
        </p>
      </div>
      
      <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-20 font-mono text-base md:text-xl text-white group-hover:opacity-50 transition-opacity duration-500">
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
