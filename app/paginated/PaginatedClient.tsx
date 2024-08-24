'use client';

import { ListPagination } from '@/components/shared/ListPagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePostGetManyQuery } from '@/queries/usePostGetManyQuery';
import { TPost } from '@/types/types';
import { useState } from 'react';

type PaginatedClientProps = {
    serverPosts: Awaited<TFetchResponse<TPost>>;
};
export function PaginatedClient({ serverPosts }: PaginatedClientProps) {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const { data, isSuccess } = usePostGetManyQuery({
        initialData: serverPosts,
        take: pageSize,
        skip: pageNumber * pageSize,
    });
    const nextPage = () => setPageNumber(pageNumber + 1);
    const previousPage = () => setPageNumber(pageNumber - 1);

    if (!isSuccess)
        return (
            <div className='flex items-center justify-center w-full h-full'>
                <p>...Loading</p>
            </div>
        );

    const { data: post, count } = data;

    if (isSuccess) {
        return (
            <div>
                <div className='grid grid-cols-3 gap-4'>
                    {post.map((post) => (
                        <Card key={post.id}>
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>{post.content}</CardContent>
                        </Card>
                    ))}
                </div>
                <ListPagination
                    nextPage={nextPage}
                    pageCount={Math.ceil(count / pageSize)}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    previousPage={previousPage}
                    setPageNumber={setPageNumber}
                    setPageSize={setPageSize}
                />
            </div>
        );
    }
}
