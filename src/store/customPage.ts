import create from 'zustand';

export const usePageNumber = create<
  ICustomPagination & ICustomPaginationActions
>(set => ({
  pageNumber: 1,
  pageSize: 100,
  total: 0,

  setPageNumber: (pageNo: number) => set({ pageNumber: pageNo }),
  setPageSize: (size: number) => set({ pageSize: size }),
  setTotal: (size: number) => set({ total: size })
}));

export type ICustomPagination = {
  pageNumber: number;
  pageSize: number;
  total: number;
};

type ICustomPaginationActions = {
  setPageNumber: (pageNo: number) => void;
  setPageSize: (size: number) => void;
  setTotal: (size: number) => void;
};
