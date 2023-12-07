import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Page",
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
      title: "Contact Main Image",
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
      title: 'Facebook Link', 
      name: 'facebook',
      type: "string"
    }),
    defineField({
      title: 'Instagram Link', 
      name: 'instagram',
      type: "string"
    }),
    defineField({
      title: 'Tiktok Link', 
      name: 'tiktok',
      type: "string"
    }),
  ]
})