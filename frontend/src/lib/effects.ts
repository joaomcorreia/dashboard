import { PageEffect } from '@/types/pageBuilder';

export const AVAILABLE_EFFECTS: PageEffect[] = [
  // Entrance Effects
  {
    id: 'fadeIn',
    name: 'Fade In',
    description: 'Element fades in smoothly',
    category: 'entrance',
    component: 'FadeInEffect',
    props: { duration: 800, delay: 0 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'fadeInUp',
    name: 'Fade In Up',
    description: 'Element fades in while moving up',
    category: 'entrance',
    component: 'FadeInUpEffect',
    props: { duration: 800, delay: 0, distance: 50 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'fadeInDown',
    name: 'Fade In Down',
    description: 'Element fades in while moving down',
    category: 'entrance',
    component: 'FadeInDownEffect',
    props: { duration: 800, delay: 0, distance: 50 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'slideInLeft',
    name: 'Slide In Left',
    description: 'Element slides in from the left',
    category: 'entrance',
    component: 'SlideInLeftEffect',
    props: { duration: 800, delay: 0, distance: 100 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'slideInRight',
    name: 'Slide In Right',
    description: 'Element slides in from the right',
    category: 'entrance',
    component: 'SlideInRightEffect',
    props: { duration: 800, delay: 0, distance: 100 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'zoomIn',
    name: 'Zoom In',
    description: 'Element zooms in from small to normal size',
    category: 'entrance',
    component: 'ZoomInEffect',
    props: { duration: 800, delay: 0, scale: 0.5 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'zoomOut',
    name: 'Zoom Out',
    description: 'Element zooms out from large to normal size',
    category: 'entrance',
    component: 'ZoomOutEffect',
    props: { duration: 800, delay: 0, scale: 1.5 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'bounceIn',
    name: 'Bounce In',
    description: 'Element bounces in with elastic effect',
    category: 'entrance',
    component: 'BounceInEffect',
    props: { duration: 1200, delay: 0 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'rotateIn',
    name: 'Rotate In',
    description: 'Element rotates while fading in',
    category: 'entrance',
    component: 'RotateInEffect',
    props: { duration: 800, delay: 0, rotation: 360 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'flipInX',
    name: 'Flip In X',
    description: 'Element flips in along X axis',
    category: 'entrance',
    component: 'FlipInXEffect',
    props: { duration: 800, delay: 0 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },

  // Scroll Effects
  {
    id: 'parallax',
    name: 'Parallax',
    description: 'Element moves at different speed while scrolling',
    category: 'scroll',
    component: 'ParallaxEffect',
    props: { speed: 0.5, direction: 'vertical' },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'scrollReveal',
    name: 'Scroll Reveal',
    description: 'Element reveals as you scroll',
    category: 'scroll',
    component: 'ScrollRevealEffect',
    props: { threshold: 0.3, duration: 800 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'stickyScroll',
    name: 'Sticky Scroll',
    description: 'Element sticks to viewport while scrolling',
    category: 'scroll',
    component: 'StickyScrollEffect',
    props: { offset: 100 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },

  // Hover Effects
  {
    id: 'hoverScale',
    name: 'Hover Scale',
    description: 'Element scales up on hover',
    category: 'hover',
    component: 'HoverScaleEffect',
    props: { scale: 1.1, duration: 300 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'hoverGlow',
    name: 'Hover Glow',
    description: 'Element glows on hover',
    category: 'hover',
    component: 'HoverGlowEffect',
    props: { color: '#3B82F6', intensity: 20 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'hoverTilt',
    name: 'Hover Tilt',
    description: 'Element tilts on hover',
    category: 'hover',
    component: 'HoverTiltEffect',
    props: { tiltAngle: 10, duration: 300 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'hoverShine',
    name: 'Hover Shine',
    description: 'Shine effect passes over element on hover',
    category: 'hover',
    component: 'HoverShineEffect',
    props: { duration: 600 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },

  // Click Effects
  {
    id: 'clickRipple',
    name: 'Click Ripple',
    description: 'Ripple effect on click',
    category: 'click',
    component: 'ClickRippleEffect',
    props: { color: '#3B82F6', duration: 600 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'clickPulse',
    name: 'Click Pulse',
    description: 'Pulse effect on click',
    category: 'click',
    component: 'ClickPulseEffect',
    props: { scale: 1.2, duration: 300 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },

  // Continuous Effects
  {
    id: 'float',
    name: 'Float',
    description: 'Element floats up and down continuously',
    category: 'continuous',
    component: 'FloatEffect',
    props: { amplitude: 10, duration: 3000 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Element pulses continuously',
    category: 'continuous',
    component: 'PulseEffect',
    props: { scale: 1.1, duration: 2000 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'rotate',
    name: 'Rotate',
    description: 'Element rotates continuously',
    category: 'continuous',
    component: 'RotateEffect',
    props: { duration: 4000, direction: 'clockwise' },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'swing',
    name: 'Swing',
    description: 'Element swings back and forth',
    category: 'continuous',
    component: 'SwingEffect',
    props: { angle: 15, duration: 2000 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },

  // Background Effects
  {
    id: 'gradientShift',
    name: 'Gradient Shift',
    description: 'Background gradient shifts colors',
    category: 'background',
    component: 'GradientShiftEffect',
    props: { colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'], duration: 5000 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'particleBackground',
    name: 'Particle Background',
    description: 'Animated particles in background',
    category: 'background',
    component: 'ParticleBackgroundEffect',
    props: { particleCount: 50, color: '#ffffff', speed: 1 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  {
    id: 'waveBackground',
    name: 'Wave Background',
    description: 'Animated wave effect in background',
    category: 'background',
    component: 'WaveBackgroundEffect',
    props: { amplitude: 50, frequency: 2, speed: 1 },
    preview: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }
];

// Helper functions
export const getEffectsByCategory = (category: PageEffect['category']) => {
  return AVAILABLE_EFFECTS.filter(effect => effect.category === category);
};

export const getEffectById = (id: string) => {
  return AVAILABLE_EFFECTS.find(effect => effect.id === id);
};

export const getAllCategories = () => {
  const categories = new Set(AVAILABLE_EFFECTS.map(effect => effect.category));
  return Array.from(categories);
};