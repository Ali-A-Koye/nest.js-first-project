import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { DataGridDto } from 'src/utils/validator/common.dto';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
//  {
//       pageSize: number;
//       page: number;
//       filters: Array<{ column: string; value: string }>;
//       sortArray: Array<{ column: string; value: string }>;
//     }
  @Get('/grid')
  @UsePipes(new ValidationPipe({ transform: true }))
  readDataGrid(
    @Query() query: DataGridDto) : Promise<{
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

    return Promise.all(readData).then((result:Array<any>) => {
      const [data, [dataCount]] = result;
      const pages: number = Math.ceil(dataCount.count / query.pageSize) ;
      return {
        data,
        pages,
        records: dataCount.count,
      };
    });
  }
}
