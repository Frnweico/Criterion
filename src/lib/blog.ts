export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date — formatted for display at render time. */
  date: string;
  image: string;
  imageAlt: string;
  body: BlogSection[];
};

export type BlogGridItem = Pick<
  BlogPost,
  "title" | "excerpt" | "date" | "image" | "imageAlt"
> & {
  slug?: string;
};

/**
 * Newest first.
 *
 * Temporary. Posts will move to Markdown files under `content/blog/` with
 * frontmatter, per the agreed approach; this list keeps the same shape so the
 * homepage section won't need changing when that happens.
 *
 * Note the frames order these differently on mobile and desktop. A single
 * newest-first order is used at both sizes — reading order shouldn't depend on
 * screen width.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-architecture-of-restraint",
    title: "The Architecture of Restraint",
    excerpt:
      "An exploration of why we choose what to leave out to ensure every project holds value over time.",
    date: "2026-05-11",
    image: "/images/Webp images/WP-blog-card-2 - Copy.webp",
    imageAlt: "A modern high-rise residential development",
    body: [
      {
        heading: "The value of a clear brief",
        paragraphs: [
          "A project becomes stronger when its first decisions are specific. Not a broad promise to be premium, but a clear understanding of how people will arrive, move through a home, rest, host and leave again. That clarity gives every later decision a purpose.",
          "At Criterion Homes, we start by asking what must genuinely earn its place. The answer is rarely more decoration or more rooms. It is often better light, a calmer sequence through the plan, useful storage, durable material choices and a structure that can support the life built around it.",
        ],
      },
      {
        heading: "What restraint asks of a home",
        paragraphs: [
          "Restraint is not absence. It is the discipline to let proportion, daylight and material do their work without competing for attention. A restrained home should still feel generous, but its generosity comes from space that is considered rather than simply filled.",
          "This approach also asks us to think beyond the first impression. Details that age with dignity, circulation that remains practical and facades that are composed rather than fashionable all matter more over time than an isolated visual gesture.",
        ],
      },
      {
        heading: "A longer horizon",
        paragraphs: [
          "The best measure of a development is not the day it launches. It is how confidently it is lived in years later. That is why we prefer fewer, better-resolved decisions: they leave room for a home to become personal while preserving the quality that made it valuable in the first place.",
          "Architecture of restraint is, ultimately, a commitment to the long view. It is how we make places that remain composed, useful and worth returning to.",
        ],
      },
    ],
  },
  {
    slug: "the-abuja-report-gwarinpa-and-wuse",
    title: "The Abuja Report: Gwarinpa & Wuse",
    excerpt:
      "Practical insights into identifying property opportunities that make financial sense in Nigeria's capital.",
    date: "2026-04-20",
    image: "/images/Webp images/WP-blog-card-3 - Copy.webp",
    imageAlt: "A Criterion Homes residence in Abuja",
    body: [
      {
        heading: "Two different investment questions",
        paragraphs: [
          "Gwarinpa and Wuse answer different needs within Abuja, and that is precisely why both deserve careful attention. One offers the appeal of an established residential rhythm and room to settle into a neighbourhood. The other places daily life closer to the city’s commercial and social core.",
          "A useful property decision begins by separating location from assumption. Convenience is not just a pin on a map; it is the quality of the journeys that make up an ordinary week, the services that are actually within reach and the way a district is likely to mature.",
        ],
      },
      {
        heading: "Read access beyond the map",
        paragraphs: [
          "When reviewing a location, we look at the routes before we look at the render. Schools, work, health care, retail, airports and social life each create their own pattern of movement. A connected address is one that works across those patterns without turning every day into a negotiation.",
          "It is equally important to observe the immediate setting. Street character, density, drainage, security, noise and the quality of nearby construction all shape the experience of ownership. These are practical questions, but they are also the foundation of long-term confidence.",
        ],
      },
      {
        heading: "From neighbourhood to decision",
        paragraphs: [
          "There is no universal best address. There is, however, a better fit between a buyer’s priorities and a project’s context. An investor may weigh rental demand and future infrastructure differently from a family looking for a dependable daily routine.",
          "The most durable decisions are made with both horizons in view: how the place serves you now, and what will continue to make it desirable later. That is the lens through which we approach every Criterion Homes location.",
        ],
      },
    ],
  },
  {
    slug: "beyond-the-finish-line",
    title: "Beyond the Finish Line",
    excerpt:
      "A deep dive into the systems and foundations that support lasting quality and structural integrity.",
    date: "2026-03-15",
    image: "/images/Webp images/WP-blog-card-1 - Copy.webp",
    imageAlt: "A Criterion Homes development at dusk",
    body: [
      {
        heading: "A home is a system",
        paragraphs: [
          "The visible finish is only one part of a home’s quality. The comfort people remember is shaped by the systems behind the walls: the structure carrying the building, the waterproofing that protects it, the services that make it work and the workmanship connecting each layer.",
          "These are not glamorous decisions, but they determine whether a home feels dependable. They influence sound, temperature, maintenance, running costs and the ease with which a property can adapt to the years ahead.",
        ],
      },
      {
        heading: "The parts you do not see",
        paragraphs: [
          "Long-term value begins with due diligence. It means checking what ground conditions require, coordinating specialists early and allowing the right time for inspections. It means choosing materials for their performance as well as their appearance, and treating construction milestones as moments to verify rather than simply announce.",
          "For buyers, the same principle applies. Ask what supports the finish: how water is managed, how power and ventilation are planned, how common areas will be maintained and what information is available about the delivery process. Clear answers are a sign of a clear standard.",
        ],
      },
      {
        heading: "A standard that endures",
        paragraphs: [
          "Finishing well is not a final flourish. It is the outcome of thousands of earlier choices made with care. When those choices are consistent, a home does more than photograph well on handover day; it continues to perform for the people who live in it.",
          "That is the finish line we care about: a residence with the structure, systems and stewardship to hold its value over time.",
        ],
      },
    ],
  },
  {
    slug: "a-home-built-for-belonging",
    title: "A Home Built for Belonging",
    excerpt:
      "How thoughtful planning and a shared sense of place shape the everyday experience of home.",
    date: "2026-01-01",
    image: "/images/Webp images/WP-blog-card-4 - Copy.webp",
    imageAlt: "A welcoming contemporary terrace residence at dusk",
    body: [
      {
        heading: "The everyday test",
        paragraphs: [
          "A home earns its place in the moments that do not make the brochure: the ease of arriving after a long day, the room to share a meal without rearranging everything, and the small comforts that make an ordinary morning feel settled.",
          "That is why we begin with daily life. We consider where a bag is set down, how a kitchen supports conversation, what a family needs close at hand and which spaces should remain quiet even when the home is full.",
        ],
      },
      {
        heading: "Space for connection",
        paragraphs: [
          "Belonging is created through a balance of openness and privacy. Generous shared rooms invite people together, while well-proportioned bedrooms and corners of retreat give everyone somewhere to reset.",
          "The plan should also be able to change with its residents. A room that works for a child today may become a study, a guest room or a place for a new routine tomorrow. Flexibility is not an extra; it is part of a home that continues to serve.",
        ],
      },
      {
        heading: "A sense of place",
        paragraphs: [
          "A residence does not stand alone. The route to it, the streets around it, the neighbours beside it and the spaces shared beyond its front door all shape the feeling of living there.",
          "When those layers are considered together, a home becomes more than an address. It becomes a place that is easy to return to, easy to share and ready to hold the life built within it.",
        ],
      },
    ],
  },
  {
    slug: "the-value-of-a-well-considered-address",
    title: "The Value of a Well-Considered Address",
    excerpt:
      "What to look for in an Abuja location before deciding where your next home or investment should be.",
    date: "2026-02-12",
    image: "/images/Webp images/WPblog-card-5 - Copy.webp",
    imageAlt: "A contemporary Criterion Homes residential building in Abuja",
    body: [
      {
        heading: "Start with the life around it",
        paragraphs: [
          "A good address is not defined only by a familiar district name. It is defined by the quality of life it makes possible: how easily work, school, shopping, healthcare and time with friends fit into a normal week.",
          "Before choosing a property, travel the route at the times you will actually use it. The experience of a location at eight in the morning or after sunset often tells you more than a map ever can.",
        ],
      },
      {
        heading: "Look beyond the boundary wall",
        paragraphs: [
          "The immediate setting matters as much as the building itself. Consider the character of the street, the standard of neighbouring development, drainage, access, security and the everyday services that are genuinely nearby.",
          "These practical details shape comfort and confidence over time. They also influence how a property is experienced by future tenants, visitors and buyers, which makes them central to long-term value.",
        ],
      },
      {
        heading: "Choose with both horizons in view",
        paragraphs: [
          "The strongest location decisions respond to what you need now while recognising what may matter later. A home can offer immediate convenience and still have room to grow in relevance as the city changes around it.",
          "That balance is the value of a well-considered address: not just a place that is desirable today, but one with the fundamentals to remain so.",
        ],
      },
    ],
  },
  {
    slug: "the-quiet-luxury-of-living-well",
    title: "The Quiet Luxury of Living Well",
    excerpt:
      "Inside the material, light and spatial decisions that turn a residence into a lasting retreat.",
    date: "2025-12-10",
    image: "/images/Webp images/WP-blog-card-6 - Copy.webp",
    imageAlt: "A warm, considered interior living space",
    body: [
      {
        heading: "A quality you can feel",
        paragraphs: [
          "Quiet luxury is not a list of finishes. It is the feeling that comes from rooms being composed with care: light arriving where it is needed, materials sitting comfortably beside one another and space being allowed to breathe.",
          "The most lasting interiors do not need to announce themselves. Their details are useful, durable and calm enough to support the people living among them rather than competing for attention.",
        ],
      },
      {
        heading: "Material with meaning",
        paragraphs: [
          "Every material carries a practical responsibility. It must work with the climate, stand up to everyday use and become more characterful rather than more difficult over time. Texture, warmth and maintenance all matter together.",
          "A restrained palette gives those choices room to register. When a space is not crowded with competing gestures, the grain of timber, the softness of a fabric or the depth of a stone can do the quieter work of making a room feel resolved.",
        ],
      },
      {
        heading: "Designed for the long stay",
        paragraphs: [
          "Living well is not about a moment of arrival. It is about whether a home continues to offer comfort, ease and a sense of retreat after the first impression has passed.",
          "That is the standard we value: spaces that are beautifully made, quietly useful and generous enough to become personal over time.",
        ],
      },
    ],
  },
  {
    slug: "the-discipline-of-detail",
    title: "The Discipline of Detail",
    excerpt:
      "Why the smallest decisions in a residence have the greatest influence on how it feels to live in.",
    date: "2026-03-02",
    image: "/images/Webp images/WP-blog-card-3 - Copy.webp",
    imageAlt: "A carefully detailed contemporary residence in Abuja",
    body: [
      {
        heading: "Nothing is too small to matter",
        paragraphs: [
          "The details of a home are often noticed only when they have been neglected. A threshold that catches a foot, a switch placed without thought or a door that interrupts the room around it can quietly change the experience of every day.",
          "Good detailing works in the opposite way. It makes movement feel natural, storage feel expected and the things people touch most often feel considered. Its success is rarely loud, but it is always present.",
        ],
      },
      {
        heading: "A connected set of decisions",
        paragraphs: [
          "Detail is not decoration added at the end of a project. It begins with the plan, continues through the structure and services, and carries into materials, junctions and finishes. Each choice needs to understand the one beside it.",
          "That coordination is what allows a residence to feel calm. Lines align, light is given a purpose and practical elements are resolved without becoming visual noise.",
        ],
      },
      {
        heading: "Built for daily use",
        paragraphs: [
          "The strongest details are not fragile. They are selected for the weather, the pace and the realities of a lived-in home. They can be maintained, they age honestly and they continue to work after the first photographs have been taken.",
          "This is the discipline we bring to every project: an insistence that thoughtful detail should make a home not only more beautiful, but more dependable.",
        ],
      },
    ],
  },
];

/** "MARCH 15, 2026" — the uppercase form the cards use. */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`)
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/(\d+) (\w+) (\d+)/, "$2 $1, $3");
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

const ARCHITECTURE = BLOG_POSTS[0];
const ABUJA_REPORT = BLOG_POSTS[1];
const BEYOND_FINISH = BLOG_POSTS[2];
const BELONGING = BLOG_POSTS[3];
const ADDRESS = BLOG_POSTS[4];
const QUIET_LUXURY = BLOG_POSTS[5];
const DETAIL = BLOG_POSTS[6];

/** The Abuja Report is the current featured story. */
export const FEATURED_BLOG: BlogPost = ABUJA_REPORT;

/** Card order follows the supplied blog index design. */
export const BLOG_GRID: BlogGridItem[] = [
  BEYOND_FINISH,
  ARCHITECTURE,
  DETAIL,
  BELONGING,
  ADDRESS,
  QUIET_LUXURY,
];
