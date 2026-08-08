export type PactItem = {
  index: string;
  title: string;
  /** Rendered uppercase by CSS, so stored in normal case. */
  caption: string;
};

export const PACT_INTRO =
  "The Criterion Pact is our promise to turn building a home from a leap of faith into a guided, transparent, and protected journey.";

export const PACT_ITEMS: PactItem[] = [
  {
    index: "01",
    title: "Precision",
    caption: "Homes built to a standard, never a trend.",
  },
  {
    index: "02",
    title: "Stewardship",
    caption: "A team that carries you through every step, never around in circles.",
  },
  {
    index: "03",
    title: "Traceability",
    caption:
      "You always know where your money is, what it is doing, and what it will become.",
  },
  {
    index: "04",
    title: "Ownership",
    caption: "Documentation designed to protect you, not just us.",
  },
  {
    index: "05",
    title: "Transparency",
    caption: "You'll always know the progress of your build.",
  },
];
