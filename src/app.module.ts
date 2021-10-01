import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
require("dotenv").config();

console.log(process.env.HOST);
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
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
