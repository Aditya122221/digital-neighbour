import { defineField, defineType } from "sanity";

export const apartPageType = defineType({
  name: "apartPage",
  title: "Apart Page",
  type: "document",
  fields: [
    defineField({
      name: "ours",
      title: "Ours",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) =>
        rule
          .required()
          .length(5)
          .error("Please add exactly five items to 'Ours'."),
    }),
    defineField({
      name: "others",
      title: "Others",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) =>
        rule
          .required()
          .length(5)
          .error("Please add exactly five items to 'Others'."),
    }),
  ],
  preview: {
    select: {
      title: "Apart Page",
    },
    prepare() {
      return {
        title: "Apart Page",
      };
    },
  },
});

