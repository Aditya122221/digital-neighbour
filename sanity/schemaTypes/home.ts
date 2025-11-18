import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "metadata",
      title: "Metadata",
      type: "string",
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
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "subheading",
          title: "Subheading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "images",
          title: "Images",
          description: "Upload exactly four hero images.",
          type: "array",
          of: [{ type: "image", options: { hotspot: true } }],
          validation: (rule) =>
            rule
              .required()
              .length(4)
              .error("Please upload exactly four hero images."),
        }),
      ],
    }),
    defineField({
      name: "brandInfo",
      title: "Brand Info",
      type: "object",
      fields: [
        defineField({
          name: "main",
          title: "Main",
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "subheading",
              title: "Subheading",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineField({
          name: "differentiators",
          title: "Differentiators",
          type: "array",
          of: [
            {
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
                  rows: 3,
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  readOnly: true,
                  initialValue: "",
                }),
              ],
            },
          ],
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "rightCard",
          title: "Right Card",
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
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
              name: "stats",
              title: "Stats",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "value",
                      title: "Value",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                  ],
                },
              ],
              validation: (rule) =>
                rule
                  .required()
                  .length(3)
                  .error("Please add exactly three stats."),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "subheading",
          title: "Subheading",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "rightCard",
          title: "Right Card",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "video",
                  title: "Video",
                  type: "file",
                  options: {
                    accept: "video/*",
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "subheading",
                  title: "Subheading",
                  type: "array",
                  of: [{ type: "string" }],
                  validation: (rule) => rule.required(),
                }),
              ],
            },
          ],
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "keepYourStack",
      title: "Keep Your Stack",
      type: "object",
      fields: [
        defineField({
          name: "logos",
          title: "Logos",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "name",
                  title: "Name",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "svg",
                  title: "SVG",
                  type: "image",
                  options: {
                    accept: "image/svg+xml",
                  },
                  validation: (rule) => rule.required(),
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "contentSection",
      title: "Content Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "subheading",
          title: "Subheading",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "benefits",
          title: "Benefits",
          type: "array",
          of: [
            {
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
                  rows: 3,
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  readOnly: true,
                  initialValue: "",
                }),
                defineField({
                  name: "stat",
                  title: "Stat",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
            },
          ],
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "process",
      title: "Process",
      type: "object",
      fields: [
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) =>
            rule
              .required()
              .length(5)
              .error("Please add exactly five process steps."),
        }),
        defineField({
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "text", rows: 4 }],
          validation: (rule) =>
            rule
              .required()
              .length(5)
              .error("Please add exactly five process content items."),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "Home Page",
    },
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});