import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/interfaces/products';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pipes/cut-text.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishListService } from 'src/app/core/services/wish-list.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,CutTextPipe,NgxPaginationModule,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private _ProductsService:ProductsService,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _ToastrService:ToastrService,
    private _WishListService:WishListService){}
  products: Product[] = []
  pageSize:number=0
  currentPage:number=0
  total:number=0
  searchValue:string=''
  wishlistData:string[]=[]

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.pageSize=res.metadata.limit
        this.currentPage=res.metadata.currentPage
        this.total=res.results

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

  pageChanged(event:any):void{

    console.log(event);
    this._ProductsService.getProducts(event).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pageSize=res.metadata.limit
        this.currentPage=res.metadata.currentPage
        this.total=res.results

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
        this._ToastrService.success(res.message)
        this._WishListService.count.next(res.data.length)
      },
      error:(err)=>{
        this._ToastrService.error('error')
      }
    })
  }

}
