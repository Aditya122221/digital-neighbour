import { defineField, defineType } from "sanity";

export const homeBookACall = defineType({
	name: "homeBookACall",
	title: "Home Page – Book a Call",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			description: "Main heading",
			initialValue: "Book a call now.",
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description: "First paragraph description",
		}),
		defineField({
			name: "subDescription",
			title: "Sub Description",
			type: "text",
			description: "Second paragraph description",
		}),
		defineField({
			name: "buttonText",
			title: "Button Text",
			type: "string",
			initialValue: "Book a call",
		}),
		defineField({
			name: "buttonLink",
			title: "Button Link",
			type: "string",
			description: "URL or path for the button (e.g., /contact)",
			initialValue: "/contact",
		}),
		defineField({
			name: "illustrationImage",
			title: "Illustration Image",
			type: "image",
			options: { hotspot: true },
			description: "Optional illustration image (e.g., contactus-vector.svg)",
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "description",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Book a Call",
				subtitle: subtitle ? subtitle.slice(0, 80) : "",
			};
		},
	},
});

