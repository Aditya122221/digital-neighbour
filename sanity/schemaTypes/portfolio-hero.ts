import { defineField, defineType } from "sanity";

export const portfolioHero = defineType({
	name: "portfolioHero",
	title: "Portfolio Page – Hero",
	type: "document",
	fields: [
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			description: "Small label above the heading (e.g., 'Portfolio')",
			initialValue: "Portfolio",
		}),
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
	],
	preview: {
		select: {
			title: "title",
			subtitle: "label",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Portfolio Hero",
				subtitle: subtitle || "",
			};
		},
	},
});

