import { defineField, defineType } from "sanity";

export const homeProcess = defineType({
	name: "homeProcess",
	title: "Home Page – Process",
	type: "document",
	fields: [
		defineField({
			name: "steps",
			title: "Steps",
			type: "array",
			of: [{ type: "string" }],
			description: "Process step titles",
		}),
		defineField({
			name: "content",
			title: "Content",
			type: "array",
			of: [
				defineField({
					type: "text",
					name: "stepContent",
				}),
			],
			description: "Detailed content for each step",
		}),
	],
	preview: {
		select: {
			steps: "steps",
		},
		prepare({ steps }) {
			return {
				title: "Process Section",
				subtitle: steps?.length ? `${steps.length} steps` : "No steps",
			};
		},
	},
});

