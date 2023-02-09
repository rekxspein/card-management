import create from 'zustand';

export const usePageNumber = create<
  ICustomPagination & ICustomPaginationActions
>(set => ({
  pageNumber: 1,
  pageSize: 10,

  setPageNumber: (pageNo: number) => set({ pageNumber: pageNo }),
  setPageSize: (size: number) => set({ pageSize: size })
}));

export type ICustomPagination = {
  pageNumber: number;
  pageSize: number;
};

type ICustomPaginationActions = {
  setPageNumber: (pageNo: number) => void;
  setPageSize: (size: number) => void;
};
