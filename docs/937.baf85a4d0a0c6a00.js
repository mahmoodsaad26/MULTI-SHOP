"use strict";(self.webpackChunkmulti_shop=self.webpackChunkmulti_shop||[]).push([[937],{937:(u,i,o)=>{o.r(i),o.d(i,{CategoriesComponent:()=>_});var c=o(6814),t=o(4769),a=o(1132);function r(e,g){if(1&e&&(t.TgZ(0,"div",4)(1,"div",5),t._UZ(2,"img",6),t.TgZ(3,"h3",7),t._uU(4),t.qZA()()()),2&e){const s=g.$implicit;t.xp6(2),t.Q6J("src",s.image,t.LSH)("alt",s.name),t.xp6(2),t.Oqu(s.name)}}let _=(()=>{class e{constructor(s){this._ProductsService=s,this.categories=[]}ngOnInit(){this._ProductsService.getCategories().subscribe({next:s=>{this.categories=s.data}})}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(a.s))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-categories"]],standalone:!0,features:[t.jDz],decls:5,vars:1,consts:[[1,"my-3"],[1,"h4"],[1,"row","g-4","justify-content-center"],["class","col-md-4 col-lg-3",4,"ngFor","ngForOf"],[1,"col-md-4","col-lg-3"],[1,"border-coloring","product"],["height","400",1,"w-100",3,"src","alt"],[1,"text-center","category-color"]],template:function(n,l){1&n&&(t.TgZ(0,"section",0)(1,"h2",1),t._uU(2,"Categories.."),t.qZA(),t.TgZ(3,"div",2),t.YNc(4,r,5,3,"div",3),t.qZA()()),2&n&&(t.xp6(4),t.Q6J("ngForOf",l.categories))},dependencies:[c.ez,c.sg],styles:[".border-coloring[_ngcontent-%COMP%]{border:1px solid #FFCB0D}"]})}return e})()},1132:(u,i,o)=>{o.d(i,{s:()=>a});var c=o(4769),t=o(9862);let a=(()=>{class r{constructor(e){this._HttpClient=e}getProducts(e=1){return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${e}`)}getCategories(){return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/categories")}getSpecificProduct(e){return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${e}`)}static#t=this.\u0275fac=function(g){return new(g||r)(c.LFG(t.eN))};static#e=this.\u0275prov=c.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})()}}]);