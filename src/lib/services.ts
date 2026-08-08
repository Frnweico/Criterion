export type Service = {
  id: string;
  /** Displayed index, e.g. "01". */
  index: string;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    id: "real-estate",
    index: "01",
    title: "Real Estate",
    description:
      "Development of homes built with clarity and long-term intent.",
  },
  {
    id: "investment",
    index: "02",
    title: "Investment",
    description:
      "Property opportunities selected for sustainable growth and lasting value.",
  },
  {
    id: "infrastructure",
    index: "03",
    title: "Infrastructure",
    description:
      "Infrastructure designed to support communities and lasting development.",
  },
  {
    id: "advisory",
    index: "04",
    title: "Advisory",
    description:
      "Expert guidance for informed property and investment decisions.",
  },
];
