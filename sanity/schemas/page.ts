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
      name: "businessName",
      title: "Business Name",
      type: "string"
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string"
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "number",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
  ]
});