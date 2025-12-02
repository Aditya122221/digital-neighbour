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

export const appDevelopmentPage = defineType({
	name: "appDevelopmentPage",
	title: "App Development Service Page",
	type: "document",
	groups: commonGroups,
	fields: [
		// Basic Info
		defineField({
			name: "serviceName",
			title: "Service Name",
			type: "string",
			description:
				"Display name for this app development service (e.g., 'App Development', 'iOS App Development', 'Android App Development')",
			group: "basic",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Service Slug",
			type: "slug",
			description:
				"URL-friendly identifier (e.g., 'app-development', 'ios-app-development', 'android-app-development')",
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
					name: "defaultHeroImages",
					title: "Default Hero Images",
					type: "array",
					description:
						"Fallback hero images (5 images) used by other app development pages when they don't upload their own images.",
					of: [
						{
							type: "image",
							options: {
								hotspot: true,
							},
						},
					],
					validation: (Rule) => Rule.max(5),
					hidden: ({ document }) =>
						document?.slug?.current !==
						"app-development",
				}),
				defineField({
					name: "heroImages",
					title: "Hero Images",
					type: "array",
					description:
						"Page-specific hero images for the slider (up to 5 images). If not provided, default images will be used.",
					of: [
						{
							type: "image",
							options: {
								hotspot: true,
							},
						},
					],
					validation: (Rule) => Rule.max(5),
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
					"Untitled App Development Service",
				subtitle: subtitle ? `/${subtitle}` : "No slug",
			}
		},
	},
})
