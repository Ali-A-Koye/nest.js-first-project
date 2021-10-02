import {
    Controller,
    Get,
    Param,
    Body,
    Post,
    Query,
    Put,
    Patch,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import {
    DataGridDto,
    DataListDto,
    ReadSingleDTO,
  } from 'src/utils/validator/common.dto';
  import { PostorPutDTO, userPatchDTO, userSerializeDTO } from './dto/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

  @Controller('user')
  export class UserController  {
    constructor(private readonly userService: UserService) { }
  
    @Get('/grid')
    readDataGrid(@Query() query: DataGridDto): Promise<{
      data: Array<object>;
      pages: number;
      records: number;
    }> {
      const readData = this.userService.readDataGridQuery(
        query.pageSize,
        query.page,
        query.filters,
        query.sortArray,
      );
  
      return Promise.all(readData).then((result: Array<any>) => {
        const [data, [dataCount]] = result;
        const pages: number = Math.ceil(dataCount.count / query.pageSize);
        return {
          data,
          pages,
          records: dataCount.count,
        };
      });
    }
  
    @Serialize(userSerializeDTO)
    @Get('/list')
    readlist(@Query() query: DataListDto): Promise<Array<object>> {
     
      const readData = this.userService.readListQuery(
        query.limit,
        query.offset,
      );
  
      if (query.q) {
        readData.andWhere('user.name', 'like', `%${query.q}%`);
      }
      return Promise.resolve(readData);
    }
  
    @Get('/:id')
    readSingle(@Param() param: ReadSingleDTO): Promise<Array<object>> {

      const readData = this.userService.readSingleQuery(param.id);
      return Promise.resolve(readData);
    }
  
    @Post()
    create(@Body() body: PostorPutDTO): Promise<number> {
      const readData = this.userService.create(body);
      return Promise.resolve(readData);
    }
  
    @Put('/:id')
    update(
      @Param() param: ReadSingleDTO,
      @Body() body: PostorPutDTO,
    ): Promise<number> {
      const readData = this.userService.update(param.id, body);
      return Promise.resolve(readData);
    }
  
  
    @Patch('/:id')
    patch(
      @Param() param: ReadSingleDTO,
      @Body() body: userPatchDTO,
    ): Promise<number> {
  
      
      const readData = this.userService.patch(param.id, body);
      return Promise.resolve(readData);
    }
  }
  