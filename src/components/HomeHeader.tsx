'use client';

import 'moment/locale/fr';

import { AnimatePresence, useAnimationControls } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import HomeHeaderCategories from './HomeHeaderCategories';
import HomeHeaderImage from './HomeHeaderImage';
import HomeHeaderNavigation from './HomeHeaderNavigation';
import HomeHeaderPublishedAt from './HomeHeaderPublishedAt';
import HomeHeaderTitle from './HomeHeaderTitle';
import Wrapper from './Wrapper';

type Props = {
  posts: Post[];
};

const ANIMATION_DELAY = 0.2;
const ANIMATION_SPEED = 0.7;
const TIMER_SPEED = 6;
const X_IMAGE_ANIMATION = 90;
const Y_CATEGORIES_ANIMATION = 50;
const Y_TITLE_ANIMATION = 100;

function HomeHeader({ posts }: Props) {
  const [index, setIndex] = useState(0);
  const [canPress, setCanPress] = useState(true);

  const constrolsCategories = useAnimationControls();
  const controlsImage = useAnimationControls();
  const controlsPublishedAt = useAnimationControls();
  const controlsTitle = useAnimationControls();

  const intervalRef = useRef<NodeJS.Timer | null>();

  const clearTimer = useCallback(() => {
    if (!intervalRef.current) {
      return;
    }
    clearInterval(intervalRef.current);
  }, []);

  const decreaseIndex = useCallback(async () => {
    if (!canPress || posts.length <= 1) {
      return;
    }
    setCanPress(false);
    await Promise.all([
      constrolsCategories.start({
        opacity: 0,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
        },
        y: Y_CATEGORIES_ANIMATION,
      }),
      controlsImage.start({
        opacity: 0,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
        },
        x: -X_IMAGE_ANIMATION,
      }),
      controlsPublishedAt.start({
        opacity: 0,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
        },
        y: Y_CATEGORIES_ANIMATION,
      }),
      controlsTitle.start({
        opacity: 0,
        transition: {
          bounce: false,
          delay: ANIMATION_DELAY,
          duration: ANIMATION_SPEED,
        },
        y: Y_TITLE_ANIMATION,
      }),
    ]);
    setIndex((prevState) =>
      prevState - 1 < 0 ? posts.length - 1 : prevState - 1
    );
    controlsImage.set({ x: X_IMAGE_ANIMATION });
    await Promise.all([
      constrolsCategories.start({
        opacity: 1,
        transition: {
          bounce: false,
          delay: ANIMATION_DELAY * 2,
          duration: ANIMATION_SPEED,
        },
        y: 0,
      }),
      controlsImage.start({
        opacity: 1,
        transition: {
          bounce: false,
          delay: ANIMATION_DELAY,
          duration: ANIMATION_SPEED,
        },
        x: 0,
      }),
      controlsPublishedAt.start({
        opacity: 1,
        transition: {
          bounce: false,
          delay: ANIMATION_DELAY * 2,
          duration: ANIMATION_SPEED,
        },
        y: 0,
      }),
      controlsTitle.start({
        opacity: 1,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED * 2,
          delay: ANIMATION_DELAY,
        },
        y: 0,
      }),
    ]);
    setCanPress(true);
  }, [
    canPress,
    constrolsCategories,
    controlsImage,
    controlsPublishedAt,
    controlsTitle,
    posts,
  ]);

  const increaseIndex = useCallback(async () => {
    if (!canPress || posts.length <= 1) {
      return;
    }
    setCanPress(false);
    await Promise.all([
      constrolsCategories.start({
        opacity: 0,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
        },
        y: Y_CATEGORIES_ANIMATION,
      }),
      controlsImage.start({
        opacity: 0,
        x: X_IMAGE_ANIMATION,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
        },
      }),
      controlsPublishedAt.start({
        opacity: 0,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
        },
        y: Y_CATEGORIES_ANIMATION,
      }),
      controlsTitle.start({
        opacity: 0,
        y: Y_TITLE_ANIMATION,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
          delay: ANIMATION_DELAY,
        },
      }),
    ]);
    setIndex((prevState) => (prevState + 1) % posts.length);
    controlsImage.set({ x: -X_IMAGE_ANIMATION });
    await Promise.all([
      constrolsCategories.start({
        opacity: 1,
        transition: {
          bounce: false,
          delay: ANIMATION_DELAY * 2,
          duration: ANIMATION_SPEED,
        },
        y: 0,
      }),
      controlsImage.start({
        opacity: 1,
        x: 0,
        transition: {
          bounce: false,
          delay: ANIMATION_DELAY,
          duration: ANIMATION_SPEED,
        },
      }),
      controlsPublishedAt.start({
        opacity: 1,
        transition: {
          bounce: false,
          delay: ANIMATION_DELAY * 2,
          duration: ANIMATION_SPEED,
        },
        y: 0,
      }),
      controlsTitle.start({
        opacity: 1,
        y: 0,
        transition: {
          bounce: false,
          delay: ANIMATION_DELAY * 2,
          duration: ANIMATION_SPEED,
        },
      }),
    ]);
    setCanPress(true);
  }, [
    canPress,
    constrolsCategories,
    controlsPublishedAt,
    controlsImage,
    controlsTitle,
    posts,
  ]);

  const setTimer = useCallback(() => {
    const timer = setInterval(increaseIndex, TIMER_SPEED * 1000);
    intervalRef.current = timer;
  }, [increaseIndex]);

  const resetTimer = useCallback(() => {
    if (!posts.length) {
      return;
    }
    clearTimer();
    setTimer();
  }, [clearTimer, setTimer, posts]);

  const handlePressNext = useCallback(() => {
    increaseIndex();
    resetTimer();
  }, [increaseIndex, resetTimer]);

  const handlePressPrevious = useCallback(() => {
    decreaseIndex();
    resetTimer();
  }, [decreaseIndex, resetTimer]);

  useEffect(() => {
    resetTimer();
    return () => {
      clearTimer();
    };
  }, [resetTimer, clearTimer]);

  useEffect(() => {
    controlsImage.set({ x: 0, opacity: 1 });
    controlsTitle.set({ y: 1, opacity: 1 });
  }, [controlsImage, controlsTitle]);

  if (!posts.length) {
    return;
  }

  return (
    <Wrapper>
      <div className="gap-2 grid grid-cols-6 h-full min-h-[calc(105vw+7rem)] relative md:grid-cols-12 md:min-h-[calc(57.5vw+12rem)] lg:min-h-[calc(40vw+10rem)] lg:gap-4">
        <AnimatePresence>
          <div
            className="absolute gap-x-3 gap-y-2 grid grid-cols-6 inset-x-0 pt-2 top-0 z-10 md:grid-cols-12 md:pt-8 lf:gap-x-4 lg:pt-16"
            key="top-content"
          >
            <HomeHeaderCategories
              animate={constrolsCategories}
              categories={posts[index].categories}
              className="col-span-6 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-2"
            />
            <HomeHeaderTitle
              animate={controlsTitle}
              className="col-span-6 sm:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-2"
              title={posts[index].title}
            />
          </div>
          <div
            className="col-span-5 col-start-2 flex flex-col justify-center pt-10 md:col-span-6 md:col-start-5 lg:col-start-6 lg:pt-2 lg:col-span-6"
            key="bottom-content"
          >
            <div className="relative">
              <HomeHeaderImage
                animate={controlsImage}
                className="pb-15/12 lg:pb-13/12"
                image={posts[index].mainImage}
                slug={posts[index].slug}
                title={posts[index].title}
              />
              <HomeHeaderPublishedAt
                animate={controlsPublishedAt}
                className="bottom-0 -left-4 origin-bottom-left -rotate-90 z-10"
                publishedAt={posts[index].publishedAt}
              />
            </div>
            <HomeHeaderNavigation
              className="py-4 w-full"
              index={index}
              onClickNext={handlePressNext}
              onClickPrevious={handlePressPrevious}
              postsLength={posts.length}
            />
          </div>
        </AnimatePresence>
      </div>
    </Wrapper>
  );
}

export default HomeHeader;
