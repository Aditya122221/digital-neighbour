import { sanityFetch } from "@/sanity/lib/fetch";
import { homePageQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import homeDataJson from "@/data/home.json";

type HomePageData = {
  metadata?: string;
  description?: string;
  hero?: {
    heading?: string;
    subheading?: string;
    images?: string[];
  };
  brandInfo?: {
    main?: {
      heading?: string;
      subheading?: string;
    };
    differentiators?: {
      id?: string | number;
      title?: string;
      description?: string;
      icon?: string;
    }[];
    rightCard?: {
      heading?: string;
      description?: string;
      stats?: {
        id?: string;
        value?: string;
        label?: string;
      }[];
    };
  };
  services?: {
    heading?: string;
    subheading?: string;
    rightCard?: {
      video?: string;
      title?: string;
      subheading?: string[];
    }[];
  };
  keepYourStack?: {
    heading?: string;
    highlight?: string;
    description?: string;
    logos?: {
      name?: string;
      svg?: string;
      bgColor?: string;
      textColor?: string;
    }[];
  };
  contentSection?: {
    heading?: string;
    subheading?: string;
    benefits?: {
      id?: number;
      title?: string;
      description?: string;
      icon?: string;
      stat?: string;
    }[];
  };
  process?: {
    steps?: string[];
    content?: string[];
  };
};

const getImageUrl = (image: any): string => {
  if (!image) return "";
  if (typeof image === "string") return image;
  if (image.asset?.url) {
    return image.asset.url;
  }
  if (image.asset?._ref) {
    try {
      return urlForImage(image).url();
    } catch {
      return "";
    }
  }
  return "";
};

const getFileUrl = (file: any): string => {
  if (!file) return "";
  if (typeof file === "string") return file;
  if (file.asset?.url) {
    return file.asset.url;
  }
  return "";
};

function transformSanityData(sanityData: any): HomePageData | null {
  if (!sanityData) return null;

  const settings = sanityData.settings ?? {};
  const heroDoc = sanityData.hero ?? {};
  const brandInfoDoc = sanityData.brandInfo ?? {};
  const servicesDoc = sanityData.services ?? {};
  const stackDoc = sanityData.keepYourStack ?? {};
  const contentDoc = sanityData.contentSection ?? {};
  const processDoc = sanityData.process ?? {};

  return {
    metadata: settings.metadata || settings.title || "",
    description: settings.description || "",
    hero: {
      heading: heroDoc.heading || "",
      subheading: heroDoc.subheading || "",
      images:
        heroDoc.images?.map((img: any) => getImageUrl(img)).filter(Boolean) ||
        [],
    },
    brandInfo: {
      main: {
        heading: brandInfoDoc.main?.heading || "",
        subheading: brandInfoDoc.main?.subheading || "",
      },
      differentiators:
        brandInfoDoc.differentiators?.map((diff: any) => ({
          id: diff.id ?? "",
          title: diff.title || "",
          description: diff.description || "",
          icon: diff.icon || "",
        })) || [],
      rightCard: {
        heading: brandInfoDoc.rightCard?.heading || "",
        description: brandInfoDoc.rightCard?.description || "",
        stats:
          brandInfoDoc.rightCard?.stats?.map((stat: any) => ({
            id: stat.id ?? "",
            value: stat.value || "",
            label: stat.label || "",
          })) || [],
      },
    },
    services: {
      heading: servicesDoc.heading || "",
      subheading: servicesDoc.subheading || "",
      rightCard:
        servicesDoc.rightCard?.map((card: any) => ({
          video: getFileUrl(card.video),
          title: card.title || "",
          subheading: card.subheading || [],
        })) || [],
    },
    keepYourStack: {
      heading: stackDoc.heading || "",
      highlight: stackDoc.highlight || "",
      description: stackDoc.description || "",
      logos:
        stackDoc.logos?.map((logo: any) => ({
          name: logo.name || "",
          svg: getImageUrl(logo.image),
          bgColor: logo.bgColor || "",
          textColor: logo.textColor || "",
        })) || [],
    },
    contentSection: {
      heading: contentDoc.heading || "",
      subheading: contentDoc.subheading || "",
      benefits:
        contentDoc.benefits?.map((benefit: any) => ({
          id: benefit.id,
          title: benefit.title || "",
          description: benefit.description || "",
          icon: benefit.icon || "",
          stat: benefit.stat || "",
        })) || [],
    },
    process: {
      steps: processDoc.steps || [],
      content: processDoc.content || [],
    },
  };
}
export async function getHomePageData(): Promise<HomePageData> {
  try {
    // Fetch fresh data from Sanity (no caching due to page-level dynamic config)
    const sanityData = await sanityFetch(homePageQuery);
    const transformed = transformSanityData(sanityData);
    if (transformed && transformed.metadata) {
      return transformed;
    }
  } catch (error) {
    // Silently fallback to JSON
  }

  // Fallback to JSON
  return homeDataJson as HomePageData;
}

