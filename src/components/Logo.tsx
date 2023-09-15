'use client';

import Image from 'next/image';
import Link from 'next/link';

import logoDark from '@/public/logo-image-light.png';
import logoLight from '@/public/logo-light.png';
import logoHorizontaldark from '@/public/logo-horizontal-dark.png';
import logoHorizontalLight from '@/public/logo-horizontal-light.png';
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
      return logoHorizontaldark;
    }

    return logoHorizontalLight;
  }, [width, color]);

  return (
    <Link href="/">
      <Image alt="main logo" className={`w-auto ${className}`} src={image} />
    </Link>
  );
}
export default Logo;
