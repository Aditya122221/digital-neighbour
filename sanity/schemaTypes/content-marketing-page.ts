import { defineField, defineType } from "sanity"
import {
	featuresField,
	keyBenefitsField,
	faqField,
	formField,
	introParagraphField,
	painPointsField,
	servicesTypeOne,
	contentSectionField,
	processField,
	seoSettingsField,
	commonGroups,
} from "./common"

export const contentMarketingPage = defineType({
	name: "contentMarketingPage",
	title: "Content Marketing Service Page",
	type: "document",
	groups: commonGroups,
	fields: [
		// Basic Info
		defineField({
			name: "serviceName",
			title: "Service Name",
			type: "string",
			description:
				"Display name for this content marketing service (e.g., 'Content Marketing', 'Content Strategy', 'Copywriting')",
			group: "basic",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Service Slug",
			type: "slug",
			description:
				"URL-friendly identifier (e.g., 'content-marketing', 'content-strategy', 'copywriting')",
			group: "basic",
			options: {
				source: "serviceName",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),

		// SEO Settings
		seoSettingsField(),

		// Hero Section
		defineField({
			name: "hero",
			title: "Hero Section",
			type: "object",
			group: "hero",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "subheading",
					title: "Subheading",
					type: "text",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "defaultHeroVideo",
					title: "Default Hero Video",
					type: "file",
					description:
						"Fallback hero video used by other content marketing pages when they don't upload their own clip.",
					options: {
						accept: "video/*",
					},
					hidden: ({ document }) =>
						document?.slug?.current !==
						"content-marketing",
				}),
				defineField({
					name: "bgVideo",
					title: "Background Video",
					type: "file",
					options: {
						accept: "video/*",
					},
					description:
						"Optional background video file",
				}),
			],
		}),

		// Form Section
		formField(),

		// Intro Paragraph
		introParagraphField(),

		// Pain Points
		painPointsField(),

		// Services
		servicesTypeOne(),

		// Content Section
		contentSectionField(),

		// Process Section
		processField(),

		// Key Benefits
		keyBenefitsField(),

		// Features
		featuresField(),

		// FAQ Section
		faqField(),
	],
	preview: {
		select: {
			title: "serviceName",
			subtitle: "slug.current",
		},
		prepare({ title, subtitle }) {
			return {
				title:
					title ||
					"Untitled Content Marketing Service",
				subtitle: subtitle ? `/${subtitle}` : "No slug",
			}
		},
	},
})
