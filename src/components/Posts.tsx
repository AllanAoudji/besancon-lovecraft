'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { getPosts, getPostsByCategory } from '@/sanity/sanity.queries';
import useScrollPosition from '@src/hooks/useScrollPosition';

import PostCard from './PostCard';

type Props = {
  categorySlug?: string | null;
  posts: Post[];
  showCategories?: boolean;
  showHeaderText?: boolean;
};

const NUM_OF_POST_BY_BATCH = 15;

function Posts({
  categorySlug = null,
  posts: initialPost,
  showCategories = true,
}: Props) {
  const [lastYear, setLastYear] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [lastSlug, setLastSlug] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>(initialPost);

  const initaleFetchingRef = useRef<boolean>(true);
  const mountedRef = useRef<boolean>(true);

  const scrollPosition = useScrollPosition();

  const postsGetter = useCallback(async () => {
    if (lastSlug == null) return;

    setLoading(true);

    let result: Post[];

    if (categorySlug) {
      result = await getPostsByCategory(lastYear, lastSlug, categorySlug);
    } else {
      result = await getPosts(lastYear, lastSlug);
    }

    if (!mountedRef.current) return;

    setPosts((prevState) => [...prevState, ...result]);
    if (result.length < NUM_OF_POST_BY_BATCH) {
      setLastSlug(null);
    } else {
      setLastSlug(result[result.length - 1].slug);
      setLastYear(result[result.length - 1].year);
    }

    setLoading(false);
  }, [categorySlug, lastYear, lastSlug]);

  // initial post fetching
  // only trigger on mount
  useEffect(() => {
    if (!initaleFetchingRef.current) {
      return;
    }
    if (posts.length < NUM_OF_POST_BY_BATCH) {
      setLastSlug(null);
    } else {
      setLastSlug(posts[posts.length - 1].slug);
      setLastYear(posts[posts.length - 1].year);
    }
    initaleFetchingRef.current = false;
  }, [posts]);

  // fetch next post if scroll to bottom
  useEffect(() => {
    if (scrollPosition && scrollPosition > 80 && !loading) {
      postsGetter();
    }
  }, [loading, scrollPosition, postsGetter]);

  // dismount before async call finished
  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return (
    <>
      {posts.map((post) => (
        <PostCard showCategories={showCategories} post={post} key={post._id} />
      ))}
    </>
  );
}

export default Posts;
