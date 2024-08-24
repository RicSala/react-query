'use server';

import { POSTS } from '@/conts/posts';
import { TPost } from '@/types/types';
import { wait } from '@/utils/wait';

export const postGetManyAction = async ({
    whereAnd = [],
    skip,
    take,
}: {
    whereAnd?: [{ title: string }] | [];
    skip?: number;
    take?: number;
}): TFetchResponse<TPost> => {
    await wait(2000);
    const posts = POSTS;

    const filteredPosts = posts.filter((post) => {
        if (whereAnd.length === 0) return true;
        return whereAnd.some((where) => post.title === where.title);
    });

    const skippedPosts = filteredPosts.slice(skip || 0);

    const takenPosts = skippedPosts.slice(0, take || filteredPosts.length);

    return {
        data: takenPosts,
        count: posts.length,
    };
};
