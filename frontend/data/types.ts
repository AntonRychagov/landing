/**
 * Type definitions for portfolio landing page data
 */

export interface PortfolioProject {
  id: string;
  title: string;
  year: number;
  role: 'director' | 'screenwriter' | 'both';
  description: string;
  fullDescription?: string;
  posterImage: string;
  images?: string[];
  videoUrl?: string;
  videoType?: 'youtube' | 'vimeo' | 'instagram' | 'local';
  watchUrl?: string;
  genre?: string;
  duration?: string;
  awards?: string[];
  nominations?: string[];
}

export interface ContactInfo {
  email: string;
  instagram?: string;
  phone?: string;
  website?: string;
  otherSocials?: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
}

export interface PersonalInfo {
  name: string;
  fullName?: string;
  profession: string[];
  bio: string; // Short bio for Hero section
  aboutBio?: string; // Extended bio for About section
  education?: string[];
  philosophy?: string;
  interests?: string[];
  profileImage: string;
  profileImages?: string[];
  backgroundVideo?: string;
  instagramUrl: string;
  followers?: number;
}

export interface Award {
  id: string;
  year: number;
  title: string;
  festival: string;
  category: string;
  description?: string;
  logo?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  publication?: string;
  logo?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  projects: PortfolioProject[];
  contact: ContactInfo;
}
