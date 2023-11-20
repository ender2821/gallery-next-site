import { defineField, defineType } from "sanity";

export default defineType({
  name: "productList",
  title: "Product List",
  type: "document",
  fields: [
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
      name: "selectedImage",
      title: "Selected Image",
      type: "image",
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: "productImages",
      title: "Product Images",
      type: "array",
      of: [
        defineField({
          name: "productImage",
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
  ]
})