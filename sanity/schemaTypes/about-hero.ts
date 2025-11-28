import { defineField, defineType } from "sanity";

export const aboutHero = defineType({
	name: "aboutHero",
	title: "About Page – Hero",
	type: "document",
	fields: [
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			description: "Small label above the heading (e.g., 'About Us')",
			initialValue: "About Us",
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
		defineField({
			name: "image",
			title: "Hero Image",
			type: "image",
			description: "Optional hero image",
			options: { hotspot: true },
		}),
		defineField({
			name: "wordsText",
			title: "Words Text",
			type: "text",
			description: "Additional text/quote for the hero section",
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "label",
			media: "image",
		},
		prepare({ title, subtitle, media }) {
			return {
				title: title || "About Hero",
				subtitle: subtitle || "",
				media,
			};
		},
	},
});

