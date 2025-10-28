import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { businessName, currentDescription, tagline, additionalInfo } = await request.json();
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Determine if this is enhancement or fresh generation
    const isEnhancement = currentDescription && currentDescription.length > 20;
    
    const basePrompt = `Business: ${businessName}
${tagline ? `Tagline: ${tagline}` : ''}
${additionalInfo?.length ? `Keywords mentioned: ${additionalInfo.join(', ')}` : ''}`;

    let prompt;
    
    if (isEnhancement) {
      prompt = `Enhance this business description by incorporating the keywords and making it more engaging:

${basePrompt}
Current Description: ${currentDescription}

Instructions:
1. Keep the core message but enhance it
2. Naturally incorporate any cuisine types or keywords mentioned
3. Make it more compelling and detailed
4. 2-3 sentences, 50-100 words
5. Focus on what makes this business special
6. Use active, engaging language

Return ONLY the enhanced description.`;
    } else {
      prompt = `Create a compelling business description:

${basePrompt}

Instructions:
1. Write 2-3 engaging sentences (50-100 words)
2. Capture what makes this business unique
3. Include atmosphere, quality, and customer experience
4. Naturally incorporate any cuisine types mentioned
5. Use warm, inviting language
6. Focus on benefits to customers

Examples:
- "We serve traditional Italian dishes made with fresh ingredients and family recipes passed down for generations. From handmade pasta to wood-fired pizzas, every meal is crafted with love and passion for authentic Italian flavors."
- "Our cozy café offers expertly crafted coffee and fresh pastries in a warm, welcoming atmosphere. Whether you're catching up with friends or finding a quiet moment, we're your perfect neighborhood retreat."

Return ONLY the description text.`;
    }

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
            content: 'You are a professional copywriter specializing in business descriptions. Create engaging, authentic content that attracts customers.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
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
    const description = data.choices[0]?.message?.content?.trim();

    if (!description) {
      return NextResponse.json(
        { error: 'No description generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      description: description,
      businessName,
      wasEnhancement: isEnhancement
    });

  } catch (error) {
    console.error('Description generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    );
  }
}