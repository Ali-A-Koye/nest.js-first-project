import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { ProductModule } from './product/product.module';
require("dotenv").config();

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: process.env.HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database:  process.env.DB_NAME,
        },
      },
    }),
    ProductModule,
   ],
  providers: [AppService],
})
export class AppModule {}
