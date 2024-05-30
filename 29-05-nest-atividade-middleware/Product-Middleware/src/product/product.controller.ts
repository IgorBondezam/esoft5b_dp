import {Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpException, Patch} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import {DeuErro} from "../exceptions/deu-erro.exception";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: ProductDto) {
    try{
      throw new Error();
      return this.productService.create(createProductDto);
    } catch (error) {
      throw new DeuErro(HttpStatus.INTERNAL_SERVER_ERROR, 'Deu Erro JUREGUI', 'Deu Erro')}
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
