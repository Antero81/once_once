/**
 * Hero Design Configuration
 * Change this value to switch between different hero designs
 *
 * Available options:
 * - 'v1': Video background with overlay (current design)
 * - 'v2': Minimal design with gradient and static image
 */
export const HERO_DESIGN = 'v1' as const;

export type HeroDesignType = typeof HERO_DESIGN;
