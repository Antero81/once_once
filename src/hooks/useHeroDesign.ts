import { useState, useEffect } from 'react';

export type HeroDesignType = 'v1' | 'v2';

const STORAGE_KEY = 'hero_design_preference';
const DEFAULT_DESIGN: HeroDesignType = 'v1';

export const useHeroDesign = () => {
  const [design, setDesign] = useState<HeroDesignType>(DEFAULT_DESIGN);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load design preference from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'v1' || stored === 'v2') {
        setDesign(stored);
      }
    } catch (error) {
      console.error('[HERO_DESIGN_ERROR]', error);
    }
    setIsLoaded(true);
  }, []);

  // Save design preference to localStorage
  const changeDesign = (newDesign: HeroDesignType) => {
    try {
      setDesign(newDesign);
      localStorage.setItem(STORAGE_KEY, newDesign);
    } catch (error) {
      console.error('[HERO_DESIGN_STORAGE_ERROR]', error);
    }
  };

  // Reset to default
  const resetDesign = () => {
    changeDesign(DEFAULT_DESIGN);
  };

  return {
    design,
    changeDesign,
    resetDesign,
    isLoaded,
  };
};
