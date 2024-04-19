export interface Cart {
    numOfCartItems: number
    data: Data
  }
  
  export interface Data {
    _id: string
    cartOwner: string
    products: cartProduct[]
    totalCartPrice: number
  }
  
  export interface cartProduct {
    count: number
    _id: string
    product: Product2
    price: number
  }
  
  export interface Product2 {
    _id: string
    title: string
    imageCover: string
    category: cartCategory
    ratingsAverage: number
  }
  
  export interface cartCategory {
    _id: string
    name: string
    image: string
  }