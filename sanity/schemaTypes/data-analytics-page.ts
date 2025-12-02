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

export const dataAnalyticsPage = defineType({
	name: "dataAnalyticsPage",
	title: "Data & Analytics Service Page",
	type: "document",
	groups: [
		...commonGroups,
		{
			name: "industries",
			title: "Industries",
		},
		{
			name: "premiumCloudServices",
			title: "Premium Cloud Services",
		},
	],
	fields: [
		// Basic Info
		defineField({
			name: "serviceName",
			title: "Service Name",
			type: "string",
			description:
				"Display name for this Data & Analytics service",
			group: "basic",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Service Slug",
			type: "slug",
			description:
				"URL-friendly identifier (e.g., 'data-analytics')",
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
					name: "tagline",
					title: "Tagline",
					type: "string",
					description:
						"Short tagline displayed above the heading",
				}),
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
					rows: 3,
				}),
				defineField({
					name: "defaultHeroImages",
					title: "Default Hero Images",
					type: "array",
					description:
						"Fallback hero images (3 images) used by other Data & Analytics pages when they don't upload their own images.",
					of: [
						{
							type: "image",
							options: {
								hotspot: true,
							},
						},
					],
					validation: (Rule) =>
						Rule.max(3).min(3),
					hidden: ({ document }) =>
						document?.slug?.current !==
						"data-analytics",
				}),
				defineField({
					name: "heroImages",
					title: "Hero Images",
					type: "array",
					description:
						"Page-specific hero images (exactly 3 images). If not provided, default images will be used.",
					of: [
						{
							type: "image",
							options: {
								hotspot: true,
							},
						},
					],
					validation: (Rule) =>
						Rule.max(3).min(3),
				}),
			],
		}),

		// Form Section
		formField(),

		// Intro Paragraph
		introParagraphField(),

		// Pain Points
		painPointsField(),

		// Industries Section
		defineField({
			name: "industries",
			title: "Industries Section",
			type: "object",
			group: "industries",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
				}),
				defineField({
					name: "description",
					title: "Description",
					type: "text",
					rows: 4,
				}),
				defineField({
					name: "industries",
					title: "Industries",
					type: "array",
					of: [
						{
							type: "object",
							fields: [
								defineField({
									name: "id",
									title: "ID",
									type: "string",
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
								defineField({
									name: "name",
									title: "Name",
									type: "string",
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
								defineField({
									name: "icon",
									title: "Icon",
									type: "image",
									options: {
										hotspot: true,
									},
									description: "Icon image",
								}),
								defineField({
									name: "details",
									title: "Details",
									type: "text",
									rows: 3,
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
							],
							preview: {
								select: {
									title: "name",
									subtitle: "details",
								},
								prepare({
									title,
									subtitle,
								}) {
									return {
										title:
											title ||
											"Industry",
										subtitle: subtitle
											? subtitle.slice(
													0,
													60
												)
											: "",
									}
								},
							},
						},
					],
				}),
			],
		}),

		// Services
		servicesTypeOne(),

		// Content Section
		contentSectionField(),

		// Premium Cloud Services
		defineField({
			name: "premiumCloudServices",
			title: "Premium Cloud Services",
			type: "object",
			group: "premiumCloudServices",
			fields: [
				defineField({
					name: "title",
					title: "Title",
					type: "string",
				}),
				defineField({
					name: "topCards",
					title: "Top Cards",
					type: "array",
					of: [
						{
							type: "object",
							fields: [
								defineField({
									name: "title",
									title: "Title",
									type: "string",
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
								defineField({
									name: "description",
									title: "Description",
									type: "text",
									rows: 3,
									validation: (
										Rule
									) =>
										Rule.required(),
								}),
							],
							preview: {
								select: {
									title: "title",
									subtitle: "description",
								},
								prepare({
									title,
									subtitle,
								}) {
									return {
										title:
											title ||
											"Top Card",
										subtitle: subtitle
											? subtitle.slice(
													0,
													60
												)
											: "",
									}
								},
							},
						},
					],
				}),
				defineField({
					name: "customApi",
					title: "Custom API Card",
					type: "object",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
						}),
						defineField({
							name: "badge",
							title: "Badge",
							type: "string",
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 4,
						}),
						defineField({
							name: "buttonText",
							title: "Button Text",
							type: "string",
						}),
						defineField({
							name: "buttonLink",
							title: "Button Link",
							type: "string",
							description:
								"URL path or anchor link",
						}),
					],
				}),
				defineField({
					name: "maximumCustomization",
					title: "Maximum Customization",
					type: "object",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							rows: 4,
						}),
						defineField({
							name: "buttonText",
							title: "Button Text",
							type: "string",
						}),
						defineField({
							name: "buttonLink",
							title: "Button Link",
							type: "string",
							description:
								"URL path or anchor link",
						}),
						defineField({
							name: "features",
							title: "Features",
							type: "array",
							of: [
								{
									type: "object",
									fields: [
										defineField(
											{
												name: "title",
												title: "Title",
												type: "string",
												validation: (
													Rule
												) =>
													Rule.required(),
											}
										),
										defineField(
											{
												name: "description",
												title: "Description",
												type: "text",
												rows: 3,
												validation: (
													Rule
												) =>
													Rule.required(),
											}
										),
									],
									preview: {
										select: {
											title: "title",
											subtitle: "description",
										},
										prepare({
											title,
											subtitle,
										}) {
											return {
												title:
													title ||
													"Feature",
												subtitle: subtitle
													? subtitle.slice(
															0,
															60
														)
													: "",
											}
										},
									},
								},
							],
						}),
					],
				}),
			],
		}),

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
				title: title || "Data & Analytics Service Page",
				subtitle: subtitle ? `/${subtitle}` : "",
			}
		},
	},
})
