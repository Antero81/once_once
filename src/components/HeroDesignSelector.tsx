import { motion } from 'framer-motion';
import { HeroDesignType } from '../hooks/useHeroDesign';

interface HeroDesignSelectorProps {
  currentDesign: HeroDesignType;
  onDesignChange: (design: HeroDesignType) => void;
  className?: string;
}

export const HeroDesignSelector = ({
  currentDesign,
  onDesignChange,
  className = 'fixed bottom-8 left-8 z-40',
}: HeroDesignSelectorProps) => {
  const designs: { value: HeroDesignType; label: string; description: string }[] = [
    {
      value: 'v1',
      label: 'Video',
      description: 'Dynamic video background',
    },
    {
      value: 'v2',
      label: 'Minimal',
      description: 'Elegant gradient design',
    },
  ];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex flex-col gap-2 bg-[#0a0a0a]/95 backdrop-blur-md border border-[#C5A059]/30 rounded-lg p-4">
        <p className="text-[#C5A059] text-[10px] uppercase tracking-widest font-bold">Hero Design</p>
        <div className="flex flex-col gap-2">
          {designs.map((design) => (
            <button
              key={design.value}
              onClick={() => onDesignChange(design.value)}
              className={`px-3 py-2 rounded text-left transition-all text-[10px] uppercase tracking-widest font-bold ${
                currentDesign === design.value
                  ? 'bg-[#C5A059] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <div className="flex flex-col">
                <span>{design.label}</span>
                <span className="text-[8px] font-normal normal-case opacity-75">{design.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
