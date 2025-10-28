// Font configuration for the Just Code Works SaaS platform
// This file centralizes font settings for easy customization

export const fontConfig = {
  // Logo/Brand font settings
  logo: {
    family: 'Saira Stencil One',
    fallback: 'cursive',
    googleFont: 'Saira+Stencil+One:wght@400',
    className: 'font-logo',
    weight: '400',
    tracking: 'tracking-wide'
  },
  
  // Display/Heading font (can be different from logo)
  display: {
    family: 'Saira Stencil One',
    fallback: 'cursive', 
    googleFont: 'Saira+Stencil+One:wght@400',
    className: 'font-display',
    weight: '400',
    tracking: 'tracking-wide'
  },
  
  // Body text font
  body: {
    family: 'Inter',
    fallback: 'system-ui, sans-serif',
    googleFont: 'Inter:wght@100;200;300;400;500;600;700;800;900',
    className: 'font-sans',
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    tracking: 'tracking-normal'
  }
};

// Helper function to generate Google Fonts URL
export const getGoogleFontsUrl = () => {
  const fonts = [
    fontConfig.logo.googleFont,
    fontConfig.body.googleFont
  ].filter((font, index, arr) => arr.indexOf(font) === index); // Remove duplicates
  
  return `https://fonts.googleapis.com/css2?${fonts.map(font => `family=${font}`).join('&')}&display=swap`;
};

// Helper function to get Tailwind font family config
export const getTailwindFontConfig = () => {
  return {
    sans: [fontConfig.body.family, fontConfig.body.fallback],
    logo: [fontConfig.logo.family, fontConfig.logo.fallback],
    display: [fontConfig.display.family, fontConfig.display.fallback]
  };
};

// CSS classes for common font combinations
export const fontClasses = {
  // Logo styles
  logoNav: `text-2xl ${fontConfig.logo.className} font-normal text-gray-900 ${fontConfig.logo.tracking}`,
  logoAuth: `text-3xl ${fontConfig.logo.className} font-normal text-gray-900 ${fontConfig.logo.tracking}`,
  logoHero: `text-4xl sm:text-5xl lg:text-6xl ${fontConfig.logo.className} font-normal text-gray-900 ${fontConfig.logo.tracking}`,
  
  // Display/heading styles
  displayLarge: `text-3xl ${fontConfig.display.className} font-normal ${fontConfig.display.tracking}`,
  displayMedium: `text-2xl ${fontConfig.display.className} font-normal ${fontConfig.display.tracking}`,
  displaySmall: `text-xl ${fontConfig.display.className} font-normal ${fontConfig.display.tracking}`,
  
  // Body text styles (using Inter)
  bodyLarge: `text-lg ${fontConfig.body.className} font-normal ${fontConfig.body.tracking}`,
  bodyMedium: `text-base ${fontConfig.body.className} font-normal ${fontConfig.body.tracking}`,
  bodySmall: `text-sm ${fontConfig.body.className} font-normal ${fontConfig.body.tracking}`
};

// Instructions for changing fonts:
/*
  TO CHANGE THE LOGO FONT:
  1. Update fontConfig.logo.family with the new font name
  2. Update fontConfig.logo.googleFont with the Google Fonts import string
  3. Update fontConfig.logo.fallback if needed
  4. The changes will automatically apply throughout the app
  
  TO CHANGE THE BODY FONT:
  1. Update fontConfig.body.family with the new font name  
  2. Update fontConfig.body.googleFont with the Google Fonts import string
  3. Update fontConfig.body.fallback if needed
  
  EXAMPLES OF POPULAR FONTS:
  
  For Logo (Display fonts):
  - Saira Stencil One: 'Saira+Stencil+One:wght@400'
  - Orbitron: 'Orbitron:wght@400;700;900'
  - Russo One: 'Russo+One'
  - Rajdhani: 'Rajdhani:wght@300;400;500;600;700'
  - Exo 2: 'Exo+2:wght@100;200;300;400;500;600;700;800;900'
  
  For Body (Sans-serif fonts):
  - Inter: 'Inter:wght@100;200;300;400;500;600;700;800;900'
  - Poppins: 'Poppins:wght@100;200;300;400;500;600;700;800;900'
  - Roboto: 'Roboto:wght@100;300;400;500;700;900'
  - Open Sans: 'Open+Sans:wght@300;400;500;600;700;800'
  - Nunito: 'Nunito:wght@200;300;400;500;600;700;800;900'
*/