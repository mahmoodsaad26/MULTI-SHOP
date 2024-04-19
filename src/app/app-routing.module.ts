import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'',canActivate:[authGuard],loadComponent:()=>import('./layouts/blank/blank.component').then((m)=>m.BlankComponent),children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent)},
    {path:'products',loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent)},
    {path:'product-details/:id',loadComponent:()=>import('./components/product-details/product-details.component').then((m)=>m.ProductDetailsComponent)},
    {path:'brands',loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent)},
    {path:'categories',loadComponent:()=>import('./components/categories/categories.component').then((m)=>m.CategoriesComponent)},
    {path:'cart',loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent)},
    {path:'wishlist',loadComponent:()=>import('./components/wish-list/wish-list.component').then((m)=>m.WishListComponent)},
    {path:'checkout/:id',loadComponent:()=>import('./components/check-out/check-out.component').then((m)=>m.CheckOutComponent)},
    {path:'allorders',loadComponent:()=>import('./components/allorders/allorders.component').then((m)=>m.AllordersComponent)},
    {path:'forgetPassword',loadComponent:()=>import('./components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent)}
  ]},
  {path:'',loadComponent:()=>import('./layouts/auth/auth.component').then((m)=>m.AuthComponent),children:[
    {path:'register',loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent)},
    {path:'login',loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent)},
    {path:'forgetPass',loadComponent:()=>import('./components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent)}
  ]},

  {path:'**',loadComponent:()=>import('./components/not-found/not-found.component').then((m)=>m.NotFoundComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
