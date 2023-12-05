'use client';

import Image from 'next/image';
import { useMemo } from 'react';

type Props = {
  alt: string | null;
  height: number;
  lqip: string;
  title: string;
  showCategories: boolean;
  url: string;
  variant: 'small' | 'normal';
  width: number;
};

function PostCartImage({
  alt,
  height,
  lqip,
  showCategories,
  title,
  url,
  variant,
  width,
}: Props) {
  const altProps = useMemo(() => alt || title, [alt, title]);
  const classVariant = useMemo(
    () =>
      variant === 'normal' || showCategories
        ? 'mb-2'
        : 'aspect-square col-span-2 sm:aspect-auto sm:col-span-full sm:mb-2',
    [variant, showCategories]
  );

  return (
    <div className={`overflow-hidden ${classVariant}`}>
      <Image
        alt={altProps}
        blurDataURL={lqip}
        className="duration-1000 h-full object-cover top-0 transition w-full"
        height={height}
        placeholder="blur"
        src={url}
        width={width}
      />
    </div>
  );
}

export default PostCartImage;
