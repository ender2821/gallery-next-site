import { defineField, defineType } from "sanity";

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: "heroText",
      title: "Hero Text",
      type: "string"
    }),
    defineField({
      name: "heroCta",
      title: "Hero Call to Action",
      type: "string"
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
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
      name: "heroBackground",
      title: "Hero Background",
      type: "image",
    }),
    defineField({
      name: "homeGalleryTitle",
      title: "Gallery Title",
      type: "string"
    }),
    defineField({
      name: 'homeGalleryText',
      title: 'Gallery Text',
      type: 'text',
    }),
    defineField({
      name: "homeGalleryButtonTitle",
      title: "Gallery Button Title",
      type: "string"
    }),
    defineField({
        name: "productList",
        title: "Home Gallery Products",
        type: "array",
        of: [
          {
            type: 'object',
            fields: [
              {
                name: "product",
                title: "Product",
                type: "reference",
                to: [{ type: "product"}]
              },
            ],
            preview: {
              select: {
                title: "product.name",
                media: "product.image",
                cost: "product.cost",
                sold: "product.sold",
              },
  
              prepare({
                title,
                subtitle,
                media,
                cost,
                sold
              }) {
                return {
                  title,
                  subtitle: sold ? 'sold' : `$${cost}`,
                  media,
                } 
              }
            }
          }
        ],
    }),
    defineField({
      name: "homeAlterationsTitle",
      title: "Alterations Title",
      type: "string"
    }),
    defineField({
      name: 'homeAlterationsText',
      title: 'Alterations Text',
      type: 'text',
    }),
    defineField({
      name: "homeAlterationsBackground",
      title: "Home Alterations Background",
      type: "image",
    }),
    defineField({
      name: "homeAlterationsButtonTitle",
      title: "Alterations Button Title",
      type: "string"
    }),

    defineField({
      name: "homeLessonsTitle",
      title: "Lessons Title",
      type: "string"
    }),
    defineField({
      name: 'homeLessonsText',
      title: 'Lessons Text',
      type: 'text',
    }),
    defineField({
      name: "homeLessonsBackground",
      title: "Home Lessons Background",
      type: "image",
    }),
    defineField({
      name: "homeLessonsButtonTitle",
      title: "Lessons Button Title",
      type: "string"
    }),
  ]
})