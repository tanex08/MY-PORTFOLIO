# Developer Portfolio - TRISTAN JAY GAID

A modern, sleek portfolio website built with Astro 6, Tailwind CSS, and FastAPI backend. Features a dark theme with neon yellow accents and a beautiful sidebar navigation.

## Features

- ✨ Modern dark theme with neon yellow accents
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎯 Smooth scroll navigation with sidebar
- 🚀 Astro 6 with static site generation
- 🎨 Tailwind CSS for styling
- ⚡ Lightning-fast performance
- 📦 Lightweight and optimized
- 🔐 Security-focused design

## Tech Stack

### Frontend
- **Astro 6** - Modern static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **HTML/CSS** - Pure semantic markup

### Backend (Ready to integrate)
- **FastAPI** - Python web framework
- **PostgreSQL** - Database
- **Python** - Backend language

## Project Structure

```
├── src/
│   ├── components/
│   │   └── Sidebar.astro        # Navigation sidebar
│   ├── layouts/
│   │   └── Layout.astro         # Main layout template
│   ├── pages/
│   │   └── index.astro          # Homepage
│   └── styles/
│       └── globals.css          # Global styles
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── astro.config.mjs              # Astro configuration
└── tsconfig.json                 # TypeScript configuration
```

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Navigate to project**
```bash
cd "GAID PORTFOLIO"
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## Customization

### Update Your Information

Edit `src/pages/index.astro` to update:
- Your name and title
- About section
- Experience entries
- Projects
- Education
- Certifications
- Contact information

### Change Colors

Edit `tailwind.config.js` to modify:
- `primary` - Main background color
- `accent` - Highlight color (currently neon yellow)
- `text` - Text color

### Change Logo

In `src/components/Sidebar.astro`, find:
```astro
<span class="text-black font-bold text-xl">J</span>
```

Replace the "J" with your initial or text.

## Features Explanation

### Sidebar Navigation
- Desktop: Fixed vertical sidebar with icons
- Mobile: Hamburger menu with full-screen navigation
- Smooth scrolling to sections
- Interactive hover effects

### Sections

1. **Home** - Hero section with call-to-action buttons
2. **About** - Bio, skills, and tech stack
3. **Experience** - Work history and roles
4. **Projects** - Featured projects with descriptions
5. **Education** - Educational background
6. **Certifications** - Professional certifications
7. **Contact** - Contact form and social links

## Backend Integration (FastAPI)

To connect the contact form to your FastAPI backend:

1. Create a FastAPI endpoint for form submissions
2. Update the form handler in `src/pages/index.astro`
3. Configure CORS for your domain

Example FastAPI endpoint:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/contact")
async def contact(name: str, email: str, message: str):
    # Handle contact form
    return {"status": "success"}
```

## Deployment

### Vercel (Recommended)
1. Push your repo to GitHub
2. Import project in Vercel
3. Deploy with one click

### Netlify
1. Push to GitHub
2. Connect repository
3. Deploy automatically

### Other Platforms
- Railway
- AWS Amplify
- Cloudflare Pages
- Any static host

## Building for Production

```bash
npm run build
npm run preview
```

## Performance Tips

1. **Optimized Bundle**
   - Astro sends zero JavaScript by default
   - Island architecture for interactivity

2. **Static Generation**
   - Pre-rendered HTML for fast loading
   - No server overhead

3. **Image Optimization**
   - Use optimized images
   - WebP format recommended

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast ratios

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please create an issue in the repository.

---

**Built with ❤ by James Ryan**

