import {Injectable} from '@nestjs/common';
import {ProductDto} from './dto/product.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Product} from "./schemas/product.schema";
import {Model} from "mongoose";

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  create(productDto: ProductDto) {
    return this.productModel.create(productDto);
  }

  findAll() {
    return this.productModel.find();
  }

  findById(id: string) {
    return this.productModel.findById(id);
  }

  update(id: string, updateProductDto: ProductDto) {
    return this.productModel.findByIdAndUpdate(id, {
      name: updateProductDto.name,
      value: updateProductDto.value,
      quantity: updateProductDto.quantity,
    });
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
