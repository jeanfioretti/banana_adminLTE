import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsCrudComponent } from './products-crud/products-crud.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductsComponent, ProductsListComponent, ProductsCrudComponent]
})
export class ProductsModule { }
