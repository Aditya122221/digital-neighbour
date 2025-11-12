import { groq } from "next-sanity";

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    summary,
    body,
    seo
  }
`;

export const allPagesQuery = groq`
  *[_type == "page"] | order(_createdAt desc){
    _id,
    title,
    slug,
    summary
  }
`;

export const servicePageBySlugQuery = groq`
  *[_type == "servicePage" && (slug.current == $slug || serviceKey == $slug)][0]
`;

export const allServicePagesQuery = groq`
  *[_type == "servicePage" && defined(slug.current)] | order(coalesce(servicesLabel, hero.heading, serviceKey) asc){
    _id,
    serviceKey,
    coalesce(servicesLabel, hero.heading) as title,
    "slug": coalesce(slug.current, serviceKey),
    servicesLabel
  }
`;
