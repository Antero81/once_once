// Import images directly for proper bundling in production
import posterImg from './assets/img/7X0A1491.JPG';
import philosophySideImg from './assets/img/Switchinggearscabo-TheCape-CCphotoloscabos-62.jpg';
import downToEarthImg from './assets/img/7X0A1157.jpeg';
import experienceDesignImg from './assets/img/DSC_7914-38.jpeg';
import hubsImg from './assets/img/_DSC5511.jpeg';
import methodBgImg from './assets/img/_BP_0415.jpeg';
import logoHorizontalImg from './assets/img/Asset 9-8.png';
import logoVerticalImg from './assets/img/once-once-logo-v-8.png';

export const assets = {
  hero: {
    // Imagen de respaldo si el video falla
    poster: posterImg,
    video: "/assets/temp_video.mp4",
    overlayOpacity: 0.6
  },
  philosophy: {
    sideImage: philosophySideImg,
    signatureQuote: philosophySideImg
  },
  services: {
    // Mapeados por el orden de los niveles de operación
    downToEarth: downToEarthImg,
    experienceDesign: experienceDesignImg,
    hubs: hubsImg
  },
  method: {
    background: methodBgImg
  },
  common: {
    logoHorizontal: logoHorizontalImg,
    logoVertical: logoVerticalImg,
    favicon: "/favicon.ico"
  }
};