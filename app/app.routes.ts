import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './Product/product/Product.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path:"",
    redirectTo:"Product",
    pathMatch:"full"
  },
  {
      path: 'Product',
      component: ProductComponent,
  },
];
@NgModule({
    imports:
      [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
      ],
    exports:
      [
        RouterModule
      ],
  })
  export class AppRoutingModule { }