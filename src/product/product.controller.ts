import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  DataGridDto,
  DataListDto,
  ReadSingleDTO,
} from 'src/utils/validator/common.dto';
import { PostorPutDTO } from './dto/product.dto';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('/grid')
  @UsePipes(new ValidationPipe({ transform: true }))
  readDataGrid(@Query() query: DataGridDto): Promise<{
    data: Array<object>;
    pages: number;
    records: number;
  }> {
    const readData = this.productService.readDataGridQuery(
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

  @Get('/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  readlist(@Query() query: DataListDto): Promise<Array<object>> {
    const readData = this.productService.readListQuery(
      query.limit,
      query.offset,
    );

    if (query.q) {
      readData.andWhere('product.name', 'like', `%${query.q}%`);
    }
    return Promise.resolve(readData);
  }

  @Get('/:id')
  readSingle(@Param() param: ReadSingleDTO): Promise<Array<object>> {
    const readData = this.productService.readSingleQuery(param.id);
    return Promise.resolve(readData);
  }

  @Post()
  create(@Body() body: PostorPutDTO): Promise<number> {
    const readData = this.productService.create(body);
    return Promise.resolve(readData);
  }

  @Put('/:id')
  update(
    @Param() param: ReadSingleDTO,
    @Body() body: PostorPutDTO,
  ): Promise<number> {
    const readData = this.productService.update(param.id, body);
    return Promise.resolve(readData);
  }
}
