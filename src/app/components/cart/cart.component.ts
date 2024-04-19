import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _ToastrService: ToastrService) { }

  cart: Cart | null = null
  hasItems: boolean = false

  ngOnInit(): void {
    this._CartService.getCartItems().subscribe({
      next: (res) => {

        if (res.numOfCartItems > 0) {
          this.cart = res
          console.log(this.cart);
          this.hasItems = true
        }

      }
    })
  }

  removeItem(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true')
    this._CartService.removeCartItem(id).subscribe({
      next: (res) => {
        this._Renderer2.removeAttribute(element, 'disabled')
        this._CartService.cartItemsCount.next(res.numOfCartItems)
        if (res.numOfCartItems > 0) {
          this.cart = res
          this.hasItems = true
        } else {
          this.hasItems = false
        }
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled')
      }
    })
  }


  updateCount(id: string, count: number, countMin: HTMLButtonElement, countPlus: HTMLButtonElement): void {

    if (count > 0) {
      this._Renderer2.setAttribute(countMin, 'disabled', 'true')
      this._Renderer2.setAttribute(countPlus, 'disabled', 'true')
      this._CartService.updateCartCoun(id, count).subscribe({
        next: (res) => {
          this.cart = res
          this._Renderer2.removeAttribute(countMin, 'disabled')
          this._Renderer2.removeAttribute(countPlus, 'disabled')
          console.log(res);

        },
        error: (err) => {
          this._Renderer2.removeAttribute(countMin, 'disabled')
          this._Renderer2.removeAttribute(countPlus, 'disabled')
        }
      })
    }
  }

  clearAll(clearBtn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(clearBtn, 'disabled', 'true')
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.hasItems = false
          this._ToastrService.error('you cleared your cart')
          this._CartService.cartItemsCount.next(0)
        }

      }
    })
  }
}
