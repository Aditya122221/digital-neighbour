import { defineField, defineType } from "sanity";

export const resourcesArticles = defineType({
	name: "resourcesArticles",
	title: "Resources Articles",
	type: "document",
	fields: [
		defineField({
			name: "articles",
			title: "Articles",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "article",
					fields: [
						defineField({
							name: "slug",
							title: "Slug",
							type: "slug",
							description: "URL-friendly identifier for the article",
							options: {
								source: "title",
								maxLength: 96,
							},
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							description: "Article title",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "category",
							title: "Category",
							type: "string",
							description: "Article category (e.g., Marketing, Social Media)",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "date",
							title: "Date",
							type: "date",
							description: "Publication date",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "excerpt",
							title: "Excerpt",
							type: "text",
							description: "Short excerpt/summary of the article",
							rows: 3,
						}),
						defineField({
							name: "image",
							title: "Article Image",
							type: "image",
							options: { hotspot: true },
							description: "Featured image for the article",
						}),
						defineField({
							name: "content",
							title: "Content",
							type: "text",
							description: "Full article content",
							rows: 10,
						}),
					],
					preview: {
						select: {
							title: "title",
							subtitle: "category",
							media: "image",
						},
						prepare({ title, subtitle, media }) {
							return {
								title: title || "Resource Article",
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
			articles: "articles",
		},
		prepare({ articles }) {
			return {
				title: "Resources Articles",
				subtitle: articles?.length
					? `${articles.length} articles`
					: "No articles",
			};
		},
	},
});

