import type { MetadataRoute } from "next"

import {
	getAllSeoLocationParams,
	getAllPaidAdsLocationParams,
	getAllSocialLocationParams,
	getAllContentLocationParams,
	getAllAppLocationParams,
	getAllHostingLocationParams,
	getAllWebDevLocationParams,
} from "@/lib/location-data"
import { LOCATION_ENABLED_SEO_SLUGS } from "@/app/seo/[slug]/[location]/page"
import { LOCATION_ENABLED_PAID_ADS_SLUGS } from "@/app/paid-advertisement/[slug]/[location]/page"
import { LOCATION_ENABLED_SOCIAL_SLUGS } from "@/app/social-media-marketing/[slug]/[location]/page"
import { LOCATION_ENABLED_CONTENT_SLUGS } from "@/app/content-marketing/[slug]/[location]/page"
import { LOCATION_ENABLED_APP_SLUGS } from "@/app/app-development/[slug]/[location]/page"
import { LOCATION_ENABLED_HOSTING_SLUGS } from "@/app/hosting-it-security/[slug]/[location]/page"
import { LOCATION_ENABLED_WEBDEV_SLUGS } from "@/app/web-development/[slug]/[location]/page"

const BASE_URL = "https://digital-neighbour.com"

function absolute(path: string) {
	return `${BASE_URL}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const lastModified = new Date()

	const entries: MetadataRoute.Sitemap = [
		{ url: absolute("/"), lastModified },
	]

	getAllSeoLocationParams(LOCATION_ENABLED_SEO_SLUGS).forEach(
		({ slug, location }) => {
			const url =
				slug === "search-engine-optimisation"
					? absolute(`/seo/${location}`)
					: absolute(`/seo/${slug}/${location}`)

			entries.push({ url, lastModified })
		}
	)

	getAllPaidAdsLocationParams(LOCATION_ENABLED_PAID_ADS_SLUGS).forEach(
		({ slug, location }) => {
			entries.push({
				url: absolute(
					`/paid-advertisement/${slug}/${location}`
				),
				lastModified,
			})
		}
	)

	getAllSocialLocationParams(LOCATION_ENABLED_SOCIAL_SLUGS).forEach(
		({ slug, location }) => {
			const url =
				slug === "social-media-management"
					? absolute(
							`/social-media-marketing/${location}`
					  )
					: absolute(
							`/social-media-marketing/${slug}/${location}`
					  )

			entries.push({ url, lastModified })
		}
	)

	getAllContentLocationParams(LOCATION_ENABLED_CONTENT_SLUGS).forEach(
		({ slug, location }) => {
			entries.push({
				url: absolute(
					`/content-marketing/${slug}/${location}`
				),
				lastModified,
			})
		}
	)

	getAllAppLocationParams(LOCATION_ENABLED_APP_SLUGS).forEach(
		({ slug, location }) => {
			entries.push({
				url: absolute(
					`/app-development/${slug}/${location}`
				),
				lastModified,
			})
		}
	)

	getAllHostingLocationParams(LOCATION_ENABLED_HOSTING_SLUGS).forEach(
		({ slug, location }) => {
			entries.push({
				url: absolute(
					`/hosting-it-security/${slug}/${location}`
				),
				lastModified,
			})
		}
	)

	getAllWebDevLocationParams(LOCATION_ENABLED_WEBDEV_SLUGS).forEach(
		({ slug, location }) => {
			entries.push({
				url: absolute(
					`/web-development/${slug}/${location}`
				),
				lastModified,
			})
		}
	)

	return entries
}
