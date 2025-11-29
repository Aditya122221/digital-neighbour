import { sanityFetch } from "@/sanity/lib/fetch";
import { apartPageQuery } from "@/sanity/lib/queries";
import apartDataJson from "@/data/apart.json";

type ApartPageData = {
  heading?: string;
  tagline?: string;
  oursTitle?: string;
  othersTitle?: string;
  ours?: string[];
  others?: string[];
};

export async function getApartPageData(): Promise<ApartPageData> {
  try {
    // Fetch fresh data from Sanity (no caching due to page-level dynamic config)
    const sanityData = await sanityFetch<ApartPageData>({ query: apartPageQuery });
    // Return Sanity data if it exists, even if arrays are empty
    if (sanityData) {
      return {
        heading: sanityData.heading || "",
        tagline: sanityData.tagline || "",
        oursTitle: sanityData.oursTitle || "",
        othersTitle: sanityData.othersTitle || "",
        ours: Array.isArray(sanityData.ours) ? sanityData.ours : [],
        others: Array.isArray(sanityData.others) ? sanityData.others : [],
      };
    }
  } catch (error) {
    // Silently fallback to JSON
  }

  // Fallback to JSON
  return apartDataJson as ApartPageData;
}

