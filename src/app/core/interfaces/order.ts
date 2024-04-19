
export interface Order {
    totalOrderPrice: number
    cartItems: CartItem[]
    createdAt: string
  }
  

  

  
  export interface CartItem {
    count: number
    _id: string
    product: OrderProduct
    price: number
  }
  
  export interface OrderProduct {

    title: string
    imageCover: string
    category: OrderCategory
  }
  
 
  
  export interface OrderCategory {
    name: string
    
  }
  

  