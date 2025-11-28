import { defineType, defineField } from "sanity";

export const seoSettings = defineType({
	name: "seoSettings",
	title: "SEO Settings",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "SEO Title",
			type: "string",
		}),
		defineField({
			name: "description",
			title: "SEO Description",
			type: "text",
		}),
		defineField({
			name: "keywords",
			title: "Keywords",
			type: "array",
			of: [{ type: "string" }],
		}),
		defineField({
			name: "ogImage",
			title: "Open Graph Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
	],
});

