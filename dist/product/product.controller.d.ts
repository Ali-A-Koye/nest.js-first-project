import { ProductService } from './product.service';
import { DataGridDto, DataListDto, ReadSingleDTO } from 'src/utils/validator/common.dto';
import { PostorPutDTO, ProductPatchDTO } from './dto/product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    readDataGrid(query: DataGridDto): Promise<{
        data: Array<object>;
        pages: number;
        records: number;
    }>;
    readlist(query: DataListDto): Promise<Array<object>>;
    readSingle(param: ReadSingleDTO): Promise<Array<object>>;
    create(body: PostorPutDTO): Promise<number>;
    update(param: ReadSingleDTO, body: PostorPutDTO): Promise<number>;
    patch(param: ReadSingleDTO, body: ProductPatchDTO): Promise<number>;
}
