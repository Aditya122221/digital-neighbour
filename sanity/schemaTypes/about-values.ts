import { defineField, defineType } from "sanity"

export const aboutValues = defineType({
	name: "aboutValues",
	title: "About Page – Values",
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
			name: "items",
			title: "Values",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "valueItem",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							description: "Value title",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							description: "Value description",
							rows: 4,
							validation: (Rule) => Rule.required(),
						}),
					],
					preview: {
						select: {
							title: "title",
							subtitle: "description",
						},
						prepare({ title, subtitle }) {
							return {
								title: title || "Value",
								subtitle: subtitle ? subtitle.slice(0, 60) : "",
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
			items: "items",
		},
		prepare({ title, items }) {
			return {
				title: title || "Values",
				subtitle: items?.length
					? `${items.length} value${items.length !== 1 ? "s" : ""}`
					: "No values",
			}
		},
	},
})

