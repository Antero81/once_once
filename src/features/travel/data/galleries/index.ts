export type { JourneyGallery, GalleryMediaItem } from './types';

import { bajaEpicGallery } from './baja-epic';
import { caboExplorerGallery } from './cabo-explorer';
import { sierraMadreGallery } from './sierra-madre';
import { bajaDesertCrossingGallery } from './baja-desert-crossing';
import { valleEscapeGallery } from './valle-escape';
import { privateJourneyGallery } from './private-journey';
import { oaxacaRootsGallery } from './oaxaca-roots';
import { cdmxUrbanRideGallery } from './cdmx-urban-ride';
import { jaliscoCoastalGallery } from './jalisco-coastal';
import { whaleAndDesertGallery } from './whale-and-desert';
import { tijuanaToEnsenadaGallery } from './tijuana-to-ensenada';
import { valleLoopGallery } from './valle-loop';

import type { JourneyGallery } from './types';

export const galleryIndex: Record<string, JourneyGallery> = {
  'baja-epic': bajaEpicGallery,
  'cabo-explorer': caboExplorerGallery,
  'sierra-madre': sierraMadreGallery,
  'baja-desert-crossing': bajaDesertCrossingGallery,
  'valle-escape': valleEscapeGallery,
  'private-journey': privateJourneyGallery,
  'oaxaca-roots': oaxacaRootsGallery,
  'cdmx-urban-ride': cdmxUrbanRideGallery,
  'jalisco-coastal': jaliscoCoastalGallery,
  'whale-and-desert': whaleAndDesertGallery,
  'tijuana-to-ensenada': tijuanaToEnsenadaGallery,
  'valle-loop': valleLoopGallery,
};

export const getGalleryById = (id: string): JourneyGallery | undefined => {
  return galleryIndex[id];
};
