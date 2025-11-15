import { defineField, defineType } from "sanity"

const slugifyResource = (input: string) =>
	input
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 96) || "resource"

export const resourcesPageType = defineType({
	name: "resourcesPage",
	title: "Resources Page",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Hero Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "description",
			title: "Hero Description",
			type: "text",
			rows: 3,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "details",
			title: "Hero Details",
			type: "array",
			description:
				"Supporting bullets shown in the right column of the hero section.",
			of: [
				{
					type: "text",
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
		},
	},
})

export const resourceArticleType = defineType({
	name: "resourceArticle",
	title: "Resource Article",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			description: "Automatically generated from the title.",
			options: {
				source: "title",
				slugify: slugifyResource,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "publishedAt",
			title: "Published Date",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "excerpt",
			title: "Excerpt",
			type: "text",
			rows: 3,
			description: "Short blurb shown on the grid and metadata.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "image",
			title: "Hero Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "imageUrl",
			title: "External Image URL",
			type: "url",
			description: "Optional external image when not uploading to Sanity.",
			validation: (rule) =>
				rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
		}),
		defineField({
			name: "imageAlt",
			title: "Image Alt Text",
			type: "string",
		}),
		defineField({
			name: "content",
			title: "Body Content",
			type: "text",
			rows: 20,
			description:
				"Long-form content shown on the resource detail page. Markdown and line breaks are preserved.",
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "category",
			media: "image",
		},
	},
})

