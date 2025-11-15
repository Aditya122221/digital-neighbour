import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Headline",
          type: "string",
          description:
            "Write the full headline. The final word will be highlighted automatically on the site.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
          options: {
            hotspot: true,
          },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "wordsText",
          title: "Animated Words",
          type: "text",
          rows: 4,
          description:
            "Enter the sentence or phrase to animate. Words are automatically split by spaces.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "origins",
      title: "Origins",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          readOnly: true,
          initialValue: "The Origins",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 5,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "images",
          title: "Images",
          type: "array",
          of: [
            defineField({
              name: "imageEntry",
              type: "object",
              fields: [
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
          validation: (rule) =>
            rule
              .required()
              .min(2)
              .max(2)
              .error("Please upload exactly two origin images."),
        }),
      ],
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          readOnly: true,
          initialValue: "Our Values",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "items",
          title: "Value Items",
          type: "array",
          of: [
            defineField({
              name: "valueItem",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 4,
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
          validation: (rule) =>
            rule.required().min(3).max(3).error("Add exactly three values."),
        }),
      ],
    }),
    defineField({
      name: "achievements",
      title: "Achievements",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          readOnly: true,
          initialValue: "Achievements",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "array",
          of: [
            defineField({
              name: "stat",
              type: "object",
              fields: [
                defineField({
                  name: "number",
                  title: "Number",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                }),
              ],
            }),
          ],
          validation: (rule) =>
            rule.required().min(4).max(4).error("Add exactly four stats."),
        }),
        defineField({
          name: "team",
          title: "Team Section",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "members",
              title: "Team Members",
              type: "array",
              of: [
                defineField({
                  name: "member",
                  type: "object",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Name",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "role",
                      title: "Role",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "image",
                      title: "Portrait",
                      type: "image",
                      options: {
                        hotspot: true,
                      },
                    }),
                    defineField({
                      name: "social",
                      title: "Social Links",
                      type: "object",
                      fields: [
                        defineField({
                          name: "twitter",
                          title: "Twitter",
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
      title: "About Page",
    },
    prepare({ title }) {
      return {
        title: title ?? "About Page",
      }
    },
  },
});
