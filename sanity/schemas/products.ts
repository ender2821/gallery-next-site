import { defineField, defineType } from "sanity";

export default defineType({
  name: 'products',
  title: 'Product Page',
  type: 'document',
  fields: [
    defineField({
      name: "productPageTitle",
      title: "Product Page Title",
      type: "string"
    }),
    defineField({
      name: "mainProduct",
      title: "Main Product",
      type: "reference",
      to: [{ type: "product"}]
    }),
  ],
});