export type MediaType = 'image' | 'video';

export interface GalleryMediaItem {
  type: MediaType;
  src: string;
  alt?: string;
  caption?: string;
  poster?: string;
}

export interface JourneyGallery {
  journeyId: string;
  items: GalleryMediaItem[];
}
