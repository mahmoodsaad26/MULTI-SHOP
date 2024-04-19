export interface Product {
    _id: string
    title: string
    slug: string
    description: string
    price: number
    imageCover: string
    category: ProdCategory
    ratingsAverage: number
  }
  

  export interface ProdCategory {
    name: string
  }
  

  