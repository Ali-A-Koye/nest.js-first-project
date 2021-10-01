export declare class DataGridDto {
    pageSize: number;
    page: number;
    filters?: Array<{
        column: string;
        value: string;
    }>;
    sortArray: Array<{
        column: string;
        value: string;
    }>;
}
export declare class DataListDto {
    limit: number;
    offset: number;
    q: string;
}
