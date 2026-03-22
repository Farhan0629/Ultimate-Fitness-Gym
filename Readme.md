# Ultimate Fitness Gym Website

A modern, high-performance gym website built with a dark theme, featuring smooth animations, particle effects, and a professional design that reflects the premium fitness experience at Ultimate Fitness Gym in Khidirpur, Kolkata.

![Ultimate Fitness Gym](https://images.jdmagicbox.com/comp/kolkata/a5/033pxx33.xx33.220416092517.r2a5/catalogue/ultimate-fitness-gym-khidirpur-kolkata-gyms-vP6aaNSjPA-250.jpg)

## Tech Stack

| Category | Technology |
|----------|------------|
| **HTML** | HTML5 with semantic markup, ARIA accessibility attributes |
| **CSS** | Custom CSS with CSS Variables, Tailwind CSS (CDN) |
| **JavaScript** | Vanilla JavaScript (ES6+), GSAP Animation Library |
| **Fonts** | Google Fonts - Orbitron (headings), Rajdhani (body) |
| **Animations** | GSAP (GreenSock), Custom Canvas Particle System |
| **Hosting** | Static files - can be hosted on any static hosting service |

## Project Structure

```
ultimate-fitness-gym/
├── index.html          # Main homepage
├── gallery.html         # Photo gallery page
├── reviews.json         # Google Reviews data (JSON)
├── css/
│   └── styles.css       # All custom styles
├── js/
│   ├── main.js          # Core functionality (menu, forms, lightbox, particles)
│   ├── animations.js    # GSAP scroll & entrance animations
│   └── reviews.js       # Reviews rendering (if separate)
├── images/
│   └── hero-gym.png     # Hero section background image
└── Readme.md            # This file
```

## Features

### Core Features
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Smooth Navigation** - Anchor links with smooth scrolling
- **Mobile Menu** - Hamburger menu for mobile devices
- **Contact Form** - Client-side validated form with localStorage persistence
- **Gallery Page** - Photo gallery with lightbox viewer

### Visual Effects & Animations
- **Entrance Overlay** - Animated intro screen with gym name and tagline
- **Particle Canvas** - Floating particle effect on the entrance overlay
- **Hero Section** - Background image with right-to-left fade effect
- **Scroll Animations** - Sections fade in as user scrolls
- **Service Cards** - Staggered reveal animation
- **Glitch Effect** - Subtle text glitch on hero headline
- **Glow Pulse** - Animated glowing orb in hero section
- **Noise Overlay** - Subtle noise texture for visual depth

### Accessibility
- ARIA labels and roles throughout
- Keyboard navigation support (Escape to close modals, arrow keys for gallery)
- `prefers-reduced-motion` support for users who disable animations
- Semantic HTML structure
- Form validation with clear error messages
- Focus management for screen readers

## Sections

### Homepage (index.html)
1. **Hero Section** - Full-screen hero with tagline and CTA buttons
2. **About** - Gym description and key benefits
3. **Services** - Strength Training, Fat Loss, Personal Training, Muscle Building
4. **Reviews** - Member testimonials loaded from reviews.json
5. **Join CTA** - Call-to-action with gym address
6. **Contact Form** - Name, email, phone, and message fields
7. **Footer** - Contact info and operating hours

### Gallery Page (gallery.html)
- Grid layout of gym images
- Lightbox viewer with navigation (prev/next)
- Keyboard navigation support
- Lazy loading for images

## Customization

### Color Scheme
The site uses CSS custom properties defined in `:root`:

```css
:root {
  --bg: #090909;           /* Main background */
  --bg-soft: #121212;     /* Soft background */
  --card: #161616;         /* Card background */
  --text: #f5f5f5;         /* Primary text */
  --muted: #aaaaaa;       /* Muted text */
  --accent: #e10600;      /* Primary accent (red) */
  --accent-soft: #ff3f2f; /* Soft accent */
}
```

### Hero Background Image
The hero section uses a background image with:
- Position: Right side of the screen
- Fade effect: Left-to-right gradient overlay for text readability
- Opacity: 25% for a subtle look
- Filters: 80% grayscale + 70% brightness for dull effect

To change the hero image, replace `images/hero-gym.png` or update the path in `css/styles.css`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Minimal dependencies (no build step required)
- Lazy loading for images
- CSS-based animations fallbacks when JS is disabled
- Reduced motion support for accessibility

## Setup

1. Clone or download the repository
2. Open `index.html` in a browser
3. For local development, use a static server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (http-server)
   npx http-server
   ```

## External Dependencies (CDN)

- Tailwind CSS: `https://cdn.tailwindcss.com`
- GSAP: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- ScrollTrigger: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
- Google Fonts: Orbitron, Rajdhani

## License

This project is for demonstration purposes. The gym images are sourced from JDMagicBox.

---

**Ultimate Fitness Gym** - Khidirpur, Kolkata