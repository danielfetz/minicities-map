export interface MiniCity {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  website: string;
  description: string;
  ageRange: string;
  since?: number;
}

export const miniCities: MiniCity[] = [
  {
    id: "mini-muenchen",
    name: "Mini-München",
    city: "Munich",
    country: "Germany",
    coordinates: [11.5755, 48.1374],
    website: "https://www.mini-muenchen.info",
    description:
      "The original and largest play city, running every two years since 1979. Children experience a fully functioning city with jobs, economy, politics, and culture over 3 weeks each summer.",
    ageRange: "7–15",
    since: 1979,
  },
  {
    id: "mini-salzburg",
    name: "Mini-Salzburg",
    city: "Salzburg",
    country: "Austria",
    coordinates: [13.0599, 47.7977],
    website: "https://minisalzburg.spektrum.at",
    description:
      "Play city for children modeled after Mini-München. Features professional roles, economics, and cultural activities with up to 1,500 children participating daily.",
    ageRange: "8–14",
    since: 2003,
  },
  {
    id: "fezitty",
    name: "FEZitty",
    city: "Berlin",
    country: "Germany",
    coordinates: [13.5295, 52.4598],
    website: "https://ferienfez.fez-berlin.de",
    description:
      "A capital city built by and for children with 7 different zones including city center, media city, university, and harbor. Features 365 jobs daily and weekly elections.",
    ageRange: "7–14",
  },
  {
    id: "mini-regensburg",
    name: "Mini-Regensburg",
    city: "Regensburg",
    country: "Germany",
    coordinates: [12.1016, 49.0134],
    website: "https://www.miniregensburg.com",
    description:
      "Bi-annual three-week summer program where children work in different jobs, earn play money, and participate in city governance. Attracts 900–1,700 children daily.",
    ageRange: "8–14",
  },
  {
    id: "kinderstadt-hamburg",
    name: "Kinderstadt Hamburg",
    city: "Hamburg",
    country: "Germany",
    coordinates: [9.9937, 53.5411],
    website: "https://kinderstadt.hamburg",
    description:
      "Free two-week holiday program where up to 500 children daily plan, build, and design their own city in HafenCity. No registration required.",
    ageRange: "7–15",
  },
  {
    id: "kinderstadt-magdeburg",
    name: "Kinderstadt Magdeburg",
    city: "Magdeburg",
    country: "Germany",
    coordinates: [11.6276, 52.1205],
    website: "https://ejbm.de",
    description:
      "Children's city program with international volunteer involvement as part of European Solidarity Corps exchanges.",
    ageRange: "7–14",
  },
  {
    id: "minipolisz",
    name: "MiniPolisz",
    city: "Budapest",
    country: "Hungary",
    coordinates: [19.0402, 47.4979],
    website: "https://www.facebook.com/MiniPolisz",
    description:
      "Interactive family playhouse with themed areas including supermarket, dentist, pizza restaurant, florist, tram, and hotel.",
    ageRange: "3–12",
  },
  {
    id: "minipolis-zagreb",
    name: "MiniPolis",
    city: "Zagreb",
    country: "Croatia",
    coordinates: [15.9819, 45.815],
    website: "https://minipolis.hr",
    description:
      "First interactive themed kids park in Croatia with over 50 themed houses simulating a miniature city across 2,000 m².",
    ageRange: "2–12",
  },
  {
    id: "minipolis-doha",
    name: "Minipolis",
    city: "Doha",
    country: "Qatar",
    coordinates: [51.531, 25.2854],
    website: "https://www.facebook.com/MinipolisEntertainment",
    description:
      "Interactive city of fun and entertainment for young children in Doha.",
    ageRange: "2–10",
  },
];
