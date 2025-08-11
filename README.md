# Treasure Tavern HQ

A fantasy-themed web experience featuring interactive storytelling, immersive content, and a growing universe of magical tales. Built with SvelteKit and designed to transport visitors into a world of adventure and wonder.

## 🏰 About Treasure Tavern

Treasure Tavern is an interactive fantasy universe where visitors can:

- **Explore Tavern Tales**: Read immersive fantasy stories set in our canonical world
- **Stay Informed**: Follow announcements about new features and content
- **Connect**: Reach out to the Tavern Keepers with questions or feedback

### 🎯 Project Vision

Our ultimate vision is to create an interactive AI-generated gaming experience where users can contribute to our shared universe through writing, art, and gameplay—all within our canonical fantasy world.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/treasuretavernhq-web.git
   cd treasuretavernhq-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript and Svelte checks
- `npm run check:watch` - Run checks in watch mode
- `npm run test` - Run unit tests once (Vitest)
- `npm run test:watch` - Run unit tests in watch mode

### Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── data/          # Static data (tales, announcements)
│   ├── stores/        # Svelte stores for state management
│   └── types/         # TypeScript type definitions
├── routes/            # SvelteKit routes (pages)
│   ├── about/         # About page
│   ├── announcements/ # Announcements
│   └── tavern-tales/  # Story pages
└── app.html          # Main HTML template

static/               # Static assets
├── images/          # Images and graphics
├── gifs/           # Animated GIFs
└── ...             # Other static files

utils/               # Utility scripts
├── scripts/        # Shell scripts for automation
└── ...            # JavaScript utilities

work_efforts/       # Project management using Johnny Decimal system
├── 00_system/     # System setup and configuration
├── 10_development/ # Active development work
├── 20_debugging/  # Problem-solving and fixes
├── 30_documentation/ # Documentation tasks
├── 40_testing/    # Testing and QA
├── 50_maintenance/ # Code quality and lifecycle
└── active/        # Active development log
```

### 🎨 Design System

The project uses a fantasy-themed design system with:

- **Typography**: Cinzel (headings), Spectral (body text), Inter (UI elements)
- **Colors**: Dark purple/blue backgrounds with gold accents (#BD9648)
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first design with desktop enhancements

### 📱 Key Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Performance**: WebP images, optimized assets, minimal dependencies
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **SEO**: Meta tags, structured data, sitemap generation

## 🏗️ Architecture

### Technology Stack

- **Framework**: SvelteKit (full-stack web framework)
- **Language**: TypeScript (type-safe JavaScript)
- **Styling**: CSS with custom properties and responsive design
- **Deployment**: Cloudflare Pages (with adapter-cloudflare)
- **Assets**: WebP images with PNG fallbacks

### State Management

- **Svelte Stores**: For reactive state (audio, UI state)
- **Page Data**: Server-side data loading with SvelteKit
- **Local Storage**: For user preferences (when applicable)

### Content Management

- **Static Data**: Tales and announcements stored as JavaScript/TypeScript files
- **Markdown Support**: For rich content formatting
- **Image Optimization**: Automated WebP conversion scripts

## 🚀 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Preview the build locally
npm run preview
```

### Cloudflare Pages

The project is configured for deployment on Cloudflare Pages:

1. **Build Settings**:

   - Build command: `npm run build`
   - Build output directory: `build`
   - Node.js version: 18+

2. **Environment Variables**: Configure any required environment variables in Cloudflare Pages dashboard

3. **Custom Domain**: Set up custom domain and SSL in Cloudflare

## 🔧 Configuration

### Key Configuration Files

- `svelte.config.js` - SvelteKit and adapter configuration
- `vite.config.ts` - Vite build tool configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

### Environment Setup

Create a `.env` file for local development (if needed):

```bash
# Example environment variables
PUBLIC_SITE_URL=http://localhost:5173
```

## 🤝 Contributing

### Development Workflow

1. **Create a work effort** in the appropriate `work_efforts/` category
2. **Document your plan** using the Johnny Decimal system
3. **Update the devlog** with progress and results
4. **Test thoroughly** before submitting changes
5. **Update documentation** as needed

### Code Quality

- Follow TypeScript best practices
- Use semantic HTML and ARIA attributes
- Maintain responsive design principles
- Optimize images and assets
- Write clear, descriptive commit messages

### Work Effort System

The project uses a Johnny Decimal system for organizing work:

- `00-09`: System and infrastructure
- `10-19`: Development and features
- `20-29`: Debugging and fixes
- `30-39`: Documentation
- `40-49`: Testing and QA
- `50-59`: Maintenance and optimization

## 📚 Resources

### Documentation

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Svelte Documentation](https://svelte.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)

### Project-Specific

- **Work Efforts**: See `work_efforts/` directory for detailed project planning
- **Development Log**: Check `work_efforts/active/devlog.md` for recent changes
- **Component Library**: Explore `src/lib/components/` for reusable components

## 📄 License

This project is proprietary. All rights reserved.

## 🎭 The Tavern Awaits

Welcome to Treasure Tavern, where every visit promises new adventures and magical discoveries. Whether you're here to read tales, explore our world, or contribute to our growing universe, the tavern door is always open.

_May your code compile and your adventures be legendary!_ ⚔️✨

## Features

- **Creative Writing**: Explore our collection of original tales and stories
- **Project Status**: Currently under development
- **Future Plans**: Expanding scope as more storytelling tools become available

## Project Structure

```
src/
├── routes/          # Page routes
│   ├── about/      # About page
│   ├── announcements/  # Announcements
│   └── tavern-tales/  # Story pages
└── app.html          # Main HTML template

static/               # Static assets
├── images/          # Images and graphics
├── gifs/           # Animated GIFs
└── ...             # Other static files

utils/               # Utility scripts
├── scripts/        # Shell scripts for automation
└── ...            # JavaScript utilities

work_efforts/       # Project management using Johnny Decimal system
├── 00_system/     # System setup and configuration
├── 10_development/ # Active development work
├── 20_debugging/  # Problem-solving and fixes
├── 30_documentation/ # Documentation tasks
├── 40_testing/    # Testing and QA
├── 50_maintenance/ # Code quality and lifecycle
└── active/        # Active development log
```
