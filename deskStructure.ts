import { StructureBuilder } from "sanity/desk";

export const myStructure = (S:StructureBuilder) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Home Page')
        .child(
          S.document()
            .schemaType('home')
            .title('Home Page')
            .documentId('home')),
            
      S.listItem()
        .title('Products Page')
        .child(
          S.document()
            .schemaType('products')
            .title('Products Page')
            .documentId('products')),


      S.listItem()
        .title('Global')
        .child(
          S.document()
            .schemaType('page')
            .title('Global')
            .documentId('page')),
            ...S.documentTypeListItems().filter(listItem => !['page', 'home', 'products'].includes(listItem.getId() as string)) 
  
          ])