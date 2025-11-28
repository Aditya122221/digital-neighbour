import { defineField, defineType } from "sanity"

export const aboutTeam = defineType({
	name: "aboutTeam",
	title: "About Page – Team",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Section title (e.g., 'Growth Experts')",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description: "Team section description",
			rows: 4,
		}),
		defineField({
			name: "members",
			title: "Team Members",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "member",
					fields: [
						defineField({
							name: "name",
							title: "Name",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "role",
							title: "Role",
							type: "string",
							description: "Job title/role",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "image",
							title: "Image",
							type: "image",
							options: { hotspot: true },
							description: "Team member photo",
						}),
						defineField({
							name: "social",
							title: "Social Links",
							type: "object",
							fields: [
								defineField({
									name: "twitter",
									title: "Twitter/X",
									type: "url",
								}),
								defineField({
									name: "linkedin",
									title: "LinkedIn",
									type: "url",
								}),
								defineField({
									name: "instagram",
									title: "Instagram",
									type: "url",
								}),
							],
						}),
					],
					preview: {
						select: {
							title: "name",
							subtitle: "role",
							media: "image",
						},
						prepare({ title, subtitle, media }) {
							return {
								title: title || "Team Member",
								subtitle: subtitle || "",
								media,
							}
						},
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			members: "members",
		},
		prepare({ title, members }) {
			return {
				title: title || "Team",
				subtitle: members?.length
					? `${members.length} member${members.length !== 1 ? "s" : ""}`
					: "No members",
			}
		},
	},
})

