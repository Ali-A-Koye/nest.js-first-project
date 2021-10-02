import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DataModule } from 'src/utils/data/data.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[DataModule],
  exports:[UserService]
})
export class UserModule {}
