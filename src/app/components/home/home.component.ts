import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/core/services/products.service';
import { Category } from 'src/app/core/interfaces/category';
import { Product } from 'src/app/core/interfaces/products';
import { CutTextPipe } from 'src/app/core/pipes/cut-text.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishListService } from 'src/app/core/services/wish-list.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, CutTextPipe, RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishListService:WishListService,
    private _Renderer2: Renderer2,
    private _ToastrService:ToastrService) { }

  category: Category[] = []
  products: Product[] = []
  searchValue:string=''
  wishlistData:string[]=[]


  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe({
      next: (res) => {
        this.category = res.data;
      }
    })

    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;

      }
    })
    this._WishListService.getWishlist().subscribe({
      next:(res)=>{
        this._WishListService.count.next(res.count)
      const data=res.data.map((ele:any)=>ele._id)
      this.wishlistData=data

      
        
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

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items: 1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000
  }

  categorySlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000
  }


}
