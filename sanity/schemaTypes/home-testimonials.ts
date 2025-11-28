import { defineField, defineType } from "sanity";

export const homeTestimonials = defineType({
	name: "homeTestimonials",
	title: "Home Page – Testimonials",
	type: "document",
	fields: [
		defineField({
			name: "eyebrow",
			title: "Eyebrow Text",
			type: "string",
			description: "Small label above the heading",
			initialValue: "Testimonials",
		}),
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			description: "Main heading for the testimonials section",
			initialValue: "Hear From Our Happy Clients",
		}),
		defineField({
			name: "testimonials",
			title: "Testimonials",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "testimonial",
					fields: [
						defineField({
							name: "quote",
							title: "Quote",
							type: "text",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "author",
							title: "Author Name",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "position",
							title: "Position/Company",
							type: "string",
							description: "e.g., 'Product Manager, Hexa Studio'",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "image",
							title: "Author Image",
							type: "image",
							options: { hotspot: true },
							description: "Upload author portrait image",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "number",
							title: "Number",
							type: "string",
							description: "e.g., '01/05'",
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "heading",
			testimonials: "testimonials",
		},
		prepare({ title, testimonials }) {
			return {
				title: title || "Testimonials",
				subtitle: testimonials?.length
					? `${testimonials.length} testimonials`
					: "No testimonials",
			};
		},
	},
});

