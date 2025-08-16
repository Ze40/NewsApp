import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useRef } from 'react';
import { NewsResponse } from '~/entities/articles/schemas';
import { articleApi } from '~/entities/articles/api';

const PAGE_SIZE = 10;

export const useNews = (q?: string, category?: string) => {
  const queryClient = useQueryClient();
  const queryKey = useMemo(
    () => ['top-headlines', q ?? '', category ?? ''],
    [q, category],
  );
  const persistKey = useMemo(
    () => `news_cache:${q ?? ''}:${category ?? ''}`,
    [q, category],
  );
  const isRestoredFromCache = useRef(false);

  useEffect(() => {
    let mounted = true;
    const loadCache = async () => {
      try {
        const raw = await AsyncStorage.getItem(persistKey);
        if (!mounted || !raw) return;
        const data = JSON.parse(raw) as InfiniteData<NewsResponse>;
        if (!queryClient.getQueryData(queryKey)) {
          queryClient.setQueryData(queryKey, data);
        }
      } catch (err) {
        console.error('Cache read error:', err);
      }
    };
    loadCache();
    return () => {
      mounted = false;
    };
  }, [persistKey, queryClient, queryKey]);

  const queryResult = useInfiniteQuery<NewsResponse, Error>({
    queryKey,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      return articleApi.getArticles({
        page: pageParam as number,
        q,
        category,
        pageSize: PAGE_SIZE,
      });
    },
    getNextPageParam: (lastPage, allPages) =>
      allPages.length * PAGE_SIZE < lastPage.totalResults
        ? allPages.length + 1
        : undefined,
    staleTime: 1000 * 60 * 5, // 5 минут
    gcTime: 1000 * 60 * 60 * 24, // 24 часа
    retry: 1,
  });

  useEffect(() => {
    if (isRestoredFromCache.current) {
      isRestoredFromCache.current = false;
      return;
    }

    if (queryResult.data) {
      const saveCache = async () => {
        try {
          await AsyncStorage.setItem(
            persistKey,
            JSON.stringify(queryResult.data),
          );
        } catch (err) {
          console.error('Cache write error:', err);
        }
      };
      saveCache();
    }
  }, [queryResult.data, persistKey]);

  return queryResult;
};
