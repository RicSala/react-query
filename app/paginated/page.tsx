import { postGetManyAction } from '@/actions/postGetManyAction';
import { PaginatedClient } from '@/app/paginated/PaginatedClient';

export default async function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const serverPosts = await postGetManyAction({
        skip: 0,
        take: 5,
    });

    console.log(
        'posts',
        serverPosts.data.map((post) => post.title)
    );

    return (
        <>
            <PaginatedClient serverPosts={serverPosts} />
        </>
    );
}
