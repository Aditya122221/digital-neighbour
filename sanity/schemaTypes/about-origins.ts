import { defineField, defineType } from "sanity"

export const aboutOrigins = defineType({
	name: "aboutOrigins",
	title: "About Page – Origins",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Section title",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description: "Main description text",
			rows: 5,
		}),
		defineField({
			name: "images",
			title: "Images",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "imageItem",
					fields: [
						defineField({
							name: "image",
							title: "Image",
							type: "image",
							options: { hotspot: true },
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "alt",
							title: "Alt Text",
							type: "string",
							description: "Alternative text for the image",
						}),
					],
					preview: {
						select: {
							title: "alt",
							media: "image",
						},
						prepare({ title, media }) {
							return {
								title: title || "Image",
								media,
							}
						},
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "description",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Origins",
				subtitle: subtitle ? subtitle.slice(0, 80) : "",
			}
		},
	},
})

