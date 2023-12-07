import { StructureBuilder } from "sanity/desk";

export const myStructure = (S:StructureBuilder) =>
  S.list()
    .title('Site')
    .items([
      S.listItem()
        .title('Home Page')
        .child(
          S.document()
            .schemaType('home')
            .title('Products Page')
            .documentId('home')),
            
      S.listItem()
        .title('Products Page')
        .child(
          S.document()
            .schemaType('products')
            .title('Products Page')
            .documentId('products')),
      S.listItem()
        .title('Custom Garments Page')
        .child(
          S.document()
            .schemaType('customGarments')
            .title('Custom Garments Page')
            .documentId('customGarments')),
      S.listItem()
      .title('Alterations Page')
      .child(
        S.document()
          .schemaType('alterations')
          .title('Alterations Page')
          .documentId('alterations')),
      S.listItem()
      .title('Sewing Lessons Page')
      .child(
        S.document()
          .schemaType('sewing')
          .title('Sewing Lessons Page')
          .documentId('sewing')),

      S.listItem()
        .title('Global')
        .child(
          S.document()
            .schemaType('page')
            .title('Global')
            .documentId('page')),
      S.divider(),
      ...S.documentTypeListItems().filter(listItem => !['page', 'home', 'products', 'customGarments', 'alterations', 'sewing'].includes(listItem.getId() as string)),

    ])