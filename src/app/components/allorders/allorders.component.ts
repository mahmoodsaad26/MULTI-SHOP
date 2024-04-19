import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { CartService } from 'src/app/core/services/cart.service';
import { Order } from 'src/app/core/interfaces/order';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {

  constructor(private _CartService:CartService){}
  userInfo:any;
  allOrders:Order[]=[]
  ngOnInit(): void {
    if(localStorage.getItem('etoken')!=null){
      const encode:any=localStorage.getItem('etoken')
      const decode=jwtDecode(encode)
      this.userInfo=decode
      
    }

    this._CartService.getAllOrders(this.userInfo.id).subscribe({
      next:(res)=>{
        this.allOrders=res.reverse()
        console.log(this.allOrders);
        
        
      }
    })


  }
}
