import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartItemsCount:BehaviorSubject<number>=new BehaviorSubject(0)

  myToken:any={
    token:localStorage.getItem('etoken')
  }

  addToCart(prodId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
      productId:prodId
    })
  }

  getCartItems():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  removeCartItem(prodId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`)
  }

  updateCartCoun(prodId:string,prodCount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,{
      count:prodCount
    })
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }
                                                                                              
  checkout(cartId:string|null,checkoutInfo:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://mahmoodsaad26.github.io/MULTI-SHOP`,{
      shippingAddress:checkoutInfo
    })
  }

  getAllOrders(userId:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }

}
