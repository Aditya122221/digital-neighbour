import { defineField, defineType } from "sanity"

export const aboutAchievements = defineType({
	name: "aboutAchievements",
	title: "About Page – Achievements",
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
			name: "stats",
			title: "Statistics",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "stat",
					fields: [
						defineField({
							name: "number",
							title: "Number",
							type: "string",
							description: "Statistic number/value (e.g., '100+', '300M+')",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "label",
							title: "Label",
							type: "string",
							description: "Statistic label",
							validation: (Rule) => Rule.required(),
						}),
					],
					preview: {
						select: {
							title: "number",
							subtitle: "label",
						},
						prepare({ title, subtitle }) {
							return {
								title: title || "Stat",
								subtitle: subtitle || "",
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
			stats: "stats",
		},
		prepare({ title, stats }) {
			const statsCount = stats?.length || 0
			return {
				title: title || "Achievements",
				subtitle: statsCount > 0
					? `${statsCount} stat${statsCount !== 1 ? "s" : ""}`
					: "No stats",
			}
		},
	},
})

