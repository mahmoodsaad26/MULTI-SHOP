import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/core/services/forget-password.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  constructor(
    private _ForgetPasswordService:ForgetPasswordService,
    private _ToastrService:ToastrService,
    private _Router:Router
    ){}
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  userEmail:string=''

  sendCode:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  })

  verifyCode:FormGroup=new FormGroup({
    resetCode:new FormControl('',[Validators.required])
  })

  newPass:FormGroup=new FormGroup({
    
    newPassword:new FormControl('',[Validators.required, Validators.pattern(/^\w{6,}$/)])
  })

  handleSendCode():void{
    console.log(this.sendCode);
    if(this.sendCode.valid){
      this._ForgetPasswordService.forgotPassword(this.sendCode.value).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message)
          this.userEmail=this.sendCode.get('email')?.value
          this.step1=false;
          this.step2=true;
          
        },
        error:(err)=>{
          this._ToastrService.error(err.error.message)
        }
      })
    }
    
    
  }
  handleVerifyCode():void{
    if(this.verifyCode.valid){
      this._ForgetPasswordService.verifyResetCode(this.verifyCode.value).subscribe({
        next:(res)=>{
          console.log(res);
          
          this._ToastrService.success(res.status)
          this.step2=false
          this.step3=true
        },
        error:(err)=>{
          this._ToastrService.error(err.error.message)
        }
      })
    }
    
  }
  handleNewPassword():void{
   let resetForm= this.newPass.value
   resetForm.email=this.userEmail
    this._ForgetPasswordService.resetNewPass(resetForm).subscribe({
      next:(res)=>{
        if(res.token){
          localStorage.setItem('eroken',res.token)
          this._Router.navigate(['/home'])
        }
        
      },
      error:(err)=>{ 
        this._ToastrService.error(err.error.message)
        
      }
    })
    
  }


}
