import { defineField, defineType } from "sanity";

export default defineType({
  name: "customGarments",
  title: "Custom Garments Page",
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
      name: "garmentImages",
      title: "Custom Garment Images",
      type: "array",
      of: [
        defineField({
          name: "image",
          title: "Garment Image",
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
    }),
  ]
})