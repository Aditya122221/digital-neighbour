import seoData from "@/data/seo.json"
import { getSeoServiceBySlug } from "@/lib/sanity-service-data"

export interface SeoPageData {
	hero?: Record<string, any>
	form?: Record<string, any>
	introParagraph?: Record<string, any>
	painPoints?: {
		heading?: string
		subheading?: string
		painPoints?: any[]
		[key: string]: any
	}
	services?: string | Record<string, any>
	serviceCards?: any[]
	specialisations?: any[]
	content?: Record<string, any>
	process?: {
		steps?: any[]
		content?: any[]
		[key: string]: any
	}
	keyBenefits?: {
		heading?: string
		subheading?: string
		benefits?: any[]
		items?: any[]
		[key: string]: any
	}
	features?: {
		heading?: string
		subheading?: string
		features?: any[]
		items?: any[]
		[key: string]: any
	}
	faq?: {
		heading?: string
		subheading?: string
		faqs?: any[]
		items?: any[]
		[key: string]: any
	}
	[key: string]: any
}

const seoJsonData = seoData as Record<string, SeoPageData>

function pickArray<T>(primary?: T[] | null, fallback?: T[] | null) {
	if (Array.isArray(primary) && primary.length > 0) {
		return primary
	}
	if (Array.isArray(fallback) && fallback.length > 0) {
		return fallback
	}
	return undefined
}

function mergeObjects<T extends Record<string, any> | undefined>(
	fallback?: T,
	remote?: T
) {
	if (fallback && remote) {
		return { ...fallback, ...remote }
	}
	return remote ?? fallback
}

function normalizeKeyBenefits(
	fallback?: SeoPageData["keyBenefits"],
	remote?: SeoPageData["keyBenefits"]
) {
	if (!fallback && !remote) {
		return undefined
	}

	const fallbackItems =
		fallback?.benefits?.length
			? fallback.benefits
			: fallback?.items?.length
				? fallback.items
				: undefined
	const remoteItems =
		remote?.benefits?.length
			? remote.benefits
			: remote?.items?.length
				? remote.items
				: undefined

	return {
		...(fallback ?? {}),
		...(remote ?? {}),
		benefits: pickArray(remoteItems, fallbackItems),
	}
}

function normalizeFeatures(
	fallback?: SeoPageData["features"],
	remote?: SeoPageData["features"]
) {
	if (!fallback && !remote) {
		return undefined
	}

	const fallbackItems =
		fallback?.features?.length
			? fallback.features
			: fallback?.items?.length
				? fallback.items
				: undefined
	const remoteItems =
		remote?.features?.length
			? remote.features
			: remote?.items?.length
				? remote.items
				: undefined

	return {
		...(fallback ?? {}),
		...(remote ?? {}),
		features: pickArray(remoteItems, fallbackItems),
	}
}

function normalizeFaq(
	fallback?: SeoPageData["faq"],
	remote?: SeoPageData["faq"]
) {
	if (!fallback && !remote) {
		return undefined
	}

	const fallbackItems =
		fallback?.faqs?.length
			? fallback.faqs
			: fallback?.items?.length
				? fallback.items
				: undefined
	const remoteItems =
		remote?.faqs?.length
			? remote.faqs
			: remote?.items?.length
				? remote.items
				: undefined

	return {
		...(fallback ?? {}),
		...(remote ?? {}),
		faqs: pickArray(remoteItems, fallbackItems),
	}
}

export function mergeSeoPageData(
	remoteData: SeoPageData | null | undefined,
	slugKey: string
): SeoPageData | null {
	const fallbackData = seoJsonData[slugKey]

	if (!fallbackData && !remoteData) {
		return null
	}

	const fallback = fallbackData ?? {}
	const remote = remoteData ?? {}

	return {
		...fallback,
		...remote,
		hero: mergeObjects(fallback.hero, remote.hero),
		form: mergeObjects(fallback.form, remote.form),
		introParagraph: mergeObjects(
			fallback.introParagraph,
			remote.introParagraph
		),
		painPoints: {
			...(fallback.painPoints ?? {}),
			...(remote.painPoints ?? {}),
			painPoints: pickArray(
				remote.painPoints?.painPoints,
				fallback.painPoints?.painPoints
			),
		},
		services: remote.services ?? fallback.services,
		serviceCards: pickArray(remote.serviceCards, fallback.serviceCards),
		specialisations: pickArray(
			remote.specialisations,
			fallback.specialisations
		),
		content: mergeObjects(fallback.content, remote.content),
		process: {
			...(fallback.process ?? {}),
			...(remote.process ?? {}),
			steps: pickArray(remote.process?.steps, fallback.process?.steps),
			content: pickArray(
				remote.process?.content,
				fallback.process?.content
			),
		},
		keyBenefits: normalizeKeyBenefits(
			fallback.keyBenefits,
			remote.keyBenefits
		),
		features: normalizeFeatures(fallback.features, remote.features),
		faq: normalizeFaq(fallback.faq, remote.faq),
	}
}

export async function loadSeoPageData(
	slugKey: string
): Promise<SeoPageData | null> {
	const remoteData = await getSeoServiceBySlug(slugKey)
	return mergeSeoPageData(remoteData, slugKey)
}

