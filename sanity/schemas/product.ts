import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product List",
  type: "document",
  fields: [
    defineField({
      name: "sold",
      title: "Is Sold?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "customOrder",
      title: "Custom Order?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "name",
      title: "Product Name",
      type: "string"
    }),
    defineField({
      name: "slug",
      title: "Slug: (This is used as the url for the product page)",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96
      },
      validation: (rule) => rule.required(),
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
      initialValue: "You will be contacted via email with payment information.",
    }),
    defineField({
      name: "orderInstructions",
      title: "Order Instructions",
      type: "string",
      initialValue: "If you would like to order something similar, please give a detailed description down below.",
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