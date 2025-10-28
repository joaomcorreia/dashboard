import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { businessName, existingDescription } = await request.json();
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const prompt = `Create a compelling, concise tagline for this business:

Business Name: ${businessName}
${existingDescription ? `Business Context: ${existingDescription}` : ''}

Requirements:
1. Must be 3-8 words maximum
2. Catchy and memorable
3. Reflects the business essence
4. Professional but engaging
5. No generic phrases like "Your trusted partner"

Examples of good taglines:
- "Fresh flavors, family recipes"
- "Where quality meets comfort"
- "Crafted with passion daily"
- "Your neighborhood gem"
- "Authentic taste, modern style"

Return ONLY the tagline text, no quotes or explanation.`;

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
            content: 'You are a creative marketing expert. Create compelling taglines that capture the essence of businesses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 50,
        temperature: 0.8,
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
    const tagline = data.choices[0]?.message?.content?.trim();

    if (!tagline) {
      return NextResponse.json(
        { error: 'No tagline generated' },
        { status: 500 }
      );
    }

    // Clean the tagline (remove quotes if present)
    const cleanTagline = tagline.replace(/^["']|["']$/g, '');

    return NextResponse.json({
      success: true,
      tagline: cleanTagline,
      businessName
    });

  } catch (error) {
    console.error('Tagline generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate tagline' },
      { status: 500 }
    );
  }
}