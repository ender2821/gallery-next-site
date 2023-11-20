import { type SchemaTypeDefinition } from 'sanity'
import product from './schemas/product'
import page from './schemas/page'
import home from './schemas/home'
import products from './schemas/products'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, page, home, products],
}
