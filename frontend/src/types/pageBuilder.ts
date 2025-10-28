export interface SectionTemplate {
  id: string;
  templateCode: string; // e.g., 'jcw-rest-00'
  businessType: string; // e.g., 'restaurant'
  sectionType: string;
  displayName: {
    [locale: string]: string;
  };
  description: {
    [locale: string]: string;
  };
  defaultContent: {
    [locale: string]: {
      heading?: string;
      subheading?: string;
      text?: string;
      buttonText?: string;
      buttonLink?: string;
      items?: Array<{
        title?: string;
        description?: string;
        image?: string;
        link?: string;
        price?: string;
        category?: string;
        features?: string[];
        highlighted?: boolean;
        buttonText?: string;
        buttonLink?: string;
      }>;
    };
  };
  defaultSettings: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
    animation?: string;
    layout?: 'left' | 'right' | 'center' | 'grid' | 'carousel' | 'masonry';
    columns?: number;
    showImage?: boolean;
    imagePosition?: 'left' | 'right' | 'top' | 'bottom' | 'background';
    effect?: string;
  };
  businessTypeMapping: {
    [businessType: string]: {
      displayName: {
        [locale: string]: string;
      };
      contentAdjustments?: any;
    };
  };
}

export interface PageSection {
  id: string;
  templateId: string; // References SectionTemplate
  sectionType: string;
  title: string;
  content: {
    [locale: string]: {
      heading?: string;
      subheading?: string;
      text?: string;
      buttonText?: string;
      buttonLink?: string;
      items?: Array<{
        title?: string;
        description?: string;
        image?: string;
        link?: string;
        price?: string;
        category?: string;
        features?: string[];
        highlighted?: boolean;
        buttonText?: string;
        buttonLink?: string;
        [key: string]: any;
      }>;
    };
  };
  settings: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
    animation?: string;
    layout?: 'left' | 'right' | 'center' | 'grid' | 'carousel' | 'masonry';
    columns?: number;
    showImage?: boolean;
    imagePosition?: 'left' | 'right' | 'top' | 'bottom' | 'background';
    effect?: string;
    customCSS?: string;
  };
  order: number;
  isVisible: boolean;
  isEditable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EditablePage {
  id: string;
  slug: string;
  name: string;
  title: {
    [locale: string]: string;
  };
  description: {
    [locale: string]: string;
  };
  sections: PageSection[];
  isPublished: boolean;
  seoSettings: {
    [locale: string]: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string[];
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface PageEffect {
  id: string;
  name: string;
  description: string;
  category: 'entrance' | 'scroll' | 'hover' | 'click' | 'continuous' | 'background';
  component: string;
  props?: Record<string, any>;
  preview: string; // Base64 image or GIF
}

export interface WebsiteBuilder {
  currentStep: number;
  totalSteps: number;
  pages: EditablePage[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    borderRadius: string;
  };
  userInfo: {
    businessName: string;
    industry: string;
    targetAudience: string;
    goals: string[];
  };
}