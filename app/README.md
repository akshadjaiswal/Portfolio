# Portfolio Website

Modern, minimalist portfolio built with Next.js 16, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **GitHub Calendar:** react-github-calendar

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Update `NEXT_PUBLIC_CAL_LINK` with your Cal.com username

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Personal Information
Update `/lib/constants.ts` with your information:
- Name, tagline, location
- Social media links
- Cal.com link

### Experience Data
Edit `/lib/data/experience.ts` to add/update your work experience

### Projects Data
Edit `/lib/data/projects.ts` to add/update your projects

### Images
Add images to `/public/images/`:
- **Cover image**: `/public/images/cover.jpg` (1920x1080px, landscape/nature photo)
- Profile photo: `/public/images/profile/avatar.jpg`
- Project thumbnails: `/public/images/projects/[slug]/hero.jpg`
- Project screenshots: `/public/images/projects/[slug]/screenshot-*.jpg`

**Important**: Add your cover image to `/public/images/cover.jpg` for the hero section to display properly.

## Build for Production

```bash
npm run build
npm start
```

## Deploy

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Project Structure

```
app/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── animations/   # Animation wrappers
│   ├── hero/        # Hero section
│   ├── sections/    # Main sections
│   └── ui/          # UI components
├── lib/             # Utilities and data
│   ├── data/        # Static data files
│   ├── constants.ts # Configuration
│   ├── types.ts     # TypeScript types
│   └── utils.ts     # Helper functions
└── public/          # Static assets
    └── images/      # Image files
```

## License

MIT
