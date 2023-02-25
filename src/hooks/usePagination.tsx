import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = (opts?: {
  searchParam?: boolean;
  page?: number;
  pageSize?: number;
  total?: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [pageSize, setPageSize] = useState(opts?.pageSize ?? 10);
  const [page, setPage] = useState(opts?.page ?? 1);
  const [total, setTotal] = useState(opts?.total ?? 1);
  const query = {
    pageNo: page + 1,
    pageSize
  };

  const totalPages = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [pageSize, total]);

  const handlePageChange = useCallback(
    (p: number) => {
      if (opts?.searchParam === false) {
        setPage(p);
        return;
      }

      const params = new URLSearchParams(searchParams);
      params.set('page', `${Math.max(p, 0)}`);

      setSearchParams(params);
    },
    [opts?.searchParam, searchParams, setSearchParams]
  );

  useEffect(() => {
    if (opts?.searchParam === false) return;

    const p = searchParams.get('page') ?? '0';
    const parsed = parseInt(p, 10);

    if (!isNaN(parsed)) {
      setPage(Math.max(parsed, 0));
    }
  }, [page, searchParams, setPage, opts?.searchParam]);

  return {
    pageSize,
    page,
    total,
    query,
    totalPages,
    setPageSize,
    setPage: handlePageChange,
    setTotal
  };
};
