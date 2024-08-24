import { postGetManyAction } from '@/actions/postGetManyAction';
import { VanillaClient } from '@/app/vanilla/vanillaclient';

export default async function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const serverPosts = await postGetManyAction({});

    return (
        <>
            <VanillaClient serverPosts={serverPosts} />
        </>
    );
}
