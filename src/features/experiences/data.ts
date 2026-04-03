export interface ExperienceData {
  slug: string;
  id: "down-to-earth" | "experience-design" | "once-once-hubs";
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  targetKey: string;
  image: string;
  icon: string;
}

export const experiences: ExperienceData[] = [
  {
    slug: "down-to-earth",
    id: "down-to-earth",
    titleKey: "services.items.0.title",
    subtitleKey: "services.items.0.subtitle",
    descriptionKey: "services.items.0.desc",
    targetKey: "services.items.0.target",
    image: "/assets/img/7X0A1092.jpeg",
    icon: "map",
  },
  {
    slug: "experience-design",
    id: "experience-design",
    titleKey: "services.items.1.title",
    subtitleKey: "services.items.1.subtitle",
    descriptionKey: "services.items.1.desc",
    targetKey: "services.items.1.target",
    image: "/assets/img/Captura de pantalla 2022-07-19 a la(s) 11.00.00 p. m..png",
    icon: "building",
  },
  {
    slug: "once-once-hubs",
    id: "once-once-hubs",
    titleKey: "services.items.2.title",
    subtitleKey: "services.items.2.subtitle",
    descriptionKey: "services.items.2.desc",
    targetKey: "services.items.2.target",
    image: "/assets/img/Captura de pantalla 2022-07-19 a la(s) 10.57.56 p. m..png",
    icon: "globe",
  },
];

export const getExperienceBySlug = (slug: string) => {
  return experiences.find((exp) => exp.slug === slug);
};
