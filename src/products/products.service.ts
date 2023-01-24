import {Injectable,NotFoundException} from '@nestjs/common';

import { Product } from './product.movel';
@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: string){
        const prodId = Math.random().toString();
        const newProduct = new Product(new Date().toString(), title, desc, price) 
        this.products.push(newProduct);
        return prodId;
 }
    fetchProducts(){
        return [...this.products];
    }
    fetchSingleProduct(productID: string){
       const product = this.findProduct(productID)[0];
       return product;
    }
    updateProduct(productID: string, title: string, desc: string, price: string){
        const [product, index]= this.findProduct(productID); 
        this.products[index] = {...product, };
        const updatedProduct = {...product};
        if(title){
            updatedProduct.title=title
        }
        if(desc){
            updatedProduct.description=desc
        }
        if(price){
            updatedProduct.price=price
        }
        this.products[index]=updatedProduct;
    }
    private findProduct(id : string) : [Product, number]{
        const productIndex = this.products.findIndex((prod)=> prod.id == id);
        const product = this.products[productIndex]
         if(!product){
            throw new NotFoundException("the product you are attempting to find does not exist");
            
         }
        return [product,productIndex];
    }
}