import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const SIMULATED_LINES = [
  "root@uzbekov-arch:~# ./init_core.sh",
  " [ OK ] INITIATING SECURE ENCLAVE...",
  " [ OK ] MOUNTING GLOBAL STATE [==================] 100%",
  " [INFO] ESTABLISHING WSS:// CONNECTION TO CLUSTER",
  " [INFO] PING: 4ms | JITTER: 0.2ms",
  " [ OK ] NEURAL ROUTING READY",
  " [WARN] OVERRIDING DEFAULT PROTOCOLS",
  " [ OK ] DEPLOYING AUTONOMOUS AGENTS...",
  " [INFO] SYSTEM INTEGRITY: CHECKSUM VERIFIED (SHA-256)",
  " [ OK ] CORE ARCHITECTURE ONLINE. SYSTEM STANDBY."
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
    <section className="py-24 px-6 max-w-4xl mx-auto w-full relative z-10" id="terminal">
      <motion.div 
        id="terminal-view-container"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#030303] border border-[#222] shadow-[0_20px_60px_rgba(0,0,0,0.9)] font-mono text-[13px] md:text-[14px] leading-relaxed max-w-3xl mx-auto w-full relative rounded-xl overflow-hidden"
        data-interactive="true"
      >
        {/* Terminal Header */}
        <div className="bg-[#111] border-b border-[#222] px-4 py-3 flex items-center justify-between z-10 sticky top-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-[#666] text-[10px] tracking-widest uppercase font-bold flex-1 text-center pr-8">
            uzbekov@core-system:~
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8 min-h-[350px] bg-[#050505]">
          {lines.map((line, i) => {
            const isCommand = line?.includes("#");
            const isWarn = line?.includes("[WARN]");
            const isInfo = line?.includes("[INFO]");
            let textColor = "text-[#00ff41]";
            if (isCommand) textColor = "text-white font-bold";
            else if (isWarn) textColor = "text-[#ffbd2e]";
            else if (isInfo) textColor = "text-[#00b8ff]";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${textColor} mb-1.5 opacity-90 drop-shadow-[0_0_3px_currentColor]`}
              >
                {line}
              </motion.div>
            );
          })}
          
          {/* Typing indicator / Final prompt */}
          {(isTyping || isComplete) && (
            <div className="flex items-center text-[#00ff41] mt-4 opacity-90 font-bold drop-shadow-[0_0_3px_rgba(0,255,65,0.8)]">
              <span>root@uzbekov-arch:~# </span>
              {!isComplete && (
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2.5 h-4 md:h-5 bg-[#00ff41] inline-block ml-2 align-middle shadow-[0_0_8px_#00ff41]"
                />
              )}
              {isComplete && (
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2.5 h-4 md:h-5 bg-[#00ff41] inline-block ml-2 align-middle shadow-[0_0_8px_#00ff41]"
                />
              )}
            </div>
          )}
          
          {!isTyping && lines.length === 0 && (
             <div className="text-white/30 animate-pulse font-bold tracking-widest text-xs mt-2">ОЖИДАНИЕ СИСТЕМЫ...</div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
