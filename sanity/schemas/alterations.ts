import { defineField, defineType } from "sanity";

export default defineType({
  name: "alterations",
  title: "Alterations Page",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Page Name",
      type: "string"
    }),
    defineField({
      title: 'Page Content', 
      name: 'pageContent',
      type: 'array', 
      of: [{type: 'block'}]
    }),
    defineField({
      name: "image",
      title: "Alterations Main Image",
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
  ]
})