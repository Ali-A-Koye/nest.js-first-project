import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DataModule } from 'src/utils/data/data.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports:[DataModule]
})
export class ProductModule {}
