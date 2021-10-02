export declare class PostorPutDTO {
    name: string;
    username: string;
    salt: string;
    password: string;
    active: boolean;
}
export declare class userPatchDTO {
    active: boolean;
    deleted: boolean;
}
export declare class userSerializeDTO {
    name: string;
    username: string;
    created_at: string;
}
