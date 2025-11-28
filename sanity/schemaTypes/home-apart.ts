import { defineField, defineType } from "sanity";

export const homeApart = defineType({
	name: "homeApart",
	title: "Home Page – Apart",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			description: "Main heading",
			initialValue: "What sets us apart from others",
		}),
		defineField({
			name: "tagline",
			title: "Tagline",
			type: "string",
			description: "Tagline text below heading",
			initialValue: "We don't settle for average, and neither should you.",
		}),
		defineField({
			name: "oursTitle",
			title: "Ours Title",
			type: "string",
			description: "Title for 'ours' column",
			initialValue: "Digital Neighbour",
		}),
		defineField({
			name: "othersTitle",
			title: "Others Title",
			type: "string",
			description: "Title for 'others' column",
			initialValue: "Other Agencies",
		}),
		defineField({
			name: "ours",
			title: "Ours List",
			type: "array",
			of: [{ type: "string" }],
			description: "List of items for 'ours' column",
		}),
		defineField({
			name: "others",
			title: "Others List",
			type: "array",
			of: [{ type: "string" }],
			description: "List of items for 'others' column",
		}),
	],
	preview: {
		select: {
			title: "heading",
			ours: "ours",
			others: "others",
		},
		prepare({ title, ours, others }) {
			return {
				title: title || "Apart Section",
				subtitle: `Ours: ${ours?.length || 0}, Others: ${others?.length || 0}`,
			};
		},
	},
});

