export class Product{
    
    public ID_Product : number;

    public Name_Product : string;

    public Type_Product : string;

    public Category_Product : string;

    public Price_Product : number;
    constructor(){
        this.ID_Product = 0;
        this.Name_Product = "";
        this.Type_Product = "";
        this.Category_Product ="";
        this.Price_Product = 0;
    }
}