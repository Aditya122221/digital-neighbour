import { defineField, defineType } from "sanity"

import { serviceFieldConfig, type ServiceKey } from "./serviceFieldConfig"

const baseServiceSlug = "data-analytics" as const

const dataAnalyticsServiceSlugs = [
	"conversion-rate-optimization",
	"call-tracking",
	"reporting-and-dashboards",
	"google-analytics",
	"google-tag-manager",
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
	serviceCards: () =>
		defineField({
			name: "serviceCards",
			title: "Service Cards",
			type: "array",
			of: [{ type: "serviceCard" }],
		}),
	premiumCloudServices: () =>
		defineField({
			name: "premiumCloudServices",
			title: "Premium Cloud Services",
			type: "premiumCloudServicesSection",
		}),
	content: () =>
		defineField({
			name: "content",
			title: "Content Block",
			type: "copyBlockSection",
			validation: (rule) => rule.required(),
		}),
	process: () =>
		defineField({
			name: "process",
			title: "Process",
			type: "processSection",
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
	faq: () =>
		defineField({
			name: "faq",
			title: "FAQ",
			type: "faqSection",
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
	...dataAnalyticsServiceSlugs,
]

export const dataAnalyticsServiceType = defineType({
	name: "dataAnalyticsService",
	title: "Data & Analytics",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			initialValue:"Untitled",
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
		defineField({
			name: "metadata",
			title: "Metadata Title",
			type: "string",
			description:
				"SEO metadata title for this service page. If not provided, will fall back to hero heading.",
		}),
		defineField({
			name: "description",
			title: "Metadata Description",
			type: "text",
			description:
				"SEO metadata description for this service page. If not provided, will fall back to hero subheading.",
		}),
		...baseServiceFields,
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				title: title ?? "Data & Analytics Service",
			}
		},
	},
})
