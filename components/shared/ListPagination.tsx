import {
    ArrowLeft,
    ArrowLeftToLine,
    ArrowRight,
    ArrowRightToLine,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface ListPaginationProps {
    className?: string;
    pageSize: number;
    setPageSize: (pageSize: number) => void;
    pageNumber: number;
    setPageNumber: (pageNumber: number) => void;
    pageCount: number;
    nextPage: () => void;
    previousPage: () => void;
}

export function ListPagination({
    className,
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber,
    pageCount,
    nextPage,
    previousPage,
}: ListPaginationProps) {
    return (
        <div
            className={cn(
                `flex items-center justify-between space-x-6 rounded-lg bg-secondary p-4 py-2 lg:space-x-8`,
                className
            )}
        >
            <div className='flex items-center space-x-2'>
                <p className='text-sm font-medium'>Items per page</p>
                <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => {
                        setPageSize(Number(value));
                    }}
                >
                    <SelectTrigger className='h-8 w-[70px]'>
                        <SelectValue placeholder={pageSize} />
                    </SelectTrigger>
                    <SelectContent side='top'>
                        {[5, 10, 15, 20, 25].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
                Page {pageNumber + 1} of {pageCount}
            </div>
            <div className='flex items-center space-x-2'>
                <Button
                    variant='outline'
                    className='hidden h-8 w-8 p-0 lg:flex'
                    onClick={() => setPageNumber(0)}
                    disabled={pageNumber === 0}
                >
                    <span className='sr-only'>Go to first page</span>
                    <ArrowLeftToLine className='h-4 w-4' />
                </Button>
                <Button
                    variant='outline'
                    className='h-8 w-8 p-0'
                    onClick={() => previousPage()}
                    disabled={pageNumber === 0}
                >
                    <span className='sr-only'>Go to previous page</span>
                    <ArrowLeft className='h-4 w-4' />
                </Button>
                <Button
                    variant='outline'
                    className='h-8 w-8 p-0'
                    onClick={() => nextPage()}
                    disabled={pageNumber === pageCount - 1}
                >
                    <span className='sr-only'>Go to next page</span>
                    <ArrowRight className='h-4 w-4' />
                </Button>
                <Button
                    variant='outline'
                    className='hidden h-8 w-8 p-0 lg:flex'
                    onClick={() =>
                        setPageNumber(pageCount > 0 ? pageCount - 1 : 0)
                    }
                    disabled={pageNumber === pageCount - 1}
                >
                    <span className='sr-only'>Go to last page</span>
                    <ArrowRightToLine className='h-4 w-4' />
                </Button>
            </div>
        </div>
    );
}
