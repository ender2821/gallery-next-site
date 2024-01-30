type Global = {
  phone?: number, 
  logo: Image, 
  name?: string, 
  email?: string, 
  address?: string, 
  businessName?: string,
}

type Image = {
  _type?: string,
  alt: string,
  asset: Asset,
}

type BackgroundImage = {
  _type?: string,
  asset: Asset,
}

type Asset = {
  _ref: string,
  _type: string
}

type Home = {
  homeAlterationsTitle: string,
  homeLessonsBackground: BackgroundImage,
  homeLessonsTitle: string, 
  homeGalleryTitle: string, 
  heroBackground: BackgroundImage,
  homeAlterationsText: string,
  heroImage: Image,
  homeLessonsButtonTitle: string,
  heroCta: string,
  homeGalleryText: string,
  homeLessonsText: string,
  homeGalleryButtonTitle: string,
  homeAlterationsBackground: BackgroundImage,
  homeAlterationsButtonTitle: string,
  heroText: string,
  productList: HomeProduct[],
}

type HomeProduct = {
  product: HomeProductDetail
}

type HomeProductDetail = {
  sold: boolean,
  cost: number,
  image: Image,
  name: string,
  slug: Slug,
}

type Products = {
  productPageTitle: string,
  mainProduct: Block[],
  galleryTitle: string,
  galleryText: string,
  mainProductButtonText: string,
}

type ProductsPage = {
  productPageTitle: string,
  mainProduct: Product,
  galleryTitle: string,
  galleryText: string,
  mainProductButtonText: string,
}

type Product = {
  sold?: boolean;
  customOrder?: boolean;
  name: string;
  slug: Slug;
  image?: Image;
  productImages?: Image[];
  productDescription?: Block[];
  cost?: number;
  purchaseInstructions?: string;
  orderInstructions?: string;
}

type Slug = {
  current: string;
}

type CustomGarments = {
  name: string;
  pageContent: Block[];
  garmentImages: Image[];
}

type Alterations = {
  name: string;
  pageContent: Block[];
  image: Image;
}

type Sewing = {
  name: string;
  pageContent: Block[];
  image: Image;
}

type Contact = {
  name: string;
  pageContent: block[];
  image: Image;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

type Block = {
  _key: string,
  markDefs: unknown[],
  children: unknown[],
  _type: string,
  style: string,
}