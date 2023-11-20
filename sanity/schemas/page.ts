import { defineField, defineType } from "sanity";

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Caption',
        },
      ]
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string"
    }),
  ]
});