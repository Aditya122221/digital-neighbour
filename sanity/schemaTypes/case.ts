import { defineField, defineType } from "sanity";

export const casePageType = defineType({
  name: "casePage",
  title: "Case Study Page",
  type: "document",
  fields: [
    defineField({
      name: "caseStudies",
      title: "Case Studies",
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
              name: "textColor",
              title: "Text Color",
              type: "string",
              readOnly: true,
              initialValue: "text-blackbrown",
            }),
            defineField({
              name: "bgImages",
              title: "Background Images",
              description: "Upload exactly four background images.",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
              validation: (rule) =>
                rule
                  .required()
                  .length(4)
                  .error("Please upload exactly four background images."),
            }),
            defineField({
              name: "metrics",
              title: "Metrics",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "number",
                      title: "Number",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "text",
                      title: "Text",
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
                  .error("Please add exactly three metrics."),
            }),
            defineField({
              name: "services",
              title: "Services",
              type: "array",
              of: [{ type: "string" }],
              validation: (rule) =>
                rule
                  .required()
                  .length(3)
                  .error("Please add exactly three services."),
            }),
            defineField({
              name: "isNew",
              title: "Is New",
              type: "boolean",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "Case Studies",
    },
    prepare() {
      return {
        title: "Case Studies",
      };
    },
  },
});

