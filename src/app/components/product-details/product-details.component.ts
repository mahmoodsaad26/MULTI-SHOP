import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductDetails } from 'src/app/core/interfaces/product-details';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/core/services/wish-list.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private _ProductsService:ProductsService,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _WishListService:WishListService){}


  productId:string|null=''
  prodIdWishList:string=''
  productDetails:ProductDetails|null=null
    wishlistData:(string|null)[]=[]

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
     this.productId=param.get('id')
     
    }
  })

  this._ProductsService.getSpecificProduct(this.productId).subscribe({
   next:(res)=>{
    this.productDetails=res.data
    console.log(this.productDetails);
    
   }
  })
}
productDetailsOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
 items:1,
  nav: false
}

addProductToCart(id: string, element: HTMLButtonElement): void {
  this._Renderer2.setAttribute(element, 'disabled', 'true')
  this._CartService.addToCart(id).subscribe({
    next: (res) => {
      this._Renderer2.removeAttribute(element, 'disabled')
      this._ToastrService.success(res.message)
      this._CartService.cartItemsCount.next(res.numOfCartItems)
      console.log(res);

    },
    error: (err) => {
      this._Renderer2.removeAttribute(element, 'disabled')
    }
  })
}

addProductToWishlist(prodId:string|null):void{
  this._WishListService.addToWishlist(prodId).subscribe({
    next:(res)=>{
      this.wishlistData=res.data
      this._ToastrService.success(res.message)
      this._WishListService.count.next(res.data.length)
      console.log(res);
      
      
    },
    error:(err)=>{
      this._ToastrService.error('error')
    }
  })
}
removeProduct(id:string|null):void{
  this._WishListService.removeFromWishlist(id).subscribe({
    next:(res)=>{
      this.wishlistData=res.data
      this._ToastrService.success(res.message)
      this._WishListService.count.next(res.data.length)
    },
    error:(err)=>{
      this._ToastrService.error('error')
    }
  })
}
}
