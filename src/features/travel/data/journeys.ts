export interface Journey {
  id: string;
  name: string;
  location: string;
  type: 'journeys' | 'riding' | 'explorations' | 'private' | 'editions';
  image: string;
  description: string;
  duration: string;
  priceFrom: string;
  destination: string;
}

export const journeys: Journey[] = [
  {
    id: 'baja-epic',
    name: 'Baja Epic',
    location: 'Baja California Sur',
    type: 'journeys',
    image: '/once_once/assets/img/7X0A1868.JPG',
    description: 'An epic journey across Baja\'s desert and coastal landscapes.',
    duration: '7 days',
    priceFrom: 'From $3,500',
    destination: 'Baja Sur',
  },
  {
    id: 'cabo-explorer',
    name: 'Cabo Explorer',
    location: 'Los Cabos',
    type: 'riding',
    image: '/once_once/assets/img/DSC_4213.jpeg',
    description: 'Explore Cabo\'s coastal trails and desert terrain.',
    duration: '5 days',
    priceFrom: 'From $2,800',
    destination: 'Los Cabos',
  },
  {
    id: 'sierra-madre',
    name: 'Sierra Madre',
    location: 'Durango',
    type: 'journeys',
    image: '/once_once/assets/img/_DSC5511.jpeg',
    description: 'Deep mountain riding through Mexico\'s most scenic highlands.',
    duration: '6 days',
    priceFrom: 'From $3,200',
    destination: 'Durango',
  },
  {
    id: 'baja-desert-crossing',
    name: 'Baja Desert Crossing',
    location: 'Baja California',
    type: 'riding',
    image: '/once_once/assets/img/DSC_7914-38.jpeg',
    description: 'Challenge yourself in Baja\'s remote desert crossing.',
    duration: '4 days',
    priceFrom: 'From $2,100',
    destination: 'Baja Sur',
  },
  {
    id: 'valle-escape',
    name: 'Valle Escape',
    location: 'Valle de Guadalupe',
    type: 'explorations',
    image: '/once_once/assets/img/DSC05054.jpeg',
    description: 'Wine country cycling and cultural immersion.',
    duration: '3 days',
    priceFrom: 'From $1,800',
    destination: 'Valle de Guadalupe',
  },
  {
    id: 'private-journey',
    name: 'Private Journey',
    location: 'Custom',
    type: 'private',
    image: '/once_once/assets/img/DSC_1770.jpeg',
    description: 'Design your own journey tailored to your pace and interests.',
    duration: 'Custom',
    priceFrom: 'Custom pricing',
    destination: 'Any',
  },
  {
    id: 'oaxaca-roots',
    name: 'Oaxaca Roots',
    location: 'Oaxaca',
    type: 'journeys',
    image: '/once_once/assets/img/DSC05823.jpeg',
    description: 'Connect with Oaxaca\'s rich culture and mountain trails.',
    duration: '5 days',
    priceFrom: 'From $2,600',
    destination: 'Oaxaca',
  },
  {
    id: 'cdmx-urban-ride',
    name: 'CDMX Urban Ride',
    location: 'Mexico City',
    type: 'riding',
    image: '/once_once/assets/img/DSC_4141.jpeg',
    description: 'Urban cycling through Mexico City\'s vibrant neighborhoods.',
    duration: '2 days',
    priceFrom: 'From $900',
    destination: 'CDMX',
  },
  {
    id: 'jalisco-coastal',
    name: 'Jalisco Coastal',
    location: 'Puerto Vallarta',
    type: 'explorations',
    image: '/once_once/assets/img/DSC_7447.jpeg',
    description: 'Coastal trails and colonial towns along the Pacific.',
    duration: '4 days',
    priceFrom: 'From $2,200',
    destination: 'Jalisco',
  },
  {
    id: 'whale-and-desert',
    name: 'Whale & Desert',
    location: 'Baja California Sur',
    type: 'journeys',
    image: '/once_once/assets/img/DSC_8014-83.jpeg',
    description: 'Witness whales and ride through pristine desert.',
    duration: '6 days',
    priceFrom: 'From $3,400',
    destination: 'La Paz',
  },
  {
    id: 'tijuana-to-ensenada',
    name: 'Tijuana to Ensenada',
    location: 'Baja Norte',
    type: 'riding',
    image: '/once_once/assets/img/DSC_7384.jpeg',
    description: 'Coastal ride along the Baja Northern Pacific.',
    duration: '3 days',
    priceFrom: 'From $1,600',
    destination: 'Baja Norte',
  },
  {
    id: 'valle-loop',
    name: 'Valle Loop',
    location: 'Valle de Guadalupe',
    type: 'explorations',
    image: '/once_once/assets/img/DSC_7433.jpeg',
    description: 'Explore Valle de Guadalupe\'s wine trails.',
    duration: '2 days',
    priceFrom: 'From $1,200',
    destination: 'Valle de Guadalupe',
  },
];

export const getJourneyById = (id: string): Journey | undefined => {
  return journeys.find((j) => j.id === id);
};

export const getJourneysByType = (type: Journey['type']): Journey[] => {
  return journeys.filter((j) => j.type === type);
};

export const getJourneysByDestination = (destination: string): Journey[] => {
  return journeys.filter((j) => j.destination === destination);
};

export const getUniqueDestinations = (): string[] => {
  return Array.from(new Set(journeys.map((j) => j.destination))).sort();
};

export const getUniqueTypes = (): Journey['type'][] => {
  return Array.from(new Set(journeys.map((j) => j.type))) as Journey['type'][];
};
