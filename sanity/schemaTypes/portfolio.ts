import { defineArrayMember, defineField, defineType } from "sanity"

const HERO_LABEL = "Portfolio"

export const portfolioPageType = defineType({
	name: "portfolioPage",
	title: "Portfolio Page",
	type: "document",
	fields: [
		defineField({
			name: "hero",
			title: "Hero",
			type: "object",
			validation: (rule) => rule.required(),
			fields: [
				defineField({
					name: "label",
					title: "Label",
					type: "string",
					readOnly: true,
					initialValue: HERO_LABEL,
					description: "Read-only label displayed above the hero title.",
				}),
				defineField({
					name: "title",
					title: "Title",
					type: "string",
					validation: (rule) => rule.required().max(120),
				}),
				defineField({
					name: "description",
					title: "Description",
					type: "text",
					rows: 3,
					validation: (rule) => rule.required().max(320),
				}),
			],
		}),
		defineField({
			name: "projects",
			title: "Projects",
			type: "array",
			validation: (rule) => rule.required().min(1),
			of: [
				defineArrayMember({
					name: "project",
					title: "Project",
					type: "object",
					fields: [
						defineField({
							name: "headline",
							title: "Headline",
							type: "string",
							validation: (rule) => rule.required(),
						}),
						defineField({
							name: "metrics",
							title: "Metrics",
							type: "array",
							validation: (rule) => rule.required().min(1).max(3),
							of: [
								defineArrayMember({
									name: "metric",
									title: "Metric",
									type: "object",
									fields: [
										defineField({
											name: "value",
											title: "Value",
											type: "string",
											validation: (rule) => rule.required(),
										}),
										defineField({
											name: "label",
											title: "Label",
											type: "string",
											validation: (rule) => rule.required(),
										}),
									],
									preview: {
										select: { title: "value", subtitle: "label" },
									},
								}),
							],
						}),
						defineField({
							name: "tags",
							title: "Tags",
							type: "array",
							validation: (rule) => rule.required().min(1).max(3),
							of: [
								defineArrayMember({
									name: "tag",
									title: "Tag",
									type: "object",
									fields: [
										defineField({
											name: "tag",
											title: "Tag",
											type: "string",
											validation: (rule) => rule.required(),
										}),
									],
									preview: {
										select: { title: "tag" },
									},
								}),
							],
						}),
						defineField({
							name: "image",
							title: "Hero Image",
							type: "image",
							options: { hotspot: true },
							validation: (rule) => rule.required(),
						}),
						defineField({
							name: "content",
							title: "Content",
							type: "array",
							of: [{ type: "block" }],
							validation: (rule) => rule.required().min(1),
						}),
					],
					preview: {
						select: { title: "headline" },
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "Portfolio Page",
		},
		prepare({ title }) {
			return {
				title: "Portfolio Page",
			}
		},
	},
})