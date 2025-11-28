import { defineField, defineType } from "sanity";

export const resourcesHero = defineType({
	name: "resourcesHero",
	title: "Resources Page – Hero",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Main heading for the hero section",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description: "Description text below the title",
		}),
		defineField({
			name: "details",
			title: "Details",
			type: "array",
			of: [{ type: "string" }],
			description: "Array of detail text items displayed in the right card",
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "description",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Resources Hero",
				subtitle: subtitle || "",
			};
		},
	},
});

