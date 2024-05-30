import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import {MongooseModule} from "@nestjs/mongoose";
import {MultiplyValueMiddleware} from "./middleware/multiplica-value.middleware";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0/middleware-nest'),
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(MultiplyValueMiddleware)
        .forRoutes(
            { path: 'product', method: RequestMethod.POST },
            { path: 'product/*', method: RequestMethod.PATCH }
        );
  }
}
