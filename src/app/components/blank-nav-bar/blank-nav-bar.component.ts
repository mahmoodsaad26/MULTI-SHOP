import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
@Component({
  selector: 'app-blank-nav-bar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './blank-nav-bar.component.html',
  styleUrls: ['./blank-nav-bar.component.scss']
})
export class BlankNavBarComponent implements OnInit {
   constructor(
    private _Router:Router,
    private _CartService:CartService,
    private _Renderer2:Renderer2,
    private _WishListService:WishListService){}

    cartCount:number=0;
    wishCount:number=0;

    @HostListener('window:scroll')
    onscroll():void{
      if(scrollY>500){
       this._Renderer2.addClass(this.navElement.nativeElement,'px-5')
       this._Renderer2.addClass(this.navElement.nativeElement,'shadow')
      }else{
        this._Renderer2.removeClass(this.navElement.nativeElement,'px-5')
        this._Renderer2.removeClass(this.navElement.nativeElement,'shadow')
      }
      
    }

    @ViewChild('navBar') navElement!:ElementRef

   ngOnInit(): void {
     this._CartService.getCartItems().subscribe({
      next:(res)=>{
        this.cartCount=res.numOfCartItems;
        
      }
     })

     this._CartService.cartItemsCount.subscribe({
      next:(res)=>{
        this.cartCount=res
        
      }
     })

     this._WishListService.getWishlist().subscribe({
      next:(res)=>{
        this.wishCount=res.count
      }
     })

     this._WishListService.count.subscribe({
      next:(res)=>{
        this.wishCount=res
      }
     })


   }


   signOut():void{
    localStorage.removeItem('etoken')
    this._Router.navigate(['/login'])
   }
}
