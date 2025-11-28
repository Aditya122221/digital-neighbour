import { defineField, defineType } from "sanity";

export const homePageSeo = defineType({
	name: "homePageSeo",
	title: "Homepage SEO & Settings",
	type: "document",
	groups: [
		{ name: "page", title: "Page Settings" },
		{ name: "meta", title: "Meta Tags" },
		{ name: "openGraph", title: "Open Graph" },
		{ name: "extra", title: "Advanced" },
	],
	fields: [
		defineField({
			name: "metadata",
			title: "Page Title",
			type: "string",
			description: "The main title for the home page",
			group: "page",
		}),
		defineField({
			name: "description",
			title: "Page Description",
			type: "text",
			description: "Meta description for SEO and page description",
			rows: 3,
			group: "page",
		}),
		defineField({
			name: "title",
			title: "SEO Title",
			type: "string",
			description: "Suggested 50-60 characters",
			group: "meta",
			validation: (Rule) => Rule.max(60),
		}),
		defineField({
			name: "keywords",
			title: "Keywords",
			type: "array",
			of: [{ type: "string" }],
			options: { layout: "tags" },
			group: "meta",
		}),
		defineField({
			name: "ogTitle",
			title: "Open Graph Title",
			type: "string",
			group: "openGraph",
		}),
		defineField({
			name: "ogDescription",
			title: "Open Graph Description",
			type: "text",
			rows: 3,
			group: "openGraph",
		}),
		defineField({
			name: "ogImage",
			title: "Open Graph Image",
			type: "image",
			description: "Recommended 1200x630px",
			options: { hotspot: true },
			group: "openGraph",
		}),
		defineField({
			name: "canonicalUrl",
			title: "Canonical URL",
			type: "url",
			group: "extra",
		}),
		defineField({
			name: "structuredData",
			title: "Structured Data (JSON-LD)",
			type: "text",
			rows: 6,
			group: "extra",
		}),
	],
	preview: {
		select: {
			title: "metadata",
			subtitle: "description",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Homepage SEO & Settings",
				subtitle: subtitle ? subtitle.slice(0, 80) : "Page settings",
			};
		},
	},
});

