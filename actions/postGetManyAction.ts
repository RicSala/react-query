'use server';

import { POSTS } from '@/conts/posts';
import { TPost } from '@/types/types';
import { wait } from '@/utils/wait';

export const postGetManyAction = async (): TFetchResponse<TPost> => {
    console.log('postGetManyAction');
    await wait(2000);
    const posts = POSTS;
    console.log('postGetManyAction done');

    return {
        data: posts,
        count: posts.length,
    };
};
