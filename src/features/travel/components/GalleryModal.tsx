import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { Journey } from '../data/journeys';
import type { JourneyGallery, GalleryMediaItem } from '../data/galleries';

interface GalleryModalProps {
  journey: Journey;
  gallery: JourneyGallery;
  onClose: () => void;
}

export const GalleryModal = ({ journey, gallery, onClose }: GalleryModalProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => Math.max(-1, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => Math.min(gallery.items.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, gallery.items.length]);

  const activeItem = activeIndex >= 0 ? gallery.items[activeIndex] : null;

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(-1, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(gallery.items.length - 1, prev + 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg bg-[#0a0a0a] shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#0a0a0a] border-b border-[#C5A059]/20 px-6 py-6 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl text-white mb-1">{journey.name}</h2>
              <p className="text-[#C5A059] text-sm uppercase tracking-widest">{journey.location}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#C5A059]/10 hover:bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Description */}
          <div className="px-6 py-4 border-b border-[#C5A059]/20">
            <p className="text-gray-400 text-base leading-relaxed">{journey.description}</p>
          </div>

          {/* Thumbnails Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {gallery.items.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative aspect-video rounded-lg overflow-hidden group transition-all ${
                    activeIndex === i ? 'ring-2 ring-[#C5A059]' : ''
                  }`}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.alt || `${journey.name} photo`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <>
                      <video
                        src={item.src}
                        poster={item.poster}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#C5A059] flex items-center justify-center">
                          <Play size={24} className="text-black ml-1" />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
              {activeItem && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="relative rounded-lg overflow-hidden bg-black/50 aspect-video md:aspect-auto md:h-[450px]">
                    {activeItem.type === 'image' ? (
                      <img
                        src={activeItem.src}
                        alt={activeItem.alt || `${journey.name} photo`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <video
                        src={activeItem.src}
                        poster={activeItem.poster}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                      />
                    )}

                    {/* Navigation Arrows */}
                    {activeIndex > -1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#C5A059]/20 hover:bg-[#C5A059]/40 flex items-center justify-center text-[#C5A059] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={activeIndex === 0}
                        >
                          <ChevronLeft size={28} />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#C5A059]/20 hover:bg-[#C5A059]/40 flex items-center justify-center text-[#C5A059] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={activeIndex === gallery.items.length - 1}
                        >
                          <ChevronRight size={28} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Caption and Counter */}
                  <div className="flex items-center justify-between">
                    <p className="text-gray-300 text-sm italic">{activeItem.caption}</p>
                    <p className="text-[#C5A059] text-xs uppercase tracking-widest font-bold">
                      {activeIndex + 1} / {gallery.items.length}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
