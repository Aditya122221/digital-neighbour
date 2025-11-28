import { defineField, defineType } from "sanity";

export const homeServices = defineType({
	name: "homeServices",
	title: "Home Page – Services",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
		}),
		defineField({
			name: "subheading",
			title: "Subheading",
			type: "text",
		}),
		defineField({
			name: "cards",
			title: "Service Cards",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "serviceCard",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
						}),
						defineField({
							name: "subheading",
							title: "Subheading",
							type: "array",
							of: [{ type: "string" }],
						}),
						defineField({
							name: "video",
							title: "Video",
							type: "file",
							options: {
								accept: "video/*",
							},
							description: "Upload video file",
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "subheading",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Services Section",
				subtitle: subtitle ? subtitle.slice(0, 80) : "",
			};
		},
	},
});

