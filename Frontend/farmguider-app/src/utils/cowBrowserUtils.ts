import Page from "@/entities/Page.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";

export enum CowSortBy {
    CowName = "cowName",
    EarTagNumber = "earTagNumber",
    DateOfBirth = "dateOfBirth",
    CurrentWeight = "currentWeight",
    LatestMilkingQuantity = "latestMilkingQuantity",
    Gender = "gender"
}

export const DEFAULT_PAGE: number = 0;
export const DEFAULT_PAGE_SIZE: number = 25;
export const DEFAULT_SORT_BY: string = CowSortBy.EarTagNumber;
export const DEFAULT_SORT_DESC: boolean = false;
export const DEFAULT_UNDEFINED = undefined;

export const defaultSearchParams = {
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    sortBy: DEFAULT_SORT_BY,
    sortDesc: DEFAULT_SORT_DESC,
    gender: DEFAULT_UNDEFINED,
    cowName: DEFAULT_UNDEFINED,
    minDateOfBirth: DEFAULT_UNDEFINED,
    maxDateOfBirth: DEFAULT_UNDEFINED,
    minWeight: DEFAULT_UNDEFINED,
    maxWeight: DEFAULT_UNDEFINED,
    minMilkingQuantity: DEFAULT_UNDEFINED,
    maxMilkingQuantity: DEFAULT_UNDEFINED
};

export const emptyPage: Page<CowResponseDTO> = {
    content: [],
    pageable: {
        offset: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        pageNumber: DEFAULT_PAGE,
        unpaged: false,
        paged: true
    },
    totalElements: 0,
    totalPages: 0,
    size: DEFAULT_PAGE_SIZE,
    number: DEFAULT_PAGE,
    sort: {
        empty: true,
        sorted: false,
        unsorted: true
    },
    first: true,
    numberOfElements: 0,
    empty: true
};
