import { postGetManyAction } from '@/actions/postGetManyAction';
import { TPost } from '@/types/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const postGetManyActionOptions = ({
    skip,
    take,
}: {
    take: number;
    skip: number;
}) => {
    return {
        queryKey: ['PaginatedClient', { take }, { skip }],
        queryFn: () => postGetManyAction({ take, skip }),
        staleTime: 10 * 1000,
    };
};

export const usePostGetManyQuery = ({
    initialData,
    take,
    skip,
}: {
    initialData: Awaited<TFetchResponse<TPost>>;
    take: number;
    skip: number;
}) => {
    const queryClient = useQueryClient();

    // Prefetch the next page -> Adds the next query to the cache
    // queryClient is stable
    // useEffect(() => {
    //     queryClient.prefetchQuery(
    //         postGetManyActionOptions({ take, skip: skip + take })
    //     );
    // }, [queryClient, skip, take]);

    return useQuery({
        ...postGetManyActionOptions({ take, skip }),
        // For some reason, if we remove te useEffect and add initialData, the query (on every refetch) will be temporarily populated with the initialData
        // initialData works at the cache level, not at the observer leve, so as far as react-query is concerned, initialData is THE data
        // placeholder works at the observer level, so it's only used when there is no data in that query. previousData is shown when the query is fetching and data is null
        // So, to sum up: initialData -> populates the cache | placeholderData -> populates the observer until it gets data from the cache
        placeholderData: (previousData) =>
            previousData ? previousData : initialData,
    });
};
