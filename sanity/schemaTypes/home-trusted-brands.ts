import { defineField, defineType } from "sanity";

export const homeTrustedBrands = defineType({
	name: "homeTrustedBrands",
	title: "Home Page – Trusted Brands",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			description: "Section heading (e.g., 'Trusted by top brands')",
			initialValue: "Trusted by top brands",
		}),
		defineField({
			name: "logos",
			title: "Brand Logos",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "logo",
					fields: [
						defineField({
							name: "name",
							title: "Brand Name",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "image",
							title: "Logo Image",
							type: "image",
							options: { hotspot: true },
							description: "Upload brand logo image",
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
			logos: "logos",
		},
		prepare({ title, logos }) {
			return {
				title: title || "Trusted Brands",
				subtitle: logos?.length ? `${logos.length} brands` : "No brands",
			};
		},
	},
});

