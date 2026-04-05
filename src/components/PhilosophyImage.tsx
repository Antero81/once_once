import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';

interface PhilosophyImageProps {
  imageUrl: string;
  quote: string;
}

export const PhilosophyImage = ({ imageUrl, quote }: PhilosophyImageProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animar de grayscale(100%) a grayscale(0%)
  const grayscaleValue = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const brightnessValue = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
  const filterStyle = useMotionTemplate`grayscale(${grayscaleValue}%) brightness(${brightnessValue})`;

  return (
    <div ref={ref} className="relative">
      <motion.img
        src={imageUrl}
        style={{
          filter: filterStyle
        }}
        className="w-full h-[700px] object-cover"
        alt="Strategy"
      />
      <div className="absolute -bottom-8 -left-8 bg-[#C5A059] p-10 text-black max-w-sm font-serif italic text-2xl shadow-2xl hidden xl:block">
        "{quote}"
      </div>
    </div>
  );
};
