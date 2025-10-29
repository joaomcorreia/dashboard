export type SectionKey = 'hero' | 'services' | 'cta' | 'footer';

export type TemplateMeta = {
  id: string;
  name: string;
  sections: SectionKey[];
  preview?: string;
};

export const TEMPLATE_CATALOG: TemplateMeta[] = [
  {
    id: 'bs-split-002',
    name: 'Split Hero + Services',
    sections: ['hero','services','cta','footer'],
    preview: '/images/templates/bs-split-002.png'
  },
  {
    id: 'bs-clean-001',
    name: 'Clean Hero + Features (placeholder)',
    sections: ['hero','services','cta','footer'],
    preview: '/images/templates/bs-clean-001.png'
  }
];