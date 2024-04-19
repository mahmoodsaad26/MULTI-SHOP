import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  constructor(
    private _FormBuilder:FormBuilder,
    private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService,
    private _Router:Router){}



    cartId:string|null=''


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId= param.get('id')
      }
    })
  }
  checkoutForm:FormGroup=this._FormBuilder.group({
    details:['',[Validators.required]],
    phone:['',[Validators.required]],
    city:['',[Validators.required]]
  })

  handleForm():void{
    if(this.checkoutForm.valid){
      this._CartService.checkout(this.cartId,this.checkoutForm.value).subscribe({
        next:(res)=>{
          if(res.status=='success'){
             window.open(res.session.url)
          }
        }
      })
      
    }
    
  }

}
