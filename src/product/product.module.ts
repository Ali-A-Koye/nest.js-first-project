import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DataModule } from 'src/utils/data/data.module';
import { JwtVerifyMiddleware } from 'src/middlewares/jwtVerify.middlewares';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports:[DataModule,UserModule]
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtVerifyMiddleware)
      .forRoutes('*');
  }
}
