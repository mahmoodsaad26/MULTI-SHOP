import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _FormBuilder:FormBuilder,
    private _AuthService:AuthService,
    private _Router:Router){}
    
    errMsg:string=''


  loginForm:FormGroup=this._FormBuilder.group({
    
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_]{6,}$/)]]
  })
  handleLogin():void{
    if(this.loginForm.valid==true){
     this._AuthService.login(this.loginForm.value).subscribe({
       next:(res)=>{
        if(res.message=='success'){
          localStorage.setItem('etoken',res.token);
          this._Router.navigate(['/home'])
        }
         
         
       },
       error:(err)=>{
        console.log('err',err);
        
         this.errMsg=err.error.message
         
       }
     })
    }
    
     
   }
 

}
