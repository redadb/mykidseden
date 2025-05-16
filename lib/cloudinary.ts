import { Cloudinary } from '@cloudinary/url-gen';

// Check for required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
};

// Debug logging
console.log('Cloudinary Environment Variables:', {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  apiKeyExists: Boolean(process.env.CLOUDINARY_API_KEY),
  apiSecretExists: Boolean(process.env.CLOUDINARY_API_SECRET)
});

// Validate environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

// Helper function to validate file type
export const isValidFileType = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
  return validTypes.includes(file.type);
};

// Helper function to validate file size (5MB limit)
export const isValidFileSize = (file: File): boolean => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSize;
};

// Initialize Cloudinary configuration
export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true
  }
});

export default cloudinary; 