import os
import tempfile
import io
import re
import pathlib
import traceback
from PIL import Image

# Safe replacements for common Unicode characters and problematic emojis
SAFE_REPLACEMENTS = {
    "\u2013": "-",    # en-dash
    "\u2014": "-",    # em-dash
    "\u00A0": " ",    # nbsp
    "\u26A1": "[!]",  # lightning bolt emoji (causing the encoding error)
    "\u1F680": "[rocket]",  # rocket emoji
    "\u1F44B": "[wave]",    # waving hand emoji
    "\u2728": "[sparkles]", # sparkles emoji
    "\u1F4A5": "[boom]",    # boom emoji
    "\u1F525": "[fire]",    # fire emoji
    "\u2B50": "[star]",     # star emoji
    "\u1F31F": "[glowing-star]", # glowing star emoji
}

# Control characters that should be removed
UNSAFE_CONTROL_CHARS = re.compile(r"[\u0000-\u0008\u000B\u000C\u000E-\u001F]")

# Flag to sanitize emojis if needed (default: keep them, UTF-8 handles it)
SANITIZE_EMOJIS = False

def sanitize_text(s: str, aggressive: bool = False) -> str:
    """
    Sanitize text for safe file writing on Windows systems.
    
    Args:
        s: Input string to sanitize
        aggressive: If True, replace all non-ASCII characters
        
    Returns:
        Sanitized string safe for Windows cp1252 encoding
    """
    if not isinstance(s, str):
        s = str(s)
    
    # Replace specific problematic Unicode characters with ASCII equivalents
    for k, v in SAFE_REPLACEMENTS.items():
        s = s.replace(k, v)
    
    # Remove unsafe control characters
    s = UNSAFE_CONTROL_CHARS.sub("", s)
    
    # Handle remaining emojis and high Unicode characters
    if SANITIZE_EMOJIS or aggressive:
        # Replace any non-ASCII character with safe equivalent
        def replace_unicode(match):
            char = match.group(0)
            # Try to find a descriptive replacement
            if ord(char) > 0x1F600:  # Emoji range
                return "[emoji]"
            elif ord(char) > 0x007F:  # Non-ASCII
                return "?"
            return char
        
        s = re.sub(r"[^\x00-\x7F]", replace_unicode, s)
    
    if aggressive:
        # Replace any char that isn't basic printable with space
        s = "".join(ch if ord(ch) >= 32 and ord(ch) <= 126 else " " for ch in s)
    
    return s

def write_text_file(path: str, content: str) -> None:
    """
    Write text file with UTF-8 encoding and fallback error handling.
    
    This function ensures safe file writing on Windows systems by:
    1. Using UTF-8 encoding explicitly
    2. Falling back to aggressive sanitization if encoding fails
    3. Creating parent directories as needed
    """
    p = pathlib.Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    
    try:
        # First attempt: Write with UTF-8 encoding
        with open(p, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
    except UnicodeEncodeError as e:
        print(f"Warning: Unicode encoding error writing {path}: {e}")
        print(f"Attempting to sanitize content more aggressively...")
        
        # Fallback: Sanitize content more aggressively and try again
        sanitized_content = sanitize_text(content, aggressive=True)
        try:
            with open(p, "w", encoding="utf-8", newline="\n") as f:
                f.write(sanitized_content)
            print(f"Successfully wrote file after aggressive sanitization")
        except Exception as e2:
            print(f"Error: Failed to write file even after sanitization: {e2}")
            raise IOError(f"Cannot write file {path}: {e2}") from e2
    except Exception as e:
        print(f"Error: Unexpected error writing {path}: {e}")
        raise IOError(f"Cannot write file {path}: {e}") from e


def convert(image_path: str, target: str) -> str:
    """
    Convert an image to a template pack with comprehensive error handling.
    
    Args:
        image_path (str): Path to the uploaded image
        target (str): Either 'DJANGO' or 'NEXTJS'
    
    Returns:
        str: Path to the generated template folder
        
    Raises:
        ValueError: For invalid target values
        IOError: For file system errors
        UnicodeError: For encoding issues (now handled internally)
    """
    print(f"Starting conversion for image: {image_path}, target: {target}")
    
    try:
        # Analyze image for basic properties
        try:
            with Image.open(image_path) as img:
                width, height = img.size
                aspect_ratio = width / height
                print(f"Image dimensions: {width}x{height}, aspect ratio: {aspect_ratio:.2f}")
        except Exception as e:
            print(f"Warning: Could not analyze image ({e}), using defaults")
            width, height = 1200, 800
            aspect_ratio = 1.5
        
        # Create temp directory
        temp_dir = tempfile.mkdtemp()
        print(f"Created temp directory: {temp_dir}")
        
        # Generate template pack with error handling
        if target == 'DJANGO':
            result = _generate_django_pack(temp_dir, width, height, aspect_ratio)
            print(f"Successfully generated Django pack at: {result}")
            return result
        elif target == 'NEXTJS':
            result = _generate_nextjs_pack(temp_dir, width, height, aspect_ratio)
            print(f"Successfully generated Next.js pack at: {result}")
            return result
        else:
            error_msg = f"Unknown target: {target}. Must be 'DJANGO' or 'NEXTJS'"
            print(f"Error: {error_msg}")
            raise ValueError(error_msg)
            
    except UnicodeEncodeError as e:
        error_msg = f"Unicode encoding error during conversion: {e}. Character '{e.object[e.start:e.end]}' cannot be encoded in {e.encoding}"
        print(f"Error: {error_msg}")
        traceback.print_exc()
        raise IOError(error_msg) from e
        
    except IOError as e:
        error_msg = f"File system error during conversion: {e}"
        print(f"Error: {error_msg}")
        traceback.print_exc()
        raise
        
    except Exception as e:
        error_msg = f"Unexpected error during template conversion: {e}"
        print(f"Error: {error_msg}")
        traceback.print_exc()
        raise IOError(error_msg) from e


def _generate_django_pack(base_dir: str, width: int, height: int, aspect_ratio: float) -> str:
    """Generate Django template pack"""
    pack_dir = os.path.join(base_dir, 'django_pack')
    
    # Create directory structure
    templates_dir = os.path.join(pack_dir, 'templates', 'main')
    partials_dir = os.path.join(templates_dir, 'partials')
    static_dir = os.path.join(pack_dir, 'static', 'main', 'css')
    
    os.makedirs(templates_dir, exist_ok=True)
    os.makedirs(partials_dir, exist_ok=True)
    os.makedirs(static_dir, exist_ok=True)
    
    # Determine grid layout based on aspect ratio
    if aspect_ratio > 1.5:  # Wide layout
        sections = ['hero', 'features-grid', 'cta']
    elif aspect_ratio < 0.8:  # Tall layout
        sections = ['hero', 'features-list', 'testimonials', 'cta']
    else:  # Standard layout
        sections = ['hero', 'features-grid', 'cta']
    
    # Generate index.html
    index_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{{{ title|default:"Main Template" }}}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="{{{{ STATIC_URL }}}}main/css/custom.css">
</head>
<body class="bg-gray-50">
    {{% include 'main/partials/header.html' %}}
    
    <main>
        <!-- TODO: map to JCW section IDs: jcw-main-hero1 -->
        <section class="hero bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div class="container mx-auto px-4 text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-6">{{{{ hero_title|default:"Welcome to Our Platform" }}}}</h1>
                <p class="text-xl mb-8">{{{{ hero_subtitle|default:"Build amazing experiences with our cutting-edge technology" }}}}</p>
                <a href="#" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    {{{{ cta_text|default:"Get Started" }}}}
                </a>
            </div>
        </section>
        
        <!-- TODO: map to JCW section IDs: jcw-main-features1 -->
        <section class="features py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">{{{{ features_title|default:"Our Features" }}}}</h2>
                <div class="grid md:grid-cols-{len(sections)} gap-8">
                    {{% for feature in features %}}
                    <div class="text-center p-6 bg-white rounded-lg shadow-md">
                        <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">{{{{ feature.title }}}}</h3>
                        <p class="text-gray-600">{{{{ feature.description }}}}</p>
                    </div>
                    {{% empty %}}
                    <div class="text-center p-6 bg-white rounded-lg shadow-md">
                        <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Fast Performance</h3>
                        <p class="text-gray-600">Lightning-fast load times for optimal user experience</p>
                    </div>
                    <div class="text-center p-6 bg-white rounded-lg shadow-md">
                        <div class="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Reliable</h3>
                        <p class="text-gray-600">99.9% uptime guarantee with robust infrastructure</p>
                    </div>
                    <div class="text-center p-6 bg-white rounded-lg shadow-md">
                        <div class="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Secure</h3>
                        <p class="text-gray-600">Enterprise-grade security to protect your data</p>
                    </div>
                    {{% endfor %}}
                </div>
            </div>
        </section>
        
        <!-- TODO: map to JCW section IDs: jcw-main-cta1 -->
        <section class="cta bg-gray-800 text-white py-16">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-4">{{{{ cta_title|default:"Ready to Get Started?" }}}}</h2>
                <p class="text-xl mb-8">{{{{ cta_subtitle|default:"Join thousands of satisfied customers today" }}}}</p>
                <a href="#" class="bg-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    {{{{ cta_button|default:"Start Free Trial" }}}}
                </a>
            </div>
        </section>
    </main>
    
    {{% include 'main/partials/footer.html' %}}
</body>
</html>'''
    
    # Generate header partial
    header_html = '''<header class="bg-white shadow-sm">
    <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center justify-between">
            <div class="flex items-center">
                <h1 class="text-2xl font-bold text-gray-800">{{ site_name|default:"YourSite" }}</h1>
            </div>
            <div class="hidden md:flex space-x-8">
                <a href="#" class="text-gray-600 hover:text-gray-800">Home</a>
                <a href="#" class="text-gray-600 hover:text-gray-800">Features</a>
                <a href="#" class="text-gray-600 hover:text-gray-800">Pricing</a>
                <a href="#" class="text-gray-600 hover:text-gray-800">Contact</a>
            </div>
            <div class="md:hidden">
                <button class="text-gray-600 hover:text-gray-800">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </nav>
    </div>
</header>'''
    
    # Generate footer partial
    footer_html = '''<footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
            <div>
                <h3 class="text-xl font-bold mb-4">{{ site_name|default:"YourSite" }}</h3>
                <p class="text-gray-400">{{ footer_description|default:"Building amazing experiences for our users worldwide." }}</p>
            </div>
            <div>
                <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                <ul class="space-y-2">
                    <li><a href="#" class="text-gray-400 hover:text-white">About</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white">Services</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white">Contact</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white">Privacy</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-lg font-semibold mb-4">Contact</h4>
                <p class="text-gray-400">{{ contact_email|default:"info@example.com" }}</p>
                <p class="text-gray-400">{{ contact_phone|default:"+1 (555) 123-4567" }}</p>
            </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center">
            <p class="text-gray-400">&copy; {% now "Y" %} {{ site_name|default:"YourSite" }}. All rights reserved.</p>
        </div>
    </div>
</footer>'''
    
    # Generate custom CSS
    custom_css = '''/* Custom styles for main template */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.features .feature-icon {
    transition: transform 0.3s ease;
}

.features .feature-icon:hover {
    transform: scale(1.1);
}

.cta {
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .features {
        padding: 2rem 0;
    }
}'''
    
    # Generate views.py
    views_py = '''from django.shortcuts import render


def main_index(request):
    """Main template index view"""
    context = {
        'title': 'Main Template',
        'hero_title': 'Welcome to Our Platform',
        'hero_subtitle': 'Build amazing experiences with our cutting-edge technology',
        'features_title': 'Our Features',
        'cta_title': 'Ready to Get Started?',
        'cta_subtitle': 'Join thousands of satisfied customers today',
        'site_name': 'YourSite',
        'contact_email': 'info@example.com',
        'contact_phone': '+1 (555) 123-4567',
    }
    return render(request, 'main/index.html', context)'''
    
    # Generate urls.py
    urls_py = '''from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.main_index, name='main_index'),
]'''
    
    # Generate README.md
    readme_md = f'''# Django Template Pack

Generated from uploaded image with dimensions: {width}x{height}

## Installation

1. Copy this folder to your Django project
2. Add to INSTALLED_APPS in settings.py:
   ```python
   INSTALLED_APPS = [
       # ... other apps
       'main',  # or whatever you name this app
   ]
   ```

3. Add to your project's main urls.py:
   ```python
   from django.urls import path, include
   
   urlpatterns = [
       # ... other patterns
       path('', include('main.urls')),
   ]
   ```

4. Update TEMPLATES setting to include this template directory:
   ```python
   TEMPLATES = [
       {{
           'BACKEND': 'django.template.backends.django.DjangoTemplates',
           'DIRS': [
               # ... other dirs
               os.path.join(BASE_DIR, 'templates'),
           ],
           # ... rest of config
       }},
   ]
   ```

5. Collect static files:
   ```bash
   python manage.py collectstatic
   ```

## Usage

The template includes:
- Responsive design with Tailwind CSS
- Hero section with CTA
- Features grid
- Footer with contact info
- Mobile-responsive navigation

Context variables you can pass to customize content:
- `title` - Page title
- `hero_title` - Main hero heading
- `hero_subtitle` - Hero subtext
- `features` - List of feature objects with title/description
- `site_name` - Site name in header/footer
- `contact_email` - Footer contact email
- `contact_phone` - Footer contact phone
'''
    
    # Write files with UTF-8 encoding using helper function
    write_text_file(os.path.join(templates_dir, 'index.html'), sanitize_text(index_html))
    write_text_file(os.path.join(partials_dir, 'header.html'), sanitize_text(header_html))
    write_text_file(os.path.join(partials_dir, 'footer.html'), sanitize_text(footer_html))
    write_text_file(os.path.join(static_dir, 'custom.css'), sanitize_text(custom_css))
    write_text_file(os.path.join(pack_dir, 'views.py'), sanitize_text(views_py))
    write_text_file(os.path.join(pack_dir, 'urls.py'), sanitize_text(urls_py))
    write_text_file(os.path.join(pack_dir, 'README.md'), sanitize_text(readme_md))
    
    return pack_dir


def _generate_nextjs_pack(base_dir: str, width: int, height: int, aspect_ratio: float) -> str:
    """Generate Next.js template pack"""
    pack_dir = os.path.join(base_dir, 'next_pack')
    
    # Create directory structure
    app_dir = os.path.join(pack_dir, 'app', '(main)')
    components_dir = os.path.join(pack_dir, 'components', 'Main')
    public_dir = os.path.join(pack_dir, 'public', 'main')
    
    os.makedirs(app_dir, exist_ok=True)
    os.makedirs(components_dir, exist_ok=True)
    os.makedirs(public_dir, exist_ok=True)
    
    # Generate page.tsx
    page_tsx = '''import { Header } from '@/components/Main/Header'
import { Footer } from '@/components/Main/Footer'

export default function MainPage() {
  const features = [
    {
      title: "Fast Performance",
      description: "Lightning-fast load times for optimal user experience",
      icon: "*"
    },
    {
      title: "Reliable",
      description: "99.9% uptime guarantee with robust infrastructure",
      icon: "+"
    },
    {
      title: "Secure",
      description: "Enterprise-grade security to protect your data",
      icon: "o"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Our Platform
            </h1>
            <p className="text-xl mb-8">
              Build amazing experiences with our cutting-edge technology
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-gray-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Join thousands of satisfied customers today</p>
            <button className="bg-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}'''
    
    # Generate layout.tsx
    layout_tsx = '''export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="main-template">
      {children}
    </div>
  )
}'''
    
    # Generate Header component
    header_tsx = '''export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">YourSite</h1>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
          </div>
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}'''
    
    # Generate Footer component
    footer_tsx = '''export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">YourSite</h3>
            <p className="text-gray-400">
              Building amazing experiences for our users worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">info@example.com</p>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} YourSite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}'''
    
    # Generate README.md
    readme_md = f'''# Next.js Template Pack

Generated from uploaded image with dimensions: {width}x{height}

## Installation

1. Copy the contents of this pack into your existing Next.js project
2. Make sure you have Tailwind CSS configured
3. Update your `tailwind.config.js` to include the new paths:

```javascript
module.exports = {{
  content: [
    './pages/**/*.{{js,ts,jsx,tsx,mdx}}',
    './components/**/*.{{js,ts,jsx,tsx,mdx}}',
    './app/**/*.{{js,ts,jsx,tsx,mdx}}',
    // Add if you moved files to different locations:
    './components/Main/**/*.{{js,ts,jsx,tsx,mdx}}',
  ],
  // ... rest of config
}}
```

4. Copy files to your project:
   - `app/(main)/` -> Copy to your app directory
   - `components/Main/` -> Copy to your components directory
   - `public/main/` -> Copy to your public directory

## Usage

The template includes:
- App Router compatible structure
- Responsive design with Tailwind CSS
- TypeScript support
- Reusable Header and Footer components
- SEO-friendly structure

## Customization

Edit the components in `components/Main/` to customize:
- Header navigation items
- Footer links and content
- Contact information
- Brand colors and styling

The main page can be customized by editing `app/(main)/page.tsx`.

## Testing

To test the template:
1. Copy files into a fresh Next.js project
2. Run `npm run build` to ensure everything compiles
3. Run `npm run dev` to see it in action
'''
    
    # Create a placeholder preview image
    preview_content = '''# Preview Image Placeholder
This would contain a preview screenshot of the generated template.
Image dimensions: {width}x{height}
Aspect ratio: {aspect_ratio:.2f}
'''.format(width=width, height=height, aspect_ratio=aspect_ratio)
    
    # Write files with UTF-8 encoding using helper function
    write_text_file(os.path.join(app_dir, 'page.tsx'), sanitize_text(page_tsx))
    write_text_file(os.path.join(app_dir, 'layout.tsx'), sanitize_text(layout_tsx))
    write_text_file(os.path.join(components_dir, 'Header.tsx'), sanitize_text(header_tsx))
    write_text_file(os.path.join(components_dir, 'Footer.tsx'), sanitize_text(footer_tsx))
    write_text_file(os.path.join(public_dir, 'preview.txt'), sanitize_text(preview_content))
    write_text_file(os.path.join(pack_dir, 'README.md'), sanitize_text(readme_md))
    
    return pack_dir