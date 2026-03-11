export interface Stat {
  value: string;
  label: string;
  color: string;
}

export interface Course {
  id: string;
  icon: string;
  title: string;
  color: string;
  duration: string;
  description: string;
  topics: string[];
}

export interface CareerFeature {
  icon: string;
  title: string;
  description: string;
}

export interface PlacementCard {
  name: string;
  role: string;
  company: string;
  lpa: string;
  qualifier: string;
  image: string;
  featured: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Step {
  step: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Domain {
  icon: string;
  title: string;
  color: string;
  bg: string;
  pill: string;
  skills: string[];
  description: string;
}

export interface WhyUsItem {
  icon: string;
  title: string;
  description: string;
}

export interface YTVideo {
  videoId: string;
  title: string;
  description: string;
}
