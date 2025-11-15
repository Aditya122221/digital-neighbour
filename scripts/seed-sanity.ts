import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";
import { serviceFieldConfig } from "../sanity/schemaTypes/serviceFieldConfig";

// Load environment variables from .env
config({ path: path.join(process.cwd(), ".env") });

// Initialize Sanity client with write token
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2023-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Generate a write token from your Sanity project settings.",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

const uploadedImageCache = new Map<string, string>();
const ABOUT_TEAM_PLACEHOLDER = "/placeholder-user.jpg";

// Map service slugs to Sanity document types
const serviceTypeMap: Record<string, string> = {
  seo: "seoService",
  "paid-ads": "paidAdvertService", // File is paid-ads.json
  "paid-advertisement": "paidAdvertService",
  "social-media": "socialMarketingService", // File is social-media.json
  "social-media-marketing": "socialMarketingService",
  "content-marketing": "contentMarketingService",
  "web-development": "webDevelopmentService",
  "app-development": "appDevelopmentService",
  "hosting-it-security": "hostingService",
  "ai-automation": "aiAutomationService",
  "data-analytics": "dataAnalyticsService",
  industries: "industriesService",
  "professionals-marketing": "professionalMarketingService",
  professionals: "professionalMarketingService", // JSON uses "professionals"
};

// Map JSON slugs to serviceFieldConfig slugs (for cases where they differ)
const slugMapping: Record<string, string> = {
  "online-reputation-management": "orm", // JSON uses "online-reputation-management", config uses "orm"
  "search-engine-optimisation": "seo", // JSON might use this, config uses "seo"
  professionals: "professionals", // JSON uses "professionals", config might use this
};

// Transform JSON data structure to match Sanity schema
function transformData(jsonData: any, serviceSlug: string): any {
  const transformed: any = {};

  // Map slug if needed (e.g., "online-reputation-management" -> "orm")
  const mappedSlug = slugMapping[serviceSlug] || serviceSlug;

  // Get the title from serviceFieldConfig
  const config =
    serviceFieldConfig[mappedSlug as keyof typeof serviceFieldConfig];
  if (!config) {
    console.warn(
      `No config found for slug: ${serviceSlug} (mapped: ${mappedSlug})`,
    );
    return null;
  }

  transformed.title = config.title;

  // Transform each section
  if (jsonData.hero) {
    transformed.hero = {
      heading: jsonData.hero.heading || "",
      subheading: jsonData.hero.subheading || "",
    };
    // Handle hero.industries array (for industries service)
    if (jsonData.hero.industries && Array.isArray(jsonData.hero.industries)) {
      transformed.hero.industries = jsonData.hero.industries.map(
        (industry: any, index: number) => ({
          _key: industry._key || `${serviceSlug}-hero-industry-${index}`,
          name: industry.name || "",
          slug: industry.slug || "",
          // Don't include image for now
        }),
      );
    }
  }

  if (jsonData.form) {
    transformed.form = {
      heading: jsonData.form.heading || "",
      content: jsonData.form.content || "",
      subContent: jsonData.form.subContent || "",
      cta: jsonData.form.cta || "",
      formHeading: jsonData.form.formHeading || "",
      buttonText: jsonData.form.buttonText || "",
    };
  }

  if (jsonData.introParagraph) {
    transformed.introParagraph = {
      heading: jsonData.introParagraph.heading || "",
      problemStatement: jsonData.introParagraph.problemStatement || "",
      valueProposition: jsonData.introParagraph.valueProposition || "",
    };
    // Handle paragraphs array (for industries/professionals services)
    if (
      jsonData.introParagraph.paragraphs &&
      Array.isArray(jsonData.introParagraph.paragraphs)
    ) {
      // Join paragraphs into problemStatement and valueProposition if not already set
      if (
        !transformed.introParagraph.problemStatement &&
        jsonData.introParagraph.paragraphs.length > 0
      ) {
        transformed.introParagraph.problemStatement =
          jsonData.introParagraph.paragraphs[0] || "";
      }
      if (
        !transformed.introParagraph.valueProposition &&
        jsonData.introParagraph.paragraphs.length > 1
      ) {
        transformed.introParagraph.valueProposition =
          jsonData.introParagraph.paragraphs[1] || "";
      }
    }
  }

  if (jsonData.painPoints || jsonData.painpoints) {
    const painPoints = jsonData.painPoints || jsonData.painpoints;
    transformed.painPoints = {
      heading: painPoints.heading || "",
      subheading: painPoints.subheading || "",
      painPoints: (painPoints.painPoints || painPoints.items || []).map(
        (pp: any, index: number) => ({
          _key: pp._key || `${serviceSlug}-painpoint-${index}`,
          problem: pp.problem || pp.title || "",
          solution: pp.solution || pp.description || "",
        }),
      ),
    };
  }

  if (jsonData.serviceCards) {
    transformed.serviceCards = jsonData.serviceCards.map(
      (card: any, index: number) => ({
        _key: card._key || card.id || `${serviceSlug}-servicecard-${index}`,
        id: card.id || "",
        name: card.name || "",
        title: card.title || "",
        description: card.description || "",
        // Don't include image for now - keep it empty
      }),
    );
  }

  if (jsonData.content) {
    transformed.content = {
      heading: jsonData.content.heading || "",
      text1: jsonData.content.text1 || "",
      text2: jsonData.content.text2 || "",
      text3: jsonData.content.text3 || "",
      // Don't include image for now
      alt: jsonData.content.alt || "",
    };
  }

  if (jsonData.process) {
    transformed.process = {
      heading: jsonData.process.heading || "",
      steps: jsonData.process.steps || [],
      content: jsonData.process.content || [],
    };
  }

  if (jsonData.keyBenefits || jsonData.keybenefits) {
    const keyBenefits = jsonData.keyBenefits || jsonData.keybenefits;
    transformed.keyBenefits = {
      heading: keyBenefits.heading || "",
      subheading: keyBenefits.subheading || "",
      benefits: (keyBenefits.benefits || []).map(
        (benefit: any, index: number) => ({
          _key: benefit._key || `${serviceSlug}-benefit-${index}`,
          title: benefit.title || "",
          description: benefit.description || "",
          icon: benefit.icon || "",
          // Don't include image for now
        }),
      ),
      items: (keyBenefits.items || []).map((item: any, index: number) => ({
        _key: item._key || `${serviceSlug}-keybenefit-item-${index}`,
        title: item.title || "",
        description: item.description || "",
        icon: item.icon || "",
        // Don't include image for now
      })),
    };
  }

  if (jsonData.features) {
    transformed.features = {
      heading: jsonData.features.heading || "",
      subheading: jsonData.features.subheading || "",
      features: (jsonData.features.features || []).map(
        (feature: any, index: number) => ({
          _key: feature._key || `${serviceSlug}-feature-${index}`,
          title: feature.title || "",
          description: feature.description || "",
          icon: feature.icon || "",
        }),
      ),
    };
  }

  if (jsonData.faq) {
    transformed.faq = {
      serviceName: jsonData.faq.serviceName || "",
      faqs: (jsonData.faq.faqs || []).map((faq: any, index: number) => ({
        _key: faq._key || `${serviceSlug}-faq-${index}`,
        q: faq.q || "",
        a: faq.a || "",
      })),
    };
  }

  // Handle service-specific fields
  if (jsonData.strategic) {
    transformed.strategic = {
      heading: jsonData.strategic.heading || "",
      blocks: (jsonData.strategic.blocks || []).map(
        (block: any, index: number) => ({
          _key: block._key || `${serviceSlug}-strategic-block-${index}`,
          icon: block.icon || "",
          title: block.title || "",
          description: block.description || "",
        }),
      ),
    };
  }

  if (jsonData.industries) {
    transformed.industries = {
      heading: jsonData.industries.heading || "",
      description: jsonData.industries.description || "",
      industries: (jsonData.industries.industries || []).map(
        (ind: any, index: number) => ({
          _key: ind._key || ind.id || `${serviceSlug}-industry-${index}`,
          id: ind.id || "",
          name: ind.name || "",
          icon: ind.icon || "",
          details: ind.details || "",
        }),
      ),
    };
  }

  if (jsonData.premiumCloudServices) {
    transformed.premiumCloudServices = {
      title: jsonData.premiumCloudServices.title || "",
      cardone: {
        title:
          jsonData.premiumCloudServices.cardone?.title ||
          jsonData.premiumCloudServices.topCards?.[0]?.title ||
          "",
        description:
          jsonData.premiumCloudServices.cardone?.description ||
          jsonData.premiumCloudServices.topCards?.[0]?.description ||
          "",
      },
      cardtwo: {
        title:
          jsonData.premiumCloudServices.cardtwo?.title ||
          jsonData.premiumCloudServices.topCards?.[1]?.title ||
          "",
        description:
          jsonData.premiumCloudServices.cardtwo?.description ||
          jsonData.premiumCloudServices.topCards?.[1]?.description ||
          "",
      },
      customApi: {
        title: jsonData.premiumCloudServices.customApi?.title || "",
        badge: jsonData.premiumCloudServices.customApi?.badge || "",
        description: jsonData.premiumCloudServices.customApi?.description || "",
      },
      maximumCustomization: {
        title: jsonData.premiumCloudServices.maximumCustomization?.title || "",
        description:
          jsonData.premiumCloudServices.maximumCustomization?.description || "",
        features: (
          jsonData.premiumCloudServices.maximumCustomization?.features || []
        ).map((feature: any, index: number) => ({
          _key: feature._key || `${serviceSlug}-premium-feature-${index}`,
          title: feature.title || "",
          description: feature.description || "",
          icon: feature.icon || "",
          // Don't include image for now
        })),
      },
    };
  }

  return transformed;
}

// Helper function to retry operations with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000,
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // If it's a connection reset or network error, retry
      const isRetryable =
        error.code === "ECONNRESET" ||
        error.code === "ETIMEDOUT" ||
        error.code === "ENOTFOUND" ||
        error.message?.includes("ECONNRESET") ||
        error.message?.includes("ETIMEDOUT");

      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = initialDelay * Math.pow(2, attempt);
      console.warn(
        `⚠ Retry ${
          attempt + 1
        }/${maxRetries} after ${delay}ms for connection error...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Delay helper
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Seed a single service
async function seedService(
  serviceSlug: string,
  jsonData: any,
  documentType: string,
): Promise<void> {
  const transformed = transformData(jsonData, serviceSlug);

  if (!transformed) {
    console.warn(`Skipping ${serviceSlug} - no transformation possible`);
    return;
  }

  try {
    // Check if document already exists with retry
    const existing = await retryWithBackoff(async () => {
      return await client.fetch(
        `*[_type == $documentType && title == $title][0]`,
        {
          documentType,
          title: transformed.title,
        },
      );
    });

    if (existing) {
      // Update existing document with retry
      await retryWithBackoff(async () => {
        await client.patch(existing._id).set(transformed).commit();
      });
      console.log(`✓ Updated: ${transformed.title} (${serviceSlug})`);
    } else {
      // Create new document with retry
      await retryWithBackoff(async () => {
        await client.create({
          _type: documentType,
          ...transformed,
        });
      });
      console.log(`✓ Created: ${transformed.title} (${serviceSlug})`);
    }

    // Add a small delay between requests to avoid rate limiting
    await delay(500);
  } catch (error: any) {
    if (error.code === "ECONNRESET" || error.message?.includes("ECONNRESET")) {
      console.error(
        `✗ Connection reset error seeding ${serviceSlug}:`,
        error.message || error,
      );
      throw error;
    }
    console.error(`✗ Error seeding ${serviceSlug}:`, error);
    throw error;
  }
}


function transformMarketingAgencyData(data: any) {
  if (!data) {
    return null;
  }

  const withKeys = <T extends Record<string, any>>(
    items: T[] = [],
    prefix: string,
  ) =>
    items.map((item, index) => ({
      _key: item?._key || `${prefix}-${index}`,
      ...item,
    }));

  const mapTitleDescription = (items: any[] = [], prefix: string) =>
    items.map((item, index) => ({
      _key: item?._key || `${prefix}-${index}`,
      title: item?.title || "",
      description: item?.description || "",
      icon: item?.icon || "",
      image: item?.image || "",
    }));

  return {
    title: "Marketing Agency",
    metadata: data?.hero?.heading || "",
    description: data?.hero?.subheading || "",
    hero: {
      heading: data?.hero?.heading || "",
      subheading: data?.hero?.subheading || "",
    },
    form: {
      heading: data?.form?.heading || "",
      content: data?.form?.content || "",
      subContent: data?.form?.subContent || "",
      cta: data?.form?.cta || "",
      formHeading: data?.form?.formHeading || "",
      buttonText: data?.form?.buttonText || "",
    },
    introParagraph: {
      heading: data?.introParagraph?.heading || "",
      problemStatement: data?.introParagraph?.problemStatement || "",
      valueProposition: data?.introParagraph?.valueProposition || "",
    },
    painPoints: {
      heading: data?.painPoints?.heading || "",
      subheading: data?.painPoints?.subheading || "",
      painPoints: (data?.painPoints?.painPoints || []).map(
        (item: any, index: number) => ({
          _key: item?._key || `painpoint-${index}`,
          problem: item?.problem || item?.title || "",
          solution: item?.solution || item?.description || "",
        }),
      ),
    },
    services: data?.services || "",
    process: {
      heading: data?.process?.heading || "",
      steps: data?.process?.steps || [],
      content: data?.process?.content || [],
    },
    keyBenefits: {
      heading: data?.keyBenefits?.heading || "",
      subheading: data?.keyBenefits?.subheading || "",
      benefits: mapTitleDescription(
        data?.keyBenefits?.benefits || data?.keyBenefits?.items || [],
        "marketing-benefit",
      ),
      items: mapTitleDescription(
        data?.keyBenefits?.items || [],
        "marketing-benefit-item",
      ),
    },
    features: {
      heading: data?.features?.heading || "",
      subheading: data?.features?.subheading || "",
      features: withKeys(
        (data?.features?.features || []).map((feature: any) => ({
          title: feature?.title || "",
          description: feature?.description || "",
          icon: feature?.icon || "",
        })),
        "marketing-feature",
      ),
    },
    faq: {
      serviceName: data?.faq?.serviceName || "",
      faqs: (data?.faq?.faqs || []).map((faq: any, index: number) => ({
        _key: faq?._key || `marketing-faq-${index}`,
        q: faq?.q || "",
        a: faq?.a || "",
      })),
    },
  };
}

async function seedMarketingAgencyPage(dataDir: string) {
  const filePath = path.join(dataDir, "marketing-agency.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠ File not found: marketing-agency.json");
    return;
  }

  const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const marketingData = rawData["marketing-agency"];
  const transformed = transformMarketingAgencyData(marketingData);

  if (!transformed) {
    console.warn("⚠ Unable to transform marketing agency data");
    return;
  }

  try {
    const existing = await retryWithBackoff(async () => {
      return client.fetch(`*[_type == "marketingAgencyPage"][0]`);
    });

    if (existing) {
      await retryWithBackoff(async () => {
        await client.patch(existing._id).set(transformed).commit();
      });
      console.log("✓ Updated: Marketing Agency page");
    } else {
      await retryWithBackoff(async () => {
        await client.create({
          _type: "marketingAgencyPage",
          ...transformed,
        });
      });
      console.log("✓ Created: Marketing Agency page");
    }
  } catch (error) {
    console.error("✗ Error seeding marketing agency page:", error);
    throw error;
  }
}

const DEFAULT_RESOURCES_HERO = {
  title: "Explore insights on marketing, branding, and social media.",
  description:
    "Fresh perspectives, practical frameworks, and playbooks to help your brand grow and stand out.",
  details: [
    "Curated thinking across growth, product, and creative operations—updated weekly with lessons from the brands we partner with.",
  ],
};

type ResourcesJsonEntry = {
  slug?: string;
  title?: string;
  description?: string;
  details?: string | string[];
  category?: string;
  date?: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  content?: string;
};

function normalizeResourceDetails(details?: string | string[]): string[] {
  if (Array.isArray(details)) {
    return details
      .map((detail) => (typeof detail === "string" ? detail.trim() : ""))
      .filter(Boolean);
  }
  if (typeof details === "string" && details.trim()) {
    return [details.trim()];
  }
  return [];
}

function buildResourcesHero(entry?: ResourcesJsonEntry) {
  if (!entry) {
    return DEFAULT_RESOURCES_HERO;
  }

  const details = normalizeResourceDetails(entry.details);

  return {
    title: entry.title?.trim() || DEFAULT_RESOURCES_HERO.title,
    description:
      entry.description?.trim() || DEFAULT_RESOURCES_HERO.description,
    details: details.length > 0 ? details : DEFAULT_RESOURCES_HERO.details,
  };
}

async function buildResourceArticles(entries: ResourcesJsonEntry[]) {
  const articles = [];

  for (const entry of entries) {
    const slug =
      typeof entry.slug === "string" ? entry.slug.trim().toLowerCase() : "";
    const title = entry.title?.trim() || "";
    const category = entry.category?.trim() || "";
    const excerpt = entry.excerpt?.trim() || "";

    if (!slug || !title || !category || !excerpt) {
      continue;
    }

    const publishedAt = entry.date
      ? new Date(entry.date).toISOString()
      : new Date().toISOString();
    const image = await ensureImageAsset(entry.image);
    const content =
      typeof entry.content === "string" && entry.content.trim()
        ? entry.content.trim()
        : undefined;

    articles.push({
      _key: entry.slug ?? slug,
      title,
      category,
      excerpt,
      content,
      publishedAt,
      image,
      imageUrl:
        !image && typeof entry.image === "string" ? entry.image : undefined,
      imageAlt: entry.imageAlt?.trim() || title,
      slug: {
        _type: "slug",
        current: slug,
      },
    });
  }

  return articles;
}

async function seedResourcesPage(dataDir: string) {
  const filePath = path.join(dataDir, "resources.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠ File not found: resources.json");
    return;
  }

  const rawEntries: ResourcesJsonEntry[] = JSON.parse(
    fs.readFileSync(filePath, "utf-8"),
  );

  if (!Array.isArray(rawEntries) || rawEntries.length === 0) {
    console.warn("⚠ No entries found in resources.json");
    return;
  }

  const heroEntry = rawEntries.find((entry) => !entry.slug);
  const articleEntries = rawEntries.filter(
    (entry) => typeof entry.slug === "string",
  );

  const hero = buildResourcesHero(heroEntry);
  const articles = await buildResourceArticles(articleEntries);

  if (articles.length === 0) {
    console.warn("⚠ No valid resource articles found to seed");
  }

  try {
    const existing = await retryWithBackoff(async () => {
      return client.fetch(`*[_type == "resourcesPage"][0]`);
    });

    const payload = {
      title: hero.title,
      description: hero.description,
      details: hero.details,
      articles,
    };

    if (existing) {
      await retryWithBackoff(async () => {
        await client.patch(existing._id).set(payload).commit();
      });
      console.log("✓ Updated: Resources page content");
    } else {
      await retryWithBackoff(async () => {
        await client.create({
          _type: "resourcesPage",
          ...payload,
        });
      });
      console.log("✓ Created: Resources page content");
    }
  } catch (error) {
    console.error("✗ Error seeding resources page:", error);
    throw error;
  }
}

async function ensureImageAsset(imagePath?: string) {
  if (!imagePath || typeof imagePath !== "string") {
    return undefined;
  }

  const normalizedPath = imagePath.replace(/^\/+/, "");
  const absolutePath = path.join(process.cwd(), "public", normalizedPath);

  if (!fs.existsSync(absolutePath)) {
    console.warn(`⚠ Image file not found: ${absolutePath}`);
    return undefined;
  }

  if (uploadedImageCache.has(absolutePath)) {
    const assetId = uploadedImageCache.get(absolutePath)!;
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: assetId,
      },
    };
  }

  const fileStream = fs.createReadStream(absolutePath);
  const filename = path.basename(absolutePath);

  const asset = await retryWithBackoff(async () => {
    return client.assets.upload("image", fileStream, {
      filename,
    });
  });

  uploadedImageCache.set(absolutePath, asset._id);

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

function createPortableTextFromString(text?: string) {
  const content = (text ?? "").trim() || "Content coming soon.";
  const paragraphs = content.split(/\n{2,}/).filter(Boolean);
  const source = paragraphs.length > 0 ? paragraphs : [content];

  return source.map((paragraph, index) => ({
    _type: "block",
    style: "normal",
    _key: `portfolio-content-${index}`,
    children: [
      {
        _type: "span",
        marks: [],
        text: paragraph,
      },
    ],
  }));
}

async function seedPortfolioPage(dataDir: string) {
  const filePath = path.join(dataDir, "portfolio.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠ File not found: portfolio.json");
    return;
  }

  const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const heroData = rawData?.hero ?? {};
  const projectsData = Array.isArray(rawData?.projects) ? rawData.projects : [];

  const hero = {
    label: heroData.label || "Portfolio",
    title: heroData.title || "Success stories from brands we've helped grow",
    description:
      heroData.description ||
      "Discover how our strategic approach drives measurable results for businesses across industries.",
  };

  const projects = [];

  for (let i = 0; i < projectsData.length; i++) {
    const project = projectsData[i];

    const metricsSource = Array.isArray(project?.metrics)
      ? project.metrics
      : [];
    const metrics = metricsSource
      .slice(0, 3)
      .map((metric: any, metricIndex: number) => ({
        _type: "metric",
        _key: `portfolio-metric-${i}-${metricIndex}`,
        value: metric?.value || "",
        label: metric?.label || "",
      }));

    const tagsSource = Array.isArray(project?.tags) ? project.tags : [];
    const tags = tagsSource.slice(0, 3).map((tag: any, tagIndex: number) => ({
      _type: "tag",
      _key: `portfolio-tag-${i}-${tagIndex}`,
      tag: typeof tag === "string" ? tag : tag?.tag || "",
    }));

    const image = await ensureImageAsset(project?.image);
    const content = createPortableTextFromString(
      project?.content || project?.headline,
    );

    projects.push({
      _type: "project",
      _key: project?._key || `portfolio-project-${i}`,
      headline: project?.headline || "",
      metrics,
      tags,
      image,
      content,
    });
  }

  try {
    const existing = await retryWithBackoff(async () => {
      return client.fetch(`*[_type == "portfolioPage"][0]`);
    });

    const payload = {
      hero,
      projects,
    };

    if (existing) {
      await retryWithBackoff(async () => {
        await client.patch(existing._id).set(payload).commit();
      });
      console.log("✓ Updated: Portfolio page");
    } else {
      await retryWithBackoff(async () => {
        await client.create({
          _type: "portfolioPage",
          ...payload,
        });
      });
      console.log("✓ Created: Portfolio page");
    }
  } catch (error) {
    console.error("✗ Error seeding portfolio page:", error);
    throw error;
  }
}

async function transformAboutData(rawAboutData: any) {
  if (!rawAboutData) {
    return null;
  }

  const heroData = rawAboutData.hero ?? {};
  const heroImage =
    (await ensureImageAsset(heroData.image)) ??
    (await ensureImageAsset("/aboutImage.avif"));
  const heroWordsText =
    typeof heroData.wordsText === "string"
      ? heroData.wordsText
      : Array.isArray(heroData.words)
        ? heroData.words
            .filter((word: string) => Boolean(word?.trim()))
            .join(" ")
        : "";

  const originsImagesRaw = Array.isArray(rawAboutData.origins?.images)
    ? rawAboutData.origins.images
    : [];
  const originsImages: Array<{
    image: NonNullable<Awaited<ReturnType<typeof ensureImageAsset>>>;
    alt: string;
  }> = [];

  for (let index = 0; index < originsImagesRaw.length; index++) {
    const entry = originsImagesRaw[index];
    const uploadedImage = await ensureImageAsset(entry?.image ?? entry?.src);
    if (!uploadedImage) {
      console.warn(
        `⚠ Unable to upload origins image ${index + 1} for about page`,
      );
      continue;
    }
    originsImages.push({
      image: uploadedImage,
      alt: entry?.alt || `Origins image ${index + 1}`,
    });
  }

  const valuesItems = Array.isArray(rawAboutData.values?.items)
    ? rawAboutData.values.items.map((item: any) => ({
        title: item?.title || "",
        description: item?.description || "",
      }))
    : [];

  const stats = Array.isArray(rawAboutData.achievements?.stats)
    ? rawAboutData.achievements.stats.slice(0, 4).map((stat: any) => ({
        number: stat?.number || "",
        label: stat?.label || "",
      }))
    : [];

  const teamSource =
    rawAboutData.achievements?.team ?? rawAboutData.team ?? null;
  let team: {
    title?: string;
    description?: string;
    members: Array<{
      name: string;
      role: string;
      image?: Awaited<ReturnType<typeof ensureImageAsset>>;
      social?: Record<string, unknown>;
    }>;
  } | null = null;

  if (teamSource) {
    const memberEntries = Array.isArray(teamSource.members)
      ? teamSource.members
      : [];
    const members = [];
    for (let index = 0; index < memberEntries.length; index++) {
      const member = memberEntries[index];
      const uploadedImage =
        (await ensureImageAsset(member?.image)) ||
        (await ensureImageAsset(ABOUT_TEAM_PLACEHOLDER));

      members.push({
        name: member?.name || `Team member ${index + 1}`,
        role: member?.role || "",
        image: uploadedImage,
        social: member?.social ?? {},
      });
    }

    team = {
      title: teamSource.title || "",
      description: teamSource.description || "",
      members,
    };
  }

  if (!heroImage) {
    console.warn("⚠ About hero image missing; skipping about page seed");
    return null;
  }

  if (originsImages.length === 0) {
    console.warn("⚠ About origins images missing; skipping about page seed");
    return null;
  }

  return {
    hero: {
      title: heroData.title || "Team Behind Your Growth",
      description:
        heroData.description ||
        "We're a collective of storytellers, strategists, and builders.",
      image: heroImage,
      wordsText:
        heroWordsText ||
        "We craft strategies that feel authentic, perform exceptionally, and help brands grow in ways that actually matter.",
    },
    origins: {
      title: rawAboutData.origins?.title || "The Origins",
      description:
        rawAboutData.origins?.description ||
        "Our journey began with a small group of creative minds...",
      images: originsImages,
    },
    values: {
      title: rawAboutData.values?.title || "Our Values",
      items: valuesItems,
    },
    achievements: {
      title: rawAboutData.achievements?.title || "Achievements",
      description:
        rawAboutData.achievements?.description ||
        "Milestones that highlight our impact across industries.",
      stats,
      team: team ?? undefined,
    },
  };
}

async function seedAboutPage(dataDir: string) {
  const filePath = path.join(dataDir, "about.json");

  if (!fs.existsSync(filePath)) {
    console.warn("⚠ File not found: about.json");
    return;
  }

  const aboutJson = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const transformed = await transformAboutData(aboutJson);

  if (!transformed) {
    console.warn("⚠ Unable to transform about page data");
    return;
  }

  try {
    const existing = await retryWithBackoff(async () => {
      return client.fetch(`*[_type == "aboutPage"][0]`);
    });

    if (existing) {
      await retryWithBackoff(async () => {
        await client.patch(existing._id).set(transformed).commit();
      });
      console.log("✓ Updated: About page content");
    } else {
      await retryWithBackoff(async () => {
        await client.create({
          _type: "aboutPage",
          ...transformed,
        });
      });
      console.log("✓ Created: About page content");
    }
  } catch (error) {
    console.error("✗ Error seeding about page:", error);
    throw error;
  }
}

// Main seed function
async function seedAllServices() {
  const dataDir = path.join(process.cwd(), "data");
  await seedAboutPage(dataDir);
  await seedMarketingAgencyPage(dataDir);
  await seedPortfolioPage(dataDir);
  await seedResourcesPage(dataDir);
  const jsonFiles = [
    "seo.json",
    "paid-ads.json",
    "social-media.json",
    "content-marketing.json",
    "web-development.json",
    "app-development.json",
    "hosting-it-security.json",
    "ai-automation.json",
    "data-analytics.json",
    "industries.json",
    "professionals-marketing.json",
  ];

  console.log("Starting Sanity seed process...\n");

  for (const file of jsonFiles) {
    const filePath = path.join(dataDir, file);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠ File not found: ${file}`);
      continue;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    // Determine document type from filename
    let baseName = file.replace(".json", "");

    // Handle file name mappings
    if (baseName === "paid-ads") {
      baseName = "paid-advertisement";
    } else if (baseName === "social-media") {
      baseName = "social-media-marketing";
    } else if (baseName === "professionals-marketing") {
      // Keep as is, but JSON key is "professionals"
      baseName = "professionals-marketing";
    }

    const documentType = serviceTypeMap[baseName];

    if (!documentType) {
      console.warn(
        `⚠ No document type mapping for: ${baseName} (from file: ${file})`,
      );
      continue;
    }

    console.log(`\n📦 Processing ${file} (${documentType})...`);

    // Process each service in the JSON file
    const services = Object.entries(jsonData);
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < services.length; i++) {
      const [slug, data] = services[i];

      // Skip non-service keys
      if (slug === "otherServices" || typeof data !== "object") {
        continue;
      }

      try {
        await seedService(slug, data, documentType);
        successCount++;
      } catch (error: any) {
        failCount++;
        console.error(
          `✗ Failed to seed ${slug} from ${file}:`,
          error.message || error,
        );

        // If it's a connection error, add a longer delay before continuing
        if (
          error.code === "ECONNRESET" ||
          error.message?.includes("ECONNRESET")
        ) {
          console.warn(
            `⏸ Waiting 2 seconds before continuing due to connection reset...`,
          );
          await delay(2000);
        }

        // Continue with next service instead of stopping
      }

      // Add a small delay between services to avoid rate limiting
      if (i < services.length - 1) {
        await delay(300);
      }
    }

    console.log(`\n📊 ${file}: ${successCount} succeeded, ${failCount} failed`);
  }

  console.log("\n✅ Seed process completed!");
}

// Run the seed
seedAllServices().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
