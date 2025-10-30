import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// In-memory storage for demo purposes
// In a real app, this would be stored in a database
let websites: any[] = [];
let websiteIdCounter = 1;

// Simple file-based persistence for demo
const DATA_FILE = path.join(process.cwd(), 'data', 'websites.json');

// Load websites from file on startup
async function loadWebsites() {
  try {
    if (existsSync(DATA_FILE)) {
      const data = await readFile(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      websites = parsed.websites || [];
      websiteIdCounter = parsed.counter || 1;
      console.log('Loaded', websites.length, 'websites from file');
    }
  } catch (error) {
    console.log('Could not load websites from file:', error);
  }
}

// Save websites to file
async function saveWebsites() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!existsSync(dir)) {
      await writeFile(path.join(process.cwd(), 'data', '.gitkeep'), '');
    }
    
    await writeFile(DATA_FILE, JSON.stringify({
      websites,
      counter: websiteIdCounter
    }, null, 2));
    console.log('Saved', websites.length, 'websites to file');
  } catch (error) {
    console.log('Could not save websites to file:', error);
  }
}

// Initialize on first load
loadWebsites();

export async function GET() {
  await loadWebsites(); // Reload from file in case of server restart
  console.log('GET /api/websites - Current websites:', websites.length, websites.map(w => w.name));
  return NextResponse.json({
    success: true,
    websites: websites
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('POST /api/websites - Creating website with data:', data);
    
    // Create a new website object
    const newWebsite = {
      id: websiteIdCounter++,
      name: data.businessName || 'My Business',
      businessName: data.businessName,
      domain: data.businessName ? `${data.businessName.toLowerCase().replace(/\s+/g, '-')}.com` : 'my-business.com',
      status: 'published' as const,
      lastUpdated: 'Just now',
      pageViews: 0,
      thumbnail: '/api/placeholder/300/200',
      createdAt: new Date().toISOString(),
      data: data, // Store all the business data
      template: data.selectedTemplate,
      previewUrl: generatePreviewUrl(data)
    };
    
    websites.push(newWebsite);
    await saveWebsites(); // Persist to file
    console.log('POST /api/websites - Website created:', newWebsite.name, 'Total websites:', websites.length);
    
    return NextResponse.json({
      success: true,
      website: newWebsite
    });
  } catch (error) {
    console.error('Error creating website:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create website' },
      { status: 500 }
    );
  }
}

function generatePreviewUrl(businessData: any): string {
  // Generate a preview URL based on the business data
  // For demo purposes, we'll create a data URL with HTML content
  const htmlContent = generateWebsiteHTML(businessData);
  
  // In a real app, you would save this to a file or database and return the URL
  // For now, we'll return a placeholder URL that the iframe can load
  return `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
}

function generateWebsiteHTML(data: any): string {
  // Generate a simple HTML website based on the business data
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName || 'My Business'}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 0; text-align: center; }
        .header h1 { font-size: 3rem; margin-bottom: 1rem; font-weight: 700; }
        .header p { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9; }
        .section { padding: 60px 0; }
        .about { background: #f8f9fa; }
        .about h2 { font-size: 2.5rem; margin-bottom: 2rem; text-align: center; color: #333; }
        .about p { font-size: 1.1rem; line-height: 1.8; max-width: 800px; margin: 0 auto; text-align: center; }
        .services { padding: 60px 0; }
        .services h2 { font-size: 2.5rem; margin-bottom: 3rem; text-align: center; color: #333; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .service-card { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center; }
        .service-card h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #667eea; }
        .service-card p { margin-bottom: 1rem; }
        .price { font-size: 1.25rem; font-weight: bold; color: #28a745; }
        .contact { background: #667eea; color: white; text-align: center; }
        .contact h2 { font-size: 2.5rem; margin-bottom: 2rem; }
        .contact-info { display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap; }
        .contact-item { text-align: center; }
        .contact-item h3 { margin-bottom: 0.5rem; }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1>${data.businessName || 'My Business'}</h1>
            <p>${data.tagline || data.aiGeneratedTagline || 'Welcome to our business'}</p>
        </div>
    </header>

    <section class="about section">
        <div class="container">
            <h2>About Us</h2>
            <p>${data.description || data.aboutDescription || data.aiGeneratedContent || 'We are passionate about providing excellent service to our customers.'}</p>
        </div>
    </section>

    ${data.services && data.services.length > 0 ? `
    <section class="services section">
        <div class="container">
            <h2>Our Services</h2>
            <div class="services-grid">
                ${data.services.slice(0, 3).map((service: any) => `
                    <div class="service-card">
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        ${service.price ? `<div class="price">$${service.price}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <section class="contact section">
        <div class="container">
            <h2>Contact Us</h2>
            <div class="contact-info">
                ${data.email ? `
                    <div class="contact-item">
                        <h3>Email</h3>
                        <p>${data.email}</p>
                    </div>
                ` : ''}
                ${data.phone ? `
                    <div class="contact-item">
                        <h3>Phone</h3>
                        <p>${data.phone}</p>
                    </div>
                ` : ''}
                ${data.address ? `
                    <div class="contact-item">
                        <h3>Address</h3>
                        <p>${data.address}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    </section>
</body>
</html>`;
}