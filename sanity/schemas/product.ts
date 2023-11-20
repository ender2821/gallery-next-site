import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product List",
  type: "document",
  fields: [
    defineField({
      name: "sold",
      title: "Is Sold?",
      type: "boolean"
    }),
    defineField({
      name: "name",
      title: "Product Name",
      type: "string"
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96
      }
    }),
    defineField({
      name: "image",
      title: "Product Main Image",
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
      name: "productImages",
      title: "Other Product Images",
      type: "array",
      of: [
        defineField({
          name: "image",
          title: "Product Image",
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
    defineField({
      title: 'Product Description', 
      name: 'productDescription',
      type: 'array', 
      of: [{type: 'block'}]
    }),
    defineField({
      name: "cost",
      title: "Cost",
      type: "number"
    }),
    defineField({
      name: "purchaseInstructions",
      title: "Purchase Instructions",
      type: "string",
      initialValue: "You will be contacted via email with payment information",
    }),
  ],
  preview: {
    select: {
      title: 'name',
      sold: 'sold',
      media: 'image',
    },
    prepare(selection) {
      const {title, sold, media} = selection
      return {
        title: sold ? `${title} (Sold)` : title,
        media
      }
    }
  }
})