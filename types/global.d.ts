type TFetchResponse<T> = Promise<{
    data: Array<T>;
    count: number;
}>;
