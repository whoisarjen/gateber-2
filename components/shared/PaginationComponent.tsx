import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination"

type PaginationComponentProps = {
    page: number | string
    pageCount: number
    href: string
    className?: string
    searchParam?: string
}

export const PaginationComponent = ({
    page,
    pageCount,
    href,
    className,
    searchParam = 'page',
}: PaginationComponentProps) => {
    if (pageCount === 1) {
        return null
    }

    const preparedPage = Number(page)

    return (
        <Pagination className={className}>
            <PaginationContent>
                {preparedPage > 1 &&
                    <PaginationItem>
                        <PaginationPrevious href={`${href}?${searchParam}=${preparedPage - 1}`} />
                    </PaginationItem>
                }
                {preparedPage > 1 &&
                    <PaginationItem>
                        <PaginationLink href={`${href}?${searchParam}=${1}`}>{1}</PaginationLink>
                    </PaginationItem>
                }
                {preparedPage - 1 > 1 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }
                <PaginationItem>
                    <PaginationLink isActive href={`${href}?${searchParam}=${preparedPage}`}>{preparedPage}</PaginationLink>
                </PaginationItem>
                {pageCount - preparedPage > 1 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }
                {preparedPage < pageCount &&
                    <PaginationItem>
                        <PaginationLink href={`${href}?${searchParam}=${pageCount}`}>{pageCount}</PaginationLink>
                    </PaginationItem>
                }
                {pageCount > 1 && preparedPage < pageCount &&
                    <PaginationItem>
                        <PaginationNext href={`${href}?${searchParam}=${preparedPage + 1}`} />
                    </PaginationItem>
                }
            </PaginationContent>
        </Pagination>
    )
}