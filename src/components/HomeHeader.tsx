'use client';

import 'moment/locale/fr';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { bodoniModa } from '@src/utils/fonts';

moment.locale('fr');

type Props = {
  posts: Post[];
};

const ANIMATION_SPEED = 0.7;
const IMAGE_DELAY = 0.2;
const TIMER_SPEED = 6;
const TITLE_DELAY = 0.4;
const X_IMAGE_ANIMATION = 90;
const Y_TITLE_ANIMATION = 100;

function HomeHeader({ posts }: Props) {
  const [index, setIndex] = useState(0);
  const [canPress, setCanPress] = useState(true);

  const controlsImage = useAnimationControls();
  const controlsTitle = useAnimationControls();

  const intervalRef = useRef<NodeJS.Timer | null>();

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
    <div className="h-[calc(100vh-5rem)] max-h-[calc(190vw-5rem)] transition-all sm:mb-52 overflow-hidden px-6">
      <div className="h-full overflow-hidden relative w-full">
        <AnimatePresence>
          <div className="absolute py-3 text-light top-8 z-10">
            <motion.h3
              animate={controlsTitle}
              className={`font-bold text-4xl uppercase ${bodoniModa.className}`}
            >
              {posts[index].title}
            </motion.h3>
          </div>
          <div className="absolute pl-14 top-36 w-full">
            <motion.div
              className="h-[calc(100vh-19rem)] max-h-[calc(190vw-19rem)] overflow-hidden relative w-full"
              animate={controlsImage}
            >
              <Link href={`/post/${posts[index].slug}`}>
                <Image
                  alt={posts[index].mainImage.alt || posts[index].title}
                  blurDataURL={posts[index].mainImage.metadata.lqip}
                  className="absolute duration-1000 h-full object-cover transition-all w-full hover:scale-110"
                  height={posts[index].mainImage.metadata.dimensions.height}
                  placeholder="blur"
                  src={posts[index].mainImage.url}
                  width={posts[index].mainImage.metadata.dimensions.width}
                />
              </Link>
            </motion.div>
          </div>
          <div className="absolute bottom-20 left-10 opacity-50 origin-bottom-left overflow-hidden -rotate-90 text-light text-xs">
            <motion.span
              className="block first-letter:uppercase"
              animate={controlsTitle}
            >
              {moment(posts[index].publishedAt, 'YYYYMMDD').fromNow() + '.'}
            </motion.span>
          </div>
          {posts.length > 1 && (
            <div className="absolute bottom-0 flex h-20 items-stretch pl-14 text-light w-full">
              <div className="flex grow items-center justify-between">
                <span className="opacity-50 text-light text-xs">
                  {index + 1}
                  {' /// '}
                  {posts.length}
                </span>
                <div>
                  <button className="uppercase" onClick={handlePressPrevious}>
                    précédent
                  </button>
                  /
                  <button className="uppercase" onClick={handlePressNext}>
                    suivant
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HomeHeader;
