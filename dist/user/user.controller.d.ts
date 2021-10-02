import { UserService } from './user.service';
import { DataGridDto, DataListDto, ReadSingleDTO } from 'src/utils/validator/common.dto';
import { PostorPutDTO, userPatchDTO } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    readDataGrid(query: DataGridDto): Promise<{
        data: Array<object>;
        pages: number;
        records: number;
    }>;
    readlist(query: DataListDto): Promise<Array<object>>;
    readSingle(param: ReadSingleDTO): Promise<Array<object>>;
    create(body: PostorPutDTO): Promise<number>;
    update(param: ReadSingleDTO, body: PostorPutDTO): Promise<number>;
    patch(param: ReadSingleDTO, body: userPatchDTO): Promise<number>;
}
