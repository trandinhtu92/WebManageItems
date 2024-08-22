import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DoCheck, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { ProductService } from '../../../Services/Product.service';
import { AppComponent } from '../../app.component';
import { productModel } from '../../../../Models/Product.model';
export class DataSearch{

  public IDProduct !: number;

  public NameProduct :string;
  constructor(){
    this.NameProduct = "";
  }
}
@Component({
  selector: 'app-product',
  templateUrl: './Product.component.html',
  styleUrl: './Product.component.scss',
  standalone: true,
  imports:[AppComponent,FormsModule,MatTabsModule,MatIconModule,MatSelectModule,MatDialogModule,MatToolbarModule,MatGridListModule,MatFormFieldModule,CommonModule,FormsModule],
})

export class ProductComponent implements OnInit {
  public DataSearch = new DataSearch();
  public LstProduct: productModel[] = [];
  public CSpanMessErr: string = '';
  public ProductData: productModel = new productModel;
  private readonly LOCAL_STORAGE_PRODUCT: string = 'product';
  public IsUpdate !: boolean;
  @ViewChild('tabGroup') public tabGroup !: MatTabGroup;
  
  constructor(private ProductSV : ProductService ){

  }
  ngOnInit() {
      this.GetAllProduct();
  }

  public GetProductIDName(id: number, name:string){
    var data = localStorage.getItem(this.LOCAL_STORAGE_PRODUCT);
    if(data){
      var dataProduct = JSON.parse(data) as productModel[];
        dataProduct = id ? dataProduct.filter(x => x.idProduct == id) : dataProduct;
        dataProduct = name != "" ? dataProduct.filter(x => x.nameProduct.toLowerCase() == name.toLowerCase()) : dataProduct;
        this.LstProduct = dataProduct;
    }
  }
  //Hàm update
  public EditAndCreateProduct(data:productModel,isUpdate:boolean): void {
    this.tabGroup.selectedIndex = 1;
    this.ProductData = data;
    this.IsUpdate = isUpdate
  }

  public async OnUpdateProduct(data:productModel,isUpdate:boolean){
    // Kiểm tra lỗi
    if ((this.CheckErrInput(data))) {
      return;
    }
    if(isUpdate){
      await this.ProductSV.UpdateData(data);
    }else{
      await this.ProductSV.CreateData(data);
    }
    this.GetAllProduct();
    this.tabGroup.selectedIndex = 0;
    this.ProductData = new productModel;
  }

  public onTabChange(index: number): void {
    if (index === 1) {
    }
  }

  //Hàm delete
  public async DeleteProduct(data : productModel){
    await this.ProductSV.DeleteData(data);
    this.GetAllProduct()
  }

  private CheckErrInput(data: productModel): boolean {
    this.CSpanMessErr = '';
    if(data.idProduct == new productModel().idProduct){
      this.CSpanMessErr = "Không được bỏ trống Mã sản phẩm"
    }else{
      if(!this.IsUpdate){
        var dataDB = localStorage.getItem(this.LOCAL_STORAGE_PRODUCT);
        if(dataDB){
          var dataProduct = JSON.parse(dataDB) as productModel[];
          var isIDProduct = dataProduct.filter(x=>x.idProduct ==data.idProduct);
          if(isIDProduct.length != 0){
            if (this.CSpanMessErr != '') {
              this.CSpanMessErr += '<br>';
            } 
            this.CSpanMessErr += "Mã sản phẩm không được trùng !"
          }
        }
      }
    }
    return this.CSpanMessErr != '';
  }

  private async GetAllProduct(){
    var productData = (await this.ProductSV.GetData()) as productModel[];
    localStorage.setItem(
      this.LOCAL_STORAGE_PRODUCT,
      JSON.stringify(productData)
    );
    this.LstProduct = productData
  }
}
