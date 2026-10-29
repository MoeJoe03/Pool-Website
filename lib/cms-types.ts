export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceNote: string;
  icon: string;
  image: string;
  tagColor?: string;
}

export interface PortfolioItem {
  id: string;
  badge: string;
  location: string;
  title: string;
  description: string;
  buttonText: string;
  image: string;
}

export interface StandardPillar {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  role: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  content?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteContent {
  company: {
    name: string;
    logoPrefix: string;
    logoSuffix: string;
    logoImage?: string;
    tagline: string;
    phone: string;
    phoneDisplay: string;
    email: string;
    address: string;
  };
  navigation: {
    links: NavLink[];
    ctaText: string;
    ctaHref: string;
  };
  hero: {
    trustBadge: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    subtitle: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    bgImage: string;
    ratingText: string;
    avatars: string[];
    partners: string[];
  };
  servicesSection: {
    badge: string;
    heading: string;
    headingHighlight: string;
    description: string;
    ctaText: string;
    chemicalsHighlightTitle: string;
    chemicalsHighlightDesc: string;
    items: ServiceItem[];
  };
  standardsSection: {
    badge: string;
    heading: string;
    headingHighlight: string;
    description: string;
    pillars: StandardPillar[];
  };
  aboutSection: {
    badge: string;
    heading: string;
    headingHighlight: string;
    description: string;
    bulletPoints: string[];
    ctaText: string;
    image: string;
    imageBadge: string;
    imageTitle: string;
  };
  portfolioSection: {
    badge: string;
    heading: string;
    headingHighlight: string;
    description: string;
    items: PortfolioItem[];
  };
  processSection: {
    badge: string;
    heading: string;
    headingHighlight: string;
    description: string;
    steps: ProcessStep[];
  };
  testimonialsSection: {
    badge: string;
    heading: string;
    headingHighlight: string;
    description: string;
    featured: {
      quote: string;
      author: string;
      role: string;
      image: string;
    };
    reviews: TestimonialItem[];
  };
  articlesSection: {
    badge: string;
    heading: string;
    headingHighlight: string;
    description: string;
    ctaText: string;
    items: ArticleItem[];
  };
  ctaBanner: {
    badge: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    buttonText: string;
    image: string;
  };
  footer: {
    contactHeading: string;
    newsletterHeading: string;
    newsletterDesc: string;
    infoHeading: string;
    watermarkText: string;
    copyrightText: string;
    cpoBadgeText: string;
  };
}
