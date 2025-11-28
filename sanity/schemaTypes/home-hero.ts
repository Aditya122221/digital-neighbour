import { defineField, defineType } from "sanity";

export const homeHero = defineType({
	name: "homeHero",
	title: "Homepage – Hero",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			description: "Main heading for the hero section",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "subheading",
			title: "Subheading",
			type: "text",
			description: "Subheading text below the main heading",
		}),
		defineField({
			name: "videoUrl",
			title: "Background Video",
			type: "file",
			description: "Optional background video file",
			options: {
				accept: "video/*",
			},
		}),
		defineField({
			name: "images",
			title: "Hero Images",
			type: "array",
			of: [
				defineField({
					type: "image",
					name: "image",
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							name: "alt",
							title: "Alt Text",
							type: "string",
							description: "Alternative text for the image",
						}),
					],
				}),
			],
			description: "Images for the hero section",
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "subheading",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Homepage Hero",
				subtitle: subtitle ? subtitle.slice(0, 80) : "",
			};
		},
	},
});

