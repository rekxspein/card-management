import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// 1 indexed
// Zero Indexed Page Pagination
export const usePagination = (opts?: {
  searchParam?: boolean;
  page?: number;
  pageSize?: number;
  total?: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [pageSize, setPageSize] = useState(opts?.pageSize ?? 10);
  const [page, setPage] = useState(() => {
    if (searchParams.has('page')) {
      const p = parseInt(searchParams.get('page') || '1', 10);

      if (!isNaN(p)) {
        return p - 1;
      }
    }

    return opts?.page ?? 0;
  });
  const [total, setTotal] = useState(opts?.total ?? 0);
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
      params.set('page', `${Math.max(p, 1)}`);

      setSearchParams(params);
    },
    [opts?.searchParam, searchParams, setSearchParams]
  );

  useEffect(() => {
    if (opts?.searchParam === false) return;

    const p = searchParams.get('page') || '1';
    const parsed = parseInt(p, 10);

    if (!isNaN(parsed)) {
      setPage(Math.max(parsed - 1, 0));
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
