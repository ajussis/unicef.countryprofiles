# UNICEF Country Profiles

A Next.js application showcasing EdTech suitability and compliance profiles for countries worldwide.

## Features

- 📚 **Country Profiles** - Comprehensive EdTech assessments for 15+ countries
- 🌍 **Regional Grouping** - Countries organized by geographic region
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Static Generation** - Fast page loads with Next.js static export
- 🚀 **Netlify Ready** - Configured for free Netlify deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Netlify

1. Push this repository to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will auto-detect the Next.js configuration
4. Deploy!

### Environment Variables

For future features requiring API keys, add them in Netlify:

1. Go to Site settings → Environment variables
2. Add your secret keys (e.g., `API_KEY`, `DATABASE_URL`)
3. Access them in your code via `process.env.API_KEY`

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page (country listing)
│   ├── country/[slug]/    # Dynamic country pages
│   └── globals.css        # Global styles
├── components/            # React components
│   └── MarkdownContent.tsx
├── content/              
│   └── countries/         # Markdown country profiles
├── lib/
│   └── countries.ts       # Country data utilities
├── netlify.toml           # Netlify configuration
└── package.json
```

## Adding New Countries

1. Create a new `.md` file in `content/countries/`
2. Follow the existing profile format
3. The country will automatically appear in the listing

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: CSS Modules with CSS Variables
- **Fonts**: Fraunces (display) + DM Sans (body)
- **Markdown**: react-markdown with remark-gfm
- **Deployment**: Netlify

## License

For The Learning Cabinet - UNICEF EdTech Initiative
