import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2023-10-01";

if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable. Please add it to your .env.local file.",
  );
}

// Create client without CDN for fresh data, or with CDN for performance
// In development, always disable CDN to see changes immediately
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN to always get fresh data - set to true in production for better performance
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published", // Use published perspective
});
