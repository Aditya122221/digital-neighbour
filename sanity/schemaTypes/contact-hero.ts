import { defineField, defineType } from "sanity";

export const contactHero = defineType({
	name: "contactHero",
	title: "Contact Page – Hero",
	type: "document",
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			description: "Main heading text (before highlighted word)",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "highlightWord",
			title: "Word/Phrase to Highlight",
			type: "string",
			description: "Word or phrase in the heading to highlight",
		}),
		defineField({
			name: "headingSuffix",
			title: "Heading Suffix",
			type: "string",
			description: "Text after the highlighted word",
		}),
		defineField({
			name: "presenter",
			title: "Presenter Information",
			type: "object",
			fields: [
				defineField({
					name: "name",
					title: "Name",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "title",
					title: "Title/Position",
					type: "string",
					description: "e.g., 'Founder of Rocket SaaS'",
				}),
				defineField({
					name: "image",
					title: "Profile Image",
					type: "image",
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
		}),
		defineField({
			name: "benefits",
			title: "Benefits Section",
			type: "object",
			fields: [
				defineField({
					name: "title",
					title: "Benefits Title",
					type: "string",
					description: "e.g., 'Receive tailored advice on how to:'",
				}),
				defineField({
					name: "items",
					title: "Benefits Items",
					type: "array",
					of: [
						defineField({
							type: "object",
							name: "benefit",
							fields: [
								defineField({
									name: "id",
									title: "ID",
									type: "number",
								}),
								defineField({
									name: "text",
									title: "Text",
									type: "string",
								}),
								defineField({
									name: "icon",
									title: "Icon",
									type: "image",
									options: {
										hotspot: true,
									},
									fields: [
										defineField({
											name: "alt",
											title: "Alt Text",
											type: "string",
										}),
									],
								}),
							],
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "presenter.name",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Contact Hero",
				subtitle: subtitle ? `with ${subtitle}` : "",
			};
		},
	},
});

