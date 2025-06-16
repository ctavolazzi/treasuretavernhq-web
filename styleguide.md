# Treasure Tavern Styleguide

This document outlines the visual language, components, and design patterns used throughout the Treasure Tavern website.

## Colors

### Primary Palette

- **Dark Background**: `#13111C` to `#1F1B2D` to `#2B1D34` (linear gradient)
- **Text Color**: `#F7E8D4` (cream/parchment)
- **Gold Accent**: `#BD9648` to `#E7CE8F` (highlights, titles)
- **Purple Accent**: `#9E61E3` to `#7A3CA3` (interactive elements, buttons)
- **Blue Accent**: `#83C0DB` (used for song elements)
- **Red Accent**: `#FF6B6B` (used for warnings, video elements)

### Opacity Variations

- Text with 90% opacity: `rgba(247, 232, 212, 0.9)`
- Text with 85% opacity: `rgba(247, 232, 212, 0.85)`
- Text with 70% opacity: `rgba(247, 232, 212, 0.7)`
- Text with 60% opacity: `rgba(247, 232, 212, 0.6)`
- Border highlights: `rgba(189, 150, 72, 0.3)`
- Element backgrounds: `rgba(31, 27, 45, 0.4)` to `rgba(31, 27, 45, 0.8)`

## Typography

### Font Stack

- **Display/Decorative**: 'Cinzel Decorative', 'Luminari', fantasy
- **Heading**: 'Cinzel', serif
- **Body Text**: 'Spectral', serif
- **UI Text**: 'Inter', system-ui, sans-serif

### Type Scale (Responsive)

- Hero Title: `clamp(2.5rem, 8vw, 5rem)`
- Page Title: `clamp(2rem, 5vw, 3.5rem)`
- Section Title: `clamp(1.5rem, 3vw, 2.5rem)`
- Subsection Title: `clamp(1.25rem, 2vw, 1.8rem)`
- Card Title: `clamp(1.25rem, 3vw, 1.5rem)`
- Body Text: `clamp(1rem, 2vw, 1.2rem)`
- Small Text: `clamp(0.85rem, 2vw, 0.95rem)`
- Tiny Text: `clamp(0.75rem, 2vw, 0.85rem)`

## Spacing

- Container Padding: `clamp(1.5rem, 5vw, 3rem)`
- Section Margins: `clamp(2.5rem, 8vw, 5rem)`
- Element Margins: `clamp(1rem, 3vw, 2rem)`
- Border Radius (small): `6px` to `8px`
- Border Radius (medium): `10px`
- Border Radius (pills): `20px` to `30px`

## Shadows & Effects

### Box Shadows

- Subtle: `0 4px 8px rgba(0, 0, 0, 0.15)`
- Medium: `0 5px 15px rgba(0, 0, 0, 0.2)`
- Strong: `0 10px 30px rgba(0, 0, 0, 0.3)`
- Colored accent: `0 5px 15px rgba(158, 97, 227, 0.3)` (adjustable with different accent colors)

### Text Shadows

- Hero Title: `0 0 15px rgba(231, 206, 143, 0.35)`
- Section Titles: `0 0 8px rgba(189, 150, 72, 0.3)`

### Transitions

- Standard transition: `all 0.3s ease`
- Hover transform: `translateY(-2px)` to `translateY(-5px)` (depending on element size)

## Components

### Buttons

#### Primary Button

- Background: `linear-gradient(135deg, #9E61E3 0%, #7A3CA3 100%)`
- Text color: `#F7E8D4`
- Padding: `0.75rem 2rem`
- Border-radius: `6px`
- Font: 'Cinzel', serif
- Box-shadow on hover: `0 5px 15px rgba(158, 97, 227, 0.3)`

#### Secondary Button (Gold)

- Background: `linear-gradient(135deg, #BD9648 0%, #E7CE8F 100%)`
- Text color: `#13111C`
- Same dimensions as primary

#### Category Button

- Background: `rgba(31, 27, 45, 0.4)`
- Border: `1px solid rgba(247, 232, 212, 0.2)`
- Border-radius: `30px`
- Padding: `clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1.5rem)`
- Active state: Purple gradient background

#### Navigation Button

- Background: `rgba(31, 27, 45, 0.6)`
- Border: `1px solid rgba(247, 232, 212, 0.1)`
- Border-radius: `6px`
- Padding: `clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1.25rem)`

### Cards

#### Featured Card

- Background: `rgba(31, 27, 45, 0.4)`
- Border: `1px solid rgba(247, 232, 212, 0.1)`
- Border-radius: `10px`
- Border on hover: `rgba(189, 150, 72, 0.3)`
- Height: `min-height: clamp(300px, 60vh, 350px)`
- Shadow on hover: `0 10px 25px rgba(0, 0, 0, 0.2)`

#### Standard Card

- Similar to featured card but smaller
- Height: Not fixed
- Image height: `clamp(120px, 25vw, 160px)`

#### Card Tags

- Border-radius: `20px`
- Padding: `0.25rem 0.7rem`
- Background opacity: `0.15`
- Color variations based on type:
  - Story: `#BD9648`
  - Poem: `#9E61E3`
  - Song: `#83C0DB`
  - Video: `#FF6B6B`

### Content Blocks

#### Journal Entry

- Border-left: `3px solid rgba(158, 97, 227, 0.4)`
- Padding-left: `clamp(0.5rem, 2vw, 1rem)`

#### Warning Block

- Background: `rgba(31, 27, 45, 0.5)`
- Border-left: `3px solid #FF6B6B`
- Border-radius: `8px`
- Padding: `clamp(0.75rem, 2vw, 1rem)`

#### Note Block

- Background: `rgba(31, 27, 45, 0.5)`
- Border-radius: `8px`
- Padding: `clamp(0.75rem, 2vw, 1rem)`

#### Poem Block

- Background: `rgba(31, 27, 45, 0.4)`
- Border: `1px solid rgba(247, 232, 212, 0.1)`
- Border-radius: `8px`
- Padding: `clamp(1rem, 3vw, 1.5rem)`

### Media Containers

#### Featured Image

- Border-radius: `8px`
- Border: `1px solid rgba(189, 150, 72, 0.3)`
- Box-shadow: `0 10px 30px rgba(0, 0, 0, 0.3)`
- Max-height: `500px`
- Object-fit: `cover`

#### Video Container

- Aspect ratio: `16:9`
- Border-radius: `8px`
- Border: `1px solid rgba(247, 232, 212, 0.1)`

#### Audio Container

- Background: `rgba(19, 17, 28, 0.6)`
- Padding: `clamp(1rem, 3vw, 1.5rem)`
- Text-align: `center`

## Layout Patterns

### Responsive Grid Systems

#### Featured Grid

- Grid template: `repeat(auto-fill, minmax(min(100%, 300px), 1fr))`
- Gap: `clamp(1rem, 3vw, 2rem)`
- Breakpoint adjustments: `minmax(min(100%, 250px), 1fr)` at 1100px

#### Standard Grid

- Grid template: `repeat(auto-fill, minmax(min(100%, 280px), 1fr))`
- Gap: `clamp(1rem, 3vw, 1.5rem)`

### Section Structure

- Hero with decorative divider
- Main content with max-width of `1200px`
- Section title with decorative line after
- Card grid or content
- Optional CTA
- Clear vertical rhythm with consistent spacing

## Images

### Types & Sizing

#### Hero Background

- Full width
- Overlay: `linear-gradient(rgba(19, 17, 28, 0.7), rgba(19, 17, 28, 0.8))`
- Position: `center`
- Size: `cover`

#### Tale Cover Images

- Card view: `height: clamp(150px, 30vw, 180px)`
- List view: `height: clamp(120px, 25vw, 160px)`
- Individual tale page: Full width, `max-height: 500px`
- Object-fit: `cover`

#### Decorative Elements

- SVG patterns for dividers
- Icon usage through Font Awesome

### Image Style

- Border radius consistent with container
- Slight border highlight
- Shadow under important images
- Overlay gradients for text legibility

## Animations & Transitions

### Page Load

- Hero title: Fly in from top with `fly={{ y: -30, duration: 800, delay: 300, easing: quintOut }}`
- Hero subtitle: Fade in with `fade={{ duration: 1000, delay: 600 }}`

### Interactive Elements

- Hover state for buttons and cards uses `transform: translateY(-2px)` to `translateY(-5px)`
- Color transitions use `transition: all 0.3s ease`

## Accessibility

- Semantic HTML structure
- Sufficient color contrast for text legibility
- Alt text for all images
- Focus states should be visible
- Interactive elements should have appropriate hover/active states

## Responsive Behavior

### Breakpoints

- Desktop: 1100px and above
- Tablet: 768px to 1099px
- Mobile: 767px and below
- Small mobile: 480px and below

### Adaptations

- Flexible grids using auto-fill and minmax
- Fluid typography using clamp()
- Section padding adjustments based on viewport
- Stack elements on mobile that are side-by-side on desktop
- Responsive navigation and headings
- Full-width containers on mobile
