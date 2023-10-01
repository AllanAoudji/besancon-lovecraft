'use client';

import Image from 'next/image';
import Link from 'next/link';

import logoDark from '@/public/logo-image-dark.png';
import logoLight from '@/public/logo-image-light.png';
import logoHorizontalFillDark from '@/public/logoHorizontalFillDark.png';
import logoHorizontalFillLight from '@/public/logoHorizontalFillLight.png';
import useWindowSize from '@src/hooks/useWindowSize';
import { useMemo } from 'react';

type Props = {
  className?: string;
  color?: 'dark' | 'light';
};

function Logo({ className, color = 'light' }: Props) {
  const { width } = useWindowSize();

  const image = useMemo(() => {
    if (!width || width < 768) {
      if (color === 'dark') {
        return logoDark;
      } else {
        return logoLight;
      }
    }
    if (color === 'dark') {
      return logoHorizontalFillDark;
    }

    return logoHorizontalFillLight;
  }, [width, color]);

  return (
    <Link href="/">
      <Image alt="main logo" className={`w-auto ${className}`} src={image} />
    </Link>
  );
}
export default Logo;
