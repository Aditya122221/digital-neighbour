import { defineField, defineType } from "sanity";

export const homeCaseStudy = defineType({
	name: "homeCaseStudy",
	title: "Home Page – Case Study",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			description: "Section heading",
			initialValue: "Latest work",
		}),
		defineField({
			name: "caseStudies",
			title: "Case Studies",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "caseStudy",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "textColor",
							title: "Text Color",
							type: "string",
							description: "CSS class for text color (e.g., 'text-blackbrown')",
							initialValue: "text-blackbrown",
						}),
						defineField({
							name: "bgImages",
							title: "Background Images",
							type: "array",
							of: [
								defineField({
									type: "image",
									name: "image",
									options: { hotspot: true },
								}),
							],
							description: "Multiple background images for hover effect",
							validation: (Rule) => Rule.min(1),
						}),
						defineField({
							name: "metrics",
							title: "Metrics",
							type: "array",
							of: [
								defineField({
									type: "object",
									name: "metric",
									fields: [
										defineField({
											name: "number",
											title: "Number",
											type: "string",
										}),
										defineField({
											name: "text",
											title: "Text",
											type: "string",
										}),
									],
								}),
							],
							description: "Metrics to display on hover",
						}),
						defineField({
							name: "services",
							title: "Services",
							type: "array",
							of: [{ type: "string" }],
							description: "Service tags",
						}),
						defineField({
							name: "isNew",
							title: "Is New",
							type: "boolean",
							description: "Show 'New' badge",
							initialValue: false,
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "heading",
			caseStudies: "caseStudies",
		},
		prepare({ title, caseStudies }) {
			return {
				title: title || "Case Study",
				subtitle: caseStudies?.length
					? `${caseStudies.length} case studies`
					: "No case studies",
			};
		},
	},
});

