import { sanityFetch } from "@/sanity/lib/fetch";
import { marketingAgencyPageQuery } from "@/sanity/lib/queries";

type ImageWithIcon = {
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
};

export type MarketingAgencyPageData = {
  title?: string;
  metadata?: string;
  description?: string;
  hero?: {
    heading?: string;
    subheading?: string;
  };
  form?: {
    heading?: string;
    content?: string;
    subContent?: string;
    cta?: string;
    formHeading?: string;
    buttonText?: string;
  };
  introParagraph?: {
    heading?: string;
    problemStatement?: string;
    valueProposition?: string;
  };
  painPoints?: {
    heading?: string;
    subheading?: string;
    painPoints?: {
      problem?: string;
      solution?: string;
    }[];
  };
  services?: string;
  process?: {
    heading?: string;
    steps?: string[];
    content?: string[];
  };
  keyBenefits?: {
    heading?: string;
    subheading?: string;
    benefits?: ImageWithIcon[];
    items?: ImageWithIcon[];
  };
  features?: {
    heading?: string;
    subheading?: string;
    features?: {
      title?: string;
      description?: string;
      icon?: string;
    }[];
  };
  faq?: {
    serviceName?: string;
    faqs?: {
      q?: string;
      a?: string;
    }[];
  };
};

export async function getMarketingAgencyPage(): Promise<MarketingAgencyPageData | null> {
  try {
    return await sanityFetch<MarketingAgencyPageData | null>(
      marketingAgencyPageQuery,
    );
  } catch (error) {
    console.error(
      "Error fetching marketing agency page data from Sanity:",
      error,
    );
    return null;
  }
}
