import { defineField, defineType } from "sanity";

export const portfolioProject = defineType({
	name: "portfolioProject",
	title: "Portfolio Projects",
	type: "document",
	fields: [
		defineField({
			name: "projects",
			title: "Projects",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "project",
					fields: [
						defineField({
							name: "slug",
							title: "Slug",
							type: "slug",
							description: "URL-friendly identifier for the project",
							options: {
								source: "headline",
								maxLength: 96,
							},
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "logoText",
							title: "Logo Text",
							type: "string",
							description: "Text displayed next to the logo",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "logo",
							title: "Logo Image",
							type: "image",
							options: { hotspot: true },
							description: "Optional logo image for the project",
						}),
						defineField({
							name: "headline",
							title: "Headline",
							type: "string",
							description: "Main headline/title for the project",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "image",
							title: "Project Image",
							type: "image",
							options: { hotspot: true },
							description: "Main project image",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "imageAlt",
							title: "Image Alt Text",
							type: "string",
							description: "Alternative text for the project image",
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
											name: "value",
											title: "Value",
											type: "string",
											description: "Metric value (e.g., '150%', '2M')",
										}),
										defineField({
											name: "label",
											title: "Label",
											type: "string",
											description: "Metric label (e.g., 'Growth', 'Users')",
										}),
									],
								}),
							],
							description: "Key metrics to display",
						}),
						defineField({
							name: "tags",
							title: "Tags",
							type: "array",
							of: [{ type: "string" }],
							description: "Project tags/categories",
						}),
						defineField({
							name: "content",
							title: "Content",
							type: "text",
							description: "Project description/content",
							rows: 5,
						}),
					],
					preview: {
						select: {
							title: "headline",
							subtitle: "logoText",
							media: "image",
						},
						prepare({ title, subtitle, media }) {
							return {
								title: title || "Portfolio Project",
								subtitle: subtitle || "",
								media,
							};
						},
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			projects: "projects",
		},
		prepare({ projects }) {
			return {
				title: "Portfolio Projects",
				subtitle: projects?.length
					? `${projects.length} projects`
					: "No projects",
			};
		},
	},
});

