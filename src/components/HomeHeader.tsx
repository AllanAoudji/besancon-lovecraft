'use client';

import { bodoniModa } from '@src/utils/fonts';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  posts: Post[];
};

const ANIMATION_SPEED = 0.7;
const TIMER_SPEED = 6;
const X_IMAGE_ANIMATION = 90;
const Y_TITLE_ANIMATION = 100;
const IMAGE_DELAY = 0.2;
const TITLE_DELAY = 0.4;

function HomeHeader({ posts }: Props) {
  const [index, setIndex] = useState(0);
  const [canPress, setCanPress] = useState(true);

  const intervalRef = useRef<NodeJS.Timer | null>();
  const controlsImage = useAnimationControls();
  const controlsTitle = useAnimationControls();

  const clearTimer = useCallback(() => {
    if (!intervalRef.current) {
      return;
    }
    clearInterval(intervalRef.current);
  }, []);

  const decreaseIndex = useCallback(async () => {
    if (!canPress) {
      return;
    }
    setCanPress(false);
    await Promise.all([
      controlsTitle.start({
        opacity: 0,
        y: Y_TITLE_ANIMATION,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
          delay: 0.1,
        },
      }),
      controlsImage.start({
        opacity: 0,
        x: -X_IMAGE_ANIMATION,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
        },
      }),
    ]);
    setIndex((prevState) =>
      prevState - 1 < 0 ? posts.length - 1 : prevState - 1
    );
    controlsImage.set({ x: X_IMAGE_ANIMATION });
    await Promise.all([
      controlsImage.start({
        opacity: 1,
        x: 0,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
          delay: IMAGE_DELAY,
        },
      }),
      controlsTitle.start({
        opacity: 1,
        y: 0,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
          delay: 0.1,
        },
      }),
    ]);
    setCanPress(true);
  }, [controlsImage, controlsTitle, posts, canPress]);

  const increaseIndex = useCallback(async () => {
    if (!canPress) {
      return;
    }
    setCanPress(false);
    await Promise.all([
      controlsTitle.start({
        opacity: 0,
        y: Y_TITLE_ANIMATION,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
          delay: IMAGE_DELAY,
        },
      }),
      await controlsImage.start({
        opacity: 0,
        x: X_IMAGE_ANIMATION,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
        },
      }),
    ]);
    setIndex((prevState) => (prevState + 1) % posts.length);
    controlsImage.set({ x: -X_IMAGE_ANIMATION });
    await Promise.all([
      controlsImage.start({
        opacity: 1,
        x: 0,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
          delay: IMAGE_DELAY,
        },
      }),
      controlsTitle.start({
        opacity: 1,
        y: 0,
        transition: {
          bounce: false,
          duration: ANIMATION_SPEED,
          delay: TITLE_DELAY,
        },
      }),
    ]);
    setCanPress(true);
  }, [canPress, controlsImage, controlsTitle, posts]);

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
    <div className="h-[calc(100vh-5rem)] max-h-[calc(180vw-5rem)] relative transition-all sm:mb-52 overflow-hidden">
      <AnimatePresence>
        <div className="overflow-hidden py-3 text-light absolute px-6 top-8 z-10">
          <motion.h3
            animate={controlsTitle}
            className={`text-4xl font-bold uppercase ${bodoniModa.className}`}
          >
            {posts[index].title}
          </motion.h3>
        </div>
        <div className="absolute w-screen pl-20 pr-6 top-36">
          <motion.div
            className="h-[calc(100vh-19rem)] max-h-[calc(180vw-19rem)] relative overflow-hidden w-full "
            animate={controlsImage}
          >
            <Image
              alt={posts[index].mainImage.alt || posts[index].title}
              blurDataURL={posts[index].mainImage.metadata.lqip}
              className="absolute h-full w-full object-cover grayscale-[20%]"
              height={posts[index].mainImage.metadata.dimensions.height}
              placeholder="blur"
              src={posts[index].mainImage.url}
              width={posts[index].mainImage.metadata.dimensions.width}
            />
          </motion.div>
        </div>
        {posts.length > 1 && (
          <div className="flex absolute bottom-0 pl-20 pr-6 w-screen h-20 items-stretch text-light text-xl">
            <div className="grow flex items-center justify-between">
              <button className="uppercase" onClick={handlePressPrevious}>
                previous
              </button>
              <button className="uppercase" onClick={handlePressNext}>
                next
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomeHeader;
