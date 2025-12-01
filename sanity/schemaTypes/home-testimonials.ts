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
			name: "image",
			title: "Sample Image",
			type: "image",
			options: { hotspot: true },
			description: "Sample image for the testimonials section",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "imageAlt",
			title: "Image Alt Text",
			type: "string",
			description: "Alternative text for the sample image",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "firstbox",
			title: "Main Box",
			type: "object",
			fields: [
				defineField({
					name: "logo",
					title: "Logo",
					type: "image",
					options: { hotspot: true },
					description: "Logo for the main box",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "companyName",
					title: "Company Name",
					type: "string",
					description: "Name of the company",
					validation: (Rule) => Rule.required(),
				}),
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
			]
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
							name: "companyName",
							title: "Company Name",
							type: "string",
							description: "Name of the company",
							validation: (Rule) => Rule.required(),
						}),
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

