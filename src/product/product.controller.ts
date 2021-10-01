import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/grid')
  readDataGrid(
    @Query()
    query: {
      pageSize: number;
      page: number;
      filters: Array<{ column: string; value: string }>;
      sortArray: Array<{ column: string; value: string }>;
    },
  ): Promise<{
    data: Array<object>;
    pages: number;
    records: number;
  }> {
    
    console.log(query);
    const readData = this.productService.readDataGridQuery(
      query.pageSize,
      query.page,
      query.filters,
      query.sortArray,
    );

    return Promise.all(readData).then((result) => {
      const [data, [dataCount]] = result;
      const pages: number = Math.ceil(dataCount.count / query.pageSize);
      return {
        data,
        pages,
        records: dataCount.count,
      };
    });
  }
}
