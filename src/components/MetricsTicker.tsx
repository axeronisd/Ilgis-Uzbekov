import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

const metrics = [
  { label: 'АВТОНОМНЫЕ АГЕНТЫ В СЕТИ', value: '14' },
  { label: 'УСТРАНЕНО ЧАСОВ РУТИНЫ / МЕС', value: '45.000+' },
  { label: 'ОБРАБОТАНО API ЗАПРОСОВ', value: '120M+' },
  { label: 'NPS СИСТЕМ (UPTIME 99.9%)', value: '98%' },
];

export default function MetricsTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 60 });
  const xTransform = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const yTransform = useTransform(smoothProgress, [0, 1], [100, -100]);

  return (
    <motion.section 
      ref={ref}
      style={{ y: yTransform }}
      className="py-32 w-full overflow-hidden bg-[#050505] relative z-20 border-y border-white/5 shadow-2xl"
    >
      <div className="absolute inset-0 bg-white/5 opacity-50 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      <div className="flex w-[200vw]">
        <motion.div 
          style={{ x: xTransform }} 
          className="flex whitespace-nowrap items-center gap-16 md:gap-32 px-10"
        >
          {/* We duplicate the metrics array to ensure a seamless infinite-scroll-like feel */}
          {[...metrics, ...metrics, ...metrics].map((m, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-16">
              <div className="flex flex-col">
                <span className="text-5xl md:text-8xl font-black font-mono text-white tracking-tighter drop-shadow-xl">{m.value}</span>
                <span className="text-sm md:text-base font-bold tracking-[0.2em] font-mono text-orange-500 uppercase mt-4">{m.label}</span>
              </div>
              <div className="w-16 h-2 bg-orange-500/50 rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
