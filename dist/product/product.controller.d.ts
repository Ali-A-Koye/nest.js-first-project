import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    readDataGrid(query: {
        pageSize: number;
        page: number;
        filters: Array<{
            column: string;
            value: string;
        }>;
        sortArray: Array<{
            column: string;
            value: string;
        }>;
    }): Promise<{
        data: Array<object>;
        pages: number;
        records: number;
    }>;
}
