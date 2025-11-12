import type { QueryParams } from "@sanity/client";
import type { SanityDocument } from "sanity";

import { sanityClient } from "./client";

export async function sanityFetch<T = SanityDocument>(
  query: string,
  params: QueryParams = {},
) {
  return sanityClient.fetch<T>(query, params);
}
