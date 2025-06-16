/**
 * Common Types and Interfaces for Treasure Tavern
 * Centralized type definitions for consistent component props and data structures
 */

// Basic image props interface
export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  loading?: 'lazy' | 'eager';
  draggable?: boolean;
}

// Responsive image paths
export interface ResponsiveImagePaths {
  webp: string;
  png: string;
  jpg: string;
  original: string;
}

// Audio player configuration
export interface AudioConfig {
  src: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  volume?: number;
  showTitle?: boolean;
}

// Navigation item interface
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  action?: () => void;
  special?: boolean;
  external?: boolean;
}

// Breadcrumb item interface
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

// Announcement interface
export interface Announcement {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  type: 'event' | 'news' | 'alert';
  category: string;
  date: string;
  slug: string;
  tags?: string[];
  featured?: boolean;
  imageUrl?: string;
}

// Tale/Story interface
export interface Tale {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  slug: string;
  season?: string;
  type?: string;
  tags?: string[];
  featured?: boolean;
  imageUrl?: string;
  publishedAt: string;
  updatedAt?: string;
}

// Form submission states
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

// Contact form data
export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  turnstile_token?: string;
}

// Component size variants
export type ComponentSize = 'small' | 'medium' | 'large';

// Common positioning options
export type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

// Color theme variants
export type ThemeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

// Button variants
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: ComponentSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  href?: string;
  external?: boolean;
  ariaLabel?: string;
}

// Modal configuration
export interface ModalConfig {
  open: boolean;
  title?: string;
  size?: ComponentSize;
  showClose?: boolean;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
}

// Pagination interface
export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  showInfo?: boolean;
  showControls?: boolean;
}

// Search/Filter configuration
export interface SearchConfig {
  query?: string;
  category?: string;
  tags?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Supabase submission result
export interface SupabaseResult {
  success: boolean;
  error?: string;
  data?: any;
}

// Common event handlers
export interface CommonEventHandlers {
  onClick?: (event: MouseEvent) => void;
  onKeydown?: (event: KeyboardEvent) => void;
  onSubmit?: (event: SubmitEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

// CSS class utilities
export interface CSSClasses {
  base?: string;
  variant?: string;
  size?: string;
  state?: string;
  custom?: string;
}

// Animation configuration
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  direction?: 'normal' | 'reverse' | 'alternate';
}

// Loading state configuration
export interface LoadingConfig {
  isLoading: boolean;
  text?: string;
  spinner?: boolean;
  skeleton?: boolean;
}

// Error state configuration
export interface ErrorConfig {
  hasError: boolean;
  message?: string;
  retry?: () => void;
  canRetry?: boolean;
}
