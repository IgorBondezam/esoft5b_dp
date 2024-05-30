import {Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpException, Patch} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: ProductDto) {
    try{
      return this.productService.create(createProductDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Error Ocurred',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get()
  findAll() {
    try {
      return this.productService.findAll();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Error Ocurred',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try{
      return this.productService.findById(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Error Ocurred',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    try{
      return this.productService.update(id, updateProductDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Error Ocurred',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try{
      return this.productService.remove(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Error Ocurred',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
}
