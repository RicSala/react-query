'use client';

import { postGetManyAction } from '@/actions/postGetManyAction';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TPost } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

type VanillaClientProps = {
    serverPosts: Awaited<TFetchResponse<TPost>>;
};
export function VanillaClient({ serverPosts }: VanillaClientProps) {
    const { data, isSuccess } = useQuery({
        queryKey: ['vanillaClient'],
        queryFn: () => postGetManyAction({ take: 5 }),
        initialData: serverPosts,
    });

    if (!isSuccess)
        return (
            <div className='flex items-center justify-center w-full h-full'>
                <p>...Loading</p>
            </div>
        );

    const { data: post, count } = data;

    if (isSuccess) {
        return (
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
        );
    }
}
