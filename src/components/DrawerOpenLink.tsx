'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import hamburgerMenuDark from '@/public/hamburger-menu-dark.png';
import hamburgerMenuLight from '@/public/hamburger-menu-light.png';

type Props = {
  className?: string;
  color?: 'dark' | 'light';
};

function DrawerOpenLink({ className = '', color = 'light' }: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('image') || searchParams.get('drawer') == 'true') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [searchParams]);

  return (
    <Link
      className={className}
      href={{ query: { drawer: true } }}
      replace={true}
      scroll={false}
    >
      <Image
        alt="hamburger menu"
        className="h-8 w-auto"
        src={color === 'dark' ? hamburgerMenuDark : hamburgerMenuLight}
      />
    </Link>
  );
}

export default DrawerOpenLink;
