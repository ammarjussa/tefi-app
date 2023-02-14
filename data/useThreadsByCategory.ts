import useSWRInfinite from 'swr/infinite';
import axios from 'axios';
import { CLUB_SERVER_ROOT } from '../constants';
import { useState, useEffect } from 'react';
import { queryClientForThreadsByCategory } from 'helpers/queries';

const DEFAULT_LIMIT = 10;

const getKey = async (pageIndex: number, previousPageData: any, category: string) => {
  if (!category) return null;
  if (pageIndex === 0) {
    try {
      const result = await queryClientForThreadsByCategory(
        0,
        DEFAULT_LIMIT,
        category,
        process.env.NEXT_PUBLIC_IS_TESTNET ? true : false,
      );
      return result ?? [];
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  if (!previousPageData) return null;

  const offset = DEFAULT_LIMIT * pageIndex;

  try {
    const result = await queryClientForThreadsByCategory(
      offset,
      DEFAULT_LIMIT,
      category,
      process.env.NEXT_PUBLIC_IS_TESTNET ? true : false,
    );
    return result ?? [];
    // eslint-disable-next-line no-empty
  } catch (err) {}
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useThreadsByCategory = (category: string) => {
  const { data, error, size, setSize } = useSWRInfinite(
    (index: number, data: any) => getKey(index, data, category),
    fetcher,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = size > 0 && data && typeof data[currentPage - 1] === 'undefined';
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < DEFAULT_LIMIT);
  const showLoadMore = size === 1 && isReachingEnd && isLoadingInitialData ? false : currentPage !== size;

  useEffect(() => {
    if (size === 1 && !isLoadingInitialData && !isReachingEnd) {
      setSize(size + 1);
    }
  }, [size, isLoadingInitialData]);

  const loadMore = () => {
    if (!isReachingEnd) {
      setSize(size + 1);
    }
    setCurrentPage(currentPage + 1);
  };

  const getMutateKey = (offset: number) => {
    return `${CLUB_SERVER_ROOT}/dagora/threads/${category}?limit=${DEFAULT_LIMIT}&offset=${offset}&isTestnet=${
      process.env.NEXT_PUBLIC_IS_TESTNET ? true : false
    }`;
  };

  const allThreads: Thread[] = data ? data.reduce((acm, page) => [...acm, ...page], []) : [];
  const pageThreads = allThreads.slice(0, DEFAULT_LIMIT * currentPage);

  const state = {
    threads: pageThreads,
    size,
    setSize,
    isLoading: isLoadingInitialData,
    isLoadingMore,
    isError: error,
    isReachingEnd,
    loadMore,
    isEmpty,
    showLoadMore,
    getMutateKey,
  };

  return state;
};
