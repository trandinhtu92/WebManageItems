import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { productModel } from "../../Models/Product.model";

@Injectable({
    providedIn: 'root' 
  })
export class ProductService{
    private _url: string ="http://localhost:7287/api/Product" ;
    constructor(private _http: HttpClient){
    }

    public GetData(): Promise<productModel[]>{
        return lastValueFrom(
            this._http.get<productModel[]>(this._url,{withCredentials:true})
        )
    }
    public UpdateData(product: productModel) {
        return lastValueFrom(this._http.put(this._url+'/ProductUpdate',product,{responseType: "text"}))
    };
    public CreateData(product: productModel) {
        return lastValueFrom(this._http.post(this._url+'/Post',product,{responseType: "text"}))
    };

    public DeleteData(product:productModel){
        return lastValueFrom(this._http.delete(this._url+'/DeleteProduct',{
            body:product, responseType: "text"
        }))
	}
}