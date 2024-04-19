
export interface ProductDetails {
    
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string

    price: number

    category: specificProductCategory

    ratingsAverage: number


  }
  
  export interface Subcategory {
    _id: string
    name: string
    slug: string
    category: string
  }
  
  export interface specificProductCategory {
    _id: string
    name: string
    slug: string
    image: string
  }
  