// midtown terraces
import property1 from "../../Assets/Images/xV1.jpg";
import terraceIcon from "../../Assets/Images/terrace icon.svg";
import bedIcon from "../../Assets/Images/bed icon.svg";
import floorsIcon from "../../Assets/Images/floors icon.svg";
import approxIcon from "../../Assets/Images/approx icon.svg";
import line5 from "../../Assets/Images/Line 5.svg";
import line8 from "../../Assets/Images/Line 8.svg";
import mainProperyImg from "../../Assets/Images/xV1.png";
import propertyImg1 from "../../Assets/Images/xV2.png";
import propertyImg2 from "../../Assets/Images/xV3.png";
import groundFloorImg from "../../Assets/Images/groundFloorImg.jpg";
import firstFloorImg from "../../Assets/Images/firstFloorImg.jpg";
import secondFloorImg from "../../Assets/Images/secondFloorImg.jpg";
import groundFloorSingleImg from "../../Assets/Images/groundFloorSingleImg.jpg";
import firstFloorSingleImg from "../../Assets/Images/firstFloorSingleImg.jpg";
import secondFloorSingleImg from "../../Assets/Images/secondFloorSingleImg.jpg";
import locationIcon from "../../Assets/Images/Location Icon.svg";
import vipIcon from "../../Assets/Images/Vip Streamline Tabler Line.svg";
import architectureIcon from "../../Assets/Images/Architectural Icon.svg";
import valueIcon from "../../Assets/Images/Diamond Icon.svg";
import investmentIcon from "../../Assets/Images/investment icon.svg";
import customizationIcon from "../../Assets/Images/Cogwheel Settings Account Streamline Atlas Line.svg";
import idealIcon from "../../Assets/Images/ideal icon.svg";
import aspirationIcon from "../../Assets/Images/aspirationIcon.png";
import inspiredIcon from "../../Assets/Images/inspiredIcon.svg";
// import type { PropertyData} from "../Containers/Properties/property.types";

//urban nest
import mainImg from "../../Assets/Images/urbanNestMainImg.png";
import urbanNestShowcaseMain from "../../Assets/Images/urbanNestShowcaseMain.png";
import urbanShowcase1 from "../../Assets/Images/urbanShowcase1.png"
import urbanShowcase2 from "../../Assets/Images/urbanShowcase2.png"
import urbanShowcase3 from "../../Assets/Images/urbanShowcase3.png"
import urbanShowcase4 from "../../Assets/Images/urbanShowcase4.png"
// import urbanShowcase5 from "../../Assets/Images/urbanShowcase5.png"
// import urbanShowcase6 from "../../Assets/Images/urbanShowcase6.png"
// import urbanShowcase7 from "../../Assets/Images/urbanShowcase7.png"
// import urbanShowcase8 from "../../Assets/Images/urbanShowcase8.png"
import urbanNestGroundFloor from "../../Assets/Images/urbanNestGroundFloor.png";
import urbanNestFirstFloor from "../../Assets/Images/urbanNestFirstFloor.png";
import urbanNestSecondFloor from "../../Assets/Images/urbanNestSecondFloor.png";

export interface HeaderDetail {
  id: number;
  icon: string;
  name: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
}

export interface LocationData {
  coordinates: { lat: number; lng: number };
  title: string;
  subtitle: string;
  tagline: string;
  paragraphs: string[];
}

export interface ShowcaseFeature {
  title: string;
  description: string;
}

export interface ShowcaseData {
  headerText: string;
  headerTextMobile: string;
  features: ShowcaseFeature[];
  images: string[];
}

export interface Floor {
  title: string;
  img: string;
  description: string;
}

export interface FloorPlanUnit {
  unit: string;
  floors: Floor[];
}

export interface ReasonItem {
  image: string;
  title: string;
  description: string;
}

export interface ReasonsData {
  mainTitle: string;
  span1: string;
  span2: string;
  location: string;
  place?: string;
  items: ReasonItem[];
}

export interface PricingRow {
  milestone: string;
  payment: string;
  price?: string;
  timeline: string;
}

export interface StaticRow {
  label: string;
  value: string;
}

export interface PricingData {
  rows: PricingRow[];
  staticRows: StaticRow[];
  lineImage: string;
}

export interface PropertyData {
  id: string;
  name: string;
  location: string;
  heroImage: string;
  lineImage: string;
  description: {
    subtitle: string;
    title: string;
    paragraphs: string[];
  };
  contact: {
    phone: string;
    whatsapp: string;
  };
  headerDetails: HeaderDetail[];
  projectDetails: ProjectDetail[];
  locationData: LocationData;
  showcase: ShowcaseData;
  floorPlans: FloorPlanUnit[];
  reasons: ReasonsData;
  pricing: PricingData;
}

// src/data/properties.data.ts

export const properties: Record<string, PropertyData> = {
  "midtown-terraces": {
    id: "midtownTerraces",
    name: "THE MIDTOWN TERRACES",
    location: "Gwarinpa, Abuja.",
    heroImage: property1,
    lineImage: line5,
    description: {
      subtitle: "DESCRIPTION",
      title: "Welcome to The Midtown Terraces",
      paragraphs: [
        "An exclusive collection of just 4 custom-built, 4-bedroom terrace duplexes with maid's quarters, nestled in the heart of Gwarinpa, Abuja. This premium development is a celebration of modern architecture fused with nature, crafted for discerning families who crave serenity, function, and timeless elegance in one space.",
        "Each home is designed with purposeful flow, generous natural lighting, and a signature private patch adorned with lush greenery, transforming daily living into an experience of peace, wellness, and connection.",
      ],
    },
    contact: {
      phone: "+234 805 857 3915",
      whatsapp: "https://wa.me/2348058573915",
    },
    headerDetails: [
      { id: 1, icon: terraceIcon, name: "Terrace Duplexes" },
      { id: 2, icon: bedIcon, name: "4 Bedroom" },
      { id: 3, icon: floorsIcon, name: "3 Floors" },
      { id: 4, icon: approxIcon, name: "Approx. 1014 m²" },
    ],
    projectDetails: [
      {
        id: 1,
        title: "LOCATION",
        description: "Plot 237, along 69 21A road Gwarimpa II Estate. Abuja",
      },
      {
        id: 2,
        title: "UNITS",
        description:
          "4 exclusively built 4-bedroom terrace duplexes + atrium for light and ventilation.",
      },
      {
        id: 3,
        title: "EXTRA FEATURE",
        description: "All units' bedrooms come with spacious balconies.",
      },
    ],
    locationData: {
      coordinates: { lat: 9.1136, lng: 7.3946 },
      title: "GWARINPA,",
      subtitle: "ABUJA",
      tagline: "Prime, secure, and highly sought-after district",
      paragraphs: [
        "Gwarinpa remains one of Abuja's most established and desirable residential districts; a mature, well-planned enclave that offers both urban connectivity and lasting value. Its location in the third phase of the country's capital city ensures direct access to key zones like Jabi, Life Camp, and the city centre, while wide boulevards and consistent infrastructure reflect a neighbourhood designed for longevity.",
        "Supported by reputable schools, medical facilities, retail, and hospitality, Gwarinpa delivers a complete living experience within a self-sufficient setting. With strong occupancy, steady appreciation, and a track record of stability, it continues to offer the assurance buyers and investors seek in a prime residential address.",
      ],
    },
    showcase: {
      headerText:
        "At The Midtown Terraces, we've gone beyond structure. Our homes are:",
      headerTextMobile:
        "At The Midtown Terraces, we've gone beyond structure. Our homes are:",
      features: [
        {
          title: "MODERN",
          description:
            "Clean lines, minimalist facades, large glass openings, and a balanced palette that blends beautifully with the surrounding nature.",
        },
        {
          title: "WELL BUILT",
          description:
            "Constructed with premium materials and supervised by seasoned engineers and project managers.",
        },
        {
          title: "FUNCTIONAL",
          description:
            "Open-plan layouts, en-suite bedrooms, ample storage, intuitive kitchen and utility spaces, and integrated home automation options.",
        },
        {
          title: "NATURALLY ILLUMINATED",
          description:
            "Maximized natural light through skylights, large windows, and atriums.",
        },
        {
          title: "GREEN INSPIRED",
          description:
            "Each home is built around lushly landscaped compound spaces to enhance mental well-being, air quality, and aesthetics.",
        },
      ],
      images: [mainProperyImg, propertyImg1, propertyImg2],
    },
    floorPlans: [
      {
        unit: "",
        floors: [
          {
            title: "GROUND FLOOR",
            img: groundFloorImg,
            description: "Lounge, Dining, Laundry, Store",
          },
          {
            title: "FIRST FLOOR",
            img: firstFloorImg,
            description:
              "2 BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
          },
          {
            title: "SECOND FLOOR",
            img: secondFloorImg,
            description:
              "2 ADDITIONAL BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
          },
        ],
      },
      {
        unit: "SINGLE",
        floors: [
          {
            title: "GROUND FLOOR",
            img: groundFloorSingleImg,
            description: "Lounge, Dining, Laundry, Store",
          },
          {
            title: "FIRST FLOOR",
            img: firstFloorSingleImg,
            description:
              "2 BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
          },
          {
            title: "SECOND FLOOR",
            img: secondFloorSingleImg,
            description:
              "2 ADDITIONAL BEDROOMS, ATRIUM, ALL ROOMS ENSUITE, BALCONIES & DRESSING AREAS",
          },
        ],
      },
    ],
    reasons: {
      mainTitle: "Why Buy Into The Midtown Terraces, Gwarinpa, Abuja?",
      span1: "Why Buy Into",
      span2: "The Midtown Terraces,",
      location: "Gwaripa, Abuja",
      items: [
        {
          image: locationIcon,
          title: "Prime Address in Gwarinpa",
          description:
            "Close to top schools, malls, business districts, and recreational hubs in Abuja",
        },
        {
          image: vipIcon,
          title: "Exclusivity",
          description:
            "Only 4 units available, guaranteeing privacy and elevated lifestyle standards.",
        },
        {
          image: architectureIcon,
          title: "Architectural Distinction",
          description:
            "Green space-centric living that promotes wellness, beauty, and intimacy with nature.",
        },
        {
          image: valueIcon,
          title: "Long-Term Value",
          description:
            "Custom-built quality ensures low maintenance, high durability, and impressive resale value.",
        },
        {
          image: investmentIcon,
          title: "Smart Investment",
          description:
            "Gwarinpa remains one of Abuja's fastest-appreciating residential zones.",
        },
        {
          image: customizationIcon,
          title: "CUSTOMISATION Opportunity",
          description:
            "Early buyers can influence interior finishes, fixtures, and layout tweaks.",
        },
        {
          image: idealIcon,
          title: "Ideal for Families & Professionals",
          description:
            "A true sanctuary: generous living spaces, serene outdoor zones, and community comfort.",
        },
      ],
    },
    pricing: {
      lineImage: line8,
      rows: [
        {
          milestone: "Foundation",
          payment: "20% – 1st Instalment\n₦70,000,000",
          timeline: "After 8 Weeks of starting",
        },
        {
          milestone: "1st Floor Slab",
          payment: "20% – 2nd Instalment\n₦70,000,000",
          timeline: "After 8 Weeks",
        },
        {
          milestone: "2nd Floor Slab",
          payment: "20% – 3rd Instalment\n₦70,000,000",
          timeline: "After 8 Weeks",
        },
        {
          milestone: "Roofing and Plastering",
          payment: "20% – 4th Instalment\n₦70,000,000",
          timeline: "After 8 Weeks",
        },
        {
          milestone: "Finishes and Painting",
          payment: "20% – 5th Instalment\n₦70,000,000",
          timeline: "After 8 Weeks",
        },
      ],
      staticRows: [
        { label: "Project Completion", value: "10th Month" },
        { label: "Project Handover", value: "12th Month" },
      ],
    },
  },

  "urban-nest": {
    id: "urbanNest",
    name: "THE URBAN NEST",
    location: "Wuse, Zone 7,  Abuja",
    heroImage: mainImg,
    lineImage: line5,
    description: {
      subtitle: "OVERVIEW",
      title: "Welcome to The Urban Nest",
      paragraphs: [
        "A development in Wuse, Abuja. In this development, every detail has been considered with the homeowner in mind: layouts that flow with ease, spaces that invite light, and a standard of finish designed to stand the test of time.",
        "Set within one of Abuja’s most established districts, The Urban Nest stands in the very heart of the city. Here, privacy meets connection. Close to schools, businesses, and the city’s social life, yet positioned for a quieter way of living.",
        "Perfect for individuals and families with a refined eye and a preference for homes that speak through detail rather than display, this development offers a residence where comfort is intentional, design is enduring, and ownership reflects a standard few can claim.",
      ],
    },
    contact: {
      phone: "+234 805 857 3915",
      whatsapp: "https://wa.me/2348058573915",
    },
    headerDetails: [
      { id: 1, icon: terraceIcon, name: "3 Terrace Duplexes" },
      { id: 2, icon: bedIcon, name: "4 Bedroom" },
      { id: 3, icon: floorsIcon, name: "3 Floors" },
    ],
    projectDetails: [
      {
        id: 1,
        title: "LOCATION",
        description:
          "Wuse, Zone 7,  Abuja (central, connected, and prestigious neighborhood)",
      },
      {
        id: 2,
        title: "DESIGN",
        description:
          "Spacious multi-level terraces with balconies, and landscaped outdoor spaces",
      },
      {
        id: 3,
        title: "QUALITY",
        description:
          "Fine materials, modern facades, and carefully considered spatial planning",
      },
      {
        id: 4,
        title: "VENTILATION",
        description: "All units equally well-aerated",
      },
    ],
    locationData: {
      coordinates: { lat: 9.05785, lng: 7.49108 },
      title: "ZONE 7,",
      subtitle: "ABUJA",
      tagline: "CENTRAL, SECURE, AND HIGHLY COVETED DISTRICT",
      paragraphs: [
        "Zone 7 stands at the heart of Wuse, one of Abuja’s most connected and established districts. Known for its centrality and enduring value, it offers seamless access to key areas such as the Central Business District, Maitama, and Wuse II. Its position ensures convenience for professionals, families, and investors who seek both proximity and peace of mind.",
        "With reputable schools, healthcare facilities, retail, and hospitality close by, Zone 7 provides a complete living experience anchored in comfort and security. Its steady appreciation, proven occupancy, and strong infrastructure make it a prime address for discerning buyers and investors looking for reliability in the city’s core.",
      ],
    },
    showcase: {
      headerText:
        "At The Urban Nest, architecture is guided by clarity of purpose. Each unit is designed for balance, comfort, and lasting relevance.",
      headerTextMobile:
        "At The Urban Nest, \n architecture is guided by clarity of purpose. Each unit is designed for balance, comfort, and lasting relevance.",
      features: [
        {
          title: "WELL BUILT",
          description:
            "Every decision is guided by precision and every detail is handled with care to create a home that holds its own well beyond the façade.",
        },
        {
          title: "Functional Layouts",
          description:
            "Designed to flow seamlessly into daily life, with light and air moving freely and every area serving a clear purpose of living well.",
        },
        {
          title: "NATURALLY ILLUMINATED",
          description:
            "Generous openings and spaces shaped to glow with the rhythm of the day.",
        },
        {
          title: "PRIVATE COMFORT",
          description:
            "Private Comfort: Thoughtfully planned to create calm, personal spaces that support individuality and offers a retreat from the rhythm of daily life.",
        },
        {
          title: "MODERN CHARACTER",
          description:
            "A rejection of ornamentation in favor of functionality. Through simplicity of form and clarity of design, each detail caters to the modern homeowner and is crafted to endure through time.",
        },
      ],
      images: [urbanNestShowcaseMain, urbanShowcase1, urbanShowcase2, urbanShowcase3, urbanShowcase4],
    },
    floorPlans: [
      {
        unit: "",
        floors: [
          {
            title: "GROUND FLOOR",
            img: urbanNestGroundFloor,
            description:
              "Lounge, Dining Area, Kitchen, Laundry, Guest Bath/W.C.",
          },
          {
            title: "FIRST FLOOR",
            img: urbanNestFirstFloor,
            description:
              "2 Spacious Bedrooms, En-suite Baths, Family Lounge, Private Balcony Access in each room",
          },
          {
            title: "SECOND FLOOR",
            img: urbanNestSecondFloor,
            description:
              "Two Additional Bedrooms, En-suite Baths, Private Balcony Access in each room",
          },
        ],
      },
    ],
    reasons: {
      mainTitle: "Why Buy Into The Urban Nest, Zone 7, Wuse, Abuja?",
      span1: "Why Buy Into",
      span2: "The Urban Nest,",
      location: "Zone 7, Wuse,",
      place: "Abuja",
      items: [
        {
          image: locationIcon,
          title: "Prime Address in Wuse",
          description:
            "Located in the heart of Abuja, close to major business districts, schools, hospitals, and recreational centers.",
        },
        {
          image: aspirationIcon,
          title: "Aspirational Lifestyle",
          description:
            "A vision of living for those with a cultivated taste, where every detail reflects discernment, and your space embodies the assured confidence of distinction.",
        },
        {
          image: architectureIcon,
          title: "Architectural Elegance",
          description:
            "A refined blend of clean modern lines, natural illumination, and functionality.",
        },
        {
          image: approxIcon,
          title: "Spacious Living",
          description:
            "Multi-floor layouts with generous lounges, balconies, and family areas.",
        },
        {
          image: vipIcon,
          title: "Exclusivity and Privacy",
          description:
            "A rare property in a prestigious, low-density neighborhood.",
        },
        {
          image: investmentIcon,
          title: "Investment Potential",
          description:
            "Wuse remains one of Abuja’s most stable, high-demand, and high-value residential zones.",
        },
        {
          image: inspiredIcon,
          title: "Green-Inspired",
          description:
            "Each home is built around lushly landscaped compound spaces to enhance mental well-being, air quality, and aesthetics.",
        },
        {
          image: valueIcon,
          title: "Quality Assurance",
          description:
            "Crafted with enduring masonry and attentive workmanship, upheld by an uncompromising standard of care",
        },
      ],
    },
    pricing: {
      lineImage: line8,
      rows: [
        {
          milestone: "Foundation",
          payment: "20% - 1st Instalment",
          price: "#90M",
          timeline: "After 8 Weeks of starting",
        },
        {
          milestone: "1st Floor Slab",
          payment: "20% - 2nd Instalment",
          price: "#90M",
          timeline: "After 8 Weeks",
        },
        {
          milestone: "2nd Floor Slab",
          payment: "20% - 3rd Instalment",
          price: "#90M",
          timeline: "After 8 Weeks",
        },
        {
          milestone: "Roofing and Plastering",
          payment: "20% - 4th Instalment",
          price: "#90M",
          timeline: "After 8 Weeks",
        },
        {
          milestone: "Finishes and Painting",
          payment: "20% - 5th Instalment",
          price: "#90M",
          timeline: "After 8 Weeks",
        },
      ],
      staticRows: [
        { label: "Project Completion", value: "10th Month" },
        { label: "Project Handover", value: "12th Month" },
      ],
    },
  },
};

export const getProperty = (id: string): PropertyData | undefined => {
  return properties[id];
};

export const getAllPropertyIds = (): string[] => {
  return Object.keys(properties);
};
