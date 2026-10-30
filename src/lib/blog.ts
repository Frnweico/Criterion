export type BlogSection = {
  heading: string;
  paragraphs: string[];
  items?: string[];
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
  cta?: {
    label: string;
    href: string;
  };
};

export type BlogGridItem = Pick<
  BlogPost,
  "title" | "excerpt" | "date" | "image" | "imageAlt"
> & {
  slug?: string;
};

const APPROVED_INSIGHTS: BlogPost[] = [
  {
    slug: "build-as-you-pay-explained",
    title: "Build As You Pay: How Milestone Payments Work",
    excerpt:
      "See how Criterion Homes links five 20% payments to completed construction milestones and documents the journey to handover.",
    date: "2026-10-30",
    image: "/images/insights/off-plan-payment-plans.webp",
    imageAlt: "A residential development under construction",
    cta: {
      label: "Explore the Criterion Homes approach",
      href: "/approach",
    },
    body: [
      {
        heading: "A payment plan you can follow",
        paragraphs: [
          "Buying an off-plan home should bring you closer to a defined handover date. It should also give you a clear view of the work being done along the way.",
          "Criterion Homes uses Build As You Pay to connect each payment to visible construction progress. The project works toward a projected completion date, while each instalment follows a completed construction milestone. Buyers receive documented updates so they can see what is finished and what comes next.",
        ],
      },
      {
        heading: "How Build As You Pay works",
        paragraphs: [
          "The purchase value is divided into five instalments of 20%. Each instalment falls due after its corresponding construction milestone has been completed and verified. The agreed contract and milestone schedule should set out the work and confirmation process for each stage.",
        ],
        items: [
          "Foundation — 20%",
          "First-floor slab — 20%",
          "Second-floor slab — 20%",
          "Roofing and plastering — 20%",
          "Finishes and painting — 20%",
        ],
      },
      {
        heading: "What the structure gives a buyer",
        paragraphs: [
          "A clearer record of progress: documented updates show what has been completed and what remains.",
          "A more informed timeline: the projected completion date gives you a basis for planning, while regular progress reports help you understand how the work is moving toward it.",
          "Payments connected to real work: you can review the completed stage before the next instalment becomes due, instead of relying on a calendar date alone.",
          "This structure reduces the uncertainty of paying without a clear view of construction progress. It does not remove construction or delivery risk, so buyers should still review the contract, specifications, milestone evidence and provisions for delays with an independent adviser.",
        ],
      },
      {
        heading: "Follow the work, even from elsewhere",
        paragraphs: [
          "A buyer does not have to be on site every day to understand the build. Dated photographs, videos and written milestone updates can provide a record from foundation to finishes. Where needed, a buyer can appoint a representative to inspect completed work.",
          "The principle is simple: see the work, know what comes next, and understand what each payment is building.",
        ],
      },
    ],
  },

  {
    slug: "buying-off-plan-gwarinpa-abuja",
    title: "Buying an Off-Plan Home in Gwarinpa, Abuja? 5 Things to Check Now",
    excerpt:
      "Five practical checks to make before committing to an off-plan home in Gwarinpa.",
    date: "2026-10-20",
    image: "/images/insights/buying-off-plan-gwarinpa.webp",
    imageAlt: "The Midtown Terraces under construction in Gwarinpa, Abuja",
    cta: {
      label: "Explore The Midtown Terraces",
      href: "/projects/midtown-terraces",
    },
    body: [
      {
        heading: "1. Start with life in Gwarinpa",
        paragraphs: [
          "You may not be able to experience the finished home yet, but you can already experience where it will be.",
          "Gwarinpa is an established residential district in Abuja, but streets and estates differ in access, surroundings and activity.",
          "Where possible, visit at the times you would normally travel. If you cannot visit, ask for a clear address, current photographs and a live virtual walkthrough.",
        ],
        items: [
          "Schools, shopping and healthcare",
          "Worship and work routes",
          "Drainage and parking",
          "Immediate surroundings",
          "The services your household needs",
        ],
      },
      {
        heading: "2. Understand what is being built",
        paragraphs: [
          "A render helps you picture the finished home, but it should be read alongside the floor plan, approved drawings and specification schedule.",
          "Check what is included in the property, such as finishes, fittings, parking, services, common areas and any exclusions. These documents provide a clearer reference for what should be delivered.",
        ],
      },
      {
        heading: "3. Verify the transaction",
        paragraphs: [
          "Confirm the company behind the development through the Corporate Affairs Commission.",
          "A solicitor should also review the following documents. Where necessary, the appropriate authorities can be consulted to verify supporting information.",
        ],
        items: [
          "Title documents",
          "Survey information",
          "Relevant transaction documents",
        ],
      },
      {
        heading: "4. Follow construction and payments",
        paragraphs: [
          "You should be able to see what has been completed, what is ongoing and what comes next.",
          "Ask how construction progress will be documented and how each completed milestone will be confirmed.",
          "Where payments are linked to construction, the contract should state what must be completed before the next payment becomes due. It should also explain what happens in the event of delays, changes or other issues affecting delivery.",
        ],
      },
      {
        heading: "5. Know what happens at handover",
        paragraphs: [
          "Before committing, ask what handover includes. Keep your contract, payment plan, construction updates and receipts together so you can follow the purchase from reservation to handover.",
        ],
        items: [
          "Final inspection",
          "Snagging",
          "Keys",
          "Utility arrangements",
          "Outstanding documents",
        ],
      },
      {
        heading: "The Midtown Terraces in Gwarinpa",
        paragraphs: [
          "The Midtown Terraces is a four-unit residential development in Gwarinpa and an example of how these checks can work in practice.",
          "The property is no longer something buyers can only see in 3D. Three of five construction milestones have been completed in record time: the foundation, first-floor slab and second-floor slab.",
          "Milestone four, roofing and plastering, is ongoing. Painting and final works will follow, with projected completion in Q4 2026.",
          "Through Build As You Pay, buyers make five 20% payments, with each payment following a completed construction milestone.",
        ],
      },
    ],
  },
  {
    slug: "buy-property-abuja-from-abroad",
    title: "How to Buy Property in Abuja From Abroad: What to Verify Before You Commit",
    excerpt:
      "A practical process for buyers abroad to verify an Abuja property purchase and follow construction with confidence.",
    date: "2026-10-20",
    image: "/images/insights/buy-property-abuja-from-abroad.webp",
    imageAlt: "Abuja city gateway",
    cta: {
      label: "Explore The Midtown Terraces",
      href: "/projects/midtown-terraces",
    },
    body: [
      {
        heading: "1. Verify the company, land and development",
        paragraphs: [
          "Start by confirming who you are buying from. Check the property developer's registered details through the Corporate Affairs Commission. The company named in the contract should match the legal entity receiving payment.",
          "Also verify the land records, plot information, survey plan and relevant development approval through the appropriate authorities.",
          "These checks answer different questions. Together, they help establish who you are buying from, which land the transaction concerns and whether the proposed development is properly documented.",
        ],
      },
      {
        heading: "2. Put the purchase terms in writing",
        paragraphs: [
          "Once you know who you are buying from, make sure the terms of the purchase are clear. Before paying, review the contract, property specifications, payment schedule and projected completion date.",
          "Keep the reservation documents, contract, payment instructions and receipts in one secure record.",
        ],
        items: [
          "What you are buying",
          "What is included in the property",
          "When each payment becomes due",
          "How construction progress will be reported",
          "What happens if the work or specifications change",
        ],
      },
      {
        heading: "3. Follow a clear construction plan",
        paragraphs: [
          "If the property is still being built, ask for a defined construction plan. You should be able to understand what has been completed, what comes next and how the work is progressing towards the projected completion date.",
          "Criterion Homes uses Build As You Pay to give buyers a clearer way to follow their property. Each project is divided into five documented construction milestones, with five 20% payments tied to completed construction milestones.",
        ],
      },
      {
        heading: "4. Agree how remote updates will work",
        paragraphs: [
          "A construction plan is only useful from a distance if you can see how the work is progressing. Agree how often updates will be provided and what each update should contain.",
          "A local representative can also inspect the site at agreed points in the payment schedule. The purpose is not constant contact. It is to maintain a reliable record when work is completed and another payment becomes due.",
        ],
        items: [
          "The completed construction milestone or current construction stage",
          "The date of the update",
          "Dated photographs or video",
          "The next expected construction stage",
        ],
      },
      {
        heading: "5. Appoint people who act for you",
        paragraphs: [
          "Appoint an independent solicitor to review the transaction and explain what each document means.",
          "You may also appoint a trusted local representative to attend inspections or meetings on your behalf. Define the person's role clearly. A representative can observe and report, while legal questions should be handled by a qualified professional.",
        ],
      },
      {
        heading: "6. Give every Abuja visit a purpose",
        paragraphs: [
          "If you will be in Abuja during the purchase, use the opportunity to see what remote updates cannot fully show. Arrange the site visit in advance.",
          "Use the visit to inspect a completed construction milestone, review documents, meet the project team or confirm agreed property specifications. A purposeful visit should answer questions that photographs and video cannot answer on their own.",
        ],
      },
    ],
  },
  {
    slug: "property-developer-due-diligence-nigeria",
    title: "Property Developer Due Diligence in Nigeria: CAC, Title and Site Checks",
    excerpt:
      "The core checks that help confirm a property developer, the land and the approval all support the same transaction.",
    date: "2026-10-06",
    image: "/images/insights/property-developer-due-diligence.webp",
    imageAlt: "A contemporary residential development in Abuja",
    cta: {
      label: "Read: How to Buy Property in Abuja From Abroad",
      href: "/insights/buy-property-abuja-from-abroad",
    },
    body: [
      {
        heading: "1. Confirm the property developer at the CAC",
        paragraphs: [
          "Start with the company selling the property.",
          "Search for the property developer through the Corporate Affairs Commission. Confirm its registered name and registration details. The name should match the company named in the contract, reservation documents and payment instructions.",
          "If different company names appear across the documents, ask for an explanation in writing before making a payment.",
        ],
      },
      {
        heading: "2. Check the land title and plot information",
        paragraphs: [
          "A company can be properly registered without owning or controlling the land connected to a development. The land must therefore be checked separately.",
          "Ask for the title document, plot reference and survey plan. Your solicitor should confirm that the land description matches the property being offered and check whether any registered interest could affect the transaction.",
          "For property in Abuja, the relevant land records and legal searches are handled through the appropriate FCT land administration channels, including Abuja Geographic Information Systems.",
        ],
      },
      {
        heading: "3. Make sure the survey information matches the site",
        paragraphs: [
          "A survey plan identifies the location and boundaries of the land.",
          "The coordinates, plot description and other details on the survey plan should correspond with the title documents and the site being presented to you. A qualified professional should verify the plan through the appropriate authority.",
          "If the documents refer to different plots or produce different locations, the difference should be investigated rather than explained away.",
        ],
      },
      {
        heading: "4. Confirm the development approval",
        paragraphs: [
          "Land ownership and development approval are not the same thing.",
          "Ask for the approval information connected to the project. Confirm that it covers the type and scale of development being offered and that the approved proposal corresponds with what is being built.",
          "If the design or use has changed, ask whether the change has also been approved.",
        ],
      },
      {
        heading: "5. Keep one clear property record",
        paragraphs: [
          "Keep the company search, title report, survey information, approval records, contract, payment schedule, receipts and written correspondence together.",
          "For buyers outside Nigeria, this record is especially important. It allows your solicitor or local representative to report what has been checked, what remains outstanding and what each document confirms.",
          "Due diligence is not about collecting documents for the sake of it. It is about making sure the company, the land, the survey and the approval all tell the same story.",
        ],
      },
    ],
  },
  {
    slug: "off-plan-payment-plans-nigeria",
    title: "Off-Plan Payment Plans: Time-Based vs Milestone-Based Payments",
    excerpt:
      "What the payment structure should show you about construction progress before the next instalment is due.",
    date: "2026-09-29",
    image: "/images/insights/off-plan-payment-plans.webp",
    imageAlt: "A residential development under construction",
    cta: {
      label: "Explore The Midtown Terraces",
      href: "/projects/midtown-terraces",
    },
    body: [
      {
        heading: "1. What is a time-based payment plan?",
        paragraphs: [
          "A time-based payment plan sets payments by the calendar. After the initial deposit, further instalments may be due monthly, quarterly or on other agreed dates.",
          "The advantage is predictability. You know when the next payment is coming.",
          "The concern is that the calendar can move faster than the building. Another instalment may become due even if construction has not progressed as expected.",
          "Before signing, ask what progress should have been made by each payment date, how that progress will be reported and what happens if construction falls behind.",
        ],
      },
      {
        heading: "2. What is a milestone-based payment plan?",
        paragraphs: [
          "A milestone-based payment plan connects each payment to a defined stage of construction. That could include the foundation, floor slabs, roofing, plastering or final works.",
          "Instead of another payment becoming due simply because a date has arrived, the next payment follows the completion of an agreed construction milestone.",
          "The principle is simple: see the work, then make the next payment.",
          "Each milestone should still be clearly defined. You should know what must be completed, how completion will be documented and who confirms that the work is complete.",
        ],
      },
      {
        heading: "3. Time-based vs milestone-based payment plans",
        paragraphs: [
          "The main difference is what triggers the next payment.",
          "A time-based payment plan is triggered by an agreed date; a milestone-based plan is triggered by a completed construction milestone.",
          "Neither structure should be judged on the payment schedule alone. The contract, construction plan, building specifications, documentation and projected completion date still matter.",
        ],
      },
      {
        heading: "4. Five questions to ask before choosing an off-plan payment plan",
        paragraphs: [
          "The answers should not depend only on a conversation with a sales representative. They should appear in the contract or an attached schedule.",
          "If you are buying from outside Nigeria, also ask how construction updates will be shared. Dated photographs, videos and inspection records can help you verify progress without being physically present.",
        ],
        items: [
          "What are the construction milestones?",
          "What must be completed at each stage?",
          "How will completed work be documented?",
          "What is the projected timeline?",
          "What happens if construction is delayed?",
        ],
      },
      {
        heading: "5. How Criterion Homes' Build As You Pay works",
        paragraphs: [
          "Criterion Homes uses Build As You Pay to give buyers a clearer way to follow the construction of their property.",
          "At The Midtown Terraces in Gwarinpa, Abuja, the payment structure is simple: five construction milestones, five payments and 20% per payment.",
          "Each 20% payment follows the completion of a construction milestone.",
          "This means the payment plan moves with the building. When a milestone is completed, the buyer can see what has been built before the next 20% payment becomes due.",
        ],
        items: [
          "Foundation",
          "First-floor slab",
          "Second-floor slab",
          "Roofing and plastering",
          "Painting and final works",
        ],
      },
    ],
  },
];

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
const LEGACY_INSIGHTS: BlogPost[] = [
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
  return INSIGHT_POSTS.find((post) => post.slug === slug);
}

/** New articles retain their agreed publishing dates; existing writing follows. */
export const INSIGHT_POSTS: BlogPost[] = [...APPROVED_INSIGHTS, ...LEGACY_INSIGHTS]
  .sort((a, b) => b.date.localeCompare(a.date));

/** The current names retain compatibility with shared components during the move. */
export const BLOG_POSTS = INSIGHT_POSTS;
export const FEATURED_BLOG: BlogPost = INSIGHT_POSTS[0];
export const BLOG_GRID: BlogGridItem[] = INSIGHT_POSTS.filter(
  (post) => post.slug !== FEATURED_BLOG.slug,
);
