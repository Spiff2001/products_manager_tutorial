import {Controller, Post, Body, Get, Param, Patch} from '@nestjs/common';
import { title } from 'process';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController { 
    constructor(private readonly productsService : ProductsService){}
    
    @Post()
    addProduct(
        @Body('title') prodTitle : string,
        @Body('description') prodDesc : string,
        @Body('price') prodPrice : any,
        ){

            const generatedID= this.productsService.insertProduct(
                prodTitle,
                prodDesc,
                prodPrice
            );
        return{id : generatedID}
    }
    @Get()
    getAllProducts(){
        return {products : this.productsService.fetchProducts()
        }
    }
    @Get(':id')
    getProduct(@Param('id') prodID: string, ){
     return this.productsService.fetchSingleProduct(prodID);   
    }
    @Patch(':id')
    updateProduct(
        @Param('id') prodID: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc : string,
        @Body('price') prodPrice : string ){
            this.productsService.updateProduct(prodID,prodTitle,prodDesc,prodPrice);
            return null;
        }

}
  