import { Data } from './../../core/interfaces/cart';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { Product } from 'src/app/core/interfaces/products';
import { CutTextPipe } from 'src/app/core/pipes/cut-text.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule,CutTextPipe,RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  constructor(
    private _WishListService:WishListService,
    private _ToastrService:ToastrService,
    private _CartService:CartService,
    private _Renderer2:Renderer2){}


  wishlistItems:Product[]=[]
  wishlistData:string[]=[]

  ngOnInit(): void {
    this._WishListService.getWishlist().subscribe({
      next:(res)=>{
        this.wishlistItems=res.data
        const newData=res.data.map((ele:any)=>ele._id)
        this.wishlistData=newData
        this._WishListService.count.next(res.count)
        console.log(this.wishlistItems);
        
        
      }
    })
  }
  addProductToWishlist(prodId:string):void{
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

  removeProduct(id:string):void{
    this._WishListService.removeFromWishlist(id).subscribe({
      next:(res)=>{
        this.wishlistData=res.data
        console.log(res);
       const newData=this.wishlistItems.filter((ele:any)=>this.wishlistData.includes(ele._id))
       this.wishlistItems=newData
       this._WishListService.count.next(res.data.length)
        
      }
    })
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

}
