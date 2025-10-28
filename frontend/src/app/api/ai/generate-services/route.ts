import { NextRequest, NextResponse } from 'next/server';

interface BusinessData {
  businessName: string;
  description: string;
  address?: string;
  phone?: string;
  email?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, businessData }: { prompt: string; businessData: BusinessData } = await request.json();
    
    // Check if AI is enabled
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Enhanced prompt for better service generation
    const enhancedPrompt = `You are an expert business consultant. Generate relevant services for this business:

Business Details:
- Name: ${businessData.businessName}
- Description: ${businessData.description}
- Type: ${getBusinessType(businessData.businessName, businessData.description)}

Requirements:
1. Generate 6-8 practical services this business would realistically offer
2. Each service should have a concise name (2-4 words) and brief description (1-2 sentences)
3. Focus on services that would appeal to their target customers
4. Consider industry standards and common offerings
5. Make descriptions engaging and benefit-focused

Return ONLY a JSON array in this exact format:
[{"name": "Service Name", "description": "Customer-focused description highlighting the benefit"}]

Examples for reference:
- Restaurant: Dine-in Service, Takeout Orders, Catering, Private Events, Online Ordering, Delivery Service
- Salon: Haircuts & Styling, Hair Coloring, Manicure & Pedicure, Facial Treatments, Wedding Packages
- Gym: Personal Training, Group Classes, Nutrition Consulting, Fitness Assessment`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a business services expert. Always return valid JSON arrays only.'
          },
          {
            role: 'user',
            content: enhancedPrompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return NextResponse.json(
        { error: `OpenAI API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content?.trim();

    if (!aiResponse) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let services;
    try {
      // Clean the response to ensure it's valid JSON
      const cleanedResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
      services = JSON.parse(cleanedResponse);
      
      // Validate the structure
      if (!Array.isArray(services) || services.length === 0) {
        throw new Error('Invalid services format');
      }

      // Ensure each service has required fields
      services = services.map((service: any) => ({
        name: service.name || 'Unnamed Service',
        description: service.description || 'Service description not available'
      }));

    } catch (parseError) {
      console.error('JSON parsing error:', parseError, 'Raw response:', aiResponse);
      
      // Fallback services based on business type
      services = getFallbackServices(businessData);
    }

    return NextResponse.json({
      success: true,
      services: services.slice(0, 8), // Limit to 8 services
      businessData
    });

  } catch (error) {
    console.error('AI service generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate services' },
      { status: 500 }
    );
  }
}

// Helper function to determine business type
function getBusinessType(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();
  
  if (text.includes('restaurant') || text.includes('food') || text.includes('dining') || text.includes('cafe')) {
    return 'Restaurant/Food Service';
  } else if (text.includes('salon') || text.includes('hair') || text.includes('beauty') || text.includes('spa')) {
    return 'Beauty/Wellness';
  } else if (text.includes('gym') || text.includes('fitness') || text.includes('training') || text.includes('exercise')) {
    return 'Fitness/Health';
  } else if (text.includes('shop') || text.includes('store') || text.includes('retail') || text.includes('sell')) {
    return 'Retail';
  } else if (text.includes('service') || text.includes('repair') || text.includes('maintenance')) {
    return 'Service Business';
  }
  
  return 'General Business';
}

// Fallback services if AI fails
function getFallbackServices(businessData: BusinessData) {
  const name = businessData.businessName.toLowerCase();
  const description = businessData.description.toLowerCase();
  
  if (name.includes('restaurant') || description.includes('food') || description.includes('dining')) {
    return [
      { name: 'Dine-in Service', description: 'Full restaurant dining experience with table service' },
      { name: 'Takeout Orders', description: 'Quick pickup service for customers on the go' },
      { name: 'Delivery Service', description: 'Food delivered directly to your door' },
      { name: 'Catering', description: 'Professional catering for events and special occasions' },
      { name: 'Private Events', description: 'Host your special celebrations in our space' },
      { name: 'Online Ordering', description: 'Convenient online ordering system' }
    ];
  } else if (name.includes('salon') || description.includes('hair') || description.includes('beauty')) {
    return [
      { name: 'Haircuts & Styling', description: 'Professional hair cutting and styling services' },
      { name: 'Hair Coloring', description: 'Expert hair coloring and highlighting' },
      { name: 'Manicure & Pedicure', description: 'Complete nail care services' },
      { name: 'Facial Treatments', description: 'Rejuvenating facial and skincare treatments' },
      { name: 'Wedding Packages', description: 'Special bridal beauty packages' }
    ];
  } else {
    return [
      { name: 'Consultation', description: 'Expert consultation for your needs' },
      { name: 'Custom Solutions', description: 'Tailored solutions for your requirements' },
      { name: 'Support Services', description: 'Ongoing support and maintenance' },
      { name: 'Premium Package', description: 'Our most comprehensive service offering' }
    ];
  }
}