import { client } from "./client";
import type { QueryParams } from "next-sanity";

export async function sanityFetch<QueryResponse>({
	query,
	params = {},
	tag,
}: {
	query: string;
	params?: QueryParams;
	tag?: string;
}): Promise<QueryResponse> {
	return client.fetch<QueryResponse>(query, params, {
		next: {
			revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
			tags: tag ? [tag] : [],
		},
	});
}

