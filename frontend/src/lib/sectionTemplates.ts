import { SectionTemplate } from '@/types/pageBuilder';

// Default Restaurant Template: jcw-rest-00
export const JCW_RESTAURANT_TEMPLATE: SectionTemplate[] = [
  {
    id: 'jcw-rest-00-hero',
    templateCode: 'jcw-rest-00',
    businessType: 'restaurant',
    sectionType: 'hero',
    displayName: {
      en: 'Restaurant Hero',
      es: 'Héroe del Restaurante',
      fr: 'Héros du Restaurant',
      de: 'Restaurant Held',
      pt: 'Herói do Restaurante',
      nl: 'Restaurant Held'
    },
    description: {
      en: 'Eye-catching hero section with restaurant name and call-to-action',
      es: 'Sección principal llamativa con nombre del restaurante y llamada a la acción',
      fr: 'Section héros accrocheuse avec nom du restaurant et appel à l\'action',
      de: 'Auffälliger Hero-Bereich mit Restaurantname und Handlungsaufruf',
      pt: 'Secção principal atrativa com nome do restaurante e chamada para ação',
      nl: 'Opvallende hero-sectie met restaurantnaam en oproep tot actie'
    },
    defaultContent: {
      en: {
        heading: 'Welcome to [Restaurant Name]',
        subheading: 'Authentic flavors, unforgettable experiences',
        text: 'Discover our carefully crafted dishes made with the finest ingredients and traditional recipes passed down through generations.',
        buttonText: 'View Menu',
        buttonLink: '#menu'
      },
      es: {
        heading: 'Bienvenido a [Nombre del Restaurante]',
        subheading: 'Sabores auténticos, experiencias inolvidables',
        text: 'Descubre nuestros platos cuidadosamente elaborados con los mejores ingredientes y recetas tradicionales transmitidas a través de generaciones.',
        buttonText: 'Ver Menú',
        buttonLink: '#menu'
      },
      fr: {
        heading: 'Bienvenue chez [Nom du Restaurant]',
        subheading: 'Saveurs authentiques, expériences inoubliables',
        text: 'Découvrez nos plats soigneusement élaborés avec les meilleurs ingrédients et des recettes traditionnelles transmises de génération en génération.',
        buttonText: 'Voir le Menu',
        buttonLink: '#menu'
      },
      de: {
        heading: 'Willkommen bei [Restaurant Name]',
        subheading: 'Authentische Aromen, unvergessliche Erlebnisse',
        text: 'Entdecken Sie unsere sorgfältig zubereiteten Gerichte mit den besten Zutaten und traditionellen Rezepten, die über Generationen weitergegeben wurden.',
        buttonText: 'Menü Ansehen',
        buttonLink: '#menu'
      },
      pt: {
        heading: 'Bem-vindo ao [Nome do Restaurante]',
        subheading: 'Sabores autênticos, experiências inesquecíveis',
        text: 'Descubra os nossos pratos cuidadosamente elaborados com os melhores ingredientes e receitas tradicionais transmitidas através de gerações.',
        buttonText: 'Ver Menu',
        buttonLink: '#menu'
      },
      nl: {
        heading: 'Welkom bij [Restaurant Naam]',
        subheading: 'Authentieke smaken, onvergetelijke ervaringen',
        text: 'Ontdek onze zorgvuldig bereide gerechten met de beste ingrediënten en traditionele recepten die van generatie op generatie zijn doorgegeven.',
        buttonText: 'Bekijk Menu',
        buttonLink: '#menu'
      }
    },
    defaultSettings: {
      backgroundColor: 'bg-gradient-to-r from-orange-500 to-red-600',
      textColor: 'text-white',
      padding: 'py-20 px-6',
      layout: 'center',
      showImage: true,
      imagePosition: 'background',
      effect: 'fadeInUp'
    },
    businessTypeMapping: {
      cafe: {
        displayName: {
          en: 'Cafe Hero',
          es: 'Héroe del Café',
          fr: 'Héros du Café',
          de: 'Café Held',
          pt: 'Herói do Café',
          nl: 'Café Held'
        }
      },
      bakery: {
        displayName: {
          en: 'Bakery Hero',
          es: 'Héroe de la Panadería',
          fr: 'Héros de la Boulangerie',
          de: 'Bäckerei Held',
          pt: 'Herói da Padaria',
          nl: 'Bakkerij Held'
        }
      },
      pizzeria: {
        displayName: {
          en: 'Pizzeria Hero',
          es: 'Héroe de la Pizzería',
          fr: 'Héros de la Pizzeria',
          de: 'Pizzeria Held',
          pt: 'Herói da Pizzaria',
          nl: 'Pizzeria Held'
        }
      }
    }
  },
  {
    id: 'jcw-rest-00-about',
    templateCode: 'jcw-rest-00',
    businessType: 'restaurant',
    sectionType: 'about',
    displayName: {
      en: 'About Us',
      es: 'Acerca de Nosotros',
      fr: 'À Propos de Nous',
      de: 'Über Uns',
      pt: 'Sobre Nós',
      nl: 'Over Ons'
    },
    description: {
      en: 'Tell your restaurant\'s story and what makes you special',
      es: 'Cuenta la historia de tu restaurante y lo que te hace especial',
      fr: 'Racontez l\'histoire de votre restaurant et ce qui vous rend spécial',
      de: 'Erzählen Sie die Geschichte Ihres Restaurants und was Sie besonders macht',
      pt: 'Conte a história do seu restaurante e o que o torna especial',
      nl: 'Vertel het verhaal van je restaurant en wat je bijzonder maakt'
    },
    defaultContent: {
      en: {
        heading: 'Our Story',
        subheading: 'A tradition of excellence since [Year]',
        text: 'Founded with a passion for bringing authentic flavors to our community, our restaurant has been serving exceptional dishes for over [X] years. Our commitment to quality ingredients, traditional cooking methods, and warm hospitality creates an unforgettable dining experience.'
      },
      es: {
        heading: 'Nuestra Historia',
        subheading: 'Una tradición de excelencia desde [Año]',
        text: 'Fundado con la pasión de traer sabores auténticos a nuestra comunidad, nuestro restaurante ha estado sirviendo platos excepcionales durante más de [X] años. Nuestro compromiso con ingredientes de calidad, métodos de cocina tradicionales y hospitalidad cálida crea una experiencia gastronómica inolvidable.'
      },
      fr: {
        heading: 'Notre Histoire',
        subheading: 'Une tradition d\'excellence depuis [Année]',
        text: 'Fondé avec la passion d\'apporter des saveurs authentiques à notre communauté, notre restaurant sert des plats exceptionnels depuis plus de [X] ans. Notre engagement envers des ingrédients de qualité, des méthodes de cuisson traditionnelles et une hospitalité chaleureuse crée une expérience culinaire inoubliable.'
      },
      de: {
        heading: 'Unsere Geschichte',
        subheading: 'Eine Tradition der Exzellenz seit [Jahr]',
        text: 'Gegründet mit der Leidenschaft, authentische Aromen in unsere Gemeinschaft zu bringen, serviert unser Restaurant seit über [X] Jahren außergewöhnliche Gerichte. Unser Engagement für Qualitätszutaten, traditionelle Kochmethoden und warme Gastfreundschaft schafft ein unvergessliches Speiseerlebnis.'
      },
      pt: {
        heading: 'A Nossa História',
        subheading: 'Uma tradição de excelência desde [Ano]',
        text: 'Fundado com a paixão de trazer sabores autênticos à nossa comunidade, o nosso restaurante tem servido pratos excecionais há mais de [X] anos. O nosso compromisso com ingredientes de qualidade, métodos de cozinha tradicionais e hospitalidade calorosa cria uma experiência gastronómica inesquecível.'
      },
      nl: {
        heading: 'Ons Verhaal',
        subheading: 'Een traditie van uitmuntendheid sinds [Jaar]',
        text: 'Opgericht met een passie voor het brengen van authentieke smaken naar onze gemeenschap, serveert ons restaurant al meer dan [X] jaar uitzonderlijke gerechten. Onze toewijding aan kwaliteitsingrediënten, traditionele kookmethoden en warme gastvrijheid creëert een onvergetelijke eetervaring.'
      }
    },
    defaultSettings: {
      backgroundColor: 'bg-white',
      textColor: 'text-gray-800',
      padding: 'py-16 px-6',
      layout: 'left',
      showImage: true,
      imagePosition: 'right',
      effect: 'slideInLeft'
    },
    businessTypeMapping: {
      cafe: {
        displayName: {
          en: 'Our Cafe Story',
          es: 'Historia de Nuestro Café',
          fr: 'L\'Histoire de Notre Café',
          de: 'Unsere Café Geschichte',
          pt: 'História do Nosso Café',
          nl: 'Ons Café Verhaal'
        }
      }
    }
  },
  {
    id: 'jcw-rest-00-menu',
    templateCode: 'jcw-rest-00',
    businessType: 'restaurant',
    sectionType: 'menu',
    displayName: {
      en: 'Menu',
      es: 'Menú',
      fr: 'Menu',
      de: 'Speisekarte',
      pt: 'Menu',
      nl: 'Menu'
    },
    description: {
      en: 'Showcase your delicious dishes and beverages',
      es: 'Muestra tus deliciosos platos y bebidas',
      fr: 'Présentez vos délicieux plats et boissons',
      de: 'Präsentieren Sie Ihre köstlichen Gerichte und Getränke',
      pt: 'Mostre os seus deliciosos pratos e bebidas',
      nl: 'Toon je heerlijke gerechten en drankjes'
    },
    defaultContent: {
      en: {
        heading: 'Our Menu',
        subheading: 'Carefully crafted dishes made with love',
        items: [
          {
            title: '[Menu Item Name]',
            description: '[Menu item description]',
            price: '$0.00',
            category: '[Category]',
            image: '/images/menu/placeholder.jpg'
          }
        ]
      },
      es: {
        heading: 'Nuestro Menú',
        subheading: 'Platos cuidadosamente elaborados con amor',
        items: [
          {
            title: '[Nombre del Artículo del Menú]',
            description: '[Descripción del artículo del menú]',
            price: '$0.00',
            category: '[Categoría]',
            image: '/images/menu/placeholder.jpg'
          }
        ]
      }
    },
    defaultSettings: {
      backgroundColor: 'bg-gray-50',
      textColor: 'text-gray-800',
      padding: 'py-16 px-6',
      layout: 'grid',
      columns: 3,
      showImage: true,
      imagePosition: 'top',
      effect: 'zoomIn'
    },
    businessTypeMapping: {
      cafe: {
        displayName: {
          en: 'Coffee & Treats',
          es: 'Café y Dulces',
          fr: 'Café et Friandises',
          de: 'Kaffee & Leckereien',
          pt: 'Café e Doces',
          nl: 'Koffie & Lekkernijen'
        }
      },
      bakery: {
        displayName: {
          en: 'Fresh Baked Goods',
          es: 'Productos Horneados Frescos',
          fr: 'Produits de Boulangerie Frais',
          de: 'Frische Backwaren',
          pt: 'Produtos de Padaria Frescos',
          nl: 'Verse Bakkerijproducten'
        }
      }
    }
  },
  {
    id: 'jcw-rest-00-pricing',
    templateCode: 'jcw-rest-00',
    businessType: 'restaurant',
    sectionType: 'pricing',
    displayName: {
      en: 'Pricing Plans',
      es: 'Planes de Precios',
      fr: 'Plans Tarifaires',
      de: 'Preispläne',
      pt: 'Planos de Preços',
      nl: 'Prijsplannen'
    },
    description: {
      en: 'Display your service packages and pricing options',
      es: 'Muestra tus paquetes de servicios y opciones de precios',
      fr: 'Affichez vos forfaits de services et options tarifaires',
      de: 'Zeigen Sie Ihre Servicepakete und Preisoptionen',
      pt: 'Mostre os seus pacotes de serviços e opções de preços',
      nl: 'Toon je servicepakketten en prijsopties'
    },
    defaultContent: {
      en: {
        heading: 'Choose Your Plan',
        subheading: 'Select the perfect plan for your needs',
        items: [
          {
            title: '[Plan Name]',
            description: '[Plan description]',
            price: '$0.00',
            category: '[billing period]',
            features: [
              '[Feature 1]',
              '[Feature 2]',
              '[Feature 3]'
            ],
            highlighted: false,
            buttonText: '[Button Text]',
            buttonLink: '#contact'
          }
        ]
      },
      es: {
        heading: 'Elige Tu Plan',
        subheading: 'Selecciona el plan perfecto para tus necesidades',
        items: [
          {
            title: '[Nombre del Plan]',
            description: '[Descripción del plan]',
            price: '$0.00',
            category: '[período de facturación]',
            features: [
              '[Característica 1]',
              '[Característica 2]',
              '[Característica 3]'
            ],
            highlighted: false,
            buttonText: '[Texto del Botón]',
            buttonLink: '#contact'
          }
        ]
      },
      fr: {
        heading: 'Choisissez Votre Plan',
        subheading: 'Sélectionnez le plan parfait pour vos besoins',
        items: [
          {
            title: 'Plan de Base',
            description: 'Parfait pour commencer',
            price: '$9.99',
            category: 'mensuel',
            features: [
              '1 Site Web',
              '10GB Stockage',
              'Support de Base',
              'Certificat SSL',
              '99.9% Disponibilité'
            ],
            highlighted: false,
            buttonText: 'Commencer',
            buttonLink: '#contact'
          },
          {
            title: 'Plan Pro',
            description: 'Le choix le plus populaire',
            price: '$19.99',
            category: 'mensuel',
            features: [
              '5 Sites Web',
              '50GB Stockage',
              'Support Prioritaire',
              'Certificat SSL',
              '99.9% Disponibilité',
              'Domaine Gratuit',
              'Comptes Email'
            ],
            highlighted: true,
            buttonText: 'Essai Gratuit',
            buttonLink: '#contact'
          },
          {
            title: 'Enterprise',
            description: 'Pour les entreprises en croissance',
            price: '$49.99',
            category: 'mensuel',
            features: [
              'Sites Web Illimités',
              '200GB Stockage',
              'Support Premium',
              'Certificat SSL',
              '99.9% Disponibilité',
              'Domaine Gratuit',
              'Email Illimité',
              'Sécurité Avancée',
              'CDN Inclus'
            ],
            highlighted: false,
            buttonText: 'Contacter Ventes',
            buttonLink: '#contact'
          }
        ]
      },
      de: {
        heading: 'Wählen Sie Ihren Plan',
        subheading: 'Wählen Sie den perfekten Plan für Ihre Bedürfnisse',
        items: [
          {
            title: 'Basis Plan',
            description: 'Perfekt für den Einstieg',
            price: '$9.99',
            category: 'monatlich',
            features: [
              '1 Website',
              '10GB Speicher',
              'Basis Support',
              'SSL Zertifikat',
              '99.9% Verfügbarkeit'
            ],
            highlighted: false,
            buttonText: 'Loslegen',
            buttonLink: '#contact'
          },
          {
            title: 'Pro Plan',
            description: 'Die beliebteste Wahl',
            price: '$19.99',
            category: 'monatlich',
            features: [
              '5 Websites',
              '50GB Speicher',
              'Prioritäts Support',
              'SSL Zertifikat',
              '99.9% Verfügbarkeit',
              'Kostenlose Domain',
              'Email Konten'
            ],
            highlighted: true,
            buttonText: 'Kostenlos Testen',
            buttonLink: '#contact'
          },
          {
            title: 'Enterprise',
            description: 'Für wachsende Unternehmen',
            price: '$49.99',
            category: 'monatlich',
            features: [
              'Unbegrenzte Websites',
              '200GB Speicher',
              'Premium Support',
              'SSL Zertifikat',
              '99.9% Verfügbarkeit',
              'Kostenlose Domain',
              'Unbegrenzte Email',
              'Erweiterte Sicherheit',
              'CDN Inklusive'
            ],
            highlighted: false,
            buttonText: 'Vertrieb Kontaktieren',
            buttonLink: '#contact'
          }
        ]
      },
      pt: {
        heading: 'Escolha o Seu Plano',
        subheading: 'Selecione o plano perfeito para as suas necessidades',
        items: [
          {
            title: 'Plano Básico',
            description: 'Perfeito para começar',
            price: '$9.99',
            category: 'mensal',
            features: [
              '1 Website',
              '10GB Armazenamento',
              'Suporte Básico',
              'Certificado SSL',
              '99.9% Disponibilidade'
            ],
            highlighted: false,
            buttonText: 'Começar',
            buttonLink: '#contact'
          },
          {
            title: 'Plano Pro',
            description: 'A escolha mais popular',
            price: '$19.99',
            category: 'mensal',
            features: [
              '5 Websites',
              '50GB Armazenamento',
              'Suporte Prioritário',
              'Certificado SSL',
              '99.9% Disponibilidade',
              'Domínio Grátis',
              'Contas de Email'
            ],
            highlighted: true,
            buttonText: 'Teste Grátis',
            buttonLink: '#contact'
          },
          {
            title: 'Enterprise',
            description: 'Para empresas em crescimento',
            price: '$49.99',
            category: 'mensal',
            features: [
              'Websites Ilimitados',
              '200GB Armazenamento',
              'Suporte Premium',
              'Certificado SSL',
              '99.9% Disponibilidade',
              'Domínio Grátis',
              'Email Ilimitado',
              'Segurança Avançada',
              'CDN Incluído'
            ],
            highlighted: false,
            buttonText: 'Contactar Vendas',
            buttonLink: '#contact'
          }
        ]
      },
      nl: {
        heading: 'Kies Uw Plan',
        subheading: 'Selecteer het perfecte plan voor uw behoeften',
        items: [
          {
            title: 'Basis Plan',
            description: 'Perfect om te beginnen',
            price: '$9.99',
            category: 'maandelijks',
            features: [
              '1 Website',
              '10GB Opslag',
              'Basis Ondersteuning',
              'SSL Certificaat',
              '99.9% Uptime'
            ],
            highlighted: false,
            buttonText: 'Beginnen',
            buttonLink: '#contact'
          },
          {
            title: 'Pro Plan',
            description: 'De populairste keuze',
            price: '$19.99',
            category: 'maandelijks',
            features: [
              '5 Websites',
              '50GB Opslag',
              'Prioriteits Ondersteuning',
              'SSL Certificaat',
              '99.9% Uptime',
              'Gratis Domein',
              'Email Accounts'
            ],
            highlighted: true,
            buttonText: 'Gratis Proef',
            buttonLink: '#contact'
          },
          {
            title: 'Enterprise',
            description: 'Voor groeiende bedrijven',
            price: '$49.99',
            category: 'maandelijks',
            features: [
              'Onbeperkte Websites',
              '200GB Opslag',
              'Premium Ondersteuning',
              'SSL Certificaat',
              '99.9% Uptime',
              'Gratis Domein',
              'Onbeperkte Email',
              'Geavanceerde Beveiliging',
              'CDN Inbegrepen'
            ],
            highlighted: false,
            buttonText: 'Contact Verkoop',
            buttonLink: '#contact'
          }
        ]
      }
    },
    defaultSettings: {
      backgroundColor: 'bg-gray-50',
      textColor: 'text-gray-800',
      padding: 'py-16 px-6',
      layout: 'grid',
      columns: 3,
      showImage: false,
      effect: 'fadeInUp'
    },
    businessTypeMapping: {
      hosting: {
        displayName: {
          en: 'Hosting Plans',
          es: 'Planes de Hosting',
          fr: 'Plans d\'Hébergement',
          de: 'Hosting Pläne',
          pt: 'Planos de Hosting',
          nl: 'Hosting Plannen'
        }
      },
      saas: {
        displayName: {
          en: 'Subscription Plans',
          es: 'Planes de Suscripción',
          fr: 'Plans d\'Abonnement',
          de: 'Abonnement Pläne',
          pt: 'Planos de Subscrição',
          nl: 'Abonnement Plannen'
        }
      },
      agency: {
        displayName: {
          en: 'Service Packages',
          es: 'Paquetes de Servicios',
          fr: 'Forfaits de Services',
          de: 'Service Pakete',
          pt: 'Pacotes de Serviços',
          nl: 'Service Pakketten'
        }
      }
    }
  }
];

// Function to get template sections based on business type
export function getTemplateForBusinessType(
  templateCode: string,
  businessType: string,
  locale: string = 'en'
): SectionTemplate[] {
  const template = JCW_RESTAURANT_TEMPLATE.filter(section => 
    section.templateCode === templateCode
  );

  return template.map(section => ({
    ...section,
    displayName: section.businessTypeMapping[businessType]?.displayName || section.displayName,
    // Apply any business type specific content adjustments
    defaultContent: {
      ...section.defaultContent,
      ...section.businessTypeMapping[businessType]?.contentAdjustments?.[locale]
    }
  }));
}