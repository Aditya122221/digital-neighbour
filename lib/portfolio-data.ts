import { sanityFetch } from "@/sanity/lib/fetch";
import { portfolioPageQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import portfolioData from "@/data/portfolio.json";
import type { PageSeoSettings } from "@/lib/types/page-seo";

export type PortfolioMetric = {
  value: string;
  label: string;
};

export type PortfolioProject = {
  id?: string;
  slug: string;
  logoText: string;
  logo?: string;
  headline: string;
  metrics: PortfolioMetric[];
  tags: string[];
  image: string;
  imageAlt?: string;
  content?: string;
};

export type PortfolioHeroContent = {
  label: string;
  title: string;
  description: string;
};

type PortfolioPageData = {
  metadata?: string;
  description?: string;
  seo?: PageSeoSettings;
  hero?: PortfolioHeroContent;
  projects?: PortfolioProject[];
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

const slugify = (input: string): string =>
  input
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const resolveProjectSlug = (project: any, index: number): string => {
  if (typeof project.slug === "string" && project.slug.trim()) {
    return project.slug.trim();
  }
  if (
    project.slug &&
    typeof project.slug.current === "string" &&
    project.slug.current.trim()
  ) {
    return project.slug.current.trim();
  }
  if (typeof project.headline === "string" && project.headline.trim()) {
    return slugify(project.headline);
  }
  return `project-${index}`;
};

const normalizeSeoSettings = (settings: any): PageSeoSettings | undefined => {
  if (!settings) return undefined;

  const keywords = Array.isArray(settings.keywords)
    ? settings.keywords
        .map((keyword: unknown) =>
          typeof keyword === "string" ? keyword.trim() : "",
        )
        .filter(Boolean)
    : undefined;
  const ogImage = getImageUrl(settings.ogImage) || undefined;

  const hasValue =
    settings.title ||
    settings.description ||
    (keywords && keywords.length > 0) ||
    settings.ogTitle ||
    settings.ogDescription ||
    ogImage ||
    settings.canonicalUrl ||
    settings.structuredData;

  if (!hasValue) {
    return undefined;
  }

  return {
    title: settings.title || undefined,
    description: settings.description || undefined,
    keywords,
    ogTitle: settings.ogTitle || undefined,
    ogDescription: settings.ogDescription || undefined,
    ogImage,
    canonicalUrl: settings.canonicalUrl || undefined,
    structuredData: settings.structuredData || undefined,
  };
};

function transformSanityData(sanityData: any): PortfolioPageData | null {
  if (!sanityData) {
    console.warn("⚠️ transformSanityData: sanityData is null or undefined");
    return null;
  }

  console.log(
    "🔍 Raw Sanity data received:",
    JSON.stringify(sanityData, null, 2),
  );

  const settings = sanityData.settings ?? {};
  const heroDoc = sanityData.hero ?? {};
  const projectsData = sanityData.projects ?? {};

  // Handle case where projectsData might be null or the projects array might be nested differently
  let projects: any[] = [];
  if (projectsData && Array.isArray(projectsData.projects)) {
    projects = projectsData.projects;
  } else if (Array.isArray(projectsData)) {
    // In case the query structure is different
    projects = projectsData;
  }

  console.log("🔍 Transforming Sanity data:", {
    hasSettings: !!settings && Object.keys(settings).length > 0,
    hasHero: !!heroDoc && Object.keys(heroDoc).length > 0,
    hasProjectsData: !!projectsData,
    projectsDataKeys: projectsData ? Object.keys(projectsData) : [],
    projectsCount: projects.length,
    firstProject: projects[0] ? Object.keys(projects[0]) : [],
  });

  const seo = normalizeSeoSettings(settings);

  return {
    metadata: settings.metadata || settings.title || "",
    description: settings.description || "",
    seo,
    hero: {
      label: heroDoc.label || "Portfolio",
      title: heroDoc.title || "",
      description: heroDoc.description || "",
    },
    projects: projects.map((project: any, index: number) => ({
      id: `project-${index}`,
      slug: resolveProjectSlug(project, index),
      logoText: project.logoText || "",
      logo: getImageUrl(project.logo),
      headline: project.headline || "",
      image: getImageUrl(project.image),
      imageAlt: project.imageAlt || project.headline,
      metrics:
        project.metrics?.map((metric: any) => ({
          value: metric.value || "",
          label: metric.label || "",
        })) || [],
      tags: project.tags || [],
      content: project.content || "",
    })),
  };
}

const DEFAULT_HERO: PortfolioHeroContent = {
  label: "Portfolio",
  title: "Success stories from brands we've helped grow",
  description:
    "Discover how our strategic approach drives measurable results for businesses across industries.",
};

const parsedData = portfolioData as any;
const projectsArray = Array.isArray(parsedData.projects)
  ? parsedData.projects
  : [];
const projectMap = new Map(
  projectsArray.map((project: any, index: number) => [
    resolveProjectSlug(project, index),
    {
      ...project,
      slug: resolveProjectSlug(project, index),
    },
  ]),
);

export async function getPortfolioHero(): Promise<PortfolioHeroContent> {
  try {
    const sanityData = await sanityFetch({ query: portfolioPageQuery });
    const transformed = transformSanityData(sanityData);
    if (transformed?.hero) {
      // Return Sanity data even if title is empty, as long as hero exists
      return transformed.hero;
    }
  } catch (error) {
    console.error("Error fetching portfolio hero from Sanity:", error);
  }

  const hero = parsedData.hero ?? {};
  return {
    label: hero.label ?? DEFAULT_HERO.label,
    title: hero.title ?? DEFAULT_HERO.title,
    description: hero.description ?? DEFAULT_HERO.description,
  };
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const sanityData = await sanityFetch({ query: portfolioPageQuery });
    const transformed = transformSanityData(sanityData);
    if (transformed?.projects && transformed.projects.length > 0) {
      console.log(
        "✅ Portfolio projects fetched from Sanity:",
        transformed.projects.length,
        "projects",
      );
      return transformed.projects;
    } else {
      console.warn(
        "⚠️ Sanity data returned but no projects found. Data:",
        JSON.stringify(sanityData, null, 2),
      );
    }
  } catch (error) {
    console.error("Error fetching portfolio projects from Sanity:", error);
  }

  console.log(
    "📦 Falling back to JSON data:",
    projectsArray.length,
    "projects",
  );
  return projectsArray.map((project: any, index: number) => ({
    id: project.id || `project-${index}`,
    slug: resolveProjectSlug(project, index),
    logoText: project.logoText || "",
    headline: project.headline || "",
    image: project.image || "",
    imageAlt: project.imageAlt,
    metrics: project.metrics || [],
    tags: project.tags || [],
    content: project.content || "",
  }));
}

export async function getPortfolioProjectBySlug(
  slug: string,
): Promise<PortfolioProject | undefined> {
  if (!slug) return undefined;

  try {
    const projects = await getPortfolioProjects();
    return projects.find((p) => p.slug === slug);
  } catch (error) {
    // Fallback to JSON
    return projectMap.get(slug);
  }
}

export async function getPortfolioPageData(): Promise<PortfolioPageData> {
  try {
    const sanityData = await sanityFetch({ query: portfolioPageQuery });
    const transformed = transformSanityData(sanityData);
    if (transformed) {
      // Return Sanity data if transformation succeeded, even if metadata is empty
      console.log("✅ Portfolio page data fetched from Sanity");
      return transformed;
    } else {
      console.warn("⚠️ Sanity data transformation returned null");
    }
  } catch (error) {
    console.error("Error fetching portfolio page data from Sanity:", error);
  }

  // Fallback to JSON
  console.log("📦 Falling back to JSON data for portfolio page");
  return {
    metadata: "Portfolio | Digital Neighbour",
    description:
      "Explore our portfolio of successful projects and case studies. See how Digital Neighbour has helped brands achieve remarkable growth and measurable results.",
    hero: await getPortfolioHero(),
    projects: projectsArray.map((project: any, index: number) => ({
      ...project,
      slug: resolveProjectSlug(project, index),
    })),
  };
}
