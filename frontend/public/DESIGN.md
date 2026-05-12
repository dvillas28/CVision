---
name: CVision
colors:
  surface: '#fbf9fa'
  surface-dim: '#dbd9da'
  surface-bright: '#fbf9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f4'
  surface-container: '#efedee'
  surface-container-high: '#e9e8e8'
  surface-container-highest: '#e4e2e3'
  on-surface: '#1b1c1c'
  on-surface-variant: '#43474b'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f1'
  outline: '#73787c'
  outline-variant: '#c3c7cb'
  surface-tint: '#4e616e'
  primary: '#000306'
  on-primary: '#ffffff'
  primary-container: '#0b1f2a'
  on-primary-container: '#748895'
  inverse-primary: '#b5c9d8'
  secondary: '#416182'
  on-secondary: '#ffffff'
  secondary-container: '#b7d7fe'
  on-secondary-container: '#3e5e7f'
  tertiary: '#080200'
  on-tertiary: '#ffffff'
  tertiary-container: '#2c1907'
  on-tertiary-container: '#9e7f66'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e5f5'
  primary-fixed-dim: '#b5c9d8'
  on-primary-fixed: '#091e29'
  on-primary-fixed-variant: '#364955'
  secondary-fixed: '#d0e4ff'
  secondary-fixed-dim: '#a9c9ef'
  on-secondary-fixed: '#001d34'
  on-secondary-fixed-variant: '#294969'
  tertiary-fixed: '#ffdcc1'
  tertiary-fixed-dim: '#e3c0a4'
  on-tertiary-fixed: '#2a1706'
  on-tertiary-fixed-variant: '#5a422c'
  background: '#fbf9fa'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e3'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
---

## Brand & Style

This design system is engineered to bridge the gap between institutional reliability and cutting-edge AI technology. Designed specifically for the Chilean employment landscape (BNE/SENCE), the aesthetic prioritizes high legibility, ATS-optimization cues, and a sense of "career momentum." 

The style is **Modern Corporate**, drawing on the precision of developer tools like Linear and the structured minimalism of Notion. It avoids decorative clutter in favor of functional whitespace and systematic hierarchy. The emotional response should be one of "calm confidence"—reassuring the user that their professional data is being handled with expert precision and modern intelligence.

## Colors

The palette is anchored by **Petrol Blue**, providing a sophisticated, institutional foundation that conveys authority and trust. **Deep Blue** serves as a secondary bridge for interactive elements and depth, while **Soft Light Blue** acts as a high-visibility accent for progress indicators, focus states, and AI-driven suggestions.

Backgrounds utilize a very light "Cool Gray" (#F8FAFC) to reduce eye strain and provide a clean canvas for white surface cards. This subtle contrast between background and surface is essential for creating the layered, SaaS-style interface.

## Typography

This design system employs a dual-font strategy. **Geist** is used for headlines and labels to provide a technical, monospaced-adjacent precision that feels modern and "optimized." **Inter** is used for all body copy and long-form text to ensure maximum readability across different screen resolutions and accessibility requirements.

To maintain the "SaaS" feel, line heights are generous (1.5–1.6 for body) to create a sense of airiness, and letter spacing is slightly tightened on large displays to maintain visual impact.

## Layout & Spacing

The design system follows a **12-column fixed grid** for desktop environments, centered with a maximum width of 1280px. For dashboard views, a "Fluid-Sidebar" model is used, where the navigation remains fixed and the content area expands to fill the viewport.

Spacing is strictly based on an **8px baseline**. Padding and margins should always be multiples of 8 (8, 16, 24, 32, 48, 64) to ensure mathematical harmony. 

- **Mobile:** 4-column grid with 16px side margins.
- **Tablet:** 8-column grid with 24px side margins.
- **Desktop:** 12-column grid with 40px side margins or fluid padding in dashboard layouts.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layering** and **Ambient Shadows**. Surfaces do not "float" high above the background; instead, they sit just above it with a subtle distinction.

1.  **Level 0 (Background):** #F8FAFC - The base canvas.
2.  **Level 1 (Cards/Surfaces):** White background with a 1px border (#E2E8F0) and a very soft, diffused shadow: `0 1px 3px rgba(11, 31, 42, 0.05)`.
3.  **Level 2 (Dropdowns/Modals):** Pure white with a more pronounced shadow: `0 10px 15px -3px rgba(11, 31, 42, 0.1)`.

Use thin, low-contrast outlines (1px) for card components to maintain the minimalist, structured aesthetic of a professional tool.

## Shapes

The shape language uses **Rounded** (0.5rem) corners for primary UI elements like cards and input fields. This strikes a balance between the friendliness required for an employability platform and the professional structure of an institutional tool.

- **Buttons:** Fully rounded (pill) for primary actions to distinguish them from structural elements, or 0.5rem for secondary actions.
- **Inputs:** 0.5rem (8px) to align with the grid unit.
- **CV Previews:** 0.25rem (4px) to mimic the sharp edges of physical paper while maintaining the modern interface feel.

## Components

### Buttons
- **Primary:** Petrol Blue background, white text. No gradient. High contrast.
- **Secondary:** Transparent background, Petrol Blue border (1px), Petrol Blue text.
- **Ghost:** No border, Deep Blue text, Soft Light Blue background on hover.

### Form Fields
- **Inputs:** White background, 1px border (#CBD5E1). On focus: Soft Light Blue border (2px) and a subtle outer glow.
- **Labels:** Geist Medium, 14px, Petrol Blue at 80% opacity.

### Soft Cards
Used for CV sections and dashboard modules. White background, 8px corner radius, 1px light gray border. Use generous internal padding (min 24px).

### Progress Bars
Used for "CV Strength" or "ATS Score." 8px height, Soft Light Blue background for the track, Petrol Blue or Deep Blue for the fill. No rounded caps for a more "data-driven" look.

### Chips/Tags
Used for "Skills" or "Keywords." Light gray background (#F1F5F9), Geist 12px Semibold text, 4px corner radius.

### AI Suggestion Tooltips
Small, high-elevation surfaces using the Soft Light Blue (#A5D8FF) as a subtle top-border accent to indicate AI-optimized content.