import { defineField, defineType } from "sanity"

import { serviceFieldConfig, type ServiceKey } from "./serviceFieldConfig"

const baseServiceSlug = "search-engine-optimisation" as const

const seoServiceSlugs = [
	"local-seo",
	"wordpress-seo",
	"ecom-seo",
	"ai-seo",
	"shopify-seo",
	"seo-audits",
	"online-reputation-management",
	"seo-migration",
	"small-business-seo",
	"lead-generation",
	"link-building",
	"international-seo",
	"mobile-seo",
	"voice-search-optimisation",
	"video-seo",
	"youtube-seo",
	"seo-strategy",
	"geo",
	"sge",
	"app-store-optimisation",
	"guest-posting",
	"local-citations",
	"penalty-recovery",
	"multilingual-seo",
] satisfies ServiceKey[]

type SectionBuilder = (args?: {
	initialValue?: string
}) => ReturnType<typeof defineField>

const sectionFieldBuilders: Record<string, SectionBuilder> = {
	hero: () =>
		defineField({
			name: "hero",
			title: "Hero",
			type: "heroSection",
			validation: (rule) => rule.required(),
		}),
	form: () =>
		defineField({
			name: "form",
			title: "Form",
			type: "formSection",
			validation: (rule) => rule.required(),
		}),
	introParagraph: () =>
		defineField({
			name: "introParagraph",
			title: "Intro Paragraph",
			type: "introParagraphSection",
			validation: (rule) => rule.required(),
		}),
	painPoints: () =>
		defineField({
			name: "painPoints",
			title: "Pain Points",
			type: "painPointsSection",
			validation: (rule) => rule.required(),
		}),
	keyBenefits: () =>
		defineField({
			name: "keyBenefits",
			title: "Key Benefits",
			type: "keyBenefitsSection",
			validation: (rule) => rule.required(),
		}),
	features: () =>
		defineField({
			name: "features",
			title: "Features",
			type: "featuresSection",
			validation: (rule) => rule.required(),
		}),
	specialisations: () =>
		defineField({
			name: "specialisations",
			title: "Specialisations",
			type: "array",
			of: [{ type: "specialisation" }],
		}),
	content: () =>
		defineField({
			name: "content",
			title: "Content Block",
			type: "copyBlockSection",
			validation: (rule) => rule.required(),
		}),
	services: ({ initialValue } = {}) =>
		defineField({
			name: "services",
			title: "Service Label",
			type: "string",
			initialValue,
			validation: (rule) => rule.required(),
		}),
	process: () =>
		defineField({
			name: "process",
			title: "Process",
			type: "processSection",
		}),
	faq: () =>
		defineField({
			name: "faq",
			title: "FAQ",
			type: "faqSection",
		}),
	serviceCards: () =>
		defineField({
			name: "serviceCards",
			title: "Service Cards",
			type: "array",
			of: [{ type: "serviceCard" }],
		}),
	industries: () =>
		defineField({
			name: "industries",
			title: "Industries",
			type: "industriesSection",
		}),
	premiumCloudServices: () =>
		defineField({
			name: "premiumCloudServices",
			title: "Premium Cloud Services",
			type: "premiumCloudServicesSection",
		}),
	strategic: () =>
		defineField({
			name: "strategic",
			title: "Strategic Section",
			type: "strategicSection",
		}),
}

const buildSectionFields = (serviceKey: ServiceKey) => {
	const config = serviceFieldConfig[serviceKey]

	return config.sections
		.map((sectionName) => {
			const builder = sectionFieldBuilders[sectionName]

			if (!builder) {
				return undefined
			}

			if (sectionName === "services") {
				return builder({ initialValue: config.title })
			}

			return builder()
		})
		.filter(
			(field): field is ReturnType<typeof defineField> =>
				typeof field !== "undefined"
		)
}

const baseServiceFields = buildSectionFields(baseServiceSlug)
const selectableServiceKeys: ServiceKey[] = [
	baseServiceSlug,
	...seoServiceSlugs,
]

export const seoServiceType = defineType({
	name: "seoService",
	title: "SEO Service",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Display name for this service.",
			initialValue: serviceFieldConfig[baseServiceSlug].title,
			options: {
				list: selectableServiceKeys.map(
					(serviceKey) => {
						const config =
							serviceFieldConfig[
								serviceKey
							]

						return {
							title: config.title,
							value: config.title,
						}
					}
				),
				layout: "dropdown",
			},
			validation: (rule) => rule.required(),
		}),
		...baseServiceFields,
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				title: title ?? "SEO Service",
			}
		},
	},
})
