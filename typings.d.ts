type Global = {
  phone: number, 
  logo: Image, 
  name: string, 
  email: string, 
  address: string, 
  businessName: string,
}

type Image = {
  _type?: string,
  alt: string,
  asset: Asset,
}

type Asset = {
  _ref: string,
  _type: string
}