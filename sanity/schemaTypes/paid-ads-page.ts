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

export const paidAdsPage = defineType({
	name: "paidAdsPage",
	title: "Paid Ads Service Page",
	type: "document",
	groups: [
		{
			name: "basic",
			title: "Basic Information",
		},
		{
			name: "seo",
			title: "SEO Settings",
		},
		{
			name: "hero",
			title: "Hero Section",
		},
		{
			name: "form",
			title: "Form Section",
		},
		{
			name: "services",
			title: "Services",
		},
		{
			name: "process",
			title: "Process Section",
		},
		{
			name: "strategic",
			title: "Strategic Section",
		},
		{
			name: "introParagraph",
			title: "Intro Paragraph",
		},
		{
			name: "painPoints",
			title: "Pain Points",
		},
		{
			name: "keyBenefits",
			title: "Key Benefits",
		},
		{
			name: "features",
			title: "Features",
		},
		{
			name: "content",
			title: "Content Section",
		},
		{
			name: "faq",
			title: "FAQ Section",
		},
	],
	fields: [
		// Basic Info
		defineField({
			name: "serviceName",
			title: "Service Name",
			type: "string",
			description:
				"Display name for this paid ads service (e.g., 'Paid Advertising', 'Google Ads', 'Meta Ads')",
			group: "basic",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Service Slug",
			type: "slug",
			description:
				"URL-friendly identifier for this paid ads service page (e.g., 'paid-advertisement', 'google-ads', 'meta-ads')",
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
					title: "Default Hero Background Video",
					type: "file",
					description:
						"Used as the fallback background video for other Paid Ads service pages.",
					options: {
						accept: "video/*",
					},
					hidden: ({ document }) =>
						document?.slug?.current !==
						"paid-advertisement",
				}),
				defineField({
					name: "bgVideo",
					title: "Background Video",
					type: "file",
					options: {
						accept: "video/*",
					},
					description:
						"Optional hero background video",
				}),
			],
		}),

		// Form Section
		formField(),

		// Services
		servicesTypeOne(),

		// Process Section
		processField(),

		// Strategic Section
		defineField({
			name: "strategic",
			title: "Strategic Section",
			type: "object",
			group: "strategic",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
				}),
			],
		}),

		// Intro Paragraph
		introParagraphField(),

		// Pain Points
		painPointsField(),

		// Key Benefits
		keyBenefitsField(),

		// Features
		featuresField(),

		// Content Section
		contentSectionField(),

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
				title: title || "Untitled Paid Ads Service",
				subtitle: subtitle ? `/${subtitle}` : "No slug",
			}
		},
	},
})
