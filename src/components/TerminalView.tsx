import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const SIMULATED_LINES = [
  "> Инициализация защищенной среды...",
  "> Загрузка системных зависимостей [==================] 100%",
  "> Подключение к удаленному кластеру...",
  "> Соединение установлено. Пинг: 12ms",
  "> Получение манифеста сборки...",
  "> Компиляция шейдеров glassmorphism...",
  "> Сборка модулей кинетической типографики...",
  "> Активация магнитных курсоров...",
  "> Проверка целостности систем: 42 пройдено, 0 ошибок",
  "> Системная архитектура успешно скомпилирована.",
  "> Готовность к развертыванию."
];

export default function TerminalView() {
  const [lines, setLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
       if (entries[0].isIntersecting && !isTyping && lines.length === 0) {
          setIsTyping(true);
       }
    }, { threshold: 0.5 });
    
    const termElement = document.getElementById('terminal-view-container');
    if (termElement) observer.observe(termElement);

    return () => observer.disconnect();
  }, [isTyping, lines.length]);

  useEffect(() => {
      if (!isTyping) return;

      let currentLineIndex = 0;
      let activeTimeout: ReturnType<typeof setTimeout>;
      let isMounted = true;
      
      const typeNextLine = () => {
        if (!isMounted) return;
        if (currentLineIndex < SIMULATED_LINES.length) {
           setLines(prev => [...prev, SIMULATED_LINES[currentLineIndex]]);
           currentLineIndex++;
           
           // Variable typing speeds to simulate actual loading
           const nextDelay = currentLineIndex === 2 ? 800 : currentLineIndex === 7 ? 1200 : 200 + Math.random() * 200;
           activeTimeout = setTimeout(typeNextLine, nextDelay);
        } else {
           setIsComplete(true);
        }
      };
      
      activeTimeout = setTimeout(typeNextLine, 500);
      return () => {
          isMounted = false;
          clearTimeout(activeTimeout);
      };
  }, [isTyping]);

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto w-full relative z-10" id="terminal">
      <motion.div 
        id="terminal-view-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card font-mono text-[13px] leading-relaxed max-w-3xl mx-auto w-full relative"
        data-interactive="true"
      >
        {/* Terminal Header */}
        <div className="absolute top-4 right-5 flex gap-2 z-10">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
        
        <div className="text-white/40 mb-2 uppercase tracking-widest text-[9px] px-6 pt-5 pb-2 border-b border-white/5">
          Вывод терминала // Очередь сборки
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8 min-h-[300px]">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={line?.includes("error") || line?.includes("ошибок") ? "text-red-400 opacity-80" : "text-[#a0ff9a] opacity-80"}
            >
              {line}
            </motion.div>
          ))}
          
          {/* Typing indicator / Final prompt */}
          {(isTyping || isComplete) && (
            <div className="flex items-center text-[#a0ff9a] opacity-80 mt-2">
              <span>{'> '}</span>
              {!isComplete && (
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-4 bg-[#a0ff9a] opacity-70 inline-block ml-2 align-middle"
                />
              )}
              {isComplete && (
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-2"
                >
                  _
                </motion.span>
              )}
            </div>
          )}
          
          {!isTyping && lines.length === 0 && (
             <div className="text-white/40 animate-pulse">Ожидание подключения...</div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
