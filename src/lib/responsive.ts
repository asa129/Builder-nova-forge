// Responsive utilities for the alcohol search app

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const gridCols = {
  mobile: "grid-cols-1",
  tablet: "sm:grid-cols-2",
  desktop: "lg:grid-cols-3",
  large: "xl:grid-cols-4",
} as const;

export const spacing = {
  container: "container-custom",
  section: "py-8",
  card: "p-6",
  cardSm: "p-4",
} as const;

// Helper function to get responsive grid classes
export function getResponsiveGridClasses(
  options: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  } = {},
) {
  const { mobile = 1, tablet = 2, desktop = 3, large = 4 } = options;

  return [
    `grid-cols-${mobile}`,
    `sm:grid-cols-${tablet}`,
    `lg:grid-cols-${desktop}`,
    `xl:grid-cols-${large}`,
  ].join(" ");
}

// Responsive text sizes
export const textSizes = {
  h1: "text-2xl md:text-3xl lg:text-4xl",
  h2: "text-xl md:text-2xl lg:text-3xl",
  h3: "text-lg md:text-xl lg:text-2xl",
  body: "text-sm md:text-base",
  small: "text-xs md:text-sm",
} as const;
