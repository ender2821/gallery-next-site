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
  productList: any[],
}

type Products = {
  productPageTitle: string,
  mainProduct: any,
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
  productDescription?: any;
  cost?: number;
  purchaseInstructions?: string;
  orderInstructions?: string;
}

type Slug = {
  current: string;
}

type CustomGarments = {
  name: string;
  pageContent: any;
  garmentImages: Image[];
}

type Alterations = {
  name: string;
  pageContent: any;
  image: Image;
}